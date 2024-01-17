import { useEffect, useState } from "react";
import { parseMarkdown } from "../../parser/markdown";
import MarkdownRenderer from "../../renderer/markdown";
import ScrapboxRenderer from "../../renderer/scrapbox";
import { parseScrapbox } from "../../parser/scrapbox";
import { Article } from "../../parser/types";
import { Scope, Scopes } from "../../model/scope";
import { Syntax, Syntaxes } from "../../model/syntax";

const initalArticle = {
  title: "",
  description: null,
  toc: [],
  heading: "",
  content: "",
  links: [],
};

export const Editor = () => {
  const [syntax, setSyntax] = useState<Syntax>(Syntax.Markdown);
  const [scope, setScope] = useState<Scope>(Scope.Private);
  const [raw, setRaw] = useState("");
  const [struct, setStruct] = useState<Article>(initalArticle);
  const [structJson, setStructJson] = useState(
    JSON.stringify(struct, null, "  ")
  );
  useEffect(() => {
    if (raw) {
      if (syntax === Syntax.Markdown) {
        setStruct(parseMarkdown(raw));
      }
      if (syntax === Syntax.Scrapbox) {
        setStruct(parseScrapbox(raw));
      }
    } else {
      setStruct(initalArticle);
    }
    if (struct) {
      setStructJson(JSON.stringify(struct, null, "  "));
    }
  }, [raw, syntax, struct]);
  return (
    <div className="editor">
      <div>
        <div>
          <label htmlFor="syntax">形式</label>
          <select
            id="syntax"
            value={syntax}
            onChange={(e) => setSyntax(e.target.value as Syntax)}
          >
            {Syntaxes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <textarea
          value={raw}
          style={{ width: "300px", height: "360px", resize: "none" }}
          onChange={(e) => setRaw(e.target.value)}
        />
        <div style={{ border: "black", width: "50%", marginLeft: "1rem" }}>
          <div>
            {(() => {
              switch (syntax) {
                case Syntax.Markdown:
                  return <MarkdownRenderer raw={raw} />;

                case Syntax.Scrapbox:
                  return <ScrapboxRenderer raw={raw} />;

                default:
                  return <MarkdownRenderer raw={raw} />;
              }
            })()}
          </div>
        </div>
        <textarea
          value={structJson}
          style={{ width: "300px", height: "360px", resize: "none" }}
        />
      </div>
      <label htmlFor="scope">公開範囲</label>
      <select
        id="scope"
        value={scope}
        onChange={(e) => setScope(e.target.value as Scope)}
      >
        {Scopes.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button type="submit">保存</button>
    </div>
  );
};
