import "./App.css";
import Header from "./components/Header/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
    </>
  );
}

export default App;
