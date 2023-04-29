const {registerFont,loadImage,createCanvas} = require("canvas");
const { resolve } = require("path");
const StackBlur = require('stackblur-canvas');
var OpenType = require('opentype.js');

async function CreateBackground(bg,boderblur=0,bgblur=0){
    const oimage = await loadImage(bg)

    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(oimage, 0, 0, canvas.width, canvas.height);

    StackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, boderblur);
  
    // 绘制圆角矩形
    const radius = 35; // 圆角半径
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(canvas.width - radius, 0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
    ctx.lineTo(canvas.width, canvas.height - radius);
    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
    ctx.lineTo(radius, canvas.height);
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    ctx.clip();

    // 添加邊框
    const borderWidth = 15; // 邊框寬度
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = '#000';
    ctx.stroke(); 

    ctx.globalCompositeOperation = 'destination-over';
    
    const canvas1 = createCanvas(canvas.width, canvas.height);
    const ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(oimage, 0, 0, canvas1.width, canvas1.height);

    StackBlur.canvasRGBA(canvas1, 0, 0, canvas1.width, canvas1.height, bgblur);

    ctx.drawImage(canvas1, 0, 0, canvas.width, canvas.height);
    return canvas
}

async function addAvatar(bgcanvas,avatars){
    const circleX = bgcanvas.width/5
    const circleY = bgcanvas.height/2
    const circleRadius = 100

    const canvas = createCanvas(bgcanvas.width, bgcanvas.height);
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, circleY+circleRadius/2,circleRadius+circleRadius/2);
    gradient.addColorStop(0, '#33f');
    gradient.addColorStop(1, '#f33');


    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#fff';//gradient;
    ctx.stroke();
    ctx.fill();
    ctx.clip();

    const avatar = await loadImage(avatars)

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(avatar, circleX - circleRadius, circleY - circleRadius, circleRadius*2, circleRadius*2);



    const ctx2 = bgcanvas.getContext('2d');
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.drawImage(canvas,0,0)
    return bgcanvas
}

async function addTitle(c,welcomefont,welcomeText,welcomeTextFontSize=34,Titlefont,text,fontSize = 52,subTitleFont,subTitle,subTitleFontSize){
    const TextX = (c.width/5) * 2
    const TextY = (c.height/2) + (fontSize/2)
    const canvas = createCanvas(c.width, c.height);
    const ctx = canvas.getContext('2d');

    var path = Titlefont.getPath(text,TextX,TextY,fontSize);    

    path.draw(ctx);

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#F3F3F3';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fill();

    welcomefont.getPath(welcomeText,TextX, TextY - fontSize - 5, welcomeTextFontSize).draw(ctx)

    ctx.fillStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#000';
    ctx.fill();


    subTitleFont.getPath(subTitle,TextX,(c.height/4)*3.2,subTitleFontSize).draw(ctx)

    ctx.fillStyle = '#fff';
    ctx.fill();

    const ctx2 = c.getContext('2d');
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.drawImage(canvas,0,0)

    return c

}


/**
 * @typedef {Object} CardOptions
 * @property {string} [WelcomeTextFont] - The blur of boder.
 * @property {string} [Titlefont] - The blur of boder.
 * @property {string} [SubTitleFont] - The blur of boder.
 * 
 * @typedef {Object} BackgroundOptions
 * @property {number} [boderblur] - The blur of boder.
 * @property {number} [bgblur] - The blur of the background.
 * 
 * @typedef {Object} TextSizeOptions
 * @property {number} [WelcomeTextSize] - 
 * @property {number} [TitleSize] - 
 * @property {number} [SubtitleSize] - 
 */
class WelcomeCard{
    /**
    * @param {CardOptions} [options] - The options for the person.
    */
    constructor(options = {}){
        this.WelcomeTextFontPath =  options.WelcomeTextFont || "./fonts/NaikaiFont-Bold.ttf"
        this.TitlefontPath =  options.Titlefont || "./fonts/NotoSansTC-Black.otf"
        this.SubTitleFontPath =  options.SubTitleFont || "./fonts/NaikaiFont-Bold.ttf"
    }
    async LoadFonts(){
        this.WelcomeTextFont = await OpenType.load(this.WelcomeTextFontPath)
        this.Titlefont = await OpenType.load(this.TitlefontPath)
        this.subTitleFont = await OpenType.load(this.SubTitleFontPath)
    }
    /**
    * Create a Image.
    * @param {BackgroundOptions} [bgOptions] - The options for the person.
    * @param {TextSizeOptions} [textOptions] - The options for the person.
    */
    async CreateImageCard(BackgroundImg, Avatar, WelcomeText, Title, Subtitle, bgOptions={},textOptions={}){
        const BackgroundOptions1 = {
            boderblur: bgOptions.boderblur || 90,
            bgblur: bgOptions.bgblur || 8
        }
        const TextSize ={
            WelcomeTextSize: textOptions.WelcomeTextSize || 34,
            TitleSize: textOptions.TitleSize || 62,
            SubtitleSize:textOptions.SubtitleSize || 24
        }


        const welcomefont = this.WelcomeTextFont
        const Titlefont = this.Titlefont
        const SubTitleFont = this.subTitleFont
    
        const c_bg = await CreateBackground(BackgroundImg, BackgroundOptions1.boderblur, BackgroundOptions1.bgblur)
        const c_avatar = await addAvatar(c_bg, Avatar);
        const c_Title = await addTitle(c_avatar, welcomefont, WelcomeText,TextSize.WelcomeTextSize, Titlefont, Title, TextSize.TitleSize, SubTitleFont, Subtitle, TextSize.SubtitleSize)
    
        return c_Title.toBuffer('image/png')
    }
    
}

async function CreateImageCard(bg,avatar,WelcomeText,Title,Subtitle){

    const welcomefont = await OpenType.load('./fonts/NaikaiFont-Bold.ttf')
    const Titlefont = await OpenType.load('./fonts/NotoSansTC-Black.otf')
    const SubTitleFont = await OpenType.load('./fonts/NaikaiFont-Bold.ttf')

    const c_bg = await CreateBackground(bg, 90, 8)
    const c_avatar = await addAvatar(c_bg, avatar);
    const c_Title = await addTitle(c_avatar, welcomefont, WelcomeText, Titlefont, Title, 62, SubTitleFont, Subtitle, 24)

    return c_Title.toBuffer('image/png')

}

module.exports = { WelcomeCard,CreateImageCard }


