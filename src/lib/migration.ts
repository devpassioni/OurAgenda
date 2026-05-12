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
            );  
        CREATE TABLE IF NOT EXISTS professionals(
        id TEXT PRIMARY KEY,
        user_id TEXT FOREIGN KEY,
        bio TEXT NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS work_schedules(
        id TEXT PRIMARY KEY,
        professional_id TEXT FOREIGN_KEY,
        day_of_week INTEGER NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        lunch_start TEXT DEFAULT '12:00',
        lunch_end TEXT DEFAULT '13:00');

        
        CREATE TABLE IF NOT EXISTS appointments(
        id TEXT PRIMARY KEY,
        client_id TEXT FOREIGN KEY,
        professional_id TEXT FOREIGN KEY,
        service_id TEXT FOREIGN KEY,
        start_at TEXT NOT NULL,
        end_at TEXT NOT NULL,
        status TEXT NOT NULL,
        notes TEXT,
        created_at TEXT NOT NULL default(datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS professional_services(
        professional_id TEXT FOREIGN KEY,
        service_id TEXT FOREIGN KEY,);
        
    
    
    
    
    
    
    
    
    `)
    }
