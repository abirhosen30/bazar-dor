import Banner from "@/components/Banner";
import DecreaseProductsPrice from "@/components/DecreaseProductsPrice";
import IncreaseProductsPrice from "@/components/IncreaseProductsPrice";
import ProductCard from "@/components/ProductCard";

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
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data: ProductProps[] = await res.json();
  
  const increasedProducts = data.filter(product => product.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);

  const decreasedProducts = data.filter(product => product.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);


  console.log(increasedProducts);
  
  return (
    <div className="container mx-auto px-4">
      <Banner/>

      <IncreaseProductsPrice products={increasedProducts} />
      <DecreaseProductsPrice products={decreasedProducts} />

      <div className="mt-6">
        <h1 className="text-xl font-bold">সব পণ্য</h1>
        <p className="text-sm text-gray-500 mb-3">
          মোট {data.length} টি পণ্য দেখানো হচ্ছে
        </p>
        
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 mb-6">
          {
          data.map(product => <ProductCard key={product.id} product={product} />)
        }
        </div>
      </div>
      
    </div>
  );
}
