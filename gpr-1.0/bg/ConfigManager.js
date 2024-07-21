import { defaultConfig } from "./defaultConfig.js";

class Config {
    constructor(defaultConfig){
        this.defaultConfig = defaultConfig;
        this.storageName = defaultConfig.storageName;
    }
    async getFromStorage(){
        const currentConfig = await chrome.storage.sync.get(this.storageName);
        return currentConfig[this.storageName];
    }
    async setStorage(storageName, obj){
        chrome.storage.sync.set({[storageName]: obj});
    }
    async init(){
        const storageConfig = await this.getFromStorage();
        if(storageConfig){
            storageConfig.status = "from storage";
            return storageConfig;
        }
        await this.setStorage(this.storageName, this.defaultConfig);
        return this.defaultConfig;
    }
}
export const ConfigManager = new Config(defaultConfig);