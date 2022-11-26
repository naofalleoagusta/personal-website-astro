import create from "zustand";
import { persist, devtools } from "zustand/middleware";

type ThemeType = {
  theme: string;
  handleSetTheme: () => void;
};

const useTheme = create<ThemeType>()(
  devtools(
    persist((set) => ({
      theme: localStorage?.getItem("theme") || "light",
      handleSetTheme: () => {
        set((prev) => ({
          theme: prev.theme === "light" ? "dark" : "light",
        }));
      },
    }))
  )
);

export default useTheme;
