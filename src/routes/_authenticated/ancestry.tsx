import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toast } from "sonner";
import { Plus, Save, Crown, Trash2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { PersonNode, type PersonData } from "@/components/PersonNode";

export const Route = createFileRoute("/_authenticated/ancestry")({
  component: AncestryPage,
  head: () => ({ meta: [{ title: "Ancestry Tree — CronoGraf" }] }),
});

const LEVEL = 160; // px per generation
const nodeTypes = { person: PersonNode };

function generationLabel(gen: number, horizontal: boolean): string {
  if (gen === 0) return horizontal ? "Sibling" : "Sibling";
  if (gen > 0) {
    if (gen === 1) return "Parent";
    if (gen === 2) return "Grandparent";
    return `${"Great-".repeat(gen - 2)}Grandparent`;
  }
  const d = -gen;
  if (d === 1) return "Child";
  if (d === 2) return "Grandchild";
  return `${"Great-".repeat(d - 2)}Grandchild`;
}


function applyRelations(nodes: Node[], edges: Edge[], rootId: string | null): Node[] {
  const root = nodes.find((n) => n.id === rootId);
  if (!root) return nodes;
  const rootY = root.position.y;


  const adj = new Map<string, Set<string>>();
  for (const n of nodes) adj.set(n.id, new Set());
  for (const e of edges) {
    adj.get(e.source)?.add(e.target);
    adj.get(e.target)?.add(e.source);
  }


  const reachable = new Set<string>([rootId!]);
  const queue = [rootId!];
  while (queue.length) {
    const cur = queue.shift()!;
    for (const nb of adj.get(cur) ?? []) {
      if (!reachable.has(nb)) { reachable.add(nb); queue.push(nb); }
    }
  }

  return nodes.map((n) => {
    const isRoot = n.id === rootId;
    let relation: string;
    if (isRoot) {
      relation = "You (root)";
    } else if (!reachable.has(n.id)) {
      relation = "Unrelated";
    } else {
      const diff = Math.round((rootY - n.position.y) / LEVEL);
      relation = generationLabel(diff, diff === 0);
    }
    return {
      ...n,
      data: { ...(n.data as PersonData), isRoot, relation },
    };
  });
}

function AncestryInner() {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);
  const [rootId, setRootId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const userIdRef = useRef<string | null>(null);

  
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      userIdRef.current = user.id;
      const { data, error } = await supabase
        .from("ancestry_trees").select("*").eq("user_id", user.id).maybeSingle();
      if (error) toast.error(error.message);
      if (data) {
        const loadedNodes = (data.nodes as unknown as Node[]) ?? [];
        const loadedEdges = (data.edges as unknown as Edge[]) ?? [];
        const typed = loadedNodes.map((n) => ({ ...n, type: "person" }));
        setNodes(applyRelations(typed, loadedEdges, data.root_id));
        setEdges(loadedEdges);
        setRootId(data.root_id);
      } else {
        const seedId = crypto.randomUUID();
        const seed: Node = {
          id: seedId, type: "person",
          position: { x: 300, y: 400 },
          data: { name: "You", relation: "You (root)", isRoot: true } satisfies PersonData,
        };
        setNodes([seed]);
        setRootId(seedId);
      }
      setLoading(false);
    })();
  }, [setNodes, setEdges]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyRelations(applyNodeChanges(changes, nds), edges, rootId)),
    [rootId, edges, setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => {
        const next = applyEdgeChanges(changes, eds);
        setNodes((nds) => applyRelations(nds, next, rootId));
        return next;
      });
    },
    [rootId, setEdges, setNodes],
  );

  const onConnect = useCallback(
    (c: Connection) => {
      setEdges((eds) => {
        const next = addEdge({ ...c, animated: true }, eds);
        setNodes((nds) => applyRelations(nds, next, rootId));
        return next;
      });
    },
    [rootId, setEdges, setNodes],
  );

  const addPerson = () => {
    const id = crypto.randomUUID();
    const name = window.prompt("Person's name?");
    if (!name) return;
    const imageUrl = window.prompt("Image URL? (optional)") || undefined;
    const newNode: Node = {
      id, type: "person",
      position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 300 },
      data: { name, imageUrl, relation: "Unrelated" } satisfies PersonData,
    };
    setNodes((nds) => applyRelations([...nds, newNode], edges, rootId));
  };

  const makeRoot = () => {
    if (!selected) return toast.info("Select a node first");
    setRootId(selected);
    setNodes((nds) => applyRelations(nds, edges, selected));
    toast.success("Root updated");
  };

  const deleteSelected = () => {
    if (!selected) return;
    if (selected === rootId) return toast.error("Can't delete the root");
    const nextEdges = edges.filter((e) => e.source !== selected && e.target !== selected);
    setEdges(nextEdges);
    setNodes((nds) => applyRelations(nds.filter((n) => n.id !== selected), nextEdges, rootId));
    setSelected(null);
  };

  const onEdgeDoubleClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    const label = window.prompt("Edge label?", (edge.label as string) ?? "");
    if (label === null) return;
    setEdges((eds) => eds.map((e) => (e.id === edge.id ? { ...e, label } : e)));
  }, [setEdges]);

  const save = async () => {
    if (!userIdRef.current) return;
    setSaving(true);
    const payload = {
      user_id: userIdRef.current,
      root_id: rootId,
      nodes: nodes as any,
      edges: edges as any,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("ancestry_trees").upsert(payload, { onConflict: "user_id" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Tree saved");
  };

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selected), [nodes, selected]);

  if (loading) {
    return <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center text-sm text-muted-foreground">Loading your tree…</div>;
  }

  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_e, n) => setSelected(n.id)}
        onPaneClick={() => setSelected(null)}
        onEdgeDoubleClick={onEdgeDoubleClick}
        connectionMode={ConnectionMode.Loose}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>

      <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2 rounded-lg border bg-card/95 p-2 shadow-md backdrop-blur">
        <button onClick={addPerson} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add person
        </button>
        <button onClick={makeRoot} disabled={!selected} className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent disabled:opacity-50">
          <Crown className="h-4 w-4" /> Set as root
        </button>
        <button onClick={deleteSelected} disabled={!selected || selected === rootId} className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent disabled:opacity-50">
          <Trash2 className="h-4 w-4" /> Delete
        </button>
        <div className="mx-1 h-5 w-px bg-border" />
        <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="absolute right-4 top-4 z-10 w-64 rounded-lg border bg-card/95 p-3 text-xs text-muted-foreground shadow-md backdrop-blur">
        {selectedNode ? (
          <>
            <div className="text-sm font-semibold text-foreground">{(selectedNode.data as PersonData).name}</div>
            <div className="mt-1">Relation: {(selectedNode.data as PersonData).relation}</div>
          </>
        ) : (
          <div className="text-sm font-semibold text-foreground">Tips</div>
        )}
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>Drag vertically to change generation.</li>
          <li>Connect from any side — horizontal = sibling.</li>
          <li>Double-click an edge to label it.</li>
          <li>Select an edge and press Delete to remove it.</li>
          <li>Relation = vertical distance + connection through edges.</li>
        </ul>
      </div>
    </div>
  );
}

function AncestryPage() {
  return (
    <ReactFlowProvider>
      <AncestryInner />
    </ReactFlowProvider>
  );
}
