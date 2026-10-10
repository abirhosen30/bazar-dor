export default function Loading() {
  return (
    <div
      role="status"
      aria-label="পণ্য লোড হচ্ছে"
      className="mx-auto max-w-6xl animate-pulse space-y-6 px-4 py-6"
    >
      <div className="h-48 rounded-2xl bg-gray-100" />
      <div className="h-7 w-48 rounded bg-gray-100" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-28 rounded-xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
