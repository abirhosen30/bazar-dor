import React from 'react';
import ProductCard from './ProductCard';

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

const DecreaseProductsPrice = ({ products }: { products: ProductProps[] }) => {
  return (
    <div className="mt-6">
      <h1 className="mb-3 flex items-center gap-2 text-[20px] font-bold text-gray-800">
        <span className="text-green-600 text-[12px]">▼</span>আজ দাম কমেছে
      </h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DecreaseProductsPrice;