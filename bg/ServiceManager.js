import {LastReapprover} from './LastReapprover.js';

export class ServiceManager {
    constructor(){
        this.initedServices = [];
    }
    add(service){
        const initedService = new service();
        this.initedServices.push(initedService);
    }
    receiveMessage(message){
        // debugger;
        const {serviceName} = message;
        const {data} = message;
        const {action} = message;
        const service = this.initedServices.find
            (service => service.constructor.name === serviceName);
        if(!service) return;
        service[action](data);
    }
    performAction(name, data){
        const actionName = name + 'Action';
        this.initedServices.forEach(service => {
            if(service[actionName])
                return service[actionName](data);
        });
    }
    tick(){
        this.initedServices.forEach(service => {
            if(service.tick)
                service.tick();
        });
    }
    addAllServices(){
        this.add(LastReapprover);
    }
    init(){
        this.addAllServices();
    }
}