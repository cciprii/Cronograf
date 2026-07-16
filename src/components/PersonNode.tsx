import { Handle, Position, type NodeProps } from "@xyflow/react";
import { User } from "lucide-react";

export type PersonData = {
  name: string;
  imageUrl?: string;
  relation: string;
  isRoot?: boolean;
};

export function PersonNode({ data }: NodeProps & { data: PersonData }) {
  return (
    <div
      className={`flex w-[180px] flex-col items-center rounded-xl border-2 bg-card p-3 shadow-sm transition-colors ${
        data.isRoot ? "border-primary" : "border-border"
      }`}
    >
      <Handle type="source" position={Position.Top} id="t" className="!h-2 !w-2 !bg-primary" />
      <Handle type="target" position={Position.Top} id="tt" className="!h-2 !w-2 !bg-primary" />
      <Handle type="source" position={Position.Left} id="l" className="!h-2 !w-2 !bg-primary" />
      <Handle type="target" position={Position.Left} id="lt" className="!h-2 !w-2 !bg-primary" />
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-muted">
        {data.imageUrl ? (
          <img src={data.imageUrl} alt={data.name} className="h-full w-full object-cover" />
        ) : (
          <User className="h-7 w-7 text-muted-foreground" />
        )}
      </div>
      <div className="mt-2 text-center">
        <div className="text-sm font-semibold leading-tight">{data.name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{data.relation}</div>
      </div>
      <Handle type="source" position={Position.Right} id="r" className="!h-2 !w-2 !bg-primary" />
      <Handle type="target" position={Position.Right} id="rt" className="!h-2 !w-2 !bg-primary" />
      <Handle type="source" position={Position.Bottom} id="b" className="!h-2 !w-2 !bg-primary" />
      <Handle type="target" position={Position.Bottom} id="bt" className="!h-2 !w-2 !bg-primary" />
    </div>
  );
}
