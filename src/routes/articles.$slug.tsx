import { json} from "@remix-run/node";
import type { LoaderFunctionArgs , LoaderFunction, MetaFunction, LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type ArticleData = {
    slug: string;
};

export const meta: MetaFunction = () => {
    return [{
        title: "Article Page",
        description: "View an article",
    }];
};

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: "/styles/article.css" }];
};

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    const slug = params.slug as string;
    return json({ slug });
};

export default function Article() {
    const article = useLoaderData<ArticleData>();

    return (
        <div>
            <p>{article.slug}</p>
        </div>
    );
}
