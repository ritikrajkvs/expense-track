import Expense from '../models/Expense.model.js';
import { getIdempotencyKey } from '../utils/idempotency.js';

export const createExpense = async (req, res, next) => {
  try {
    const key = getIdempotencyKey(req);
    // Get the User ID from the request headers
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
      userId, // Save the user ID
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
    const userId = req.headers['x-user-id']; // Identify the user

    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    // Filter by userId so users only see THEIR data
    const filter = { userId };
    
    if (category) {
      filter.category = category;
    }

    const sortBy = sort === 'date_desc' ? { date: -1 } : {};

    const expenses = await Expense.find(filter).sort(sortBy);

    res.json(expenses);
  } catch (err) {
    next(err);
  }
};
