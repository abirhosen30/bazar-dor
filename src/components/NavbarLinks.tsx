"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

const NavbarLinks = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="flex gap-2 overflow-x-auto py-4"
    >
      {categories.map((category) => {
        const href = `/category/${category.id}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`shrink-0 rounded px-2 py-1 transition-colors hover:bg-gray-100 ${
              isActive ? "bg-green-50 text-green-800" : "text-gray-700"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span>{category.icon}</span>
              <span className="text-[14px] font-semibold">
                {category.nameBn}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavbarLinks;
