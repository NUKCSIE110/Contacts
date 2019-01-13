class family{
    constructor(_contian, _grade, _id){
        this.contain = _contian;
        this.grade = _grade;
        this.id = _id;
        this.expanded = false;
        this.family = document.createElement('div');
        this.family.classList.add('family');
        this.baseNode = document.createElement('div');
        this.baseNode.innerText = `A${this.grade}${this.id}`;
        this.baseNode.classList.add('baseNode');

        this.toggleExpand = this.toggleExpand.bind(this);
        this.baseNode.addEventListener('click', this.toggleExpand);

        this.upperNode = [];
        this.family.appendChild(this.baseNode);
        this.contain.appendChild(this.family);
        for(let i=0; i<5; i++) this.addUpper(`A${this.grade}${this.id}`);
    }
    addUpper(id){
        let newUpper = document.createElement('div');
        newUpper.classList.add('upperNode');
        this.upperNode.push(newUpper);
    }
    toggleExpand(){
        if(this.expanded){
            this.collapse();
        }else{
            this.expand();
        }
    }
    expand(){
        this.expanded = true;
        this.family.innerHTML = "";
        for(let i of this.upperNode){
            this.family.appendChild(i);
        }
        this.family.appendChild(this.baseNode);
    }
    collapse(){
        this.expanded = false;
        this.family.innerHTML = "";
        this.family.appendChild(this.baseNode);
    }
}

class App{
    constructor(){
        this.familys = [];
        for(let i=1; i<=40; i++){
            let newFamily = new family(document.querySelector('.container'), 106, i);
            this.familys.push(newFamily);
        }
        document.querySelector(".container").style.width = `${this.familys.length*220}px`;
    }
}

var app = new App();