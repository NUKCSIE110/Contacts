class card{
    constructor(_contain, _className, _img, _text){
        this.contain = _contain;
        this.img = _img;
        this.text = _text;
        this.className = _className;
        this.element = document.createElement('div');
        this.element.classList.add(_className);
        this.element.style.backgroundImage = `url("${this.img}")`;
        this.element.innerText = this.text;

        this.onClick = this.onClick.bind(this);
        this.element.addEventListener('click', this.onClick);

        this.contain.appendChild(this.element);
    }
    onClick(){

    }
}

class family{
    constructor(_contian, _grade, _id){
        this.contain = _contian;
        this.grade = _grade;
        this.id = _id;
        this.expanded = false;
        this.family = document.createElement('div');
        this.family.classList.add('family');
        this.baseNode = document.createElement('div');
        this.baseNode.innerText = `A${this.grade}${5500+this.id}`;
        this.baseNode.classList.add('baseNode');

        this.toggleExpand = this.toggleExpand.bind(this);
        this.addUpper = this.addUpper.bind(this);
        this.baseNode.addEventListener('click', this.toggleExpand);
        this.baseNode.innerHTML=`<img src="${getAvatar(`a${this.grade}${5500+this.id}`)}">`;
        this.upperNode = [];
        this.family.appendChild(this.baseNode);
        this.contain.appendChild(this.family);
        let test=[103,104,105,106,107];
        for(let i of test){
            if(i==this.grade) continue;
            this.addUpper(i);
        }
    }
    addUpper(grade){
        //if(! inData(`a${grade}${5500+this.id}`)) return;
        let newUpper = document.createElement('div');
        newUpper.classList.add('upperNode');
        newUpper.innerHTML=`<img src="${getAvatar(`a${grade}${5500+this.id}`)}">`;
        newUpper.addEventListener('click', (function(){
            window.location.href = `/profile/${this.url}`;
        }).bind({'url': `a${grade}${5500+this.id}`}));
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
        this.currentUser = document.querySelector("#stuID").dataset.d;
        this.currentGrade = parseInt(this.currentUser.substring(1,4));
        this.currentID = parseInt(this.currentUser.substring(6,8));
        console.log(this.currentID);
        let mynode = {};
        for(let i=1; i<=40; i++){
            let newFamily = new family(document.querySelector('.container'), this.currentGrade, i);
            if(i==this.currentID) mynode=newFamily;
            this.familys.push(newFamily);
        }
        mynode.baseNode.scrollIntoView({'block':'center'});
        document.querySelector(".container").style.width = `${this.familys.length*220}px`;
    }
}

var data = {};
$.post('/profile/all',function(d){
    data=d;
    var app = new App();
},'json');

function inData(id){
    return (id in data);
}

function getAvatar(id){
    if(id in data){
        return data[id].avatar;
    }else{
        return `https://api.adorable.io/avatars/400/${id}.png`;
    }
}