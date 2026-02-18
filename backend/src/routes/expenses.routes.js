import express from 'express';
import { createExpense, getExpenses, deleteExpense } from '../controllers/expenses.controller.js';
import { validateExpense } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/', validateExpense, createExpense);
router.get('/', getExpenses);
router.delete('/:id', deleteExpense);

export default router;
