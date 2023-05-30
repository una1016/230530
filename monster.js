var monster_colors = "274060-335c81-65afff-1b2845-5899e2".split("-").map(a=>"#"+a)
class Monster{
    constructor(yun){   //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置......)
        this.r = yun.r || random(30,100)  //設計的飛彈有大有小時，就傳參數yun.r來設定怪物大小，沒有傳參數，就以100為怪物大小
        this.p = yun.p || createVector(random(width),random(height)) //建立一個向量{x:width/2 , y:height/2 }
        this.v = yun.v || createVector(random(-1,1),random(-1,1))  //移動的速度，如果沒有傳yun參數，就會利用亂數(-1,1)，
        this.color = yun.color || random(monster_colors) //將以有顏色帶入並隨機呈現
        this.mode = random(["happy","bad"])  //設定心情(隨機)
        this.dead = false  //代表活著
        this.timenum = 0 //設定死亡時間
    }
    draw(){  //畫出元件
        if(this.dead == false){

            push()  //重新設定原點位置
                translate(this.p.x,this.p.y)  //把原點(0,0)座標移到物件中心位置
                fill(this.color)  //上色
                noStroke()  //不要邊框

                ellipse(0,0,this.r)  //畫外圍
                //++++++++++++
                if(this.mode=="happy"){  //如果怪物是開心模式
                    //++表情++(眼睛睜大)
                    fill(255)
                    ellipse(0,0,this.r/2)
                    fill(0)
                    ellipse(0,0,this.r/3)
                }else{  //如果是不開心
                    //++表情++(眼睛半睜)
                    fill(255)
                    arc(0,0,this.r/2,this.r/2,0,PI)
                    fill(0)
                    arc(0,0,this.r/3,this.r/3,0,PI)
                }
                //++++++++++++
                stroke(this.color)  //邊框上色
                strokeWeight(4)  //邊框粗度
                noFill()
                // line(this.r/2,0,this.r,0)
                for(var j=0;j<8;j++){
                    rotate(PI/4)
                

                beginShape()
                    for(var i=0;i<(this.r/2);i++){
                        vertex(this.r/2+i,sin(i/5+frameCount/2)*30) //腳動的幅度
                    }
                endShape()
                }
            pop()
        }
        else{  //怪物死亡的畫面
            push()
                this.timenum = this.timenum+4  //將死亡時間拉長
                translate(this.p.x,this.p.y)  //把原點(0,0)座標移到物件中心位置
                fill(this.color)  //上色
                noStroke()  //不要邊框
                ellipse(0,0,this.r) 
                stroke(255) //白色
                line(-this.r/2,0,this.r/2,0)
            pop()
        }
    }

    update(){  //計算出移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){ //X軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x  //把X軸方向，速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height){ //X軸碰到上面(<=0)，或是碰到下面(>=height)
            this.v.y = -this.v.y  //把Y軸方向，速度方向改變
          }

    }
    isBallInRanger(x,y){  //功能：判斷飛彈的位置是否移動到物件的範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
      if(d<this.r){
        return true  //飛彈(x,y)與物件的距離(this.p.x,this.p.y)小於寬度，代表碰觸了，則傳回true的值(碰觸)
        }else{
          return false //飛彈(x,y)與物件的距離(this.p.x,this.p.y)大於寬度，代表沒有碰觸，則傳false的值(未碰觸)
        }
      }

}