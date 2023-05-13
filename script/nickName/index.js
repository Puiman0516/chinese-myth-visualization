let bornNum = 0 // 记载的生的次数
let nameNum = 0 // 别称的次数

let iNum = 0 // 读取json用

let ratio //别称与记载数的比值

let pressedI = 0

var pressArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 判断这个东西被点过没有

function preload() {
    //载入数据集用
    godNickname = loadJSON('../../data/nickName/godNickname.json')
    shadeWhite = loadImage('../../assets/img/nickName/shadeWhite2.png')
    moon = loadImage('../../assets/img/nickName/moon.png')
    title = loadFont('../../assets/font/LXGWWenKai-Regular.ttf')
}

function setup() {
    createCanvas(2850, displayHeight) //2700是圆最远的距离 2850正好多出一节空白
    background(0, 0, 0)
    // image(backgroundPic,0,0,width,height);

    fill(255)
    stroke(255)
    textFont(title)
    textSize(64)
    text('神 · 流传演变图', 70, 120)
    textSize(16)
    text('神的别称数量', 70, 180)
    // stroke()
    strokeWeight(10)
    line(200, 175, 320, 175)
    strokeWeight(1)

    text('神的流传次数', 70, 200 + 20)
    circle(250, 215, 30)
    imageMode(CENTER) // 图片效果
    tint(255, 150)
    image(moon, 250, 215, 35, 35)

    text('神的流传', 70, 220 + 40)
    text('变化占比', 70, 240 + 40)
    circle(250 - 20, 265, 30)
    image(moon, 250 - 20, 265, 35, 35)
    fill(0)
    noStroke()
    circle(265 - 20, 265, 30)

    fill(255)
    circle(250 + 40, 265, 30)
    image(moon, 250 + 40, 265, 35, 35)
    fill(0)
    noStroke()
    circle(255 + 40, 265, 30)

    fill(255)
    stroke(255)
    strokeWeight(5)
    line(50, height - 50, width - 50, height - 50) // 水平线
    for (let i = 100; i < 2700; i = i + 100) {
        // i是圆圈的横坐标
        tint(255, 170)
        godColor = godNickname[iNum]['color']
        bornNum = godNickname[iNum]['entry']
        nameNum = godNickname[iNum]['nickNameNum']
        ratio = nameNum / bornNum
        // text("hello", i, 200)
        noStroke()
        fill(godColor)
        iNum++
        if (i === 1300 || i === 1700 || i === 2000 || i === 2300 || i === 2400) {
            image(shadeWhite, i + 5, height - 50 - nameNum * 40 + 5, 90, 90)
        } else {
            image(shadeWhite, i - 5, height - 50 - nameNum * 40 + 5, 90, 90)
        } // 为了让光不会让黑色覆盖圆露馅 所以要细调两种的位置
        circle(i, height - 50 - nameNum * 40, 70) // 彩色月亮
        tint(128, 110) // 月球纹路透明度
        image(moon, i, height - 50 - nameNum * 40, 78, 78) //月球纹路效果
        // 月亮圆
        // fill(0);
        // circle(i+35-35*ratio,height-50-nameNum*40,70)
        // 用背景色填充的圆 减去他半径*占比 就能知道两者改变了多少
        if (i != 2200) {
            // stroke(godColor);
            stroke(150)
            line(i, height - 50 - nameNum * 40 + 50, i, height - 50 - 20)
            // 月亮尾巴的线
        }
    }
}

function draw() {
    // text(godNickname[0].name,50,50); //可以输出伏羲名字
    // text(godNickname[0]["nickName"][1],50,50); // 用一层层套就行啦
    // mousePressed();
}

function mousePressed() {
    noStroke()
    pressedI = Math.floor((mouseX + 64) / 100) // 最大值+64仍然小于200的话 可以判断100的范围
    if (pressArray[pressedI - 1] == 0 && mouseY > 50) {
        //变残月
        pressArray[pressedI - 1] = 1
        // text(pressArray[pressedI], 200,200)
        nameNum = godNickname[pressedI - 1]['nickNameNum']
        godColor = godNickname[pressedI - 1]['color']
        bornNum = godNickname[pressedI - 1]['entry']
        ratio = nameNum / bornNum
        fill(0)
        rect(pressedI * 100 - 50, height - 50 - nameNum * 40 - 50, 100, height - 50 - 20 - (height - 50 - nameNum * 40 + 50)) // 盖住之前那个
        tint(255, 170)
        image(shadeWhite, pressedI * 100 - 5, height - 50 - nameNum * 40 + 5, 90, 90)
        fill(godColor)
        circle(pressedI * 100, height - 50 - nameNum * 40, 70)
        tint(128, 110) // 月球纹路透明度
        image(moon, pressedI * 100, height - 50 - nameNum * 40, 78, 78) //月球纹路效果
        fill(0)
        circle(pressedI * 100 + 35 - 35 * ratio, height - 50 - nameNum * 40, 70)
        if (pressedI != 22) {
            stroke(255)
            strokeWeight(5)
            line(pressedI * 100, height - 50 - nameNum * 40 + 50, pressedI * 100, height - 50 - 20) // i换成100
        } // 22号没有线
        stroke(255)
        strokeWeight(3)
        text(godNickname[pressedI - 1]['nickName'], pressedI * 100, height - 25)
    } else if (pressArray[pressedI - 1] == 1 && mouseY > 50) {
        //变满月
        pressArray[pressedI - 1] = 0
        nameNum = godNickname[pressedI - 1]['nickNameNum']
        godColor = godNickname[pressedI - 1]['color']
        bornNum = godNickname[pressedI - 1]['entry']
        ratio = nameNum / bornNum
        fill(0)
        rect(pressedI * 100 - 50, height - 50 - nameNum * 40 - 35, 100, height - 50 - 20 - (height - 50 - nameNum * 40 + 50)) // 盖住之前那个
        tint(255, 170)
        image(shadeWhite, pressedI * 100 - 5, height - 50 - nameNum * 40 + 5, 90, 90)
        fill(godColor)
        circle(pressedI * 100, height - 50 - nameNum * 40, 70)
        tint(128, 110) // 月球纹路透明度
        image(moon, pressedI * 100, height - 50 - nameNum * 40, 78, 78) //月球纹路效果
        // fill(0);
        // circle(pressedI*100+35-35*ratio,height-50-nameNum*40,70);
        if (pressedI != 22) {
            stroke(150)
            strokeWeight(5)
            line(pressedI * 100, height - 50 - nameNum * 40 + 50, pressedI * 100, height - 50 - 20) // i换成100
        } // 22号没有线
        noStroke()
        fill(0)
        rect(0, height - 40, width, 100)
    }
}
