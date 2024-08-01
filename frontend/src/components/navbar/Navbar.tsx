import { useState, useEffect } from 'react';
import { HiHome } from "react-icons/hi2";
import { FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { Button } from "@mui/material";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const navItems = [
    { icon: <HiHome size={28} />, label: 'Home' },
    { icon: <FaSearch size={28} />, label: 'Search' },
    { icon: <FaHeart size={28} />, label: 'Likes' },
    { icon: <FaUser size={28} />, label: 'Profile' },
  ];

  return (
    <div className={`bg-[#000000] ${isMobile ? 'fixed bottom-0 left-0 right-0' : 'fixed top-0 left-0 right-0 '}`}>
      <div className={`navbar flex items-center ${isMobile ? 'justify-around' : 'justify-between px-6'}`}>
        {!isMobile && <div className="logo text-white text-xl font-bold">ThreadWork</div>}
        <ul className={`flex ${isMobile ? 'justify-around w-full py-2' : 'gap-20 my-5'}`}>
          {navItems.map((item, index) => (
            <li key={index} className={`cursor-pointer ${index === 0 ? 'text-sky-400' : 'text-white'}`}>
              {item.icon}
              {isMobile && <div className="text-xs mt-1">{item.label}</div>}
            </li>
          ))}
        </ul>
        {!isMobile && (
          <Button style={{ backgroundColor: "white", color: 'black' }} variant="contained">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;