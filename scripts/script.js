//Елементы DOM-дерева

const record = document.getElementById('record'),
      shot = document.getElementById('shot'),
      hit = document.getElementById('hit'),
      dead = document.getElementById('dead'),
      enemy = document.getElementById('enemy'),
      again = document.getElementById('again'),
      header = document.querySelector('.header');

//Обект для обновления информации о состоянии игры

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

//Обект скораблями и методами слежки попаданий

const game = {
   ships: [
      {
          location: ['00', '01', '02', '03'],
          hit: ['', '', '', '']
      },
      {
          location: ['70', '80', '90'],
          hit: ['', '', '']
      },
      {
          location: ['09', '19'],
          hit: ['', '']
      },
      {
          location: ['99'],
          hit: ['']
      }
   ],
   shipsCount: 4
}

//Обект с функциями для отображения сосояния клеток

const show = {
    hit: function(elem){
        this.changeClass(elem, 'hit');
    },
    miss: function(elem){
       this.changeClass(elem, 'miss');
    },
    //Такое обявление приемлимо в современном синтаксисе,
    //и никак не влияет на работоспособность
    dead(elem){
        this.changeClass(elem, 'dead');
    },
    changeClass(elem, val){
       elem.className = val;
    }
};

//Функция для ведения огня
const fire = (event) => {
    let target = event.target;
    if(target.className === "" && target.tagName === 'TD'){
        show.miss(target);
        play.updateData = "shot";  
        //цикл для проверки на попадание в корабль
        for(let i = 0; i < game.ships.length; i++){
            const ship = game.ships[i];
            const index = ship.location.indexOf(target.id);
     
            if(index >= 0){
               show.hit(target);
               play.updateData = 'hit';
               ship.hit[index] = 'x';

               const life = ship.hit.indexOf('');
               //С помощю условия отмечаем потопленный корабль
               if(life < 0){
                   play.updateData = 'dead';

                   for(const id of ship.location){
                       show.dead(document.getElementById(id));
                   }

                   game.shipsCount -= 1;
                   if(game.shipsCount < 1){
                       header.textContent = 'GAME OVER';
                   }
               }
            }
         }
    };
 
   
};

//Инициализация игры
const init = () => {
    enemy.addEventListener('click', fire);
};

init();
