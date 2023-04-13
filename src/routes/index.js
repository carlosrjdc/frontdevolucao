import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ListaDeDemanda from "../pages/ListaDemanda";
import InfoNf from "../pages/InfoNf";
import CadastroDemanda from "../pages/CadastroDemanda";
import ImprimirPDF from "../pages/ComponentPrint/PDFPrinter";
import DivergenciaImprimir from "../pages/DivergenciaImprimir";
import Principal from "../pages/Principal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Principal />,
  },
  {
    path: "/infonf",
    element: <InfoNf />,
  },
  {
    path: "/cadastrodemanda",
    element: <CadastroDemanda />,
  },
  {
    path: "/print",
    element: <ImprimirPDF />,
  },
  {
    path: "/divergenciaimprimir",
    element: <DivergenciaImprimir />,
  },
]);

export default router;
