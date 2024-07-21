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
        if(!response || !response.text){
            this.updateStatus('waiting');
            return console.log(response);
        }
        if(response.text === 'sent'){
            this.tabsToClose.push(response.tabId);
        }
    }
    closeTab(loadedTabId){
        chrome.tabs.remove(loadedTabId, this.removedTabAction.bind(this));
        // this.tabsToClose = this.tabsToClose.filter(tab => tab.id !== loadedTab.id);
    }
    reapproveTab(loadedTab){
        console.log(this.loadingTabs);
        console.log(this.tabsToClose);
        this.loadingTabs = this.loadingTabs.filter(tab => tab.id !== loadedTab.id);
        const loadedModule = this.modulesLoading.find
            (module => module.galleryURL === loadedTab.pendingUrl);
        loadedModule.tabId = loadedTab.id;
        this.modules.push(loadedModule);
    }
    loadedTabAction(tab){
        if(!this.loadingTabs.length && !this.tabsToClose.length) return;
        const tabToReapprove = this.loadingTabs.find(ltab => ltab.id === tab.id);
        if(tabToReapprove) return this.reapproveTab(tabToReapprove);
        const tabToClose = this.tabsToClose.find(ctabId => ctabId === tab.id);
        if(tabToClose) return this.closeTab(tabToClose);
    }
    removedTabAction(){
        this.tabsToClose = this.tabsToClose.filter(tab => tab.id !== this.processingTabId);
        this.processingTabId = null;
        this.updateStatus('waiting');
    }
    updateStatus(status){
        this.status = status;
    }
    tick(){
        if(this.status !== 'waiting')
            return;
        if(!this.modules.length){
            return;
        }
        this.updateStatus('processing');
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