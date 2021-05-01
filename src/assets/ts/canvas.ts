let makeCanvas = () => {
  let canvas:any = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');
  let sw = canvas.width;
  let sh = canvas.height;
  let imgs:any = {
    "f1": require('../img/banner-image/sakuranoha.png'),
    "f2": require('../img/banner-image/sakuranohayoko.png'),
  };
  //图片加载
  function loading() {
    //全部资源数量
    let AllAmount = Object.keys(imgs).length;
    //加载完毕的资源数量
    let count = 0;

    for (let k in imgs) {
      //图片地址
      let src = imgs[k]
      //创建图片
      imgs[k] = new Image()
      //赋值图片地址
      imgs[k].src = src;
      imgs[k].onload = function () {
        count++;
        if (count == AllAmount) {
          start();
        }
      }
    }
  }

  //定义花瓣类
  class Flower {
    private img
    private x
    private y
    private w
    private h
    private del

    constructor(img:any, x:any, y:any, w:any, h:any) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.del = false;
    }
    //渲染
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
    //飘落
    updata() {
      if (this.x > sw || this.y > sh) {
        this.del = true;
      } else {
        this.del = false;
      }
      this.x += Math.random() * 1.5 + 1;
      this.y += Math.random() * 1.5 + 1;
    }
  }

  let fs:any = [];
  //创建花瓣
  function createFlower() {
    let wh = rand(0, 15);
    let flower = null;
    if (fs.length < 35) {
      if (rand(0, 10) > 5) {
        flower = new Flower(imgs['f1'], rand(20, sw - 20), rand(0, 10), wh, wh);
      } else {
        flower = new Flower(imgs['f2'], rand(20, sw - 20), rand(0, 10), wh, wh);
      }
      fs.push(flower);
    }
  }
  //渲染
  function allDraw() {
    for (let i = 0; i < fs.length; i++) {
      let flower = fs[i];
      if (flower.del) {
        fs.splice(i, 1);
        i--;
        continue;
      }
      flower.draw();
      flower.updata();
    }
  }

  //随机数
  function rand(min:any, max:any) {
    return Math.round(Math.random() * (max - min) + min);
  }

  loading();

  function start() {
    setInterval(begin, 1000 / 60)
  }

  function begin() {
    ctx.clearRect(0, 0, sw, sh);
    createFlower();
    allDraw();
  }
}

export {
  makeCanvas
}
