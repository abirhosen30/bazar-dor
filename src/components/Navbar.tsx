import NavbarLinks from './NavbarLinks';
import { BAZARDOR_API_BASE_URL } from "@/lib/bazardor-api";

interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const rec = await fetch(`${BAZARDOR_API_BASE_URL}/categories`);
  if (!rec.ok) {
    throw new Error(`Failed to fetch categories (${rec.status})`);
  }
  const data: Category[] = await rec.json();

  return (
    <div className='border-b-2 border-gray-100'>
      <div className="mx-auto max-w-6xl px-4">
        <NavbarLinks categories={data} />
      </div>
    </div>
  );
};

export default Navbar;