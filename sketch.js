//+++先畫出一個基本圖形+++
let points = [[0,0],[4,4],[6,4],[8,2],[8,1],[6,-1],[-1,-1],[0,0],[-2,2],[-2,4],[-1,4],[0,3],[2,5],[2,7],[5,10],[9,10],[12,7],[13,8],[15,8],[13,6],[15,6],[14,5],[13,5],[13,3],[12,2],[12,1],[8,-3],[10,-5],[12,-5],[12,-6],[10,-6],[7,-3],[5,-3],[5,-6],[7,-6],[7,-7],[4,-7],[4,-3],[3,-3],[1,-1] ]; //設定各個點的位置
//+++小雞+++
var fill_colors = "d8e2dc-ffe5d9-ffcad4-f4acb7-9d8189-FFD275".split("-").map(a=>"#"+a)
var line_colors = "22223b-4a4e69-9a8c98-c9ada7-f2e9e4".split("-").map(a=>"#"+a)

var score = 0



function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
chick_sound=loadSound('chick.wav')
Bg_sound=loadSound('BGM.mp3')
bomb_sound=loadSound('bomb.wav')
bell_sound=loadSound('bell.wav')
win_pic=loadImage('chicken.avif')
lose_pic=loadImage('kfc.jpg')
}

//++++++畫points所有點的物件變數
var piyo //目前要處理的物件，暫時放在piyo變數內
var hiyoko = []  //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此。

//++++++設定飛彈物件的變數
var bullet //目前要處理的物件，暫時放在bullet變數內
var bullets = []  //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此。
//+++++++++++++++++

//++++++設定怪獸物件的變數
var monster 
var monsters = []  //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此。
//+++++++++++++++++

//++++++設定砲台位置
var shipP 
//+++++++++++++++++

function setup() {
  createCanvas(windowWidth, windowHeight);
  Bg_sound.play() //播放背景音樂

  shipP= createVector(width/2,height/2)  //預設砲台的位置為(width/2,height/2)
  for(var i=0;i<10;i=i+1){  //i=0,1,2,3,4,5,6,7,8,9
    piyo = new Obj({})  //產生一個Obj class元件
    hiyoko.push(piyo)  //把piyo的物件放入到hiyoko陣列內
  }
  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4,5,6,7,8,9
    monster = new Monster({})  //產生一個Obj class元件
    monsters.push(monster)  //把piyo的物件放入到hiyoko陣列內
  }


}

function draw() {
  background(200);

  
  //小雞的顯示
  for(let piyo of hiyoko) //只要是陣列的方式都可以用這個處理
  {
    piyo.draw()
    piyo.update()
    for(let bullet of bullets){   //檢查每一個飛彈物件
      if(piyo.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有碰觸到
        hiyoko.splice(hiyoko.indexOf(piyo),1)  //從倉庫hiyoko取出被滑鼠按到的物件編號(hiyoko.indexOf(piyo))，只取一個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score - 1
        chick_sound.play()
      }
    }
  }
 
  //飛彈的顯示
  for(let bullet of bullets) //只要是陣列的方式都可以用這個處理
  {
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示
  for(let monster of monsters) //只要是陣列的方式都可以用這個處理
  {
    if(monster.dead == true && monster.timenum>5){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){   //檢查每一個飛彈物件
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有碰觸到
        // monsters.splice(monsters.indexOf(monster),1)  //從倉庫hiyoko取出被滑鼠按到的物件編號(hiyoko.indexOf(piyo))，只取一個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score + 1
        monster.dead = true
        bell_sound.play()
      }
  }
}

  textSize(50)
  text(score,50,50) //在座標(50,50)上，顯示socre分數內容
  textSize(25)
  text("友好模式（小雞只有被射到翅膀時才會死掉）",100,50)
  push()  //重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)  //把砲台的中心點放在視窗的中間
    fill("#EF6F6C")
    noStroke()
    rotate(angle)
    triangle(-25,-25,-25,25,50,0)  //設定三個點，畫成一個三角形
    ellipse(0,0,50)


    

  pop()  //恢復原本設定，原點(0,0)在視窗的左上角

  if (monsters.length == 0) {
    hiyoko.splice(0, hiyoko.length); // 移除所有球體
    bullets.splice(0, bullets.length); // 移除所有子彈
    background(win_pic)
    text("謝謝泥拯救我們<3",width/2-20,height/2+50)
  }
  
  else if (hiyoko.length == 0) {
    hiyoko.splice(0, hiyoko.length); // 移除所有球體
    bullets.splice(0, bullets.length); // 移除所有子彈
    background(lose_pic)
    text("你害小雞變成...",width/2-200,height/2+400)
  }
 }

function mousePressed(){


//   //++++++++++++++++++++++++按一下產生一個飛彈+++++++++++++++++++++++++++++
  bullet = new Bullet({
  r:20
  }) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
  bullets.push(bullet) //把bullet的物件放入到bullets陣列內
  bomb_sound.play()
}

function keyPressed(){
  if(key==" "){  //按下空白鍵，發射飛彈，其實跟按下滑鼠的功能一樣
    bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
    bullets.push(bullet) //把bullet的物件放入到bullets陣列內
    bomb_sound.play()
  }
  
}