import { useState, useRef } from "react";
import moment from "moment-timezone";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../ComponentPrint/ComponentToPrint.js";
import Checkbox from "@mui/material/Checkbox";
import { HiSearchCircle } from "react-icons/hi";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Axios from "../../Api";

export default function CadastroDemanda() {
  const [numeroPesquisa, setNumeroPesquisa] = useState("");
  const [dataInicial, setDataInicial] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [dataFinal, setDataFinal] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [dadosBusarDados, setdadosBuscarDados] = useState([]);
  const [placa, setPlaca] = useState("");
  const [tratrErro, setTratarErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [cadastrarDemanda, setCadastrarDemanda] = useState([]);
  const [listaDemandaCadastradas, setListaDemandasCadastradas] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function BuscarDados() {
    setIsLoading(true);
    setTratarErro("");
    Axios.get(`/buscarinfocarro/${dataInicial}/${dataFinal}/${numeroPesquisa}`)
      .then((response) => {
        setdadosBuscarDados(
          response.data
            .sort((a, b) => {
              if (a.notaFiscal > b.notaFiscal) {
                return 1;
              }
              if (a.notaFiscal < b.notaFiscal) {
                return -1;
              }
              return 0;
            })
            .sort((a, b) => {
              if (a.status > b.status) {
                return 1;
              }
              if (a.status < b.status) {
                return -1;
              }
              return 0;
            })
        );
        setPlaca(response?.data[0]?.placa);
        console.log(response.data);
        Axios.get(`/buscardemandaporviagem/${response.data[0]?.viagemId}`).then(
          (retorno) => {
            setListaDemandasCadastradas(retorno.data);
          }
        );
        setIsLoading(false);
      })
      .catch((erro) => {
        setTratarErro(
          "Não foi possivel localizar sua solicitação, verifique se digitou o número corretamente ou altere a data para buscar em outro periodo"
        );
        setIsLoading(false);
        setdadosBuscarDados([]);
        setPlaca("");
      });
  }

  async function ArrDemanda(item, status) {
    if (status) {
      setCadastrarDemanda((prevList) => [
        ...prevList,
        {
          nota_fiscal: item.notaFiscal,
          status_nf: item.status,
          transporte: item.identificador,
        },
      ]);
    } else {
      setCadastrarDemanda(
        cadastrarDemanda.filter(
          (filtrar) => filtrar.nota_fiscal !== item.notaFiscal
        )
      );
    }
  }

  async function CadastrarNovaDemanda() {
    setIsLoading(true);
    Axios.post(`/cadastrardemandaemmassa/${dadosBusarDados[0]?.viagemId}`, {
      placa: placa,
      transporte: dadosBusarDados[0]?.identificador,
      transportadora: dadosBusarDados[0]?.transportadora,
      dados: cadastrarDemanda,
    })
      .then(async (response) => {
        await BuscarDados();
        setCadastrarDemanda([]);
      })
      .catch((erro) => {
        console.log(erro);
        setIsLoading(false);
        setCadastrarDemanda([]);
      });
  }

  console.log(cadastrarDemanda);
  return (
    <div>
      <div style={{ padding: "1%", background: "#e9f0f2" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              onChange={(e) => setNumeroPesquisa(e.target.value)}
              fullWidth
              id="standard-basic"
              label="Buscar"
              variant="standard"
            />
            {numeroPesquisa.length > 2 ? (
              <HiSearchCircle
                disable={true}
                onClick={BuscarDados}
                style={{ cursor: "pointer" }}
                size={30}
              />
            ) : null}
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              style={{ marginRight: "10%" }}
              onChange={(e) => setDataInicial(e.target.value)}
              value={dataInicial}
              id="standard-basic"
              label="Data Inicial"
              variant="standard"
            />
            <TextField
              onChange={(e) => setDataFinal(e.target.value)}
              value={dataFinal}
              id="standard-basic"
              label="Data Final"
              variant="standard"
            />
          </div>
        </div>
      </div>
      <div style={{ padding: "1%", display: "flex" }}>
        <div style={{ width: "40%" }}>
          <div
            style={{ padding: "0.5%", fontWeight: "bold", fontSize: "24px" }}
          >
            INFORMAÇÕES
          </div>
          <div style={{}}>
            <div style={{ padding: "0.5%", fontSize: "18px" }}>
              <div>ID Viagem: {dadosBusarDados[0]?.viagemId} </div>
              <div>Placa: {dadosBusarDados[0]?.placa} </div>
              <div>Transportadora: {dadosBusarDados[0]?.transportadora} </div>
              <br></br>
              <div style={{ color: "red" }}>{tratrErro}</div>
            </div>
            <div
              style={{
                padding: "0.2%",
                fontSize: "14px",
                fontWeight: "500",
                width: "80%",
              }}
            >
              {dadosBusarDados.map((item) => {
                return (
                  <div
                    style={{
                      justifyContent: "space-between",
                      margin: "1%",
                      background:
                        item.status === "Entregue" ? "#e9f0f2" : "#f9a0a0c2",
                      padding: "2%",
                      borderRadius: "4px",
                    }}
                    key={item.notaFiscal}
                  >
                    <div style={{ marginBottom: "1%" }}>
                      <div>
                        {" "}
                        <Checkbox
                          disabled={item.status === "Entregue"}
                          size="small"
                          onChange={(e) => ArrDemanda(item, e.target.checked)}
                        />
                        Nota Fiscal: {item.notaFiscal}
                      </div>
                    </div>
                    <div style={{ marginTop: "1%" }}>
                      <div>Status Ravex: {item.status}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            border: "1px solid black",
            width: "100%",
            padding: "1%",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "1%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              onChange={(e) => setPlaca(e.target.value)}
              value={placa}
              id="standard-basic"
              label="Placa"
              variant="standard"
            />
            <div style={{ display: "flex", width: "28%" }}>
              <div style={{ margin: "0.5%" }}>
                <Button
                  disabled={listaDemandaCadastradas[0]?.id}
                  variant="contained"
                  size="small"
                  onClick={CadastrarNovaDemanda}
                >
                  Gerar Demanda
                </Button>
              </div>
              <div style={{ margin: "0.5%" }}>
                <Button
                  disabled={cadastrarDemanda.length < 1}
                  variant="contained"
                  size="small"
                >
                  Adicionar Nota
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#e9f0f2",
              padding: "0.4%",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            <div>Demanda: {listaDemandaCadastradas[0]?.id}</div>
            <div>Data: {listaDemandaCadastradas[0]?.data}</div>
            <div>Placa: {listaDemandaCadastradas[0]?.placa}</div>
            <div>
              Transportadora: {listaDemandaCadastradas[0]?.transportadora}
            </div>
            <div>Id Viagem: {listaDemandaCadastradas[0]?.id_viagem}</div>
            <div>Status: {listaDemandaCadastradas[0]?.status}</div>
          </div>
          <br></br>
          <br></br>
          <div>
            <button onClick={handlePrint}>Imprimir!</button>
            <ComponentToPrint
              id={listaDemandaCadastradas[0]?.id}
              placa={listaDemandaCadastradas[0]?.placa}
              idviagem={listaDemandaCadastradas[0]?.id_viagem}
              transportadora={listaDemandaCadastradas[0]?.transportadora}
              ref={componentRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
