import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { Scopes } from '../model/scope'
import { Syntaxes } from 'app/model/syntax'
import { nanoid } from 'nanoid'

export const articles = sqliteTable('articles', {
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