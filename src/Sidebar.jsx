import React from "react";
import "./Sidebar.css";
import poblacions from "./poblacions.json";

const Sidebar = (props) => {
  const { poblacio, setPoblacio, setSeccio, setPagina, setTotalPagines } = props;

  return (
    <div className="sidebar">
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