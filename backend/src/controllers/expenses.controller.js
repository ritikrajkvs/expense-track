import Expense from '../models/Expense.model.js';
import { getIdempotencyKey } from '../utils/idempotency.js';

export const createExpense = async (req, res, next) => {
  try {
    const key = getIdempotencyKey(req);
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    const existing = await Expense.findOne({ idempotencyKey: key });
    if (existing) {
      return res.status(200).json(existing);
    }

    const expense = await Expense.create({
      ...req.body,
      userId,
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
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    const filter = { userId };
    if (category) filter.category = category;

    const sortBy = sort === 'date_desc' ? { date: -1 } : {};

    const expenses = await Expense.find(filter).sort(sortBy);

    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    const result = await Expense.findOneAndDelete({ _id: id, userId });

    if (!result) {
      return res.status(404).json({ error: 'Expense not found or unauthorized' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    next(err);
  }
};
