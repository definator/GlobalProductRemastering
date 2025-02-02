class VideoItem {
    constructor(node){
        this.node = node;
        this.activeClass = 'gpr-active';
        this.isActive;
    }
    setActive(){
        this.node.classList.add(this.activeClass);
        this.isActive = true;
    }
    unsetActive(){
        this.node.classList.remove(this.activeClass);
        this.isActive = false;
    }
    getMistakeBlock(){
        return this.node.querySelector('div.is-mistake');
    }
    init(){
        console.log(this.constructor.name, 'inited');
    }
};


var VideoCollection = class{
    constructor(rootSelector){
        this.rootSelector = rootSelector;
        this.items = [];
        this.activeItem;
    }
    setActiveItem(item){
        if(this.activeItem)
            this.activeItem.unsetActive();
        item.setActive();
        this.activeItem = item;
    }
    getActiveItem(){
        return this.items.find(item => item.isActive);
    }
    mouseoverHandler(e){
        const affectedItem = this.items.find(item => item.node.contains(e.target));
        if(!affectedItem || affectedItem.isActive) return;
        this.setActiveItem(affectedItem);
    }
    reloadItems(mutations){
        mutations.forEach(mutation => {
            if(!mutation.addedNodes || !mutation.addedNodes[0])
            return;
        
            const detailObj = {detail: {
                counter: mutation.addedNodes[0]
            }};
            const event = new CustomEvent('loadItems', detailObj);
            this.initItems();
            document.dispatchEvent(event);
        });
    }
    setReloadDetector(){
        const detector = document.querySelector('span#queue-counter');
        const config = {childList: true};
        const observer = new MutationObserver(this.reloadItems.bind(this));
        observer.observe(detector, config);
    }
    initItems(){
        const nodes = document.querySelectorAll(this.rootSelector);
        if(!nodes[0]) return;
        this.items = [];
        for(let node of nodes){
            const item = new VideoItem(node);
            item.init();
            this.items.push(item);
        }
    }
    init(){
        this.initItems();
        console.log(this, ' inited');
        this.setReloadDetector();
    }
};