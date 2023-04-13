import React from "react";
import { QRCodeSVG } from "qrcode.react";
import moment from "moment-timezone";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { id, placa, idviagem, transportadora } = props;
  return (
    <div
      style={{
        width: "302px",
        fontWeight: "bold",
        padding: "2%",
        textAlign: "center",
      }}
      ref={ref}
    >
      <br></br>
      <div style={{ textAlign: "center", marginBottom: "2%" }}>
        <div>ID: {id}</div>
        <div>PLACA: {placa}</div>
        <div>VIAGEM ID: {idviagem}</div>
        <div>TRANSPORTADORA: {transportadora}</div>
        <br></br>
        <QRCodeSVG value={String(id)} />
        <br></br>
        <br></br>
        <div>
          GERADO EM <br></br>{" "}
          {moment(new Date()).format("DD/MM/YYYY - HH:mm:ss")}
        </div>
        <br></br>
        <br></br>
        <div>---Lactalis---</div>
      </div>
    </div>
  );
});
