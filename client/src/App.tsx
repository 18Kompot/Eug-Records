import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { createContext, useState } from "react";
import { postRequest } from "./services/api";
import { setToken } from "./services/storage";
import { ToastContainer } from "react-toastify";
import Resetpass from "./auth/Resetpass";

interface ILoginData {
  email: string;
  password: string;
}

interface Context {
  userId: string;
  userName: string;
  handleLogout: Function;
  login: Function;
}

export const AppContext = createContext<Context | null>(null);

function App() {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    setUserId("");
    setUserName("");
    navigate("/login");
  }

  function login(data: ILoginData) {
    const res = postRequest("users/login", data, false);
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json) => {
        setToken(json.token);
        setUserId(json.id);
        setUserName(json.name);
        navigate("/collection");
      });
  }

  return (
    <>
      <AppContext.Provider value={{ userId, userName, handleLogout, login }}>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login handler={login} />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/password-reset" element={<Resetpass />} />
        </Routes>
        <div className="d-flex flex-column min-vh-100">
          <Footer />
        </div>
      </AppContext.Provider>
    </>
  );
}
export default App;
