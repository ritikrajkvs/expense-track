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

    // FIX: Convert Rupees to Paise (multiply by 100) for storage
    const amountInPaise = Math.round(Number(form.amount) * 100);

    await onSubmit({
      amount: amountInPaise,
      category: form.category.trim(),
      description: form.description.trim(),
      date: form.date,
    });

    setForm({ amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] });
  }

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50">
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
            placeholder="Category (e.g. Food)"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        
        <div className="md:col-span-4">
          <input
            name="description"
            placeholder="Description (Optional)"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        
        <div className="md:col-span-2">
          <input
            name="amount"
            type="number"
            step="0.01" 
            placeholder="Amount (₹)"
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
            className="w-full h-full min-h-[48px] bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg shadow-fuchsia-200 hover:shadow-fuchsia-300 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xl"
          >
            {loading ? '...' : '+'}
          </button>
        </div>
      </div>
    </form>
  );
}
