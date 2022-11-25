import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState<string>("light");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOnClickSwitch = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    const isLightMode = theme === "light";
    if (isLightMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isLightMode ? "dark" : "light");
  };

  const handleOnScroll = () => {
    const windowHeight = window.scrollY;
    setIsScrolled(windowHeight > 50);
  };

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      setTheme(localStorage?.getItem("theme") ?? "light");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleOnScroll);

      return () => {
        window.removeEventListener("scroll", handleOnScroll);
      };
    }
  }, []);

  return (
    <header
      className={`w-full sticky top-0 transition duration-200 ease-in-out ${
        isScrolled
          ? "shadow-md bg-white dark:bg-gray-900 dark:bg-opacity-50 dark:backdrop-blur dark:backdrop-filter dark:firefox:bg-opacity-90 dark:shadow-none"
          : ""
      }`}
    >
      <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-lg mx-auto px-6">
        <nav className="w-full flex justify-between items-center py-6">
          <span className="text-xl font-bold dark:text-white">NLA/~</span>
          <div className="flex space-x-4 items-center">
            <a
              className="text-md dark:text-white hover:font-bold"
              href="/blog"
            >
              Blog
            </a>
            <Switch
              checked={theme === "dark"}
              onChange={handleOnClickSwitch}
              className="bg-gray-200 dark:bg-gray-600 relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`"
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className="dark:translate-x-9 translate-x-0 pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out items-center"
              >
                {theme === "light" ? "🌞" : "🌛"}
              </span>
            </Switch>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
