class ModuleScanner {
    constructor(moduleTemplates){
        this.moduleTemplates = moduleTemplates;
    }
    scan(callback){
        this.moduleTemplates.forEach(moduleTemplate => {
            const nodes = document.querySelectorAll(moduleTemplate.rootSelector);
            if(!nodes[0]) return;
            for(const node of nodes){
                callback(moduleTemplate.name, node);
            }
        });
    }
}

class ModuleWatcher {
    constructor(moduleTemplates){
        this.callback = null;
        this.moduleTemplates = moduleTemplates;
    }
    findMatchingModule(node){

    }
    mutationReaction(mutations){
        const obj = {};
        mutations.forEach(mutation => {
            const {addedNodes} = mutation;
            if(!addedNodes[0]) return;
            addedNodes.forEach(addedNode => {
                // const matchingModule = this.findMatchingModule(addedNode);
                console.log(addedNode);
            });
            
        });
    }
    watch(callback){
        this.callback = callback;
        const target = document.body;
        const config = {childList: true, subtree: true};
        const observer = new MutationObserver(this.mutationReaction.bind(this));
        observer.observe(target, config);
    }
}

class ModuleManager {
    constructor(moduleTemplates){
        this.moduleTemplates = moduleTemplates;
        this.modules = [];
        console.log('modulemanager created');
    }
    addModule(name, node){
        console.log('Name of module is ', name);
        const module = new window[name](node);
        module.setModuleName(name);
        module.init();
        this.modules.push(module);
        console.log(module, 'ADDED');
    }
    init(){
        const moduleScanner = new ModuleScanner(this.moduleTemplates);
        const moduleWatcher = new ModuleWatcher(this.moduleTemplates);
        moduleScanner.scan(this.addModule.bind(this));
        // moduleWatcher.watch(this.addModule.bind(this))
        
    }
}