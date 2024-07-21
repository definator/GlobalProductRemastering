export class Model {
    constructor(){}
    getGeneralServices(config){
        return config.services;
    }
    initConfig(config){
        this.config = config;
        this.popupConfig = config.popupConfig;
        this.generalServices = this.getGeneralServices(config);
    }
}