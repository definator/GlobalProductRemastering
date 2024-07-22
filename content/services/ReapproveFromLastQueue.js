var ReapproveFromLastQueue = class {
    constructor(moduleManager){
        this.moduleName = 'PhotoLastItem';
        this.reapproveModuleName = 'CheckLastPhotos';
        this.moduleManager = moduleManager;
        this.keyPairs = {
            level: 1,
            ['HnS attribute']: 2,
            rotate: 3,
            crop: 4,
            age: 5,
            decline: 6,
            gender: 7,
            duplicate: 8,
            scamm: 9,
            trash: 0,
        };
        this.forbiddenTraffSources = [
            'neotalks'
        ];
    }
    keydownHandler(e){
        const activeModule = this.moduleManager.getActiveModule();
        if(!activeModule || activeModule.name !== this.moduleName) return;
        const keyNumber = parseInt(e.key);
        if(isNaN(keyNumber)) return;
        const photoLastItem = activeModule.instance;
        const keys = Object.keys(this.keyPairs);
        const reason = keys.find(key => this.keyPairs[key] === keyNumber);
        const formattedReason = reason.replace(' ', '-');
        photoLastItem.toggleForReapprove(formattedReason);
    }
    sendForReapprove(){
        const message = {};
        const modulesForReapprove = [];
        const modules = this.moduleManager.initedModules;
        modules.forEach(module => {
            const obj = {};
            const instance = module.instance;
            if(!instance.isForReapprove) return;
            obj.galleryURL = module.galleryURL;
            obj.photoId = instance.photoId;
            obj.level = instance.level;
            obj.skinColor = instance.skinColor;
            obj.activeReasons = instance.activeReasons;
            modulesForReapprove.push(obj);
        });
        message.serviceName = 'LastReapprover';
        message.action = 'addModules';
        message.data = modulesForReapprove;
        chrome.runtime.sendMessage(message);
    }
    clickHandler(e){
        const arr = [];
        const activeModule = this.moduleManager.getActiveModule();
        if(activeModule && activeModule.name === this.reapproveModuleName)
            return this.sendForReapprove();
    }
    send(reasons, photoId){
        const modal = document.querySelector('div#reasonsList');
        const reapproveWindow = document.querySelector('div.reason-re-approve');
        const hiddenInput = reapproveWindow.querySelector('input#photo-reaprove-id');
        const sendButton = reapproveWindow.parentNode.querySelector('button.re-approve');
        modal.style.display = 'block';
        modal.classList.add('in');
        modal.setAttribute('area-hidden', 'false');
        hiddenInput.value = photoId;
        reasons.forEach(reason => {
            const formattedReason = reason.replace('-', ' ');
            const label = reapproveWindow.querySelector(`[title="${formattedReason}"]`);
            const input = label.querySelector('input');
            input.checked = true;
        });
        sendButton.disabled = false;
        sendButton.click();
        sendButton.remove();
    }
    isForbiddenTraffSource(){
        const userInfos = document.querySelectorAll('div#user-info > span > b');
        for(let userInfo of userInfos){
            const lowerCasedInfo = userInfo.textContent.toLowerCase();
            const isContain = this.forbiddenTraffSources.find
                (source => source === lowerCasedInfo);
            if(isContain) return true;
        }
        return false;
    }
    receiveHandler(message, sender, sendResponse){
        let isLevelEqual = true;
        const srcModule = message;
        const {photoId, level, skinColor, tabId, activeReasons} = srcModule;
        const distModule = this.moduleManager.getModuleByPhotoId(photoId);
        const obj = {tabId: tabId};
        if(!distModule || distModule.section !== 'approved'){
            obj.text = 'no dist module';
            return sendResponse(obj);
        }
        if(activeReasons.includes('level'))
            isLevelEqual = (srcModule.level === distModule.level);
        if(!isLevelEqual) {
            obj.text = 'levels not equal';
            return sendResponse(obj);
        }
        if(activeReasons.includes('decline') &&
            this.isForbiddenTraffSource()){
                obj.text = 'forbidden traff source';
                return sendResponse(obj);
        }

        this.send(activeReasons, photoId);
        obj.text = 'sent';
        sendResponse(obj);
    }
    createReapproveBlock(parentNode){
        const mainBlock = document.createElement('div');
        mainBlock.className = 'gpr-last-reapprove-reasons';
        Object.keys(this.keyPairs).forEach(key => {
            const reasonTicker = key.substring(0, 3);
            const reasonBlock = document.createElement('div');
            const classValue = key.replace(' ', '-');
            reasonBlock.className = `gpr-lastra-${classValue}`;
            reasonBlock.title = key;
            reasonBlock.textContent = reasonTicker;
            mainBlock.appendChild(reasonBlock);
        });
        parentNode.appendChild(mainBlock);

    }
    loadItemHandler(e){
        const target = e.detail.module.node;
        this.createReapproveBlock(target);
    }
    init(){
        console.log('');
    }
};
