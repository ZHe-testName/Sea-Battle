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
    record: localStorage.getItem('SeaBattleRacord') || 0,
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

//Обект с методами розстановки кораблей и методами слежки попаданий

const game = {
   ships: [],
   shipsCount: 0,
   optionShip: {
       count: [1, 0, 0, 0],
       size: [4, 3, 2, 1]
   },

   generateOptionsShip(shipSize){
      const ship = {
          hit: [],
          location: []
      }
      const direction = Math.random() > 0.5;
      let x, y;
      
      if(direction){
        console.log('горизонтальный');
        x = Math.floor(Math.random() * 10);
        console.log('x : ' + x);
        y = Math.floor(Math.random() * (10 - shipSize));
        console.log('y : ' + y);
      }else{
        console.log('вертикальный');
        x = Math.floor(Math.random() * (10 - shipSize));
        console.log('x : ' + x);
        y = Math.floor(Math.random() * 10);
        console.log('y : ' + y);
      }

      for(let i = 0; i < shipSize; i++){
          if(direction){
            ship.location.push(x + '' + (y + i));
          }else{
            ship.location.push((x + i) + '' + y);
          }
      }


      return ship;
   },

   generateShip(){
      for(let i = 0; i < this.optionShip.count.length; i++){
          for(let j = 0; j < this.optionShip.count[i]; j++){
              const size = this.optionShip.size[i];
              const ship = this.generateOptionsShip(size);
              this.ships.push(ship);
              this.shipsCount++;
          }
      }
   }
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
    //если у ячейки нет класса И ее имя тега - "td" И есть хоть один живой корабль...
    if(target.className === "" && target.tagName === 'TD' && game.shipsCount > 0){
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
                   //условие окончания игры
                   if(!game.shipsCount){
                       header.textContent = 'GAME OVER';
                       header.style.color = "red";
                       //Запись рекорда в localStorage,рендеринг
                       if(play.shot < play.record || play.record === 0){
                           localStorage.setItem('SeaBattleRacord', play.shot);
                           play.record = play.shot;
                           play.render();
                       }
                   }
               }
            }
         }
    };
 
   
};

//Инициализация игры
const init = () => {
    enemy.addEventListener('click', fire);
    play.render();
    game.generateShip();

    again.addEventListener('click', () => {
       location.reload();
    });

    record.addEventListener('dblclick', () => {
        localStorage.clear();
        play.record = 0;
        play.render();
    })
    console.log(game.ships);
};

init();
