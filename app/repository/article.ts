import type { Scope } from "app/model/scope";
import { db, type Database } from "../db/connection";
import type { Syntax } from "app/model/syntax";
import { articles } from "../db/schema";
import type { Article } from "app/parser/types";
import { injectable } from "inversify";
import "reflect-metadata";
import type { IArticleRepository, IArticleRepositoryFactory } from "./types";
import type { ObjectResult, BooleanResult, ArrayResult } from "./result";

@injectable()
export class ArticleRepository implements IArticleRepository {
  #db: Database;
  constructor(db: Database) {
    this.#db = db;
  }

  async upsertOne(
    id: string,
    scope: Scope,
    syntax: Syntax,
    title: string,
    description: string | null,
    raw: string
  ): Promise<ObjectResult<Article>> {
    const result = await this.#db
      .insert(articles)
      .values({
        id,
        scope,
        syntax,
        title,
        description,
        raw,
      })
      .run();
    if (result.error) {
      return { error: result.error };
    }
    return {
      object: result.results[0] ? (result.results[0] as Article) : undefined,
    };
  }

  async deleteOne(id: string): Promise<BooleanResult> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<ObjectResult<Article>> {
    throw new Error("Method not implemented.");
  }

  async findMany(): Promise<ArrayResult<Article>> {
    throw new Error("Method not implemented.");
  }
}

@injectable()
export class ArticleRepositoryFactory implements IArticleRepositoryFactory {
  articleRepository: ArticleRepository | undefined;
  create(): ArticleRepository {
    this.articleRepository = new ArticleRepository(db);
    return this.articleRepository;
  }
}