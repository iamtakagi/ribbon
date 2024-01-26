import type { Scope } from "../model/scope";
import { db, type DB } from "../db/connection";
import type { Syntax } from "../model/syntax";
import { articles } from "../db/schema";
import type { Article } from "../parser/types";
import { injectable } from "inversify";
import "reflect-metadata";
import type {
  IArticleRepository,
  IArticleRepositoryFactory,
} from "./types";
import type { ObjectResult, BooleanResult, ArrayResult } from "./result";

@injectable()
export class ArticleRepository implements IArticleRepository {
  db: Readonly<DB>;
  constructor(db: DB) {
    this.db = db;
  }

  async upsertOne(
    id: string,
    scope: Scope,
    syntax: Syntax,
    title: string,
    description: string | null,
    raw: string
  ): Promise<ObjectResult<Article>> {
    let result;
    try {
      result = await this.db
      .insert(articles)
      .values({
        id,
        scope,
        syntax,
        title,
        description,
        raw,
      })
      .execute();
      if (!result) {
        return { error: result };
      } 
    } catch (error) {
      return { error: { message: "error" }}
    }
    return {
      object: result[0] ? (result[0] as unknown as Article) : undefined,
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
  articleRepository: IArticleRepository | undefined;
  create(): IArticleRepository {
    this.articleRepository = new ArticleRepository(db);
    return this.articleRepository;
  }
}
