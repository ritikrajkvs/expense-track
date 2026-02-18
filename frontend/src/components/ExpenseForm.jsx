import { useState } from 'react';

export default function ExpenseForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
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

    setForm({ amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] });
  }

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-2">
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        
        <div className="md:col-span-3">
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        
        <div className="md:col-span-4">
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        
        <div className="md:col-span-2">
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        
        <div className="md:col-span-1">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-full min-h-[46px] bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? '...' : '+'}
          </button>
        </div>
      </div>
    </form>
  );
}
