import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "../../context";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Axios from "../../Api";

export default function InfoNf() {
  const { idDemanda, setIdDemanda, dadosNf, setDadosNf } =
    useContext(GlobalContext);

  const [nota, setNota] = useState("");
  const [loading, setLoading] = useState(false);

  //cadastrardemanda/:data/:nf

  async function atualizarDados() {
    setLoading(true);
    await Axios.get(`infoviagem/${nota}`)
      .then((response) => {
        if (response.data !== "não localizado") {
          setDadosNf(response.data);
          setLoading(false);
        } else {
          setDadosNf([{ viagemId: "Não Localizado" }]);
          setLoading(false);
        }
      })
      .catch((erro) => console.log(erro));
  }

  async function cadastrarDemanda() {
    await Axios.post(`/cadastrardemanda/2023-04-06/${nota}`)
      .then((response) => {
        if (response.data !== "não localizado") {
          setDadosNf(response.data);
        } else {
          setDadosNf([{ viagemId: "Já foi gerada demanda para essa viagem!" }]);
        }
      })
      .catch((erro) => console.log(erro));
  }
  return (
    <div style={{ padding: "1%" }}>
      <div>Informações</div>
      <div style={{ padding: "1%" }}>
        <TextField
          onChange={(e) => setNota(e.target.value)}
          id="standard-basic"
          label="Nota"
          variant="standard"
        />
        <Button
          disabled={nota.length < 1}
          onClick={atualizarDados}
          variant="contained"
          size="small"
        >
          Atualizar
        </Button>
        <Button onClick={cadastrarDemanda} variant="contained" size="small">
          Cadastrar Demanda
        </Button>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{
          margin: "0.5%",
        }}
      >
        {dadosNf.map((item) => (
          <div style={{ padding: "0.5%", margin: "0.5%" }}>
            <div>Unidade: {item.unidade}</div>
            <div>Status: {item.status}</div>
            <div>Nota Fiscal: {item.notaFiscal}</div>
            <div>Transportadora: {item.transportadora}</div>
            <div>Placa: {item.transportadora}</div>
            <div>Transporte: {item.placa}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
