import { Schema, model } from 'mongoose'

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
  },
  { timestamps: true }
)

export const Customer = model('Customer', CustomerSchema)
