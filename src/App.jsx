import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";

const App = () => {
  const [poblacio, setPoblacio] = useState();
  const ruta_arrel = "https://static.arxiusenlinia.cultura.gencat.cat/active/GIAC/TEXTUAL/170/251/0/"
  const ruta_vol = ["482/doc_AHG_2257878_482", "483/doc_AHG_2257879_483", "486/doc_AHG_2257882_486", "484/doc_AHG_2257880_484", "485/doc_AHG_2257881_485", "487/doc_AHG_2257883_487"]
  const [seccio, setSeccio] = useState([]);

  const [pagina, setPagina] = useState(0);
  const [totalPagines, setTotalPagines] = useState(0);

  const pagEnrere = () => {
    if (pagina > 0) setPagina(pagina - 1);
  }
  const pagEndavant = () => {
    if (pagina < seccio.length - 1) setPagina(pagina + 1);
  }
  const pagInicial = () => {
    setPagina(0);
  }
  const pagFinal = () => {
    setPagina(seccio.length-1);
  }

  return (
    <div className="layout">
      <Sidebar poblacio={poblacio} setPoblacio={setPoblacio} setSeccio={setSeccio} setPagina={setPagina} setTotalPagines={setTotalPagines} />
      <div className="main-content">
        <h1>Índex de l'Ofici d'Hipoteques de Girona (1768-1861)</h1>
        <p>Selecciona una població del menú lateral de l'esquerra per consultar-ne l'índex.</p>
        {poblacio != undefined ?
        <div>
            <h2>{poblacio?.nom}</h2>
            {
                seccio.length > 0 ?
                <center>
                  {/* SECCIONS */}
                  <div className="seccions">
                    {poblacio.nom !== "Índex general" ?
                      Object.keys(poblacio.pagines).map((lletra, index) => (
                        <button key={index} className={`boto-seccio ${seccio === poblacio.pagines[lletra] ? "boto-actiu" : ""}`}
                          onClick={() => {
                            var novaSeccio = lletra === "portada" ? Object.values(poblacio.pagines).flat() : poblacio.pagines[lletra];
                            setSeccio(novaSeccio);
                            setPagina(0);
                            setTotalPagines(novaSeccio.length);
                          }}>
                          {lletra === "portada" ? "🏠" : lletra}
                        </button>
                      ))
                    :
                      Object.keys(poblacio.lletres).map((lletra, index) => (
                        <button key={index} className={`boto-seccio ${seccio[0].seccio === lletra ? "boto-actiu" : ""}`}
                          onClick={() => {
                            var novaSeccio = lletra === "portada" ?
                              Object.entries(poblacio.lletres)
                              .flatMap(([s, volums]) =>
                                volums.flatMap((v) =>
                                  v.pagines.map((p) => ({
                                    seccio: s,
                                    volum: v.volum,
                                    pagina: p,
                                  }))
                                )
                              )
                            : poblacio.lletres[lletra].flatMap((v) =>
                                  v.pagines.map((p) => ({
                                    seccio: lletra,
                                    volum: v.volum,
                                    pagina: p,
                                  })
                                )
                              );
                            setSeccio(novaSeccio);
                            setPagina(0);
                            setTotalPagines(novaSeccio.length);
                          }}>
                          {lletra === "portada" ? "🏠" : lletra}
                        </button>
                      ))
                    }
                  </div>
                  {/* PAGINACIÓ */}
                  <div className="paginacio">
                    <button onClick={pagInicial} className="boto-paginacio">
                      ⏮️
                    </button>
                    <button onClick={pagEnrere} className="boto-paginacio">
                      ⬅️
                    </button>
                    <span style={{ minWidth: "3rem", textAlign: "center" }}>
                      <h3>{pagina+1} / {totalPagines}</h3>
                    </span>
                    <button onClick={pagEndavant} className="boto-paginacio">
                      ➡️
                    </button>
                    <button onClick={pagFinal} className="boto-paginacio">
                      ⏭️
                    </button>
                  </div>
                  {/* IMATGE */}
                  {
                    poblacio.nom !== "Índex general" ?
                      <a href={`${ruta_arrel}${ruta_vol[poblacio.volum-1]},${seccio[pagina].toString().padStart(4, "0")}.jpg`} target="_blank">
                        <img width="50%" src={`${ruta_arrel}${ruta_vol[poblacio.volum-1]},${seccio[pagina].toString().padStart(4, "0")}.jpg`}></img>
                      </a>
                    :
                      <a href={`${ruta_arrel}${ruta_vol[seccio[pagina].volum-1]},${seccio[pagina].pagina.toString().padStart(4, "0")}.jpg`} target="_blank">
                        <img width="50%" src={`${ruta_arrel}${ruta_vol[seccio[pagina].volum-1]},${seccio[pagina].pagina.toString().padStart(4, "0")}.jpg`}></img>
                      </a>
                  }
                </center>
                :
                "No hi ha imatges per aquesta secció"
            }
        </div>
        : ""}
      </div>
    </div>
  );
};

export default App;