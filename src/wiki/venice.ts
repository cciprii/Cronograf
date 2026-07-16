import type { Node, Edge } from "@xyflow/react";
import React from "react";

const nodes: Node[] = [
  { id: "RootNode", position: { x: 0, y: 0 }, data: { label: "Republica Veneția" }, style: { fontSize: "34px" }, width: 200, height: 150 },
  { id: "Flag", position: { x: -500, y: 300 }, data: { label: "" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Republic_of_Venice_%281659-1675%29.svg/1920px-Flag_of_Republic_of_Venice_%281659-1675%29.svg.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", color: "#fff" }, width: 350, height: 200 },
  { id: "Imn", type: "audioNode", position: { x: 0, y: 300 }, data: { label: "Imn Veneția", audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Austrio-Hungarian-Empire-_1867-1918_-_Inno-patriottico_Full-HD.ogg" }, width: 200, height: 200 },
  { id: "PoliticaInterna", position: { x: 350, y: 300 }, data: { label: "Politica internă dusă de Republicii Veneția era o oligarhie aristocratică." }, style: { fontSize: "30px" }, width: 400, height: 200 },

  { id: "arta", position: { x: -500, y: -200 }, data: { label: React.createElement("strong", null, "Artă") }, style: { fontSize: "14px" }, width: 120, height: 50 },
  { id: "stiinta", position: { x: 0, y: -200 }, data: { label: React.createElement("strong", null, "Știință") }, style: { fontSize: "14px" }, width: 120, height: 50 },
  { id: "descoperiri", position: { x: 500, y: -200 }, data: { label: React.createElement("strong", null, "Alte descoperiri") }, style: { fontSize: "14px" }, width: 120, height: 50 },

  { id: "bellini", position: { x: -650, y: -400 }, data: { label: "Giovanni Bellini" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/c/c1/Portr%C3%A6t_af_den_venezianske_maler_Giovanni_Bellini.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "titian", position: { x: -500, y: -400 }, data: { label: "Titian" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/3/3b/Self-portrait_of_Titian.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 140, height: 100 },
  { id: "tintoretto", position: { x: -350, y: -400 }, data: { label: "Tintoretto" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/9/98/Tintoretto_-_Self-Portrait_as_a_Young_Man%2C_ca._1548%2C_CAI.103_%28cropped%29.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },

  { id: "morgagni", position: { x: -150, y: -400 }, data: { label: "Giovanni B. Morgagni" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/1/13/Giambattista_morgagni.gif)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "galileo", position: { x: 0, y: -400 }, data: { label: "Galileo Galilei" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/c/cc/Galileo.arp.300pix.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "santorio", position: { x: 150, y: -400 }, data: { label: "Santorio Santorio" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/6/65/Sanctorius.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },

  { id: "tipar", position: { x: 350, y: -400 }, data: { label: "Cartografie" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Map_-_Special_Collections_University_of_Amsterdam_-_OTM-_HB-KZL_33.03.38.tiff/lossy-page1-1024px-Map_-_Special_Collections_University_of_Amsterdam_-_OTM-_HB-KZL_33.03.38.tiff.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "lazaret", position: { x: 500, y: -400 }, data: { label: "Tiparire" }, style: { backgroundImage: "url(https://thevenetianbulletin.wordpress.com/wp-content/uploads/2015/03/italic-manuzio.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 140, height: 100 },
  { id: "sticlarie", position: { x: 650, y: -400 }, data: { label: "Sticlarie" }, style: { backgroundImage: "url(https://renvenetianstyle.cmog.org/sites/renvenetianstyle.cmog.org/files/fig11_venetian_golden_age_group_srgb.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },

  { id: "bellini-opus", position: { x: -650, y: -550 }, data: { label: "Altarul San Zaccaria" }, style: { backgroundImage: "url(http://www.italianrenaissance.org/wp-content/uploads/2013/05/Bellini-San-Zaccaria-Altarpiece.png)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "titian-opus", position: { x: -500, y: -550 }, data: { label: "Adormirea Maicii Domnului" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/9/9e/Tizian_041.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 140, height: 100 },
  { id: "tintoretto-opus", position: { x: -350, y: -550 }, data: { label: "Paradisul" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/%28Venice%29_Jacopo_Tintoretto_-_Gloria_del_Paradiso_-_Sala_del_Maggior_Consiglio.jpg/1100px-%28Venice%29_Jacopo_Tintoretto_-_Gloria_del_Paradiso_-_Sala_del_Maggior_Consiglio.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "morgagni-opus", position: { x: -150, y: -550 }, data: { label: "De Sedibus et Causis Morborum" }, style: { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Morgagni_de_sedibus_1761.jpg/250px-Morgagni_de_sedibus_1761.jpg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "galileo-opus", position: { x: 0, y: -550 }, data: { label: "Sidereus Nuncius" }, style: { backgroundImage: "url(https://cdn.dc5.ro/img-prod/25690084-1.jpeg)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
  { id: "santorio-opus", position: { x: 150, y: -550 }, data: { label: "De Statica Medicina" }, style: { backgroundImage: "url(https://i0.wp.com/circulatingnow.nlm.nih.gov/wp-content/uploads/2020/11/Santorio-Titlepage.jpg?ssl=1)", backgroundSize: "cover", backgroundPosition: "center", color: "#fff" }, width: 160, height: 100 },
];

const edges: Edge[] = [
  { id: "RootNode->Flag", source: "RootNode", target: "Flag" },
  { id: "RootNode->Imn", source: "RootNode", target: "Imn" },
  { id: "RootNode->PoliticaInterna", source: "RootNode", target: "PoliticaInterna" },
  { id: "e1", source: "arta", target: "RootNode" },
  { id: "e2", source: "stiinta", target: "RootNode" },
  { id: "e3", source: "descoperiri", target: "RootNode" },
  { id: "e4", source: "bellini", target: "arta" },
  { id: "e5", source: "titian", target: "arta" },
  { id: "e6", source: "tintoretto", target: "arta" },
  { id: "e7", source: "morgagni", target: "stiinta" },
  { id: "e8", source: "galileo", target: "stiinta" },
  { id: "e9", source: "santorio", target: "stiinta" },
  { id: "e10", source: "tipar", target: "descoperiri" },
  { id: "e11", source: "lazaret", target: "descoperiri" },
  { id: "e12", source: "sticlarie", target: "descoperiri" },
  { id: "edge-bellini", source: "bellini-opus", target: "bellini" },
  { id: "edge-titian", source: "titian-opus", target: "titian" },
  { id: "edge-tintoretto", source: "tintoretto-opus", target: "tintoretto" },
  { id: "edge-morgagni", source: "morgagni-opus", target: "morgagni" },
  { id: "edge-galileo", source: "galileo-opus", target: "galileo" },
  { id: "edge-santorio", source: "santorio-opus", target: "santorio" },
];

export const veniceGraph = { title: "Republica Veneția", nodes, edges };
