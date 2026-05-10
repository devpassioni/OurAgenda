import "dotenv/config"
import {app} from "./app"
import {runMigrations} from "../src/lib/migration"

runMigrations()
const PORT = process.env.PORT ?? 3333



app.listen(PORT, () => {
    console.log(`Servidor rodando`)
})
