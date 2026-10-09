import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: ProductMarket[];
}

const formatPrice = (price: number) => price.toLocaleString("bn-BD");

const getUnitLabel = (unit: string) => {
  switch (unit.toLowerCase()) {
    case "kg":
      return "কেজি";
    case "liter":
    case "litre":
    case "l":
      return "লিটার";
    case "pcs":
    case "piece":
      return "টি";
    default:
      return unit;
  }
};

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  if (!/^\d+$/.test(slug)) {
    notFound();
  }

  const response = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${encodeURIComponent(slug)}`,
  );

  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch product "${slug}" (${response.status})`);
  }

  const product: Product = await response.json();
  const unitLabel = getUnitLabel(product.unit);
  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-600"
        : "text-gray-600";

  return (
    <div className="min-h-screen p-3 sm:p-5">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-gray-500">
          <Link className="hover:text-green-700" href="/">
            হোম
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link
            className="hover:text-green-700"
            href={`/category/${encodeURIComponent(product.category)}`}
          >
            {product.categoryNameBn}
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-gray-700">{product.nameBn}</span>
        </nav>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-[#fbfdfb] p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f5f1] text-2xl">
              {product.image || product.categoryIcon}
            </span>
            <div>
              <p className="text-xs text-gray-500">
                {product.categoryIcon} {product.categoryNameBn}
              </p>
              <h1 className="mt-1 text-lg font-bold text-gray-800 sm:text-xl">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unitLabel} বাজারদর
              </p>
            </div>
          </div>

          <div className="min-w-28 rounded-xl bg-[#f0f5f1] px-4 py-3 text-center">
            <p className="text-[10px] text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </p>
            <p className="text-[10px] text-gray-500">টাকা / {unitLabel}</p>
            <p className={`mt-1 text-xs font-semibold ${changeColor}`}>
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "−"}{" "}
              {formatPrice(product.change.pct)}%
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-gray-200 p-4 sm:p-5">
          <h2 className="text-sm font-bold text-gray-800">দামের সারসংক্ষেপ</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "আজকের দাম", price: product.today, tone: "text-green-700" },
              { label: "গতকালের দাম", price: product.yesterday, tone: "text-gray-800" },
              { label: "গত সপ্তাহের দাম", price: product.lastWeek, tone: "text-gray-800" },
            ].map(({ label, price, tone }) => (
              <div
                key={label}
                className="rounded-lg border border-gray-200 bg-white p-3"
              >
                <p className="text-xs text-gray-500">{label}</p>
                <p className={`mt-1 text-base font-bold ${tone}`}>
                  ৳{formatPrice(price)}{" "}
                  <span className="text-xs font-normal">/ {unitLabel}</span>
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-5 text-sm font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>
          {product.markets.length > 0 ? (
            <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[520px] border-collapse text-left text-xs">
                <thead className="bg-[#f0f5f1] text-gray-600">
                  <tr>
                    <th className="px-3 py-2 font-semibold">বাজার</th>
                    <th className="px-3 py-2 font-semibold">বিভাগ</th>
                    <th className="px-3 py-2 text-right font-semibold">
                      সর্বনিম্ন দাম
                    </th>
                    <th className="px-3 py-2 text-right font-semibold">
                      সর্বোচ্চ দাম
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets.map((market) => (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className="border-t border-gray-200"
                    >
                      <td className="px-3 py-2 text-gray-800">
                        {market.market}
                      </td>
                      <td className="px-3 py-2 text-gray-600">
                        {market.division}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-800">
                        ৳{formatPrice(market.min)}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-800">
                        ৳{formatPrice(market.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-3 rounded-lg border border-gray-200 bg-white p-4 text-xs text-gray-500">
              এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
