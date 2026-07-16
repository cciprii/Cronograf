import type { Node, Edge } from "@xyflow/react";
import React from "react";

const nodes: Node[] = [
  { id: "RootNode", position: { x: 0, y: 0 }, data: { label: "Ducatul Milanului" }, style: { fontSize: "34px" }, width: 200, height: 150 },
  { id: "Flag", position: { x: -500, y: 300 }, data: { label: "" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_the_Duchy_of_Milan_%281450%29.svg/1024px-Flag_of_the_Duchy_of_Milan_%281450%29.svg.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", color: "#fff" }, width: 350, height: 200 },
  { id: "Imn", type: "audioNode", position: { x: 0, y: 300 }, data: { label: "Imn Milan", audioUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Marcia_Reale.ogg" }, width: 200, height: 200 },
  { id: "PoliticaInterna", position: { x: 350, y: 300 }, data: { label: "Ducatul Milanului era condus de o dinastie ducală, precum familia Sforza." }, style: { fontSize: "30px" }, width: 400, height: 200 },

  { id: "arta", position: { x: -500, y: -200 }, data: { label: React.createElement("strong", null, "Artă") }, style: { fontSize: "14px" }, width: 120, height: 50 },
  { id: "stiinta", position: { x: 0, y: -200 }, data: { label: React.createElement("strong", null, "Știință") }, style: { fontSize: "14px" }, width: 120, height: 50 },
  { id: "descoperiri", position: { x: 500, y: -200 }, data: { label: React.createElement("strong", null, "Inovații") }, style: { fontSize: "14px" }, width: 120, height: 50 },

  { id: "leonardo", position: { x: -650, y: -400 }, data: { label: "Leonardo da Vinci" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo_-_WGA14795.jpg/500px-Francesco_Melzi_-_Portrait_of_Leonardo_-_WGA14795.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "bramante", position: { x: -500, y: -400 }, data: { label: "Donato Bramante" }, style: { backgroundImage: "url(https://cdn.britannica.com/86/145986-050-6943AEF9/Donato-Bramante.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 140, height: 100 },
  { id: "morazzone", position: { x: -350, y: -400 }, data: { label: "Pier Francesco Mazzucchelli (Morazzone)" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/0/04/Anonimo%2C_Ritratto_del_Morazzone%2C_Milano%2C_Pinacoteca_di_Brera.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },

  { id: "cardano", position: { x: -150, y: -400 }, data: { label: "Gerolamo Cardano" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Girolamo_Cardano._Stipple_engraving_by_R._Cooper._Wellcome_V0001004.jpg/500px-Girolamo_Cardano._Stipple_engraving_by_R._Cooper._Wellcome_V0001004.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "colombo", position: { x: 0, y: -400 }, data: { label: "Matteo Realdo Colombo" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/2/26/Matteocolombo.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "porta", position: { x: 150, y: -400 }, data: { label: "Giambattista della Porta" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/0/0b/Giambattista_della_Porta.jpeg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },

  { id: "canalizare", position: { x: 350, y: -400 }, data: { label: "Naviglio Grande" }, style: { backgroundImage: "url(https://d7hftxdivxxvm.cloudfront.net/?height=591&quality=50&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fb2ldDQQiyMn4YAq-hH_ZKQ%2Fmain.jpg&width=800)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "spital", position: { x: 500, y: -400 }, data: { label: "Ospedale Maggiore" }, style: { backgroundImage: "url(https://www.researchgate.net/publication/359660700/figure/fig2/AS:11431281096299744@1668112847390/Lombard-painter-Il-cortile-dellOspedale-Maggiore-circa-1670-1690-oil-on-canvas.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 140, height: 100 },
  { id: "fortificatii", position: { x: 650, y: -400 }, data: { label: "Fortificații renascentiste" }, style: { backgroundImage: "url(https://www.shutterstock.com/image-photo/castello-sforzesco-sforzas-castle-details-600nw-2570487033.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },

  { id: "bramante-opus", position: { x: -500, y: -550 }, data: { label: "Santa Maria presso San Satiro" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/SanSatiroInteriors.jpg/960px-SanSatiroInteriors.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "morazzone-opus", position: { x: -350, y: -550 }, data: { label: "Sacro Monte di Varese" }, style: { backgroundImage: "url(https://lh3.googleusercontent.com/proxy/GGGb1UOXTOVyl23AplvN8-b81eWWvP7i8JxXEz-ub5G6I3niHUS2yB34AigB6BOidEX6btqXWMefURTJ5qDGTyRwgaPJJHYNooAgi3Y7mm17uzKBbtdCSfJ7kYqC_pnqdqTfoP-XZDlBqbNswdDeNTKxLNr6QNgOlpCsl3wlUYulLv8LQ7-v)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "leonardo-opus", position: { x: -650, y: -550 }, data: { label: "Cina cea de Taină" }, style: { backgroundImage: "url(https://www.singulart.com/blog/wp-content/uploads/2019/08/tour_img-312981-148.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "cardano-opus", position: { x: -150, y: -550 }, data: { label: "Ars Magna" }, style: { backgroundImage: "url(https://old.maa.org/sites/default/files/images/upload_library/46/Linda-Hall-Lib_CHuffman/Cardano/Title_page.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "colombo-opus", position: { x: 0, y: -550 }, data: { label: "De Re Anatomica" }, style: { backgroundImage: "url(https://www.gonnelli.it/photos/auctions/xlarge/20829.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "porta-opus", position: { x: 150, y: -550 }, data: { label: "Magia Naturalis" }, style: { backgroundImage: "url(https://cdn.britannica.com/46/171746-050-6C3BBA6E/Giambattista-della-Porta.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
];

const edges: Edge[] = [
  { id: "RootNode->Flag", source: "RootNode", target: "Flag" },
  { id: "RootNode->Imn", source: "RootNode", target: "Imn" },
  { id: "RootNode->PoliticaInterna", source: "RootNode", target: "PoliticaInterna" },
  { id: "e1", source: "arta", target: "RootNode" },
  { id: "e2", source: "stiinta", target: "RootNode" },
  { id: "e3", source: "descoperiri", target: "RootNode" },
  { id: "e4", source: "leonardo", target: "arta" },
  { id: "e5", source: "bramante", target: "arta" },
  { id: "e6", source: "morazzone", target: "arta" },
  { id: "e7", source: "cardano", target: "stiinta" },
  { id: "e8", source: "colombo", target: "stiinta" },
  { id: "e9", source: "porta", target: "stiinta" },
  { id: "e10", source: "canalizare", target: "descoperiri" },
  { id: "e11", source: "spital", target: "descoperiri" },
  { id: "e12", source: "fortificatii", target: "descoperiri" },
  { id: "edge-leonardo", source: "leonardo-opus", target: "leonardo" },
  { id: "edge-cardano", source: "cardano-opus", target: "cardano" },
  { id: "edge-colombo", source: "colombo-opus", target: "colombo" },
  { id: "edge-porta", source: "porta-opus", target: "porta" },
  { id: "edge-bramante", source: "bramante-opus", target: "bramante" },
  { id: "edge-morazzone", source: "morazzone-opus", target: "morazzone" },
];

export const milanGraph = { title: "Ducatul Milanului", nodes, edges };
