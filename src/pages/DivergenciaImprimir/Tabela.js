import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment-timezone";

export const TabelaDivergencia = React.forwardRef((props, ref) => {
  const { divergencia, info, notas } = props;
  const tamanhofonte = 11;

  return (
    <div ref={ref}>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1.5%",
          fontSize: "20px",
        }}
      >
        RELATORIO DE DIVERGENCIAS
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "2%",
          margin: "0.5%",
          borderRadius: "4px",
          paddingLeft: "2%",
          fontSize: "12px",
          border: "1px solid black",
          paddingBottom: "1%",
          paddingTop: "1%",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "500px",
            }}
          >
            <div>
              <div>Placa: {info.placa}</div>
              <div>Transportadora: {info.transportadora}</div>
              <div>Transporte: {info.transporte}</div>
              <div>ID_Viagem: {info.id_viagem}</div>
            </div>
            <div>
              <div>Status: {info.status}</div>
              <div>
                Inicio Conferencia:{" "}
                {moment(info.inicioConferencia).format("DD/MM/YYYY - hh:mm:ss")}
              </div>
              <div>
                Termino Conferencia:{" "}
                {moment(info.fimConferencia).format("DD/MM/YYYY - hh:mm:ss")}
              </div>
            </div>
          </div>
        </div>
        <div>
          {notas.map((nota) => (
            <div style={{ display: "flex" }}>
              <div>{nota.nota_fiscal} - </div>
              <div> {nota.status_nf}</div>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ background: "#787676" }}>
              <TableCell
                sx={{ fontSize: tamanhofonte, fontWeight: "bold" }}
                align="center"
              >
                PRODUTO
              </TableCell>
              <TableCell
                sx={{ fontSize: tamanhofonte, fontWeight: "bold" }}
                align="center"
              >
                DESCRIÇÃO
              </TableCell>
              <TableCell
                sx={{ fontSize: tamanhofonte, fontWeight: "bold" }}
                align="center"
              >
                CONTABIL
              </TableCell>
              <TableCell
                sx={{ fontSize: tamanhofonte, fontWeight: "bold" }}
                align="center"
              >
                FISICO
              </TableCell>
              <TableCell
                sx={{ fontSize: tamanhofonte, fontWeight: "bold" }}
                align="center"
              >
                DIFERENÇA
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {divergencia.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontSize: tamanhofonte }} align="center">
                  {row.produto}
                </TableCell>
                <TableCell sx={{ fontSize: tamanhofonte }} align="center">
                  {row.descricao}
                </TableCell>
                <TableCell sx={{ fontSize: tamanhofonte }} align="center">
                  {row.contabil}
                </TableCell>
                <TableCell sx={{ fontSize: tamanhofonte }} align="center">
                  {row.fisico}
                </TableCell>
                <TableCell sx={{ fontSize: tamanhofonte }} align="center">
                  {row.diferenca}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <br></br>
      <br></br>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "3%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div>_____________________________________________________</div>
          <div style={{ fontSize: "12px" }}>Assinatura Motorista</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div>_____________________________________________________</div>
          <div style={{ fontSize: "12px" }}>Assinatura Lactalis</div>
        </div>
      </div>
    </div>
  );
});
