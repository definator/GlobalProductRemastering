var PhotoLastItem = class {
    constructor(node){
        this._galleryURLPrefix = 'https://my.platformphoenix.com/user/photos?user_id=';
        this._levelPairs = {
            ['alert-success']: 'normal',
            ['alert-info']: 'social',
            ['alert-warning']: 'sexy',
            ['alert-light']: 'light',
            ['alert-danger']: 'hard'
        };
        this.classForReapprove = 'gpr-for-reapprove';
        this.classForActiveReason = 'gpr-ra-active';
        this.classForReason = '.gpr-lastra-';
        this._node = node;
        this.activeReasons = [];
        this._isForReapprove = false;
    }
    get node(){
        return this._node;
    }
    get isForReapprove(){
        return this._isForReapprove;
    }
    set isForReapprove(bool){
        this._isForReapprove = bool;
    }
    get photoId(){
        return this.node.getAttribute('photo-id');
    }
    get profileId(){
        const login = this.node.querySelector('a[data-user-id]');
        const id = login.dataset.userId;
        return id;
    }
    get galleryURL(){
        return this._galleryURLPrefix+this.profileId;
    }
    get skinColor(){
        const select = document.querySelector('select[id$="PhotoSearch_skinColor"]');
        const option = select.options[select.selectedIndex];
        const skinColor = option.textContent;
        return skinColor;
    }
    get level(){
        const alertNode = this.node.querySelector('.thumbnail');
        const currentKey = Object.keys(this._levelPairs).find(key => {
            if(!alertNode || !alertNode.classList) return;
            if(alertNode.classList.contains(key))
                return key;
        });
        const level = this._levelPairs[currentKey];
        return level;
    }
    setForReapprove(reason, reasonBlock){
        if(!this.isForReapprove)
            this.node.classList.add(this.classForReapprove);
        reasonBlock.classList.add(this.classForActiveReason);
        this.activeReasons.push(reason);
        this.isForReapprove = true;
    }
    unsetForReapprove(reason, reasonBlock){
        reasonBlock.classList.remove(this.classForActiveReason);
        const index = this.activeReasons.findIndex(reason => reason === reason);
        this.activeReasons.splice(index, 1);
        this.isForReapprove = false;
        if(!this.activeReasons.length)
            this.node.classList.remove(this.classForReapprove);
    }
    toggleForReapprove(reason){
        const block = this.node.querySelector(this.classForReason + reason);
        if(!block?.classList || !block.classList.contains(this.classForActiveReason))
            return this.setForReapprove(reason, block);
        this.unsetForReapprove(reason, block);
    }
};