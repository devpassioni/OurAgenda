import Database, {Database as DatabaseType} from 'better-sqlite3'
import path from 'path'

const dbPath = path.resolve(__dirname, "../../dev.db")
export const db: DatabaseType = new Database(dbPath);

db.pragma("journal_mode = WAL")
db.pragma("foreign_keys = ON")

