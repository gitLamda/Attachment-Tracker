import React from "react";
import { Sankey, Tooltip } from "recharts";

function SankeyDiagram({ data }) {
  const nodes = [], links = [], nodeMap = new Map();
  let index = 0;

  const getNodeIndex = (name) => {
    if (!nodeMap.has(name)) {
      nodeMap.set(name, index++);
      nodes.push({ name });
    }
    return nodeMap.get(name);
  };

  data.forEach((item) => {
    const from = item.status === "In" ? item.storage_unit : item.module;
    const to = item.status === "In" ? item.module : (item.status === "Out" ? item.storage_unit : "Defective Bin");
    links.push({ source: getNodeIndex(from), target: getNodeIndex(to), value: 1 });
  });

  return (
    <div className="sankey">
      <Sankey width={700} height={300} data={{ nodes, links }} nodePadding={30}>
        <Tooltip />
      </Sankey>
    </div>
  );
}

export default SankeyDiagram;
