import {db} from "./db"

export function runMigrations() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users(
        id  TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'CLIENT',
        phone TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        
        CREATE TABLE IF NOT EXISTS services(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        duration_min INTEGER NOT NULL,
        price REAL NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );  `)
    }
