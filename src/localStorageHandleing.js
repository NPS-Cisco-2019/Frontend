let style = document.documentElement.style;

export function changeMode(mode){
    if (mode === 'dark'){
        style.setProperty('--backCol', 'rgb(25, 25, 25)');
        style.setProperty('--backCol2', 'rgb(30, 30, 30)');  
        style.setProperty('--textCol', 'white');
        style.setProperty('--midGray', 'rgb(75, 75, 75)');
        style.setProperty('--midGray2', 'rgb(50, 50, 50)');
        style.setProperty('--filter', 'none')
    } else {
        style.setProperty('--backCol', 'white');
        style.setProperty('--backCol2', 'rgb(230, 230, 230)');  
        style.setProperty('--textCol', 'black');
        style.setProperty('--midGray', 'rgb(200, 200, 200)');
        style.setProperty('--midGray2', 'rgb(220, 220, 220)');
        style.setProperty('--filter', 'invert(1)')
    }
}