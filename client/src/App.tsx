import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { createContext, useEffect, useState } from "react";
import { getRequest, postRequest } from "./services/api";
import {
  getStoredUsername,
  setStoredUsername,
  setToken,
  verifyToken,
} from "./services/storage";
import { ToastContainer, toast } from "react-toastify";
import Resetpass from "./auth/Resetpass";
import Newpass from "./auth/Newpass";
import Recordinfo from "./pages/Recordinfo";
import "./App.css";
import { TRecord } from "./pages/types";
import Cart from "./pages/Cart";
import RouteGuard from "./auth/RouteGuard";
import Equipment from "./pages/Equipment";
import Wrapper from "./components/Wrapper";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

interface ILoginData {
  email: string;
  password: string;
}

interface Context {
  userId: string;
  userName: string;
  handleLogout: Function;
  login: Function;
  isAdmin: boolean;
  cartRecords: TRecord[];
  handleAddRecord: (record: TRecord) => void;
  handleRemoveRecord: (record: TRecord) => void;
}

export const AppContext = createContext<Context | null>(null);

function App() {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [cartRecords, setCartRecords] = useState<TRecord[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/newpassword")) {
      return;
    }

    const isValidToken = verifyToken();
    if (!isValidToken) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    const res = getRequest(`users/fetch/${getStoredUsername()}`);
    if (!res) {
      // The user's data could not be retrieved. Demand them to log in again?
      localStorage.clear();
      navigate("/login");
      return;
    }

    res
      .then((response) => {
        if (!response.ok) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        return response.json();
      })
      .then((json) => {
        if (!json) {
          return;
        }

        setUserId(json.id);
        setIsAdmin(json.isAdmin);
        setUserName(json.name);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout() {
    localStorage.clear();
    setUserId("");
    setUserName("");
    setIsAdmin(false);
    toast.error(`You successfully logged out`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    navigate("/home");
  }

  function login(data: ILoginData) {
    const res = postRequest("users/login", data, false);
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json) => {
        setToken(json.token);
        setStoredUsername(json.name);
        setIsAdmin(json.isAdmin);
        setUserId(json.id);
        setUserName(json.name);
        navigate("/home");

        toast.success(`Welcome back ${json.name}!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  }

  function addCartRecord(record: TRecord) {
    if (cartRecords.find((r) => r.id === record.id)) {
      toast.error(
        `${record.basic_information.artists[0].name} - ${record.basic_information.title} is already in cart`,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }
    toast.success(
      `${record.basic_information.artists[0].name} - ${record.basic_information.title} added to cart`,
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      }
    );
    setCartRecords([...cartRecords, record]);
  }

  function removeCartRecord(record: TRecord) {
    let remainingRecords = cartRecords.filter((r) => r.id !== record.id);
    toast.error(
      `${record.basic_information.artists[0].name} - ${record.basic_information.title}  removed from cart`,
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      }
    );
    setCartRecords(remainingRecords);
  }

  return (
    <div className="d-flex flex-column body min-vh-100">
      <AppContext.Provider
        value={{
          userId,
          userName,
          handleLogout,
          login,
          isAdmin,
          cartRecords,
          handleAddRecord: addCartRecord,
          handleRemoveRecord: removeCartRecord,
        }}
      >
        <ToastContainer />
        <Header />
        <Wrapper>
          <Routes>
            <Route
              path="/collection"
              element={
                <RouteGuard>
                  <Collection />
                </RouteGuard>
              }
            />
            <Route
              path="/info/:id"
              element={
                <RouteGuard>
                  <Recordinfo />
                </RouteGuard>
              }
            />
            <Route
              path="/cart"
              element={
                <RouteGuard>
                  <Cart />
                </RouteGuard>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login handler={login} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/password-reset" element={<Resetpass />} />
            <Route path="/newpassword/:id/:token" element={<Newpass />} />
          </Routes>
        </Wrapper>
        <footer className="d-flex flex-column mt-auto">
          <Footer />
        </footer>
      </AppContext.Provider>
    </div>
  );
}
export default App;
