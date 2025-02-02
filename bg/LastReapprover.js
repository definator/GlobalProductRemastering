export class LastReapprover {
    constructor(){
        this.modulesLoading = [];
        this.modules = [];
        this.loadingTabs = [];
        this.processingModule;
        this.processingTabId;
        this.status = 'waiting';
        this.modules = [];
        this.tabsToClose = [];
    }
    addModules(modules){
        modules.forEach(module => {
            const tabInfo = {
                active: false,
                // index: 0,
                url: module.galleryURL
            };
            this.modulesLoading.push(module);
            chrome.tabs.create(tabInfo, this.rememberTab.bind(this));
        });
    }
    rememberTab(tab){
        this.loadingTabs.push(tab);
    }
    delayBeforeClosing(){
        const tabId = this.tabsToClose.shift();
        chrome.tabs.remove(tabId, this.removedTabAction.bind(this));
    }
    getResponseFromGallery(response){
        if(!response || !response.text || response.text !== 'okay'){
            this.updateStatus('waiting');
            return console.log(response);
        }
        this.tabsToClose.push(response.tabId);
        setTimeout(this.delayBeforeClosing.bind(this), 1000);
    }
    loadedTabAction(tab){
        if(!this.loadingTabs.length) return;
        const loadedTab = this.loadingTabs.find(ltab => ltab.id === tab.id);
        if(!loadedTab) return;
        this.loadingTabs = this.loadingTabs.filter(tab => tab.id !== loadedTab.id);
        // debugger;
        const loadedModule = this.modulesLoading.find
            (module => module.galleryURL === loadedTab.pendingUrl);
        loadedModule.tabId = loadedTab.id;
        // loadedModule.instance.tabId = loadedTab.id;
        this.modules.push(loadedModule);
    }
    removedTabAction(){
        this.processingTabId = null;
        this.updateStatus('waiting');
    }
    updateStatus(status){
        this.status = status;
    }
    tick(){
        console.log(this.modules);
        console.log(this.modules.length);
        console.log(this.status);
        if(this.status !== 'waiting')
            return;
        if(!this.modules.length){
            return;
        }
        this.updateStatus('processing');
        console.log('Photos remained ', this.loadingTabs.length);
        console.log(this.modules);
        const module = this.modules.shift();
        this.processingTabId = module.tabId;
        chrome.tabs.sendMessage(
            module.tabId,
            module,
            this.getResponseFromGallery.bind(this)
        );
    }
}