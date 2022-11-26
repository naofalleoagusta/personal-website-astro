import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import useTheme from "../../helpers/useTheme";

const Navbar = () => {
  const { theme, handleSetTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleOnClickSwitch = () => {
    handleSetTheme();
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
    const windowInnerHeight = window.innerHeight;
    const body = document.body,
      html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    setIsScrolled(windowHeight > 50);
    setScrollProgress(
      Math.floor((windowHeight / (height - windowInnerHeight)) * 100)
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleOnScroll);

      return () => {
        window.removeEventListener("scroll", handleOnScroll);
      };
    }
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`w-full fixed top-0 transition duration-200 ease-in-out z-50 ${
          isScrolled
            ? "shadow-md bg-white dark:bg-gray-900 dark:bg-opacity-50 dark:backdrop-blur dark:backdrop-filter dark:firefox:bg-opacity-90 dark:shadow-none"
            : ""
        }`}
      >
        <div
          className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 h-[6px]"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
        <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-lg mx-auto px-6">
          <nav className="w-full flex justify-between items-center py-6">
            <a href="/" className="text-xl font-bold dark:text-white">
              NLA/~
            </a>
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
      <button
        onClick={scrollTop}
        className={`${
          isScrolled ? "opacity-100" : "opacity-0"
        } fixed bottom-6 right-6 p-2 w-[40px] h-[40px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-lg transition-[opacity] duration-100 ease-linear z-50`}
      >
        <img
          src="/top.svg"
          width={24}
          height={24}
          className="w-[24px] h-[24px]"
          alt="scroll top icon"
        />
      </button>
    </>
  );
};

export default Navbar;
