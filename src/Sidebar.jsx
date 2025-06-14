import React, { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import "./Sidebar.css";
import poblacions from "./poblacions.json";

const Sidebar = (props) => {
  const { poblacio, setPoblacio, setSeccio, setPagina, setTotalPagines } = props;

  const [menuReduit, setMenuReduit] = useState(false);

  return (
    <div className={`sidebar ${menuReduit ? "reduida" : "expandida"}`}>
      <button
        className="toggle-menu"
        onClick={() => setMenuReduit((v) => !v)}
      >
        {menuReduit ? <Menu size={20} /> : <><ChevronLeft size={20} /><span className="toggle-text">Amagar</span></>}
      </button>
      <h2 className="sidebar-title" onClick={() => setPoblacio(undefined)}>Índex de llocs</h2>
      <ul className="sidebar-menu">
        {
            poblacions.map((opcio, index) => (
            <li
                key={index}
                className={poblacio === opcio.nom ? "selected" : ""}
                onClick={() => {
                  setPoblacio(opcio);
                  setPagina(0);
                  var novaSeccio = undefined;
                  if (opcio.nom !== "Índex general") {
                    novaSeccio = Object.values(opcio.pagines).flat();
                  } else {
                    novaSeccio = Object.entries(opcio.lletres)
                      .flatMap(([seccio, volums]) =>
                        volums.flatMap((v) =>
                          v.pagines.map((pagina) => ({
                            seccio,
                            volum: v.volum,
                            pagina,
                          }))
                        )
                      );
                  }
                  setSeccio(novaSeccio);
                  setTotalPagines(novaSeccio.length);
                }}
            >
                {opcio.nom}
            </li>
        ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;