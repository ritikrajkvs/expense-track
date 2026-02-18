import { useEffect, useMemo, useState } from 'react';
import { fetchExpenses, createExpense } from '../api/expenses.api';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('date_desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchExpenses({ category, sort });
      setExpenses(data);
    } catch (e) {
      setError(e.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }

  async function addExpense(payload) {
    try {
      setLoading(true);
      setError('');
      await createExpense(payload);
      await load();
    } catch (e) {
      setError(e.message || 'Failed to create expense');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort]);

  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  }, [expenses]);

  return {
    expenses,
    category,
    setCategory,
    sort,
    setSort,
    loading,
    error,
    load,
    addExpense,
    total,
  };
}
