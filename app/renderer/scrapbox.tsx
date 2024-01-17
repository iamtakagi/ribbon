import React from 'react';
import { Line, Node, getTitle, parse } from '@progfay/scrapbox-parser';

export const Nodes: React.FC<{ depth: number; nodes: Node[] }> = ({
  depth,
  nodes,
}) => {
  return (
    <>
      {nodes.map((node, idx) => {
        switch (node.type) {
          case "plain":
            return (
              <span style={{ fontSize: "1em" }} key={depth + "-" + idx}>
                {node.text}
              </span>
            );
          case "strong":
            return (
              <span
                key={depth + "-" + idx}
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              >
                <Nodes depth={depth++} nodes={node.nodes} />
              </span>
            );
          case "decoration":
            const size = parseInt(node.decos[0].substr(2));
            return (
              <span
                key={depth + "-" + idx}
                style={{
                  fontWeight: "bold",
                  fontSize: size === 1 ? "1em" : size * 0.5 + "em",
                }}
              >
                <Nodes depth={depth++} nodes={node.nodes} />
              </span>
            );
          case "image":
            return (
              <span
                key={depth + "-" + idx}
                style={{
                  display: "inline-block",
                  maxWidth: "300px",
                  maxHeight: "300px",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  alt=""
                  src={node.src}
                />
              </span>
            );
          case "link":
            switch (node.pathType) {
              case "relative":
                return (
                  <a
                    key={depth + "-" + idx}
                    href={"/" + node.href}
                    style={{ fontSize: "1em" }}
                  >
        
                      {node.content.length !== 0 ? node.content : node.href}
                   
                  </a>
                );
              case "absolute":
                return (
                  <a
                    key={depth + "-" + idx}
                    href={node.href}
                    style={{ fontSize: "1em" }}
                    target="_blank" rel="noreferrer"
                  >
                   
                      {node.content.length !== 0 ? node.content : node.href}
                   
                  </a>
                );
              default:
                break;
            }
            case "code":
              return (
                <pre>
                  <code>{node.raw}</code>
                </pre>
              )
          default:
            break;
        }
      })}
    </>
  );
};

export const Lines: React.FC<{ lines: Line[] }> = ({ lines }) => {
  return (
    <>
      {lines.map((line, idx) => {
        if (line.nodes?.length > 0) {
          return (
            <div
              key={idx}
              style={{
                padding: "5px " + line.indent * 20 + "px",
              }}
            >
              <Nodes depth={0} nodes={line.nodes} />
            </div>
          );
        } else {
          return <div key={idx} />;
        }
      })}
    </>
  );
};

const ScrapboxRenderer = ({ raw }: {raw: string}) => {
    const title = getTitle(raw);
    const lines = parse(raw);
    return (
        <div style={{ padding: "10px" }}>
            <div>{title}</div>
            <Lines lines={lines} />
        </div>
    )
};

export default ScrapboxRenderer;
