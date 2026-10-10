import Banner from "@/components/Banner";
import DecreaseProductsPrice from "@/components/DecreaseProductsPrice";
import IncreaseProductsPrice from "@/components/IncreaseProductsPrice";
import ProductCard from "@/components/ProductCard";
import { BAZARDOR_API_BASE_URL } from "@/lib/bazardor-api";

interface ProductProps {
  id: number;
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


export default async function Home() {
  const res = await fetch(`${BAZARDOR_API_BASE_URL}/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  const data: ProductProps[] = await res.json();
  
  const increasedProducts = data.filter(product => product.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);

  const decreasedProducts = data.filter(product => product.change.dir === "down").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
  
  return (
    <div className="mx-auto max-w-6xl px-4">
      <Banner/>

      <IncreaseProductsPrice products={increasedProducts} />
      <DecreaseProductsPrice products={decreasedProducts} />

      <section id="সব-পণ্য" className="mt-6 scroll-mt-4">
        <h1 className="text-xl font-bold">সব পণ্য</h1>
        <p className="text-sm text-gray-500 mb-3">
          মোট {data.length} টি পণ্য দেখানো হচ্ছে
        </p>
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {
          data.map(product => <ProductCard key={product.id} product={product} />)
        }
        </div>
      </section>
      
    </div>
  );
}
