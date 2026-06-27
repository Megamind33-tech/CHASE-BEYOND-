import { useAppStore } from "../state/appStore";
import { HomeScreen } from "../ui/screens/HomeScreen";
import { StudioScreen } from "../ui/screens/StudioScreen";
import "./styles.css";

export function App() {
  const currentScreen = useAppStore((state) => state.currentScreen);

  return currentScreen === "home" ? <HomeScreen /> : <StudioScreen />;
}
