//Елементы DOM-дерева

const record = document.getElementById('record'),
      shot = document.getElementById('shot'),
      hit = document.getElementById('hit'),
      dead = document.getElementById('dead'),
      enemy = document.getElementById('enemy'),
      again = document.getElementById('again');

//Обект для оюновления информации о состоянии игры

const play = {
    record: 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data){
        this[data] += 1;
        this.render();
    },
    render(){
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;        
    }
};

//Обект с функциями для отображения сосояния клеток

const show = {
    hit: function(){

    },
    miss: function(elem){
       this.changeClass(elem, 'miss');
    },
    //Такое обявление приемлимо в современном синтаксисе,
    //и никак не влияет на работоспособность
    dead(){

    },
    changeClass(elem, val){
       elem.className = val;
    }
};

//Функция для ведения огня
const fire = (event) => {
    let target = event.target;
    show.miss(target);
    play.updateData = "shot";
};

//Инициализация игры
const init = () => {
    enemy.addEventListener('click', fire);
};

init();
