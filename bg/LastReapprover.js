export class LastReapprover {
    constructor(){
        this.reapprovingModules = [];
        this.readyModules = [];
        this.status = 'waiting';
        this.tabsToClose = [];
    }
    addModules(modules){
        modules.forEach(module => {
            const tabInfo = {
                active: false,
                url: module.galleryURL
            };
            this.reapprovingModules.push(module);
            chrome.tabs.create(tabInfo, this.rememberTab.bind(this));
        });
    }
    rememberTab(tab){
        const pendingModule = this.reapprovingModules.find
            (module => (!module.tabId && module.galleryURL === tab.pendingUrl) );
        pendingModule.tabId = tab.id;
    }
    getResponseFromGallery(response){
        if(!response || !response.text){
            // this.updateStatus('waiting');
            return console.log(response);
        }
        if(response.text === 'sent'){
            return this.tabsToClose.push(response.tabId);
        }
        // this.updateStatus('waiting');
        console.log(response);
    }
    closeTab(tabToClose){
        chrome.tabs.remove(tabToClose, this.removedTabAction.bind(this));
    }
    unloadedTabAction(tab){

    }
    loadingTabAction(tab){
        if(!this.tabsToClose.length) return;
        const tabToCloseId = this.tabsToClose.find(id => id === tab.id);
        if(!tabToCloseId) return;
        this.tabsToClose = this.tabsToClose.filter(id => id === tabToCloseId);
        this.closeTab(tabToCloseId);
    }
    completeTabAction(tab){
        if(!this.reapprovingModules.length) return;
        const moduleToReapprove = this.reapprovingModules.find
            (module => module.tabId === tab.id);
        this.readyModules.push(moduleToReapprove);
    }
    removedTabAction(){
        console.log('tab\'s been removed');
        // this.updateStatus('waiting');
    }
    // updateStatus(status){
    //     this.status = status;
    // }
    tick(){
        // if(this.status !== 'waiting')
        //     return;
        if(!this.readyModules.length){
            return;
        }
        const module = this.readyModules.shift();
        if(!module) return;
        chrome.tabs.sendMessage(
            module.tabId,
            module,
            this.getResponseFromGallery.bind(this)
        );
    }
}