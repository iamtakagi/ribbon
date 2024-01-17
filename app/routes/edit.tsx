import {
  type MetaFunction,
  type LoaderFunction,
} from "@remix-run/cloudflare";
import { handleRequireAuth } from "../components/authentication/handleRequireAuth";
import { Editor } from "../components/editor/Editor";

export const loader: LoaderFunction = async ({ request }) => {
  return await handleRequireAuth(request);
};

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
