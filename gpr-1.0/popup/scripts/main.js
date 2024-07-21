"use strict";

class PopupTab {
    constructor(name){
        this.name = name;
    }
}
class App {
    constructor(){}
    generateTabHeaders(){

    }
    async init(){
        await this.getConfig();
        this.generateTabHeaders();
    }
}
new App().init();