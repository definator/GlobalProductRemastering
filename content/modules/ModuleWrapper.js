class ModuleWrapper {
    constructor(module, node) {
        this._galleryURL;
        this._node = node;
        this._instance = null;
        this._name = module.name;
        this._rootSelector = module.rootSelector;
        this.reloadDetector = module.reloadDetector;
        this._isActive = false;
        this.childModules = [];
        this._photoId;
    }
    get name(){
        return this._name;
    }
    get photoId(){
        return this._photoId;
    }
    set photoId(id){
        this._photoId = id;
    }
    get level(){
        return this._level;
    }
    set level(lvl){
        this._level = lvl;
    }
    get skinColor(){
        return this._skinColor;
    }
    set skinColor(col){
        this._skinColor = col;
    }
    get photoInfo(){
        return this._photoInfo;
    }
    set photoInfo(info){
        this._photoInfo = info;
    }
    get galleryURL(){
        return this._galleryURL;
    }
    set galleryURL(url){
        this._galleryURL = url;
    }
    get instance(){
        return this._instance;
    }
    set instance(instance) {
        this._instance = instance;
    }
    set isActive(bool){
        this._isActive = bool;
    }
    get isActive(){
        return this._isActive;
    }
    get node(){
        return this._node;
    }
    get rootSelector(){
        return this._rootSelector;
    }
    get section(){
        return this.instance.section;
    }
    setChildModule(module){
        this.childModules.push(module);
    }
    init(){
        // debugger;
        if(!window[this.name]) return;
        this.instance = new window[this.name](this.node);
        this.galleryURL = this.instance.galleryURL;
        this.photoInfo = this.instance.photoInfo;
        this.photoId = this.instance.photoId;
        this.level = this.instance.level;
        this.skinColor = this.instance.skinColor;
        return this.instance;
    }
}