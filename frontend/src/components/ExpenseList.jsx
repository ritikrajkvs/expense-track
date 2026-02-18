export default function ExpenseList({ expenses, loading }) {
  if (loading) return <div className="text-center py-10 text-slate-400 font-medium animate-pulse">Loading data...</div>;
  if (!expenses.length) return <div className="text-center py-10 text-slate-400 font-medium">No expenses found. Start adding!</div>;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 shadow-sm">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-50">
          {expenses.map((e) => (
            <tr key={e._id} className="hover:bg-purple-50/30 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">
                {new Date(e.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 capitalize">
                  {e.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {e.description || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-slate-800">
                ₹ {(e.amount / 100).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
