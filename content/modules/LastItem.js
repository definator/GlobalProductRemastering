var LastItem = class extends BasicModule {
    constructor(node){
        super(node);
        this.levelPairs = {
            ['alert-success']: 'normal',
            ['alert-info']: 'social',
            ['alert-warning']: 'sexy',
            ['alert-light']: 'light',
            ['alert-danger']: 'hard'
        };
    }
    getLevel(){
        const alertNode = this.node.querySelector('.thumbnail');
        if(!alertNode || !alertNode.classList)
            return;
        const currentKey = Object.keys(this.levelPairs).find(key => {
            if(alertNode.classList.contains(key))
                return key;
        });
        const level = this.levelPairs[currentKey];
        return level;
    }
    getPhotoId(){
        const photoId =  this.node.getAttribute('photo-id');
        return photoId || undefined;
    }
    getLink(){
        const link = this.node.querySelector('a[data-user-id]');
        return link || undefined;
    }
    getUserId(){
        const link = this.getLink();
        if(!link) return;
        const userId = link.dataset.userId;
        return userId;
    }
    getGalleryURL(){
        const link = this.getLink();
        if(!link) return;
        return link.href;
    }
    getNickname(){
        const link = this.getLink();
        if(!link) return;
        return link.textContent;
    }
    getAge(){
        const link = this.getLink();
        if(!link) return;
        return parseInt(link.nextSibling.textContent);
    }
}