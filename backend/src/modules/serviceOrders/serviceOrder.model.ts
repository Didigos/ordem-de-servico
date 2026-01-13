import { Schema, model } from 'mongoose'

const ServiceOrderSchema = new Schema(
  {
    // número da OS
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    //loja ou funcionário que recebeu a OS
    store: { type: String, required: true, trim: true },

    // relacionamento
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      index: true,
    },

    // status da OS
    status: {
      type: String,
      enum: ['MANUTENCAO', 'ENTREGUE'],
      default: 'MANUTENCAO',
      index: true,
    },

    // dados do aparelho
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },

    // informações da OS
    defectReported: { type: String, required: true, trim: true },
    servicePerformed: { type: String, trim: true, default: '' },

    // valor em centavos
    valueCents: { type: Number, required: true, min: 0 },

    // garantia
    warrantyDays: {
      type: Number,
      enum: [30, 60, 90],
      required: true,
      default: 30,
    },

    // datas
    deliveredAt: { type: Date, default: null },

    // senha do aparelho (campo sensível)
    devicePasscode: { type: String, trim: true, default: '' },

    // termos
    termsAcceptance: {
      accepted: { type: Boolean, default: false },
      acceptedAt: { type: Date, default: null },
      textSnapshot: { type: String, default: '' },
    },

  },
  {
    timestamps: true, // createdAt / updatedAt automáticos
  }
)

export const ServiceOrder = model('ServiceOrder', ServiceOrderSchema)
