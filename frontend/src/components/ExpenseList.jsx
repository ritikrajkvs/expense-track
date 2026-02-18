export default function ExpenseList({ expenses, loading }) {
  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!expenses.length) return <p className="text-gray-500">No expenses yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{new Date(e.date).toLocaleDateString()}</td>
              <td className="p-3 capitalize">{e.category}</td>
              <td className="p-3">{e.description}</td>
              <td className="p-3 text-right font-medium">
                {(e.amount / 100).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
