import { DB } from "../db/connection";
import type { Scope } from "../model/scope";
import type { Syntax } from "../model/syntax";
import type { Article } from "../parser/types";
import { ObjectResult, BooleanResult, ArrayResult } from "./result";

export interface IArticleRepository {
  db: Readonly<DB>;
  upsertOne(
    id: string,
    scope: Scope,
    syntax: Syntax,
    title: string,
    description: string | null,
    raw: string
  ): Promise<ObjectResult<Article>>;
  deleteOne(id: string): Promise<BooleanResult>;
  findById(id: string): Promise<ObjectResult<Article>>;
  findMany(): Promise<ArrayResult<Article>>;
}

export interface IArticleRepositoryFactory {
  articleRepository: IArticleRepository | undefined;
  create(): IArticleRepository;
}
