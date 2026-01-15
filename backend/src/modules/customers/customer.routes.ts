import { Router } from "express";
import mongoose from 'mongoose'
import { Customer } from "./customer.model";
import { ServiceOrder } from '../serviceOrders/serviceOrder.model'
const customersRoutes = Router();

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id)
}

// Create a new customer
customersRoutes.post('/', async (req, res, next) => {
  try {
    const { name, phone } = req.body

    if (!name || !phone) {
      return res.status(400).json({ message: 'name e phone são obrigatórios' })
    }

    const customer = await Customer.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
    })

    return res.status(201).json(customer)
  } catch (err) {
    return next(err)
  }
})

// ✅ READ ALL (com search opcional)
customersRoutes.get('/', async (req, res, next) => {
    const data = await Customer.find()
    console.log(data)
  try {
    const search = String(req.query.search ?? '').trim()

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
          ],
        }
      : {}

    const customers = await Customer.find(filter).sort({ createdAt: -1 })
    return res.json(customers)
  } catch (err) {
    return next(err)
  }
})

// ✅ LISTAR OS DE UM CUSTOMER
customersRoutes.get('/:id/service-orders', async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    // opcional: garante que o customer existe
    const customerExists = await Customer.exists({ _id: id })
    if (!customerExists) {
      return res.status(404).json({ message: 'Cliente não encontrado cinco' })
    }

    const status = String(req.query.status ?? '').trim() // MANUTENCAO | ENTREGUE (opcional)

    const filter: Record<string, any> = { customerId: id }
    if (status) filter.status = status

    const orders = await ServiceOrder.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v') // opcional

    return res.json(orders)
  } catch (err) {
    return next(err)
  }
})

// ✅ READ ONE (por ID)
customersRoutes.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const customer = await Customer.findById(id)

    if (!customer) {
      return res.status(404).json({ message: 'Cliente não encontrado dois' })
    }

    return res.json(customer)
  } catch (err) {
    return next(err)
  }
})

// ✅ UPDATE (por ID)
customersRoutes.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const { name, phone } = req.body

    const updateData: Record<string, any> = {}
    if (name !== undefined) updateData.name = String(name).trim()
    if (phone !== undefined) updateData.phone = String(phone).trim()

    const customer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!customer) {
      return res.status(404).json({ message: 'Cliente não encontrado tres' })
    }

    return res.json(customer)
  } catch (err) {
    return next(err)
  }
})

// ✅ DELETE (por ID)
customersRoutes.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const customer = await Customer.findByIdAndDelete(id)

    if (!customer) {
      return res.status(404).json({ message: 'Cliente não encontrado quatro' })
    }

    return res.status(204).send()
  } catch (err) {
    return next(err)
  }
})

export {customersRoutes}