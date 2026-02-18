import express from 'express';
import { createExpense, getExpenses } from '../controllers/expenses.controller.js';
import { validateExpense } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/', validateExpense, createExpense);
router.get('/', getExpenses);

export default router;
