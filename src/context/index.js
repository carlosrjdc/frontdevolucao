import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function InfoProvider({ children }) {
  const [idDemanda, setIdDemanda] = useState("");
  const [dadosNf, setDadosNf] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ idDemanda, setIdDemanda, dadosNf, setDadosNf }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
