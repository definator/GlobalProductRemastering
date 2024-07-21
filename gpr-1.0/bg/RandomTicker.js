export class RandomTicker {
    constructor(serviceManager){
        this.serviceManager = serviceManager;
    }
    initiateTick(){
        this.serviceManager.tick();
        this.startTimer();
        console.log('ticker');
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    startTimer(){
        const time = this.getRandomInt(3000, 5000);
        setTimeout(this.initiateTick.bind(this), time);
    }
    init(){
        setTimeout(this.startTimer.bind(this), 200);
    }
}