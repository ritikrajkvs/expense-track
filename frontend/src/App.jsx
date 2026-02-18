<h1 className="text-6xl font-black text-red-600">
  TAILWIND ACTIVE
</h1>


import ExpenseForm from './components/ExpenseForm';

import ExpenseList from './components/ExpenseList';
import Filters from './components/Filters';
import { useExpenses } from './hooks/useExpenses';

export default function App() {
  const {
    expenses,
    category,
    setCategory,
    sort,
    setSort,
    loading,
    error,
    addExpense,
    total,
  } = useExpenses();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Expense Tracker</h1>

        <ExpenseForm onSubmit={addExpense} loading={loading} />

        <Filters
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <ExpenseList expenses={expenses} loading={loading} />

        <div className="mt-6 text-right text-xl font-semibold text-gray-800">
          Total (visible): ₹ {(total / 100).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

