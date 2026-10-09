import logo from "@/assests/logo-icon.png";
import Image from "next/image";
const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  console.log(date);
  return (
    <div>
      <div className="border-b-2 border-gray-100">
        <div className="flex justify-between container mx-auto items-center px-4 py-2">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Logo"
              width={30}
              height={30}
              className="bg-green-700 rounded-[10px]"
            />
            <div>
              <h1 className="text-[18px] font-bold">বাজার দর</h1>
              <p className="text-[12px] text-gray-600">{date}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn">সাইন ইন</button>
            <button className="btn bg-green-500 text-white">সাইন আপ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
