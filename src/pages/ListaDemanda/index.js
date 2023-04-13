import { useContext, useEffect, useState } from "react";
import Axios from "../../Api";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function ListaDeDemanda() {
  const [listaDemanda, setListaDemanda] = useState([]);
  const { idDemanda, setIdDemanda, dadosNf, setDadosNf } =
    useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);
    Axios.get("/listardemandas")
      .then((response) => {
        setListaDemanda(response.data);
        setOpen(false);
      })
      .catch((erro) => {
        console.log(erro);
        setOpen(false);
      });
  }, []);

  async function abrirDados(item) {
    setOpen(true);
    Axios.get(`infoviagem/${item}`)
      .then((response) => {
        setDadosNf(response.data);
        setOpen(false);
        navigate("/infonf");
      })
      .catch((erro) => {
        console.log(erro);
        setOpen(false);
      });
  }

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {listaDemanda?.map((item) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.5%",
            cursor: "pointer",
          }}
          onClick={() => abrirDados(item.id_viagem)}
        >
          <div>{item.id}</div>
          <div>{item.placa}</div>
          <div>{item.transportadora}</div>
          <div>{item.status}</div>
          <div>{item.data}</div>
        </div>
      ))}
    </div>
  );
}
