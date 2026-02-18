import { useState } from 'react';

export default function ExpenseForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;

    await onSubmit({
      amount: Number(form.amount),
      category: form.category.trim(),
      description: form.description.trim(),
      date: form.date,
    });

    setForm({ amount: '', category: '', description: '', date: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
      <input
        name="amount"
        type="number"
        placeholder="Amount (paise)"
        value={form.amount}
        onChange={handleChange}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Add'}
      </button>
    </form>
  );
}
