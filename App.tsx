import "react-native-gesture-handler";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { Fredoka_500Medium, Fredoka_700Bold } from "@expo-google-fonts/fredoka";
import RootNavigator from "./src/navigation/RootNavigator";
import { store, persistor } from "./src/store";
import { ThemeProvider, useThemeMode } from "./src/theme/ThemeProvider";
import { I18nProvider } from "./src/i18n";

const AppShell = () => {
  const mode = useThemeMode();
  return (
    <>
      <RootNavigator />
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
    </>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Fredoka_500Medium,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <ThemeProvider>
              <I18nProvider>
                <AppShell />
              </I18nProvider>
            </ThemeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
