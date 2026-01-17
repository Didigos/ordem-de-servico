import { Router } from 'express'
import mongoose from 'mongoose'
import { ServiceOrder } from './serviceOrder.model'
import { Customer } from '../customers/customer.model'
import { getNextOrderNumber } from './getNextOrderNumber'

const serviceOrdersRoutes = Router()

serviceOrdersRoutes.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) return next();
  return res.status(503).json({ message: "Banco conectando. Tente novamente." });
});

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id)
}

/**
 * POST /service-orders
 * cria OS (status padrão: MANUTENCAO)
 */
serviceOrdersRoutes.post('/', async (req, res, next) => {
  console.log('usuario: ', req.body.customerId)
  try {
    const {
      customerId,
      brand,
      model,
      defectReported,
      servicePerformed,
      valueCents,
      warrantyDays,
      devicePasscode,
      store
    } = req.body


    // if (!isValidObjectId(String(customerId))) {
    //   return res.status(400).json({ message: 'customerId inválido' })
    // }

    // const customerExists = await Customer.exists({ _id: customerId })
    // if (!customerExists) {
    //   return res.status(404).json({ message: 'Cliente não encontrado' })
    // }

    const orderNumber = await getNextOrderNumber()

    const serviceOrder = await ServiceOrder.create({
      orderNumber,
      customerId,
      brand: String(brand).trim(),
      model: String(model).trim(),
      defectReported: String(defectReported).trim(),
      servicePerformed: servicePerformed ? String(servicePerformed).trim() : '',
      valueCents: valueCents,
      warrantyDays: Number(warrantyDays),
      devicePasscode: devicePasscode ? String(devicePasscode).trim() : '',
      status: 'MANUTENCAO',
      deliveredAt: null,
      store: String(store).trim(),
    })

    return res.status(201).json(serviceOrder)
  } catch (err) {
    return next(err)
  }
})

/**
 * GET /service-orders
 * lista OS (filtros opcionais)
 * - status=MANUTENCAO|ENTREGUE
 * - customerId=<ObjectId>
 * - orderNumber=<Number>
 */
serviceOrdersRoutes.get("/", async (req, res, next) => {
  try {
    const response = await ServiceOrder.aggregate([
      {
        $addFields: {
          statusOrder: { $cond: [{ $eq: ["$status", "MANUTENCAO"] }, 0, 1] }
        }
      },
      { $sort: { statusOrder: 1, createdAt: -1 } }
    ]);

    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /service-orders/:id
 * busca OS por ID
 */
serviceOrdersRoutes.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const serviceOrder = await ServiceOrder.findById(id).populate('customerId')
    if (!serviceOrder) {
      return res.status(404).json({ message: 'OS não encontrada' })
    }

    return res.json(serviceOrder)
  } catch (err) {
    return next(err)
  }
})

/**
 * PUT /service-orders/:id
 * atualiza campos da OS (não entrega)
 */
serviceOrdersRoutes.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'ID inválido' })

    const {
      customerId,
      brand,
      model,
      defectReported,
      servicePerformed,
      valueCents,
      warrantyDays,
      devicePasscode,
      status,
      deliveredAt,
    } = req.body

    const updateData: Record<string, any> = {}

    if (customerId !== undefined) {
      if (!isValidObjectId(String(customerId))) return res.status(400).json({ message: 'customerId inválido' })
      const customerExists = await Customer.exists({ _id: customerId })
      if (!customerExists) return res.status(404).json({ message: 'Cliente não encontrado' })
      updateData.customerId = customerId
    }

    if (brand !== undefined) updateData.brand = String(brand).trim()
    if (model !== undefined) updateData.model = String(model).trim()
    if (defectReported !== undefined) updateData.defectReported = String(defectReported).trim()
    if (servicePerformed !== undefined) updateData.servicePerformed = String(servicePerformed).trim()
    if (valueCents !== undefined) updateData.valueCents = Number(valueCents)
    if (warrantyDays !== undefined) updateData.warrantyDays = Number(warrantyDays)
    if (devicePasscode !== undefined) updateData.devicePasscode = String(devicePasscode).trim()

    // Se você quiser permitir atualizar status manualmente, mantém isso.
    // Se quiser travar e só deixar via /deliver, remova essas linhas.
    if (status !== undefined) updateData.status = status
    if (deliveredAt !== undefined) updateData.deliveredAt = deliveredAt

    const updated = await ServiceOrder.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('customerId')

    if (!updated) return res.status(404).json({ message: 'OS não encontrada' })

    return res.json(updated)
  } catch (err) {
    return next(err)
  }
})

/**
 * PATCH /service-orders/:id/deliver
 * marca como ENTREGUE e seta deliveredAt automaticamente
 */
serviceOrdersRoutes.patch('/:id/deliver', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'ID inválido' })

    const serviceOrder = await ServiceOrder.findById(id)
    if (!serviceOrder) return res.status(404).json({ message: 'OS não encontrada' })

    serviceOrder.status = 'ENTREGUE'
    serviceOrder.deliveredAt = new Date()

    await serviceOrder.save()

    const populated = await ServiceOrder.findById(id).populate('customerId')
    return res.json(populated)
  } catch (err) {
    return next(err)
  }
})

/**
 * DELETE /service-orders/:id
 * deleta OS
 */
serviceOrdersRoutes.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'ID inválido' })

    const deleted = await ServiceOrder.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'OS não encontrada' })

    return res.status(204).send()
  } catch (err) {
    return next(err)
  }
})

serviceOrdersRoutes.get('/:id/print', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const os = await ServiceOrder.findById(id).populate('customerId')
    if (!os) return res.status(404).json({ message: 'OS não encontrada' })

    const customer = os.customerId as any

    const money = (cents: number) =>
      (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    const warrantyText = `${os.warrantyDays} dias`

    const lines = [
      '=== ORDEM DE SERVICO ===',
      `OS: #${os.orderNumber}`,
      `Status: ${os.status}`,
      '------------------------',
      `Cliente: ${customer?.name ?? '—'}`,
      `Telefone: ${customer?.phone ?? '—'}`,
      '------------------------',
      `Marca: ${os.brand}`,
      `Modelo: ${os.model}`,
      `Defeito: ${os.defectReported}`,
      `Servico: ${os.servicePerformed || '—'}`,
      `Valor: ${money(Number(os.valueCents))}`,
      `Garantia: ${warrantyText}`,
      '------------------------',
      `Entrada: ${os.createdAt.toISOString().slice(0, 10)}`,
      `Entrega: ${os.deliveredAt ? os.deliveredAt.toISOString().slice(0, 10) : '—'}`,
      '------------------------',
      `Senha: ${os.devicePasscode || '—'}`,
      '',
      'Assinatura do cliente:',
      '______________________',
      '',
      'Obrigado pela preferencia!',
    ]

    return res.json({ lines })
  } catch (err) {
    return next(err)
  }
})


export { serviceOrdersRoutes }
