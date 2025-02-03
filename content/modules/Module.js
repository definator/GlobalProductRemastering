class Module {
    #type = 'inner';
    #node;
    #innerModules = [];
    constructor(node){
        this.#node = node;
        this.moduleName = null;
    }
    getModuleName(){
        return this.moduleName;
    }
    setModuleName(name){
        this.moduleName = name;
    }
    getNode(){
        return this.#node;
    }
    getType(){
        return this.#type;
    }
}

class BasicModule extends Module {
    #type = 'basic';
    #node;
    #activeClassName = 'gpr-active-module';
    constructor(node){
        super(node);
        this.#node = node;
    }
    getType(){
        return this.#type;
    }
    mouseEnterListener(){
        this.#node.classList.add(this.#activeClassName);
    }
    mouseLeaveListener(){
        this.#node.classList.remove(this.#activeClassName);
    }
    setEventListeners(){
        this.#node.addEventListener('mouseenter', this.mouseEnterListener.bind(this));
        this.#node.addEventListener('mouseleave', this.mouseLeaveListener.bind(this));
    }
    init(){
        this.setEventListeners();
    }
}
