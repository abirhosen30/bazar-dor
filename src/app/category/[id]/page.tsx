import ProductCard from "@/components/ProductCard";
import CategorySortControl from "@/components/CategorySortControl";

interface Product {
  id: number;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  nameBn: string;
  today: number;
  unit?: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

type SortOption = "default" | "price-low" | "price-high";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: string | string[] }>;
}) => {
  const { id } = await params;
  const { sort: requestedSort } = await searchParams;
  const sort: SortOption =
    requestedSort === "price-low" || requestedSort === "price-high"
      ? requestedSort
      : "default";
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(id)}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products for category "${id}" (${res.status})`);
  }

  const categoryProducts: Product[] = await res.json();
  const sortedProducts = [...categoryProducts];

  if (sort === "price-low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "price-high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <main className="min-h-screen p-3 sm:p-5">
      <div className="mx-auto max-w-7xl">
        {/* Category Header */}
        <section className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {categoryProducts[0]?.categoryIcon ?? "🛒"}
            </span>

            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {categoryProducts[0]?.categoryNameBn ?? "পণ্য"}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                {categoryProducts.length} টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {/* Sort Bar */}
        <section className="mt-3 flex items-center justify-between rounded-xl border border-gray-200 bg-[#fbfdfb] px-4 py-3">
          <p className="text-xs text-gray-500">
            মোট {sortedProducts.length} টি পণ্য
          </p>

          <CategorySortControl sort={sort} />
        </section>

        {/* Products */}
        <section id="products" className="mt-4">
          <p className="mb-3 text-xs text-gray-500">
            এই ক্যাটাগরির সকল পণ্য
          </p>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id ?? `${product.nameBn}-${index}`}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-8 text-center">
              <p className="text-sm text-gray-500">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;