export class View {
    constructor(controller){
        this.controller = controller;
        this.tabs = {};
    }
    applyConfig(config){
        this.config = config;
        this.activeTabID = config.popup.active;
    }
    makeActiveTab(tab){
        const marker = 'active',
        id = tab.id.split('_')[0],
        reqContent = document.querySelector(`#${id}`),
        curActives = document.querySelectorAll(`.${marker}`);
        for(let curActive of curActives)
            curActive.classList.remove(marker);
        tab.classList.add(marker);
        reqContent.classList.add(marker);
    }
    switchTab(e){
        const clickedTab = e.target;
        const activeMarker = 'active';
        const isTab = clickedTab.classList.contains('tab-header');
        const isActive = clickedTab.classList.contains(activeMarker);
        // const curActiveHeader = document.querySelector(`.${activeMarker}.tab-header`);
        // const curActiveContent = document.querySelector(`.${activeMarker}.tab-content`);
        const appropriateTab = isTab && !isActive;
        if(!appropriateTab)
            return;
        this.makeActiveTab(clickedTab);
    }
    renderPopupBase(){
        const tabContents = this.tabContents = document.querySelectorAll('div.tab-content');
        const tabs = this.tabs = document.querySelector('div#tabs');
        const activeMarker = 'active';
        for(const tabContent of tabContents){
            const tabHeader = document.createElement('div');
            const idText = tabContent.id;
            const classText = tabContent.classList;
            tabHeader.className = 'tab-header';
            tabHeader.id = `${idText}_header`;
            tabHeader.innerText = idText;
            if(idText === this.activeTabID){
                tabHeader.classList.add(activeMarker);
                classText.add(activeMarker);
            }
            this.tabs[idText] = tabContent;
            tabs.appendChild(tabHeader);
        }
    }
    createServiceBlock(service){
        const serviceName = service.name;
        const mainDiv = document.createElement('div');
        const mainToggler = document.createElement('input');
        mainDiv.className = 'accordeon-header';
        mainDiv.textContent = serviceName;
        mainToggler.type = 'checkbox';
        mainToggler.className = 'service-toggle';
        mainToggler.id = serviceName;
        this.tabs['services'].appendChild(mainDiv);
        mainDiv.appendChild(mainToggler);
    }
    renderServicesTab(services){
        for(let service of services){
            this.createServiceBlock(service);
        }
    }
}