


class Controller {
    constructor(){
        this.config;
        this.storageName = 'gprConfig';
    }
    async getConfig(){
        const response = await chrome.storage.sync.get(this.storageName)
    }
    performEvent(e){
        const detailObj = {
            detail: {
                str: 'event has been caught'
            }
        };
        const event = new CustomEvent('addTopMenuItem', detailObj);
        console.log('popup event');
        document.dispatchEvent(event);
    }
    hangEventHandlers(){
        document.addEventListener('click', this.performEvent.bind(this));
    }
    async init(){
        this.config = await this.getConfig();
        this.hangEventHandlers();
        
    }
}

new Controller().init();
