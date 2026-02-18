import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true }, // store in paise
    category: { type: String, required: true, index: true },
    description: { type: String },
    date: { type: Date, required: true },
    idempotencyKey: { type: String, unique: true, sparse: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export default mongoose.model('Expense', expenseSchema);
