class NodeMounter {
    mount(obj){
        const parentNodes = document.querySelectorAll(obj.parentSelector);
        if(!parentNodes.length) return;
        for(let parentNode of parentNodes) {
            let beforeNode;
            const appendArr = [];
            const [nodeName, nodeClassName] = obj.node.split('.');
            const newNode = document.createElement(nodeName);
            newNode.className = nodeClassName;
            appendArr.push(newNode);
            if(obj.beforeSelector){
                beforeNode = parentNode.querySelector(obj.beforeSelector);
                appendArr.push(beforeNode);
            }
            parentNode[obj.appendType](...appendArr);
        }
    }
}

class ModuleManager {
    constructor(config){
        this.reloadSelectors = ['span#queueCounter',
                                'span#queue-counter'];
        this.modules = config.modules;
        this.customModules = config.customModules;
        this.initedModules = [];
        this.reloadDetectors;
        this.items = [];
        this.collections = [];
    }
    getActiveItem(){
        const activeItem = this.initedModules.find(module => {
            const node = module.node;
            if(node.className.contains('gpr-active-item'))
                return module;
        });
        return activeItem;
    }
    getActiveModule(){
        return this.initedModules.find(module => module.isActive);
    }
    getModuleByNode(node){
        const modules = this.initedModules;
        const targetModule = modules.find(module => module.node.contains(node));
        if(!targetModule) return;
        return targetModule;
        
    }
    getModuleByPhotoId(photoId){
        const module = this.initedModules.find(module => {
            if(!module.photoId) return;
            if(module.photoId === photoId)
                return module;
        });
        if(module)
            return module;
    }
    getModuleByName(name){
        return this.initedModules.find(module => module.moduleName === name);
    }
    setActiveModule(module, target){
        const curActiveModule = this.getActiveModule();
        if(!curActiveModule){
            module.isActive = true;
            return;
        }
        if(curActiveModule.node.isSameNode(module.node))
            return;
        curActiveModule.isActive = false;
        module.isActive = true;
    }
    eventHandler(e){
        let affectedModule;
        const eventName = e.type;
        if(eventName === 'mouseover'){
            // debugger;
            affectedModule = this.getModuleByNode(e.target);
            if(!affectedModule) return;
            this.setActiveModule(affectedModule, e.target);
        }
        if(!affectedModule) return;
        const funcName = eventName+'Handler';
        const func = affectedModule[funcName];
        if(func) func(e);
    }
    // chromeEventHandler(message){
    //     const funcName = 'receiveHandler';
    //     this.initedServices.forEach(service => {
    //         if(service[funcName])
    //             service[funcName](message);
    //     });
    // }
    mountCustomModules(){
        this.customModules.forEach(customModule => {
            debugger;
            let beforeElem;
            const {name, parentSelector, appendType, element} =
            customModule;
            if(!window[name]) return;
            const parentNodes = document.querySelectorAll(parentSelector);
            if(!parentNodes.length) return;
            const appendArray = [];
            const [elementType, elementClassname] = element.split('.');
            const newElement = document.createElement(elementType);
            appendArray.push(newElement);
            newElement.className = elementClassname;
            for(let node of parentNodes){
                if(customModule.beforeSelector){
                    beforeElem = node.querySelector(customModule.beforeSelector);
                    appendArray.push(beforeElem);
                }
                node[appendType](...appendArray);
                this.initModule(customModule, newElement);
            }
        });
    }
    reloadItem(mutations){
        mutations.forEach(mutation => {
            const added = mutation.addedNodes;
            if(!added || !added[0]) return;
            const detailObj = {detail: {
                counterNode: added
            }};
            const event = new CustomEvent('loadItem', detailObj);
            console.log('reloaded items');
            document.dispatchEvent(event);
        });
    }
    setReloader(reloadDetector){
        const reloader = document.querySelector(reloadDetector);
        const observer = new MutationObserver(this.reloadItem.bind(this));
        const config = {childList: true};
        observer.observe(reloader, config);
    }
    queryModules(obj){
        const arr = [];
        const isSubObject = (module, obj) => {
            for(let key in obj){
                if(!module.hasOwnProperty(key) || module[key] !== obj[key])
                    return false;
            }
            return true;
        };
        const result = this.modules.filter(module => {
            if(!isSubObject(module, obj)) return;
            return module;
        });
        return result;
    }
    deleteModules(modules){

    }
    initModule(module, node){
        let itemMult, detailsObj;
        const instance = new ModuleWrapper(module, node);
        instance.init();
        if(!instance) return;
        this.initedModules.push(instance);
        itemMult = instance.name.includes('Item');
        detailsObj = {detail: {
            module: instance
        }};
        if(itemMult){
            const event = new CustomEvent('loadItem', detailsObj);
            document.dispatchEvent(event);
        }
    }
    initCustomModules(){
        const customModules = this.customModules;

    }
    init(){
        const modules = this.modules;
        modules.forEach(module => {
            const nodes = document.querySelectorAll(module.rootSelector);
            if(!nodes[0]) return;
            nodes.forEach(node => this.initModule(module, node));
        });
    }
}

