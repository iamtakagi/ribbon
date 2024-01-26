import {
  type MetaFunction,
  type LoaderFunction,
  ActionFunction,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { handleRequireAuth } from "../components/authentication/handleRequireAuth";
import { Editor } from "../components/editor/Editor";
import { Scope } from "../model/scope";
import { Syntax } from "../model/syntax";
import { nanoid } from "nanoid";
import container from "../container";
import { IArticleRepository } from "../repository/types";

export const loader: LoaderFunction = async ({ request }) => {
  return await handleRequireAuth(request);
};

export const action: ActionFunction = async ({request, params }: ActionFunctionArgs) => {
  const body = await request.formData();
  const scope = body.get("scope");
  const syntax = body.get("syntax");
  const title = body.get("title");
  const description = body.get("description");
  const raw = body.get("raw");
  if (scope == null || typeof scope !== 'string' || Scope[scope as keyof typeof Scope] == null) return redirect("/editor");
  if (syntax == null || typeof syntax !== 'string' || Syntax[syntax as keyof typeof Syntax] == null) return redirect("/editor");
  if (title == null || typeof title !== 'string') return redirect("/editor");
  if (description != null && typeof description !== 'string') return redirect("/editor");
  if (raw == null || typeof raw !== 'string') return redirect("/editor");
  const articleRepository = container.get<IArticleRepository>('IArticleRepository');
  const result = await articleRepository.upsertOne(nanoid(), scope as Scope, syntax as Syntax, title, description, raw);
  if (result) return redirect(`/`);
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "Edit Page",
      description: "Edit an article page",
    },
  ];
};

export default function Edit() {
  return (
    <div>
      <div>記事を編集</div>
      <Editor />
    </div>
  );
}
