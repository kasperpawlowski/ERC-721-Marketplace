const fs = require('fs');

const STORAGE_FILE_PATH = './storage.json';

if(!fs.existsSync(STORAGE_FILE_PATH)) {
  fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify({counter: 0, metadata: {}}));
}

const save = metadata => {
    const storage = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH));
    const currentId = storage.counter;
    storage.metadata[currentId] = metadata;
    storage.counter++;
    fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(storage));
    return currentId;
}

const getByIds = (from, to=0) => {
    const storage = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH));

    if(from >= to || from >= storage.counter) {
        return [];
    } else if(to == 0) {
        return storage.metadata[from];
    }

    let result = [];
    for(let i=from; i<to; i++) {
        result.push(storage.metadata[i]);
    }
    return result;
}

const entriesCount = () => {
    return JSON.parse(fs.readFileSync(STORAGE_FILE_PATH)).counter;
}

module.exports = {save, getByIds, entriesCount};