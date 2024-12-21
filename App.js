import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import { FONTS } from './constants/fonts'
import AppNavigation from './navigations/AppNavigation'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import { CartProvider } from './context/CartContext';

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts(FONTS)

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Provider store={store}>
        <CartProvider>
          <AppNavigation />
        </CartProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