class ServiceManager {
    constructor(services){
        this.services = services;
        this.initedServices = [];
        this.moduleManager = null;
    }
    turnOnService(serviceName){
        const pageURL = window.location.href;
        const serviceObj = this.services[serviceName];
        const forbiddenPages = serviceObj.forbiddenPages;
        if(forbiddenPages && forbiddenPages.includes(pageURL))
            return console.log(`This page is currently forbidden for ${serviceName}`);
        const serviceDeclaration = window[serviceName];
        const service = new serviceDeclaration(this.moduleManager);
        service.init();
        this.initedServices.push(service);
    }
    turnOffService(serviceName){
        const service = this.initedServices.find
                        (service => service.constructor.name === serviceName);
        if(!service)
            return console.log(`Service ${serviceName} has not been inited yet`);
        const index = this.initedServices.indexOf(service);
        if(service.turnOff)
            service.turnOff();
        this.initedServices.splice(index, 1);
    }
    eventHandler(e){
        const eventName = e.type;
        if(eventName === 'mouseover') return;
        const funcName = eventName+'Handler';
        this.initedServices.forEach(service => {
            if(service[funcName])
                service[funcName](e);
        });
    }
    chromeEventHandler(message, sender, sendResponse){
        const funcName = 'receiveHandler';
        this.initedServices.forEach(service => {
            if(service[funcName])
                service[funcName](message, sender, sendResponse);
        });
    }
    addModuleManager(moduleManager){
        this.initedServices.forEach(service => {
            service.moduleManager = moduleManager;
        });
    }
    init(){
        Object.keys(this.services).forEach(key => {
            const state = this.services[key].state;
            if(!window[key] || !state) return;
            this.turnOnService(key);
        });
        return this.initedServices;
    }
}


class App {
    constructor(){
        this.config;
        this.moduleManager;
        this.services;
        this.activeModule;
        this.serviceManager
        this.storageName = 'gprConfig';
    }
    async getConfig(){
        const storageContent = await chrome.storage.sync.get(this.storageName);
        this.config = storageContent[this.storageName];
        console.log('config is ', this.config);
        return this.config;
    }
    mountCustomNodes(){
        const nodeMounter = new NodeMounter();
        this.config.customNodes.forEach(customNode => {
            nodeMounter.mount(customNode);
        });
    }
    initModuleManager(){
        this.moduleManager = new ModuleManager(this.config);
        this.moduleManager.init();
        this.serviceManager.addModuleManager(this.moduleManager);
    }
    initServiceManager(){
        this.serviceManager = new ServiceManager(this.config.services);
        this.serviceManager.init();
    }
    performEvent(e, instances, eventName){
        const funcName = eventName+'Handler';
        instances.forEach(instance => {
            if(!instance[funcName])
                return;
            instance[funcName](e);
        });
    }
    reactBasicEvent(e){
        this.moduleManager.eventHandler(e);
        this.serviceManager.eventHandler(e);
    }
    setBasicEvents(){
        const basicEvents = ['mouseover', 'mouseup', 'mousedown',
                                'click', 'keydown', 'loadItem',
                            'addTopMenuItem'];
        basicEvents.forEach(eventName => {
            document.addEventListener(eventName, this.reactBasicEvent.bind(this));
        });
    }
    reactChromeEvent(message, sender, sendResponse){
        // this.moduleManager.chromeEventHandler(message);
        this.serviceManager.chromeEventHandler(message, sender, sendResponse);
    }
    setChromeEvents(){
            chrome.runtime.onMessage.addListener(this.reactChromeEvent.bind(this));
    }
    async init(){
        let modules, services;
        this.config = await this.getConfig();
        if(!this.config)
            return console.log('Could not get config from background script');
        this.moduleManager = new ModuleManager(this.config);
        this.setBasicEvents();
        this.setChromeEvents();
        this.initServiceManager();
        this.initModuleManager();
        // this.initModuleManager();
        // modules = this.moduleManager.initedModules;
        // services = this.serviceManager.initedServices;
        // this.performEvent(undefined, modules, 'loadItem');
        // this.performEvent(undefined, services, 'loadItem');
        // this.setBasicEvents();
    }
}


new App().init();