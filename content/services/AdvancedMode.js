
var AdvancedMode = class {
    constructor(schema){
        this.schema = schema;
        this.advancedClass = 'gpr-advanced';
        // this.controller = controller;
        // this.schema = controller.schema;
        // this.itemClassName = 'gpr-advanced-item';
        // this.advancedDiv = 'gpr-advanced-div';
        // this.topOptionsClassName = 'gpr-advanced-top-options';
        // this.bottomOptionsClassName = 'gpr-advanced-bottom-options';
    }
    loadItemsHandler(e){
        const collection = this.schema.initedModules.find
                    (module => module.constructor.name === 'HnSCollection');
        if(!collection) return;
        const items = collection.items;
        items.forEach(item => {
            const node = item.node;
            node.classList.add(this.advancedClass);
        });
    }
    mousedownHandler(e){
        let responsiveNode;
        const title = e.target.title;
        if(!title) return;
        const item = this.schema.getActiveItem();
        const advancedModule = item.customModules.find(module=>
                                module.constructor.name === 'AdvancedBlock');
        if(!advancedModule) return;
        if(advancedModule.bottomDivNames.includes(title) && 
            !e.target.className.includes('-rr-')){
            const index = advancedModule.bottomDivNames.indexOf(title);
            const selector = advancedModule.responsiveNodes[index];
            responsiveNode = item.node.querySelector(selector);
            return responsiveNode.click();
        }
        const itemData = advancedModule.itemData;
        console.log(itemData);
        Object.keys(itemData).forEach(key => {
            const arr = itemData[key];
            if(!arr) return;
            const data = arr.find(obj => obj.title === title);
            if(!data) return;
            data.input.click();
        });
    }
    turnOff(){
        const collection = this.schema.initedModules.find
                    (module => module.constructor.name === 'HnSCollection');
        if(!collection) return;
        const items = collection.items;
        items.forEach(item => {
            const node = item.node;
            node.classList.remove(this.advancedClass);
        });
    }
    init(){
        console.log(this.constructor.name + ' has been inited');
    }
}