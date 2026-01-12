import { Counter } from '../counters/counters.model'

export async function getNextOrderNumber() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'serviceOrder' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  return counter.seq
}
