import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import { UserStorage } from "../utils/userLocalStorageUtils";

export default function Home() {
  const user = UserStorage.getUser();
  if (user == null) {
    return <LoginPage/>
  }
  return <HomePage></HomePage>
}
