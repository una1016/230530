//定義一個bullet 物件的class
class Bullet{
    constructor(yun){   //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置......)
        this.r = yun.r || 20  //設計的飛彈有大有小時，就傳參數，yun.r
        this.p = yun.p || shipP.copy() //建立一個向量{x:width/2 , y:height/2 }
        this.v = yun.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)  //用向量方式呈現
        this.color = yun.color ||"#B37BA4"  //上色
    }
    draw(){  //繪出物件程式碼
        push()
            translate(this.p.x,this.p.y)  //重新定義原點
            fill(this.color)  //上色
            noStroke()  //不要邊框
            ellipse(0,0,this.r)  //繪製飛彈
        pop()
  
    }
    update(){  //計算出移動後的位置
        //this.p.x = this.p.x+this.v.x
        //this.p.y = this.p.y+this.v.y
        this.p.add(this.v)
    }
  
  }