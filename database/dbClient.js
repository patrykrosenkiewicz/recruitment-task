import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { checkIfValidJson } from '../utils/checkIfValidJsonFile.js';


export const initDb = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const file = join(__dirname, '../data/db.json');

	const isFileValid = checkIfValidJson(file);
	if(!isFileValid){
		throw new Error('Not connected to the database');
	}
	const adapter = new JSONFile(file);
	const dbClient = new Low(adapter);

	await dbClient.read();
	return dbClient;
};