//class :類別，粒子
class Obj{ //宣告一個類別，針對一個畫的圖案
    constructor(yun){  //預設值，基本資料(物件的顏色、移動的速度、大小、初始顯示位置......)
      // this.p = yun.p|| {x:random(width),y:random(height) }//描述為該物件的初始位置
                                //||(or)，當產生一個物件時，有傳給位置參數，則使用該參數

      this.p = yun.p || createVector(random(width),random(height))//把原本的{x:...,y:...}改成向量方式呈現
      // this.v =  {x:random(-1,1),y:random(-1,1) }  //設定一個物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1))  //把原本的{x:...,y:...}改成向量方式呈現
      this.size = random(5,10)  //一個物件放大倍率
      this.color = random(fill_colors)  //充滿顏色
      this.stroke = random(line_colors)  //外框線條顏色
    }
    draw(){  //畫出單一物件形狀
      push()  //執行push()的指令後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)  //以該物件位置為原點
        scale(this.v.x<0?1:-1,-1)  //X軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1
        fill(this.color)  //上色
        stroke(this.stroke) //上外框顏色
        strokeWeight(3)  //框線粗度
        beginShape()
          for(var k=0; k<points.length;k=k+1){
            vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一個點，當指令到endShape()，會把所有的點串接在一起
          }
        endShape()
      pop()  //執行pop()，原點(0,0)設定回到整個視窗的左上角
    }
    update(){  //移動的程式碼內容
      this.p.add(this.v)  //設定向量
      //向量sub==>減號

      if(this.p.x<=0 || this.p.x>=width){ //X軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把X軸方向，速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){ //X軸碰到上面(<=0)，或是碰到下面(>=width)
        this.v.y = -this.v.y  //把Y軸方向，速度方向改變
      }
    }
    isBallInRanger(x,y){  //功能：判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
      if(d<4*this.size){
        return true  //滑鼠與物件的距離小於寬度，代表碰觸了，則傳回true的值(有碰觸到)
        }else{
          return false //滑鼠與物件的距離大於寬度，代表沒有碰觸，則傳false的值(未碰觸到)
        }
      }

    }

