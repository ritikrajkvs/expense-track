import { useState, useEffect, useCallback } from 'react';
import { fetchExpenses, createExpense, deleteExpense as apiDeleteExpense } from '../api/expenses.api';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExpenses({ category, sort });
      setExpenses(data);
      const sum = data.reduce((acc, curr) => acc + curr.amount, 0);
      setTotal(sum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, sort]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  async function addExpense(expense) {
    setLoading(true);
    setError(null);
    try {
      const newExpense = await createExpense(expense);
      setExpenses((prev) => [newExpense, ...prev]);
      setTotal((prev) => prev + newExpense.amount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const removeExpense = useCallback(async (id) => {
    try {
      // Optimistic update: remove from UI immediately
      const expenseToRemove = expenses.find(e => e._id === id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      if (expenseToRemove) {
        setTotal((prev) => prev - expenseToRemove.amount);
      }

      // API call
      await apiDeleteExpense(id);
    } catch (err) {
      setError(err.message);
      // Revert if failed (optional, but good practice would be to reload)
      loadExpenses(); 
    }
  }, [expenses, loadExpenses]);

  return {
    expenses,
    category,
    setCategory,
    sort,
    setSort,
    loading,
    error,
    addExpense,
    removeExpense,
    total,
  };
}
