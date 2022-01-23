import fs from 'fs';

export const checkIfValidJson = (path) => {
	try {
		let data = fs.readFileSync(path, 'utf8');
		if(data == ''){
			data = '{}';
			try{
				fs.writeFileSync(path, data);
			} catch (err) {
				console.error(err);
			}
		}
		if(isJsonString(data)){
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.error(err);
	}
};

const isJsonString = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};