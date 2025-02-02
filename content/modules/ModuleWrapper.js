class ModuleWrapper {
    constructor(module, node) {
        this.galleryURLPrefix = 'https://my.platformphoenix.com/user/photos?user_id=';
        this.galleryURL;
        this._node = node;
        this._instance = null;
        this.name = module.name;
        this._rootSelector = module.rootSelector;
        this.reloadDetector = module.reloadDetector;
        this._isActive = false;
        this.childModules = [];
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
    setChildModule(module){
        this.childModules.push(module);
    }
    getGalleryURL(){
        if(!this.instance.getProfileId) return;
        const profileId = this.instance.getProfileId();
        this.galleryURL = this.galleryURLPrefix + profileId;
        return this.galleryURL;
    }
    getPhotoId(){
        if(!this.instance.getPhotoId) return;
        const photoId = this.instance.getPhotoId();
        return photoId;
    }
    getLevel(){
        if(!this.instance.getLevel) return;
        return this.instance.getLevel();
    }
    getSkinColor(){
        if(!this.instance.getSkinColor) return;
        return this.instance.getSkinColor();
    }
    getPhotoInfo(){
        if(!this.instance.getPhotoInfo) return;
        return this.instance.getPhotoInfo();
    }
    init(){
        if(!window[this.name]) return;
        this.instance = new window[this.name](this._node);
        this.galleryURL = this.getGalleryURL();
        this.photoInfo = this.getPhotoInfo();
        this.photoId = this.getPhotoId();
        this.level = this.getLevel();
        this.skinColor = this.getSkinColor();
        return this.instance;
    }
}