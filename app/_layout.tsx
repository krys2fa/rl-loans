import { AuthProvider } from "../context/AuthContext";
import RootLayout from "./RootLayout";
import { Provider } from "react-redux";
import { store } from "../store";

export default function Layout() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RootLayout />
      </Provider>
    </AuthProvider>
  );
}
