import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const PolicyContext = createContext({});

export const PolicyProvider = ({ children }) => {
  const [policy, setPolicy] = useState({});
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/policy")
      .then((res) => setPolicy(res.data))
      .catch((err) => toast.error("Ocorreu um erro"));
  }, [change]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data))
      .catch((err) => toast.error("Erro ao carregar as informações"));
  }, []);

  return (
    <PolicyContext.Provider value={{ policy, setPolicy, products, setChange }}>
      {children}
    </PolicyContext.Provider>
  );
};
