export default function ExpenseList({ expenses, loading, onDelete }) {
  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-fuchsia-600 animate-pulse">
        <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="font-semibold text-sm">Loading transactions...</p>
      </div>
    );
  }

  if (!expenses.length) {
    return (
      <div className="py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 font-medium text-lg">No expenses found yet.</p>
        <p className="text-gray-400 text-sm mt-1">Start by adding a new transaction above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50/80">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Description</th>
            <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {expenses.map((e) => (
            <tr key={e._id} className="hover:bg-fuchsia-50/40 transition-colors duration-150 group">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                {new Date(e.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-violet-100 text-violet-700 capitalize border border-violet-100 group-hover:bg-violet-200 group-hover:border-violet-200 transition-colors">
                  {e.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {e.description || <span className="text-gray-300 italic">No description</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-800">
                <div className="flex items-center justify-end gap-4">
                  <span>₹ {(e.amount / 100).toFixed(2)}</span>
                  <button
                    onClick={() => onDelete(e._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 group-hover:text-gray-500"
                    title="Delete Transaction"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
