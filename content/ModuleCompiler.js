class ModuleCompiler{
    constructor(config){
        this.config = config;
        this.modules = [];
        this.activeClassName = 'gpr-active-module';
    }
    scan(selector){
        const nodes = document.querySelectorAll(selector);
        if(!nodes[0]) return undefined;
        return Array.from(nodes);
    }
    addModule(instance){
        this.modules.push(instance);
    }
    getActiveModule(){
        const requested = this.modules.find(module => module.node.contains(this.activeClassName));
        return requested;
    }
    getModulesByName(name){
        const requested = this.modules.filter(module => module.constructor[name]);
        return requested[0] ? requested : undefined;
    }
    getModulesBySelector(selector){
        const requested = this.modules.filter(module => module.node.matches(selector));
        return requested[0] ? requested : undefined;
    }
    getModulesByNode(node){
        const requested = this.modules.filter(module => node.closest(module.node));
        return requested[0] ? requested : undefined;
    }
    compile(){
        const {modules} = this.config;
        modules.forEach(moduleObj => {
            const {name, rootSelector} = moduleObj;
            const nodesArr = this.scan(rootSelector);
            if(!nodesArr) return;
            nodesArr.forEach(node => {
                const instance = new window[name](node);
                this.addModule(instance);
            });
        });
        if(!this.modules.length) return;
        
    }
}