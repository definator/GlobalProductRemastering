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
	const requestedTemplate = this.moduleTemplates.find(tem => node.matches(tem.rootSelector));
	return requestedTemplate || undefined;
    }
    mutationReaction(mutations){
        const obj = {};
        mutations.forEach(mutation => {
            const {addedNodes} = mutation;
            if(!addedNodes[0]) return;
            addedNodes.forEach(addedNode => {
                const matchingModule = this.findMatchingModule(addedNode);
                console.log(addedNode);
		if(!matchingModule) return;
		this.callback(matchingModule.name, addedNode);
		
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
    }
    addModule(name, node){
        const module = new window[name](node);
        module.setModuleName(name);
	if(module.init)
		module.init();
        this.modules.push(module);
    }
    init(){
        const moduleScanner = new ModuleScanner(this.moduleTemplates);
        const moduleWatcher = new ModuleWatcher(this.moduleTemplates);
        moduleScanner.scan(this.addModule.bind(this));
        moduleWatcher.watch(this.addModule.bind(this))
        
    }
}
