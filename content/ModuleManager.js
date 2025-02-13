class ModuleScanner {
    constructor(moduleTemplates){
        this.moduleTemplates = moduleTemplates;
    }
    scan(callback){
        const obj = {
            action: 'addModule',
            name: null,
            node: null
        };
        this.moduleTemplates.forEach(moduleTemplate => {
            const nodes = document.querySelectorAll(moduleTemplate.rootSelector);
            if(!nodes[0]) return;
            for(const node of nodes){
                obj.name = moduleTemplate.name;
                obj.node = node;
                callback(obj);
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
        const moduleTemplate = this.moduleTemplates.find
                    (tem => node.matches(tem.rootSelector));
        return moduleTemplate || undefined;
    }
    findInnerModules(node){
        const arr = [];
        const obj = {
            module: null,
            node: null
        };
        this.moduleTemplates.forEach(moduleTemplate => {
            const innerNodes = node.querySelectorAll(moduleTemplate.rootSelector);
            if(!innerNodes[0]) return;
            innerNodes.forEach(innerNode => {
                const matchingModule = this.findMatchingModule(innerNode);
                obj.module = matchingModule;
                obj.node = innerNode;
                arr.push(obj);
            });
            return arr || undefined;
        });
    }
    findMatchingModules(node){
        const arr = [];
        const obj = {
            module: null,
            node: null
        };
	    const moduleTemplate = this.findMatchingModule(node);
        if(moduleTemplate){
            obj.module = moduleTemplate;
            obj.node = node;
            arr.push(obj);
        }
        const innerModules = this.findInnerModules(node);
        if(innerModules)
            arr.push(...innerModules)
        
	    return arr[0] ? arr : undefined;
    }
    compileModules(nodes, action){
        const obj = {
            action: null,
            name: null,
            node: null
        };
        nodes.forEach(node => {
            const matchingModules = this.findMatchingModules(node);
            if(!matchingModules) return;
            matchingModules.forEach(matchingModule => {
                obj.action = action;
                obj.name = matchingModule.module.name;
                obj.node = matchingModule.node;
                this.callback(obj);
            });
        });
    }
    mutationReaction(mutations){
        mutations.forEach(mutation => {
            const {addedNodes, removedNodes} = mutation;
            if(addedNodes[0]){
                this.compileModules(addedNodes, 'addModule');
                console.log('added modules');
            }
            if(removedNodes[0]){
                this.compileModules(removedNodes, 'removeModule');
                console.log('removed modules');
            }
            
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
    addModule(obj){
        const {name, node} = obj;
        const module = new window[name](node);
        module.setModuleName(name);
        if(module.init)
            module.init();
        this.modules.push(module);
    }
    removeModule(obj){
        const {name, node} = obj;
        const requestedModuleIndex = this.modules.findIndex
                    (module => module.getNode() === node);
        if(!requestedModuleIndex) return;
        this.modules.splice(requestedModuleIndex, 1);
    }
    moduleReaction(obj){
        const {action} = obj;
        this[action](obj);
    }
    init(){
        const moduleScanner = new ModuleScanner(this.moduleTemplates);
        const moduleWatcher = new ModuleWatcher(this.moduleTemplates);
        moduleScanner.scan(this.moduleReaction.bind(this));
        moduleWatcher.watch(this.moduleReaction.bind(this));
        setTimeout(()=>console.log(this.modules), 5000);
    }
}
