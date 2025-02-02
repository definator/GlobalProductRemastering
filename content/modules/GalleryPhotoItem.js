var GalleryPhotoItem = class {
    constructor(node){
        this.photoInfo;
        this.levelPairs = {
            normal: 0,
            sexy: 1,
            hard: 2,
            social: 3,
            light: 4
        };   
        this._node = node;
    }
    get node(){
        return this._node;
    }
    getLevelNumber(){
        this.photoInfo = JSON.parse(this.node.dataset.photo);
        return this.photoInfo.level;
    }
    getPhotoInfo(){
        this.photoInfo = JSON.parse(this.node.dataset.photo);
        return this.photoInfo;
    }
    getLevel(){
        const levelNumber = this.getLevelNumber();
        const keys = Object.keys(this.levelPairs);
        const level = keys.find(key => this.levelPairs[key] === levelNumber);
        return level;
    }
    getPhotoId(){
        return this.photoInfo.photoId;
    }
}