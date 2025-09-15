import { useLocation } from "react-router";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const NavBar = ({ children}: Props) => {
  const location = useLocation();

  
  useEffect(() => {
    const hash = location.hash;
    const element = document.getElementById(hash.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <>
      <nav className="bg-gray-900 text-white ">
        {children}
      </nav>
    </>
  );
};
