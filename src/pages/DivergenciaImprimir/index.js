import { useRef, useState } from "react";
import { ImSearch } from "react-icons/im";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useReactToPrint } from "react-to-print";
import Axios from "../../Api";
import { TabelaDivergencia } from "./Tabela.js";

export default function DivergenciaImprimir() {
  const [listaDivergencia, setListaDivergencia] = useState([]);
  const [infoDemanda, setInfoDemanda] = useState([]);
  const [listaNfs, setListaNfs] = useState([]);
  const [numDemanda, setNumDemanda] = useState("");
  const [open, setOpen] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function buscarAnomalias() {
    setOpen(true);
    await Axios.get(`/conferencia/resultadoconferencia/${numDemanda}`)
      .then((response) => {
        setListaDivergencia(response.data);
        Axios.get(`/app/buscardemanda/${numDemanda}`)
          .then((resposta) => {
            setInfoDemanda(resposta.data);
            Axios.get(`/listarnotaspordemanda/${numDemanda}`).then((ver) => {
              setListaNfs(ver.data);
              setOpen(false);
            });
          })
          .catch((erro) => console.log(erro))
          .catch((erro) => console.log(erro));
      })
      .catch((erro) => console.log(erro));
  }

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "1%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginTop: "0.5%",
            padding: "0.5%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "4%" }}>
            <TextField
              fullWidth
              type="number"
              id="outlined-basic"
              label="DEMANDA"
              variant="outlined"
              value={numDemanda}
              onChange={(e) => setNumDemanda(e.target.value)}
            />
          </div>
          <ImSearch onClick={buscarAnomalias} size={30} />
        </div>
        <div>
          <Button onClick={handlePrint} variant="contained" size="small">
            IMPRIMIR
          </Button>
        </div>
      </div>

      <TabelaDivergencia
        ref={componentRef}
        notas={listaNfs}
        info={infoDemanda}
        divergencia={listaDivergencia}
      />
    </div>
  );
}
