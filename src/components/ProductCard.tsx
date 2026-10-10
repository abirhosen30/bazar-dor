import Link from "next/link";

interface Product {
  id: number;
  categoryIcon: string;
  image: string;
  nameBn: string;
  today: number;
  unit?: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block rounded-xl border border-gray-200 p-3 transition hover:border-green-300 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f5f1] text-xl">
          {product.image}
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800">{product.nameBn}</h3>
          <p className="text-[10px] text-gray-500">
            {product.unit ?? "প্রতি কেজি"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-gray-500">আজকের দাম</p>
          <p className="text-sm font-bold text-gray-900">
            {Number(product.today ?? 0).toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        {product.change && (
          <span
            className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
              product.change.dir === "up"
                ? "bg-red-50 text-red-600"
                : product.change.dir === "down"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—"}
            {product.change.pct?.toLocaleString("bn-BD") ?? "০"}%
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
