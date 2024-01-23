import type { Scope } from "app/model/scope";
import type { Syntax } from "app/model/syntax";
import type { Article } from "app/parser/types";
import type { ArrayResult, BooleanResult, ObjectResult } from "./result";

export interface ArticleRepository {
    upsertOne(id: string,
        scope: Scope,
        syntax: Syntax,
        title: string,
        description: string | null,
        raw: string): Promise<ObjectResult<Article>>;
    deleteOne(id: string): Promise<BooleanResult>;
    findById(id: string): Promise<ObjectResult<Article>>;
    findMany(): Promise<ArrayResult<Article>>;
}

export interface ArticleRepositoryFactory {
    create(): ArticleRepository;
}