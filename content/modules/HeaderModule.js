var TopMenu = class {
    constructor(node){
        this.node = node;
        this.items = [];
    }
    async init(){
        const menuItems = await chrome.storage.sync.get('top-menu');
    }
}

var HeaderModule = class extends BasicModule {
    constructor(node){
        super(node);
        this.customModules = [];
        this.node = node;
        this.surNameBlock;
        this.config;
    }
    initItems(){
        this.node = document.querySelector(this.rootSelector);
        this.surNameBlock = document.querySelector('ul.nav.pull-right > li');
    }
    mousedownHandler(e){
        // if(!this.surNameBlock.contains(e.target))
        //     return;
        // const event = new CustomEvent('toggleExtension');
        // document.dispatchEvent(event);
    }
    addTopMenuModule(){
        let topMenuModule;
        const div = document.createElement('div');
        const before = this.node.querySelector('div.brand');
        const parent = before.parentNode;
        div.className = 'gpr-topmenu';
        parent.insertBefore(div, before);
        topMenuModule = new TopMenu(div);
        this.customModules.push(topMenuModule);
        topMenuModule.init();
    }
    addTopMenuItemHandler(){
        console.log('top menu item added');
    }
    addCustoms(){
        this.addTopMenu();
    }
}
