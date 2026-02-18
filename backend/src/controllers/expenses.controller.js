import Expense from '../models/Expense.model.js';
import { getIdempotencyKey } from '../utils/idempotency.js';

export const createExpense = async (req, res, next) => {
  try {
    const key = getIdempotencyKey(req);

    const existing = await Expense.findOne({ idempotencyKey: key });
    if (existing) {
      return res.status(200).json(existing);
    }

    const expense = await Expense.create({
      ...req.body,
      idempotencyKey: key,
    });

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

export const getExpenses = async (req, res, next) => {
  try {
    const { category, sort } = req.query;

    const filter = category ? { category } : {};
    const sortBy = sort === 'date_desc' ? { date: -1 } : {};

    const expenses = await Expense.find(filter).sort(sortBy);

    res.json(expenses);
  } catch (err) {
    next(err);
  }
};
