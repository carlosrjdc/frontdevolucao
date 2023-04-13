import { useNavigate } from "react-router-dom";

export default function Principal() {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "4%", fontWeight: "bold" }}>
        DEVOLUÇÃO / REENTREGA
      </div>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "space-between",
          padding: "5%",
        }}
      >
        <div
          style={{
            padding: "15%",
            background: "#b0d0eb",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          onClick={() => navigate("/cadastrodemanda")}
        >
          CADASTRAR DEMANDA
        </div>
        <div
          style={{
            padding: "15%",
            background: "#b0d0eb",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          onClick={() => navigate("/divergenciaimprimir")}
        >
          IMPRIMIR DEMANDA
        </div>
      </div>
    </div>
  );
}
