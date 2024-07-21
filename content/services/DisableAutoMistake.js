var DisableAutoMistake = class {
    constructor(schema){
        this.schema = schema;
        this.mistakenClass = 'gpr-mistaken';
        this.input;
        this.affectedItem, this.mistakeBlock, this.mistakeInput;
    }
    mistakeClickedHandler(){
        const classList = this.affectedItem.node.classList;
        if(!this.mistakeInput.checked)
            return classList.remove(this.mistakenClass);
        classList.add(this.mistakenClass);
    }
    clickHandler(e){
        let isMistaken;
        this.affectedItem = this.schema.getActiveItem();
        if(!this.affectedItem) return;
        this.mistakeBlock = this.affectedItem.getMistakeBlock();
        if(!this.mistakeBlock) return;
        this.mistakeInput = this.mistakeBlock.querySelector('input');
        if(this.mistakeBlock.contains(e.target))
            this.mistakeClickedHandler();
        isMistaken = this.affectedItem.node.classList.contains(this.mistakenClass);
        if(isMistaken)
            return setTimeout(this.mistakeCheck.bind(this), 0);
        setTimeout(this.mistakeUncheck.bind(this), 0);
    }
    keydownHandler(e){
        let isMistaken;
        this.affectedItem = this.schema.getActiveItem();
        if(!this.affectedItem) return;
        this.mistakeBlock = this.affectedItem.getMistakeBlock();
        if(!this.mistakeBlock) return;
        this.mistakeInput = this.mistakeBlock.querySelector('input');
        isMistaken = this.affectedItem.node.classList.contains(this.mistakenClass);
        if(isMistaken)
            return setTimeout(this.mistakeCheck.bind(this), 0);
        setTimeout(this.mistakeUncheck.bind(this), 0);
    }
    mistakeUncheck(){
        this.mistakeInput.checked = false;
    }
    mistakeCheck(){
        this.mistakeInput.checked = true;
    }
    init(){
        console.log('inited service', this);
    }
}