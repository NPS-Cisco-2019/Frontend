export default function(imgPath){
    let img = new Image();
    img.src = imgPath;
    let base64Img;
    img.crossOrigin = 'Anonymous';
    let canvas = document.createElement('CANVAS');
    let ctx = canvas.getContext('2d');
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    base64Img = canvas.toDataURL();

    return base64Img;
}