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
    removeExpense,
    total,
  } = useExpenses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 py-12 px-4 font-[Montserrat]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6 text-white">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">
              Expense Tracker
            </h1>
            <p className="text-white/80 font-medium mt-1 text-lg">
              Manage your finances with style
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-2xl shadow-xl">
            <p className="text-xs font-bold text-white/90 uppercase tracking-wider mb-1">
              Total Spent
            </p>
            <p className="text-4xl font-black text-white drop-shadow-sm">
              ₹ {(total / 100).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          <div className="p-6 md:p-8 space-y-8">
            
            <section>
              <ExpenseForm onSubmit={addExpense} loading={loading} />
            </section>

            <div className="pt-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-8 bg-fuchsia-500 rounded-full"></span>
                  Recent Transactions
                </h2>
                <Filters
                  category={category}
                  setCategory={setCategory}
                  sort={sort}
                  setSort={setSort}
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-semibold border border-red-100 flex items-center gap-3">
                  <span className="text-xl">⚠️</span> {error}
                </div>
              )}

              <ExpenseList 
                expenses={expenses} 
                loading={loading} 
                onDelete={removeExpense}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
