export default function Filters({ category, setCategory, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <input
        placeholder="Filter by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg p-2 w-full md:w-1/2"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg p-2 w-full md:w-1/2"
      >
        <option value="date_desc">Newest first</option>
        <option value="">No sorting</option>
      </select>
    </div>
  );
}
