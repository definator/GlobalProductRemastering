class AdvancedBlock {
    constructor(itemNode){
        this.itemNode = itemNode;
        this.itemData, this.parentNode;
        this.bottomDivNames = ['hair', 'skin', 'body', 'tattoo',
                                'piercing', 'scamm', 'isMistake',
                                'notIndexedBySearchEngine'];
        this.responsiveNodes = ['label#hair-reset', 'label#skin-reset', 'label#body-reset',
                                'input[name="tattoo"]', 'input[name="piercing"]', 'label.scammer',
                                'input[name="isMistake"]', 'input[name="notIndexedBySearchEngine"]'];
    }
    createTopBlock(){
        const topItems = [];
        const topItemBlocks = [];
        const {tribes, declineReasons, reapproveReasons} = this.itemData;
        if(tribes)
            topItems.push(...tribes);
        if(declineReasons)
            topItems.push(...declineReasons);
        if(reapproveReasons)
            topItems.push(...reapproveReasons);
        const topBlock = document.createElement('div');
        topBlock.className = 'gpr-advanced-top-block';
        topItems.forEach(item => {
            const div = document.createElement('div');
            const bgImage = chrome.runtime.getURL(`assets/icons/${item.className}.png`);
            div.style.backgroundImage = `url(${bgImage})`;
            div.className = item.className;
            div.title = item.title;
            topItemBlocks.push(div);
        });
        topBlock.append(...topItemBlocks);
        return topBlock;
    }
    createBottomBlock(){
        const bottomBlock = document.createElement('div');
        this.bottomDivNames.forEach((divName, i) => {
            const respSelector = this.responsiveNodes[i];
            const respInput = this.parentNode.querySelector(respSelector);
            if(!respInput) return;
            const div = document.createElement('div');
            div.className = 'gpr-advanced-'+divName+'-block';
            div.title = divName;
            bottomBlock.appendChild(div);
        });
        bottomBlock.className = 'gpr-advanced-bottom-block';
        return bottomBlock;
    }
    createMainBlock(){
        const advancedBlock = document.createElement('div');
        const topBlock = this.createTopBlock();
        const bottomBlock = this.createBottomBlock();
        advancedBlock.className = 'gpr-advanced-block';
        advancedBlock.append(topBlock, bottomBlock);
        this.parentNode.appendChild(advancedBlock);
    }
    create(obj){
        this.itemData = obj;
        this.parentNode = this.itemNode.querySelector('form');
        this.createMainBlock();


        return this;
    }
}
var HnSItem = class extends BasicModule {
    constructor(node){
        super(node);
        this.node = node;
        this.customModules = [];
        this.isActive = false;
        this.mistakeInput;
        this.itemID;
        this.activeClass = 'gpr-active';
        this.hnsCategories = ['hair', 'skin', 'body'];
        this.secondaryCategories = ['tattoo', 'piercing', 'scammer', 'reapprove',
                                    'isMistake', 'notIndexedBySearchEngine'];
        this.hairValues = {
            'black': '1', 'red': '6', 'brown': '2',
            'blonde': '4', 'white': '7', 'bald': '8'
        };
        this.skinValues = {
            'black': '1', 'caucasian': '6', 'latin': '4',
            'asian': '7', 'middleeastern': '8', 'nativeamerican': '9'
        };
        this.bodyValues = {
            'slim': '1', 'medium': '2', 'ample': '3',
            'bigandbeautiful': '4', 'athletic': '5'
        };
        this.advancedBlock;
    }
    getReapproveReasons(){
        const arr = [];
        const reasonBlocks = this.node.querySelectorAll('.reapprove-reason-selector label');
        if(!reasonBlocks[0]) return undefined;
        Array.from(reasonBlocks).forEach(reasonBlock => {
            const obj = {};
            const reasonName = reasonBlock.title;
            const formattedReasonName = reasonName.replace(/\s/g, '').toLowerCase();
            obj.title = reasonName;
            obj.className = 'gpr-rr-'+formattedReasonName;
            obj.input = reasonBlock.querySelector('input');
            arr.push(obj);
        });
        return arr;
    }
    getTribes(){
        const arr = [];
        const tribeBlocks = this.node.querySelectorAll('label[class*=tribe-]');
        if(!tribeBlocks[0]) return undefined;
        Array.from(tribeBlocks).forEach(tribeBlock => {
            const obj = {};
            const tribeName = tribeBlock.className.split('tribe-')[1];
            obj.title = tribeName;
            obj.className = 'gpr-tribe-'+tribeName;
            obj.input = tribeBlock.querySelector('input');
            arr.push(obj);
        });
        return arr;
    }
    getDeclineReasons(){
        const arr = [];
        const decReasonBlocks = this.node.querySelectorAll('.decline-selector label[title]');
        if(!decReasonBlocks[0]) return undefined;
        Array.from(decReasonBlocks).forEach(decReasonBlock => {
            const obj = {};
            const decReasonName = decReasonBlock.title;
            const formattedName = decReasonName.toLowerCase();
            obj.title = decReasonName;
            obj.className = 'gpr-dr-'+formattedName;
            obj.input = decReasonBlock.querySelector('input');
            if(!obj.input){
                const forSelector = decReasonBlock.getAttribute('for');
                obj.input = this.node.querySelector(`input#${forSelector}`);
            }
            arr.push(obj);
        });
        return arr;
    }
    resetParameter(name){
        const resetLabel = this.node.querySelector(`label#${name}-reset`);
        if(resetLabel)
            resetLabel.click();
    }
    toggleParameter(name){
        const input = this.node.querySelector(`input[name="${name}"]`);
        if(input)
            input.click();
    }
    getMistakeInput(){
        const mistakeInput = this.node.querySelector('input[id^="isMistake"]');
        if(!mistakeInput) return false;
        const mistakeDetector = document.createElement('div');
        mistakeDetector.className = 'gpr-mistake-detector';
        // mistakeDetector.style.display = 'none';
        this.node.appendChild(mistakeDetector);
        return mistakeInput;
    }
    getItemID(){
        this.itemID = this.node.dataset.requestId;
        return this.itemID;
    }
    setActive(){
        this.node.classList.add(this.activeClass);
        this.isActive = true;
    }
    unsetActive(){
        this.node.classList.remove(this.activeClass);
        this.isActive = false;
    }
    updateHnSClasses(name){
        Object.keys(this[`${name}Values`]).forEach(key => {
            const val = this[`${name}Values`][key];
            const category = key;
            const input = this.node.querySelector(`input[name="${name}"][value="${val}"]`);
            const newClassName = `gpr-input-${category}-${name}`;
            input.classList.add(newClassName);
        });
    }
    getAdvancedMistakeInput(){
        const advMistakeInput = this.node.querySelector('.gpr-isMistake-block');
        if(!advMistakeInput) return undefined;
            return advMistakeInput;
    }
    getMistakeBlock(){
        const mistakeBlock = this.node.querySelector('label.mistake_inp');
        if(!mistakeBlock) return undefined;
        return mistakeBlock;
    }
    unsetMistake(){
        const mistakeInput = this.node.querySelector('input[name="isMistake"]');
        mistakeInput.checked = false;
    }
    setMistake(){
        const mistakeInput = this.node.querySelector('input[name="isMistake"]');
        mistakeInput.checked = true;
    }
    mouseClickHandler(e){
        let eventName = 'clickItem';
        const mistakePressed = e.target.closest('label.mistake_inp');
        if(mistakePressed)
            eventName = 'clickMistake';
        const detailObj = {
            detail: {
                target: e.target,
                currentTarget: this
            }
        };
        const event = new CustomEvent(eventName, detailObj);
        document.dispatchEvent(event);
    }
    addAdvancedBlock(){
        const obj = {};
        obj.tribes = this.getTribes();
        obj.declineReasons = this.getDeclineReasons();
        obj.reapproveReasons = this.getReapproveReasons();
        const advancedDiv = new AdvancedBlock(this.node).create(obj);
        this.customModules.push(advancedDiv);
    }
    addCustoms(){
        this.addAdvancedBlock();
    }
    init(){
        this.addCustoms();
        // this.updateDOM();
    }
}