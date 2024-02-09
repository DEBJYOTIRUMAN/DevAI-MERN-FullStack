import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        mixedContentMode="compatibility"
        source={{ uri: "https://devai-ruman.vercel.app" }}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
