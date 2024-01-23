import type { Scope } from "app/model/scope";
import { db, type Database } from "../connection";
import type { Syntax } from "app/model/syntax";
import { articles } from "../schema";
import type { ArticleRepository, ArticleRepositoryFactory } from "./types";
import type { Article } from "app/parser/types";
import type { BooleanResult, ObjectResult, ArrayResult } from "./result";

export class ArticleRepositoryImpl implements ArticleRepository {
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

export class ArticleRepositoryFactoryImpl implements ArticleRepositoryFactory {
  create(): ArticleRepository {
    return new ArticleRepositoryImpl(db);
  }
}

const articleRepository = new ArticleRepositoryFactoryImpl().create();
export default articleRepository;
