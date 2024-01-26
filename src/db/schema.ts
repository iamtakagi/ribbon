import { mysqlTable, text  } from "drizzle-orm/mysql-core";
import { Scopes } from '../model/scope'
import { Syntaxes } from '../model/syntax'
import { nanoid } from 'nanoid'

export const articles = mysqlTable('articles', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  scope: text('scope', { enum: Scopes }).notNull(),
  syntax: text('syntax', { enum: Syntaxes }).notNull(),
  title: text('title').notNull().unique(),
  description: text('description'),
  raw: text('raw').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})