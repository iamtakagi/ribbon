import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export type Database = DrizzleD1Database<typeof schema>
export const db = drizzle(process.env.DB, { schema })