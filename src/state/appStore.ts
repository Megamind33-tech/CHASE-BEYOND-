import { create } from "zustand";
import { setRegistry } from "../studio/sets/setRegistry";
import { sourceRegistry } from "../studio/sources/sourceRegistry";

type AppScreen = "home" | "studio";

type AppStore = {
  currentScreen: AppScreen;
  activeSetId: string;
  activeSourceId: string;
  goToHome: () => void;
  startStudio: () => void;
  setActiveSourceId: (sourceId: string) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  currentScreen: "home",
  activeSetId: setRegistry[0]?.id ?? "starter-studio",
  activeSourceId: sourceRegistry.find((source) => source.id === "sample-video")?.id ?? "none",
  goToHome: () => set({ currentScreen: "home" }),
  startStudio: () => set({ currentScreen: "studio" }),
  setActiveSourceId: (sourceId) => set({ activeSourceId: sourceId })
}));
