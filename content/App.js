
class App {
    constructor(){
        this.storageName = 'gprConfig';
        this.observerCounter = 0;
    }
    readyStateChangeListener(e){
        console.log("READYSTATECHANGE event");
        const images = document.querySelectorAll('img');
        const frames = document.querySelectorAll('.frame');
        console.log('Images length is: ', images.length);
        console.log('Frames length is: ', frames.length);
        console.log(e.target.readyState);
    }
    mutationObserverListener(mutations){
        mutations.forEach(mutation => {
            const addedNodes = mutation.addedNodes;
            const removedNodes = mutation.removedNodes;
            if(addedNodes && addedNodes.length){
                this.observerCounter++;
                addedNodes.forEach(addedNode => {
                    console.log('Added node: ',addedNode);
                    console.log(this.observerCounter);
                });
                return;
            }
            this.observerCounter--;
            removedNodes.forEach(removedNode => {
                console.log('Removed node: ',removedNode);
                console.log(this.observerCounter);
            });
        });
    }
    // mutationDebounce(){
    //     console.log('inside debounce');
    //     let timerId;
    //     return (...args) => {
    //         console.log('inside closure');
    //         if(timerId)
    //             return clearTimeout(timerId);
    //         timerId = setTimeout(() => {
    //             console.log('inside setTimeout');
    //             this.mutationObserverListener.apply(this, args);
    //         }, 100);
    //     }
    // }
    async init(){
        let config = await chrome.storage.local.get(this.storageName);
        config = config[this.storageName];
        console.log(config);
        this.moduleManager = new ModuleManager(config.modules);
        this.moduleManager.init();
        console.log(this.moduleManager);
        // const moduleCompiler = new ModuleCompiler(config);
        // moduleCompiler.compile();
        // moduleCompiler.watch();
        // const target = document.body;
        // const config = {childList: true, subtree: true};
        // const observer = new MutationObserver(this.mutationObserverListener.bind(this));
        // observer.observe(target, config);
        // console.log("The very START");
        // const images = document.querySelectorAll('img');
        // const frames = document.querySelectorAll('.frame');
        // console.log('Images length is: ', images.length);
        // console.log('Frames length is: ', frames.length);
        // console.log(document.readyState);
        // document.addEventListener('readystatechange', this.readyStateChangeListener.bind(this));
        // const nodes = document.querySelectorAll('div.col-4');
        // for(const node of nodes){
        //     const photoSearchItem = new PhotoSearchItem(node);
        //     photoSearchItem.init();
        // }
    }
}


new App().init();
