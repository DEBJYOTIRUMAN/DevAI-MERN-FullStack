import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        mixedContentMode="compatibility"
        source={{ uri: "http://devai.cu.ma" }}
      />
    </SafeAreaView>
  );
}
