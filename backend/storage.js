const fs = require('fs');

const STORAGE_FILE_PATH = './storage.json';

if(!fs.existsSync(STORAGE_FILE_PATH)) {
  fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify({address: '', counter: 0, metadata: {}}));
}

const saveContractAddress = address => {
    const storage = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH));
    storage.address = address;
    storage.counter = 0;
    storage.metadata = {};
    fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(storage));
}

const saveMetadata = metadata => {
    const storage = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH));
    const currentId = storage.counter;
    storage.metadata[currentId] = metadata;
    storage.counter++;
    fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(storage));
    return currentId;
}

const getContractAddress = () => {
    const storage = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH));

    if(storage.address === '') {
        return undefined;
    } else {
        return storage.address;
    }
}

const getMetadataById = (id) => {
    const storage = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH));

    if(id >= storage.counter) {
        return undefined;
    } else {
        return storage.metadata[id];
    }
}

const metadataCount = () => {
    return JSON.parse(fs.readFileSync(STORAGE_FILE_PATH)).counter;
}

module.exports = {saveContractAddress, getContractAddress, saveMetadata, getMetadataById, metadataCount};