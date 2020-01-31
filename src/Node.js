import React, { Fragment } from "react";
import { Group } from "@vx/group";

function Node({ node, onClick }) {
  const width = 40;
  const height = 20;
  console.log(node);

  if (node.depth === 0) {
    return null;
  }
  if (node.data.isExpanded === true) {
    node.data.x0 = node.x;
    node.data.y0 = node.y;
  }
  return (
    <Fragment>
      {node.depth === 0 && (
        <circle r={12} fill="url('#lg')" onClick={onClick} />
      )}
      {node.depth !== 0 && (
        <rect
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill={"#272b4d"}
          stroke={node.data.children ? "#03c0dc" : "#26deb0"}
          strokeWidth={1}
          strokeDasharray={!node.data.children ? "2,2" : "0"}
          strokeOpacity={!node.data.children ? 0.6 : 1}
          rx={!node.data.children ? 10 : 0}
          onClick={onClick}
        />
      )}
      <text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={
          node.depth === 0 ? "#71248e" : node.children ? "white" : "#26deb0"
        }
      >
        {node.data.name}
      </text>
    </Fragment>
  );
}

export default Node;
