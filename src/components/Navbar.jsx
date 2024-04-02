import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import MenuComponet from "./Menu";
import { selectDarkMode } from "../redux/features/themeslice";
import { useSelector } from "react-redux";

export function NavbarComponent() {
  const [newTheme, setNewTheme] = useState(false);
  const darkMode = useSelector(selectDarkMode);

  return (
    <nav className="bg-white dark:bg-gray-800 dark:text-gray-300 flex items-center justify-between max-h-2/6  mx-auto px-5 py-3 md:px-9 md:py-6 fixed -top-1 md:top-0 left-0 right-0 z-50">
      <MenuComponet />
    </nav>
  );
}
