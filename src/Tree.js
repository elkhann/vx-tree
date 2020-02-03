import React from "react";
import { Group } from "@vx/group";
import { localPoint } from "@vx/event";
import { Tree } from "@vx/hierarchy";
import { LinearGradient } from "@vx/gradient";
import { hierarchy } from "d3-hierarchy";
import { Zoom } from "@vx/zoom";
import { RectClipPath } from "@vx/clip-path";

// import Links from './Links';
import Links from "./LinksMove";

// import Nodes from './Nodes';
import Nodes from "./NodesMove";

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: -150,
  skewX: 0,
  skewY: 0
};

export default class extends React.Component {
  state = {
    layout: "cartesian",
    orientation: "vertical",
    linkType: "step",
    stepPercent: 0.8
  };

  render() {
    const {
      data,
      width,
      height,
      margin = {
        top: 50,
        left: 30,
        right: 30,
        bottom: 200
      }
    } = this.props;
    const { layout, orientation, linkType, stepPercent } = this.state;

    if (width < 10) return null;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin;
    let sizeWidth;
    let sizeHeight;

    if (layout === "polar") {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === "vertical") {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
      }
    }

    const root = hierarchy(data, d => (d.isExpanded ? d.children : null));
    // root.each((node, i) => node.onClick = () => {
    //   console.log('clicked');
    // });

    return (
      <div>
        <div>
          <label>layout:</label>
          <select
            onChange={e => this.setState({ layout: e.target.value })}
            value={layout}
          >
            <option value="cartesian">cartesian</option>
            <option value="polar">polar</option>
          </select>

          <label>orientation:</label>
          <select
            onChange={e => this.setState({ orientation: e.target.value })}
            value={orientation}
            disabled={layout === "polar"}
          >
            <option value="vertical">vertical</option>
            <option value="horizontal">horizontal</option>
          </select>

          <label>link:</label>
          <select
            onChange={e => this.setState({ linkType: e.target.value })}
            value={linkType}
          >
            <option value="diagonal">diagonal</option>
            <option value="step">step</option>
            <option value="curve">curve</option>
            <option value="line">line</option>
          </select>

          <label>step:</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={e => this.setState({ stepPercent: e.target.value })}
            value={stepPercent}
            disabled={linkType !== "step" || layout === "polar"}
          />
        </div>
        <Zoom
          width={width}
          height={height}
          scaleXMin={1 / 2}
          scaleXMax={4}
          scaleYMin={1 / 2}
          scaleYMax={4}
          transformMatrix={initialTransform}
        >
          {zoom => {
            return (
              <div style={{ position: "relative" }}>
                <svg
                  width={width}
                  height={height}
                  style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
                >
                  <RectClipPath id="zoom-clip" width={width} height={height} />
                  <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
                  <rect
                    width={width}
                    height={height}
                    rx={14}
                    fill="#272b4d"
                    onWheel={zoom.handleWheel}
                    onMouseDown={zoom.dragStart}
                    onMouseMove={zoom.dragMove}
                    onMouseUp={zoom.dragEnd}
                    onMouseLeave={() => {
                      if (!zoom.isDragging) return;
                      zoom.dragEnd();
                    }}
                    onDoubleClick={event => {
                      const point = localPoint(event);
                      zoom.scale({ scaleX: 1.3, scaleY: 1.3, point });
                    }}
                  />
                  <g transform={zoom.toString()}>
                    <Tree
                      top={margin.top}
                      left={margin.left}
                      root={root}
                      size={[sizeWidth, sizeHeight]}
                      separation={(a, b) =>
                        (a.parent === b.parent ? 0.5 : 0.75) / a.depth
                      }
                    >
                      {({ data }) => (
                        <Group top={origin.y} left={origin.x}>
                          <Links
                            links={data.links()}
                            linkType={linkType}
                            layout={layout}
                            orientation={orientation}
                            stepPercent={stepPercent}
                          />

                          <Nodes
                            nodes={data.descendants()}
                            layout={layout}
                            orientation={orientation}
                            onNodeClick={node => {
                              if (!node.data.isExpanded) {
                                node.data.x0 = node.x;
                                node.data.y0 = node.y;
                              }
                              node.data.isExpanded = !node.data.isExpanded;
                              this.forceUpdate();
                            }}
                          />
                        </Group>
                      )}
                    </Tree>
                  </g>
                </svg>
              </div>
            );
          }}
        </Zoom>
      </div>
    );
  }
}
