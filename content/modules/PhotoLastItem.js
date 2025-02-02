// var PhotoLastItem = class {
//     constructor(node){
//         this.levelPairs = {
//             ['alert-success']: 'normal',
//             ['alert-info']: 'social',
//             ['alert-warning']: 'sexy',
//             ['alert-light']: 'light',
//             ['alert-danger']: 'hard'
//         };
//         this.classForReapprove = 'gpr-for-reapprove';
//         this.classForActiveReason = 'gpr-ra-active';
//         this.classForReason = '.gpr-lastra-';
//         this._node = node;
//         this.activeReasons = [];
//     }
//     get node(){
//         return this._node;
//     }
//     getProfileId(){
//         const login = this.node.querySelector('a[data-user-id]');
//         const id = login.dataset.userId;
//         return id;
//     }
//     getPhotoId(){
//         return this.node.getAttribute('photo-id');
//     }
//     getLevel(){
//         const alertNode = this.node.querySelector('.thumbnail');
//         // debugger;
//         const currentKey = Object.keys(this.levelPairs).find(key => {
//             if(!alertNode || !alertNode.classList) return;
//             if(alertNode.classList.contains(key))
//                 return key;
//         });
//         const level = this.levelPairs[currentKey];
//         return level;
//     }
//     getSkinColor(){
//         const select = document.querySelector('select[id$="PhotoSearch_skinColor"]');
//         const option = select.options[select.selectedIndex];
//         const skinColor = option.textContent;
//         return skinColor;
//     }
//     isForReapprove(){
//         return this.node.classList.contains(this.classForReapprove);
//     }
//     setForReapprove(reason, reasonBlock){
//         if(!this.isForReapprove())
//             this.node.classList.add(this.classForReapprove);
//         reasonBlock.classList.add(this.classForActiveReason);
//         this.activeReasons.push(reason);
//     }
//     unsetForReapprove(reason, reasonBlock){
//         reasonBlock.classList.remove(this.classForActiveReason);
//         const index = this.activeReasons.findIndex(reason => reason === reason);
//         this.activeReasons.splice(index, 1);
//         if(!this.activeReasons.length)
//             this.node.classList.remove(this.classForReapprove);
//     }
//     toggleForReapprove(reason){
//         // const formattedReason = 
//         const block = this.node.querySelector(this.classForReason + reason);
//         if(!block?.classList || !block.classList.contains(this.classForActiveReason))
//             return this.setForReapprove(reason, block);
//         this.unsetForReapprove(reason, block);
//     }
// };


var PhotoLastItem = class extends LastItem {
    constructor(node){
        super(node);
    }
}