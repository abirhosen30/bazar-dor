import Link from 'next/link';

interface navbarProps {
  id: number;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const rec = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const data = await rec.json();
  console.log(data);
  return (
    <div className='border-b-2 border-gray-100'>

    
    <div className='flex gap-4 py-5 container mx-auto'>
      {
        data.map((item: navbarProps) => <Link className="px-2 py-1 hover:bg-gray-200 rounded" key={item.id} href={`/categories/${item.id}`}>
          <div className='flex items-center justify-center gap-2'>
            <p>{item.icon}</p>
            <p className='text-[14px] font-semibold'>{item.nameBn}</p>
          </div>
        </Link>)
      }
    </div>
    </div>
  );
};

export default Navbar;