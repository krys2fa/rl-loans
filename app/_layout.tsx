import { AuthProvider } from "../context/AuthContext";
import RootLayout from "./RootLayout";

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
