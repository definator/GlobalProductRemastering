var GalleryPhotoItem = class {
    constructor(node){
        this._photoInfo;
        this._levelPairs = {
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
    get photoInfo(){
        this._photoInfo = JSON.parse(this.node.dataset.photo);
        return this._photoInfo;
    }
    get levelNumber(){
        return this.photoInfo.level;
    }
    get level(){
        const keys = Object.keys(this._levelPairs);
        const level = keys.find(key => this._levelPairs[key] === this.levelNumber);
        return level;
    }
    get photoId(){
        return this.photoInfo.photoId;
    }
    get section(){
        return this.node.dataset.type;
    }
}