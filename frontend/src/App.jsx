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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header & Total */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Expense Tracker
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Track your spending with style
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-white/50">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Spent
            </p>
            <p className="text-3xl font-black text-slate-800">
              ₹ {(total / 100).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/60 p-6 md:p-8">
          
          <ExpenseForm onSubmit={addExpense} loading={loading} />

          <div className="mt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-slate-700">Recent Transactions</h2>
              <Filters
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium border border-red-100">
                {error}
              </div>
            )}

            <ExpenseList expenses={expenses} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
