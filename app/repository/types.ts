import type { Scope } from "app/model/scope";
import type { Syntax } from "app/model/syntax";
import type { Article } from "app/parser/types";
import { ObjectResult, BooleanResult, ArrayResult } from "./result";
import { D1 } from "app/db/connection";

export interface IArticleRepository {
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

export interface IArticleD1Repository extends IArticleRepository {
  db: Readonly<D1>;
}

export interface IArticleD1RepositoryFactory extends IArticleRepositoryFactory {
  articleRepository: IArticleD1Repository | undefined;
  create(): IArticleD1Repository;
}
