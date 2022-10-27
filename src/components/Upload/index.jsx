import "./style.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const Upload = () => {
  const [csv, setCsv] = useState("");
  const [arch, setArch] = useState("");

  const handleChange = (event) => {
    setCsv({ value: event.target.value });
    setArch(event.target.files[0]);
  };

  const uploadFunction = (item) => {
    item === "" && toast.warn("Nenhum arquivo adicionado");
    item.type !== "text/csv" && item !== "" && toast.error("Arquivo inválido");

    axios
      .post("http://localhost:3001/products", item)
      .then((res) => res)
      .catch((err) => err);
  };

  return (
    <>
      <form className="containerUpload">
        <h2 className="uploadTitle">Upload do Arquivo</h2>
        <p className="legendaUpload">Estoque Principal</p>
        <div>
          <label className="up" htmlFor="selecao-arquivo">
            {csv ? (
              <>
                <span className="nameArch">{arch.name}</span>
                <AssignmentIcon sx={{ fontSize: 50, marginTop: 2 }} />
              </>
            ) : (
              <>
                Clique para fazer upload do arquivo
                <CloudUploadIcon sx={{ fontSize: 50, marginTop: 2 }} />
              </>
            )}
          </label>
          <input
            id="selecao-arquivo"
            type="file"
            accept=".csv"
            onChange={(event) => handleChange(event)}
          />
          <div className="containerButtons">
            <Button
              variant="text"
              sx={{ color: "#b8b7b7", fontWeight: 400 }}
              onClick={() => {
                window.location.reload(true);
                setCsv("");
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#e02550", fontWeight: 400 }}
              onClick={() => {
                uploadFunction(arch);
              }}
            >
              Enviar arquivos
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
