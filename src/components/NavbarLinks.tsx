"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

const NavbarLinks = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end py-1 md:hidden">
        <button
          type="button"
          aria-label={isMenuOpen ? "ক্যাটাগরি মেনু বন্ধ করুন" : "ক্যাটাগরি মেনু খুলুন"}
          aria-expanded={isMenuOpen}
          aria-controls="category-links"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="btn btn-ghost btn-sm"
        >
          {isMenuOpen ? (
            <RxCross2 aria-hidden="true" className="text-2xl" />
          ) : (
            <RxHamburgerMenu aria-hidden="true" className="text-2xl" />
          )}
        </button>
      </div>

      <nav
        id="category-links"
        aria-label="পণ্যের ক্যাটাগরি"
        className={`${isMenuOpen ? "flex" : "hidden"} flex-nowrap gap-1 overflow-x-auto py-2 md:flex md:gap-2 md:py-4`}
      >
        {categories.map((category) => {
          const href = `/category/${category.id}`;
          const isActive = pathname === href;

          return (
            <Link
              key={category.id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
              className={`shrink-0 whitespace-nowrap rounded px-2 py-1 transition-colors hover:bg-gray-100 md:py-2 ${
                isActive ? "bg-green-50 text-green-800" : "text-gray-700"
              }`}
            >
              <span className="flex items-center justify-center gap-1 md:gap-2">
                <span>{category.icon}</span>
                <span className="text-xs font-semibold md:text-sm">
                  {category.nameBn}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavbarLinks;
