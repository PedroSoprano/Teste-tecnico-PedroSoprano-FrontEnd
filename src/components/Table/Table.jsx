import { DataGrid } from "@mui/x-data-grid";
import "./style.css";
import { useContext, useEffect } from "react";
import { PolicyContext } from "../../Providers/policyProvider";
import axios from "axios";

export const TableReport = () => {
  const rows = [];
  const columns = [
    { field: "Date", headerName: "Date", type: "date", width: 200 },
    { field: "Open", headerName: "Open", width: 180 },
    { field: "High", headerName: "High", width: 180 },
    {
      field: "Low",
      headerName: "Low",
      width: 180,
    },
    {
      field: "Close",
      headerName: "Close",
      width: 180,
    },
    {
      field: "Volume",
      //   type: "number",
      headerName: "Volume",
      width: 180,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 180,
    },
  ];

  const { policy, products, setPolicy } = useContext(PolicyContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/policy")
      .then((res) => setPolicy(res.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line array-callback-return
  products.map((item) => {
    let status = "";
    if (item.Volume >= policy.great) {
      status = "Ótimo";
    }
    if (item.Volume <= policy.critic) {
      status = "Crítico";
    }
    if (item.Volume > policy.critic && item.Volume < policy.great) {
      status = "Bom";
    }

    const newItem = {
      id: item.id,
      Date: item.Date,
      Open: item.Open,
      High: item.High,
      Low: item.Low,
      Close: item.Close,
      Volume: item.Volume,
      Status: status,
    };
    rows.push(newItem);
  });

  return (
    <>
      <h2 className="reportTitle">Relatórios</h2>
      <div className="resume">
        <span>Resumo</span>
      </div>
      <div
        style={{
          height: 400,
          maxWidth: "90%",
          marginTop: 40,
          marginLeft: 40,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[7]}
          checkboxSelection
          sx={{ bgcolor: "#fff" }}
        />
      </div>
    </>
  );
};
