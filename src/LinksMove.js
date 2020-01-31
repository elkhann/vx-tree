import React, { Fragment } from "react";
import { Group } from "@vx/group";
import { NodeGroup } from "react-move";

import Link from "./Link";
import { findCollapsedParent } from "./utils";

function Links({ links, linkType, layout, orientation, stepPercent }) {
  let partners = [];
  return (
    <NodeGroup
      data={links}
      keyAccessor={(d, i) => `${d.source.data.name}_${d.target.data.name}`}
      start={({ source, target }) => {
        return {
          source: {
            x: source.data.x0,
            y: source.data.y0
          },
          target: {
            x: source.data.x0,
            y: source.data.y0
          }
        };
      }}
      enter={({ source, target }) => {
        return {
          source: {
            x: [source.x],
            y: [source.y]
          },
          target: {
            x: [target.x],
            y: [target.y]
          }
        };
      }}
      update={({ source, target }) => {
        return {
          source: {
            x: [source.x],
            y: [source.y]
          },
          target: {
            x: [target.x],
            y: [target.y]
          }
        };
      }}
      leave={({ source, target }) => {
        const collapsedParent = findCollapsedParent(source);
        return {
          source: {
            x: [collapsedParent.data.x0],
            y: [collapsedParent.data.y0]
          },
          target: {
            x: [collapsedParent.data.x0],
            y: [collapsedParent.data.y0]
          }
        };
      }}
    >
      {nodes => (
        <Group>
          {nodes.map(({ key, data, state }) => {
            if (data.target.data.hasParnter) {
              partners.push(data.target);
            }
            /* Do not show the link from root empty object */
            if (data.source.depth === 0) {
              return null;
            }
            if (data.target.data.noParent === true) {
              return null;
            }
            return (
              <Fragment>
                <Link
                  data={data}
                  linkType={linkType}
                  layout={layout}
                  orientation={orientation}
                  stepPercent={stepPercent}
                  stroke="#374469"
                  strokeWidth="1"
                  fill="none"
                  key={key}
                />
              </Fragment>
            );
          })}
          {nodes.map(({ key, data, state }) => {
            if (typeof data.target.data.partnerId !== "number") {
              return null;
            }
            const nodePartnerId = data.target.data.partnerId;

            const linkSource = partners.filter(partner => {
              return partner.data.id === nodePartnerId ? partner : null;
            });

            data.source = linkSource[0];
            return (
              <Fragment>
                <Link
                  data={data}
                  linkType={linkType}
                  layout={layout}
                  orientation={orientation}
                  stepPercent={stepPercent}
                  stroke="#374469"
                  strokeWidth="1"
                  fill="none"
                  key={key}
                />
              </Fragment>
            );
          })}
        </Group>
      )}
    </NodeGroup>
  );
}

export default Links;
