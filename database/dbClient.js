import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../data/db.json')
console.log(file);
const adapter = new JSONFile(file);
export const dbClient = new Low(adapter);

await dbClient.read()
dbClient.data = dbClient.data || { movies: [], genres: [] }
