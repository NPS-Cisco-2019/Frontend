export default function(imgPath, { x, y, width, height }){
    let img = new Image();
    img.src = imgPath;
    let base64Img;
    img.crossOrigin = 'Anonymous';
    let canvas = document.createElement('CANVAS');
    let ctx = canvas.getContext('2d');
    canvas.height = height;
    canvas.width = width;
    ctx.drawImage(img, -x, -y);
    base64Img = canvas.toDataURL();

    return base64Img;
}