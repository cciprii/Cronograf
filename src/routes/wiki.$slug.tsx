import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  ConnectionMode,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { milanGraph } from "@/wiki/milan";
import { veniceGraph } from "@/wiki/venice";

export const Route = createFileRoute("/wiki/$slug")({
  component: WikiPage,
  head: ({ params }) => ({
    meta: [{ title: `${params.slug} — Wiki — CronoGraf` }],
  }),
});

const AudioNode = ({ data }: { data: { label?: string; audioUrl: string } }) => (
  <div style={{ textAlign: "center", padding: 20 }}>
    {data.label && <div style={{ marginBottom: 4 }}>{data.label}</div>}
    <audio controls src={data.audioUrl} style={{ width: "100%" }} />
  </div>
);

const nodeTypes = { audioNode: AudioNode };

function WikiPage() {
  const { slug } = Route.useParams();
  const graph = slug === "milan" ? milanGraph : slug === "venice" ? veniceGraph : null;
  if (!graph) throw notFound();

  const [nodes, , onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full">
      <div className="absolute left-4 top-4 z-10 flex items-center gap-3 rounded-lg border bg-card/95 px-3 py-2 shadow-md backdrop-blur">
        <Link to="/wiki" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back
        </Link>
        <span className="text-sm font-semibold">{graph.title}</span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
        connectionMode={ConnectionMode.Loose}
        style={{ backgroundColor: "#F7F9FB", width: "100%", height: "100%" }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
