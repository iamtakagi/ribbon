import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema'

const connection = await mysql.createConnection({
    uri: process.env.DB,
});
export const db = drizzle(connection, { mode: "default", schema });
export type DB = typeof db;