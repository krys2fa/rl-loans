import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const handleLogout = async () => {
  await signOut(auth);
};
