import  {ConfigManager} from './ConfigManager.js';
import {RandomTicker} from './RandomTicker.js';
import {ServiceManager} from './ServiceManager.js';
// import {LastReapprover} from './LastReapprover.js';

class App {
    constructor(ConfigManager){
        this.ConfigManager = ConfigManager;
    }
    // async installHandler(){
    //     console.log('installed');
    //     this.config = await this.ConfigManager.init();
    //     console.log(this.config);
    // }
    // async updateHandler(){
    //     console.log('updated');
    //     this.config = await this.ConfigManager.getFromStorage();
    //     console.log(this.config);
    // }
    // firstAction(installData){
    //     if(installData.reason === 'install')
    //         return this.installHandler();
    //     if(installData.reason === 'update')
    //         return this.updateHandler();
    // }
    // async receiveMessage(message, sender, sendResponse){
    //     // debugger;
    //     this.serviceManager.receiveMessage(message);
    //     // const {action, data} = message;
    //     // await this[action](data, sendResponse);
    // }
    // async sendConfig(data, sendResponse){
    //     console.log(this.config);
    //     console.log('sendResponse is ', sendResponse);
    //     this.config = await this.ConfigManager.init();
    //     sendResponse(this.config);
    // }
    // reapproveLast(data, sendResponse){
    //     console.log('reapproving last item');
    // }
    // loadedTabAction(tabId, changeInfo, tab){
    //     if(changeInfo.status === 'complete')
    //         this.serviceManager.performAction('loadedTab', tab);
    //     if(changeInfo.status === 'unloaded')
    //         this.serviceManager.performAction('unloadedTab', tab);
    // }
    // hangEventHandlers(){
    //     chrome.runtime.onInstalled.addListener(this.firstAction.bind(this));
    //     chrome.tabs.onUpdated.addListener(this.loadedTabAction.bind(this));
    //     // chrome.tabs.onRemoved.addListener(this.closedTabAction.bind(this));
    //     // chrome.tabs.onCreated.addListener(this.createdTabAction.bind(this));
    //     chrome.runtime.onMessage.addListener(this.receiveMessage.bind(this));
    // }

    async init(){
        this.config = await this.ConfigManager.init();
        console.log(this.config);
    }
}
new App(ConfigManager).init();