export default function Filters({ category, setCategory, sort, setSort }) {
  const inputClass = "bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200";

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <input
        placeholder="Filter categories..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`${inputClass} w-full sm:w-48`}
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={`${inputClass} w-full sm:w-40 cursor-pointer`}
      >
        <option value="">Sort by...</option>
        <option value="date_desc">Newest First</option>
        <option value="date_asc">Oldest First</option>
      </select>
    </div>
  );
}
