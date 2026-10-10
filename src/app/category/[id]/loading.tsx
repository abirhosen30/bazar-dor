export default function CategoryLoading() {
  return (
    <div
      role="status"
      aria-label="ক্যাটাগরির পণ্য লোড হচ্ছে"
      className="mx-auto max-w-6xl animate-pulse space-y-4 px-4 py-6"
    >
      <div className="h-20 rounded-xl bg-gray-100" />
      <div className="h-12 rounded-xl bg-gray-100" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-28 rounded-xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
