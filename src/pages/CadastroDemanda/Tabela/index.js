import * as React from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TabelaProdutos(props) {
  const { dadosItens } = props;

  const [textoFiltrar, setTextoFiltrar] = React.useState("");

  function descdevolucao(num) {
    if (parseInt(num) === 1) {
      return "Devolução Total";
    } else if (parseInt(num) === 2) {
      return "Devolução Parcial";
    } else if (parseInt(num) === 3) {
      return "Reentrega";
    }
  }

  const filtrado =
    textoFiltrar?.length > 0
      ? dadosItens.filter((filtrar) =>
          filtrar?.nota_fiscal?.includes(textoFiltrar)
        )
      : dadosItens.filter((filtrar) => filtrar.nota_fiscal !== null);
  return (
    <div>
      {" "}
      <TextField
        onChange={(e) => setTextoFiltrar(e.target.value)}
        value={textoFiltrar}
        id="standard-basic"
        label="Nota"
        variant="standard"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "11px" }} align="center">
                Nota Fiscal
              </TableCell>
              <TableCell sx={{ fontSize: "11px" }} align="center">
                Motivo
              </TableCell>
              <TableCell sx={{ fontSize: "11px" }} align="center">
                Quantidade
              </TableCell>
              <TableCell sx={{ fontSize: "11px" }} align="center">
                Produto
              </TableCell>
              <TableCell sx={{ fontSize: "11px" }} align="center">
                Descrição
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrado.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontSize: "11px" }} align="center">
                  {row.nota_fiscal}
                </TableCell>
                <TableCell sx={{ fontSize: "11px" }} align="center">
                  {descdevolucao(row.motivo)}
                </TableCell>
                <TableCell sx={{ fontSize: "11px" }} align="center">
                  {row.quantidade}
                </TableCell>
                <TableCell sx={{ fontSize: "11px" }} align="center">
                  {row.produto}
                </TableCell>
                <TableCell sx={{ fontSize: "11px" }} align="center">
                  {row.materiais?.descricao}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
