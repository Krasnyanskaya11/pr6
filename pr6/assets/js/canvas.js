function canvas(selector, options){
    const canvas = document.querySelector(selector);
    canvas.classList.add('canvas')
    canvas.setAttribute('width', `${options.width || 400}px`)
    canvas.setAttribute('height', `${options.height || 300}px`)
 
 
    // отримання контексту для малювання
    const context = canvas.getContext('2d')
   // отримуємо координати canvas відносно viewport
    const rect = canvas.getBoundingClientRect();
 
    let myColor=context.strokeColor;
    let myWidth=5;
    let isPaint = false // чи активно малювання
    let points = [] //масив з точками
    
        // об’являємо функцію додавання точок в масив
    const addPoint = (x, y, dragging) => {
       // преобразуємо координати події кліка миші відносно canvas
      // console.log(myColor);
       points.push({
           x: (x - rect.left),
           y: (y - rect.top),
           dragging: dragging,
           color:myColor,
           width:myWidth,

       })
    }
    
         // головна функція для малювання
       const redraw = () => {
       //очищуємо  canvas
       context.clearRect(0, 0, context.canvas.width, context.canvas.height);
 
      context.strokeStyle = options.strokeColor;
       context.lineJoin = "round";
       context.lineWidth = options.strokeWidth;
       let prevPoint = null;
       for (let point of points){
           context.beginPath();
           if (point.dragging && prevPoint){
               context.moveTo(prevPoint.x, prevPoint.y)
           } else {
               context.moveTo(point.x - 1, point.y);
           }
           context.lineTo(point.x, point.y)
           context.closePath()
           context.stroke();
           prevPoint = point;
       }
    }
    
         // функції обробники подій миші
    const mouseDown = event => {
       isPaint = true
       addPoint(event.pageX, event.pageY);
       redraw();
    }
    
    const mouseMove = event => {
       if(isPaint){
           addPoint(event.pageX, event.pageY, true);
           redraw();
       }
    }
    
    // додаємо обробку подій
    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mouseup',() => {
       isPaint = false;
    });
    canvas.addEventListener('mouseleave',() => {
       isPaint = false;
    });

  // TOOLBAR
const toolBar=document.getElementById('toolbar')
// clear button

const clearBtn = document.createElement('img')
clearBtn.classList.add('btn')
//clearBtn.textContent = 'Clear'
clearBtn.src="assets/images/clear.png";
clearBtn.width="30";
clearBtn.height="30";

clearBtn.addEventListener('click', () => {
// тут необхідно додати код очистки canvas та масиву точок (clearRect)
context.clearRect(0, 0, context.canvas.width, context.canvas.height);//очистка полотна   
points=[];
})


toolBar.insertAdjacentElement('afterbegin', clearBtn)
//2
const downloadBTN=document.createElement('img')

downloadBTN.classList.add('btn')
//downloadBTN.textContent='Download'
downloadBTN.src="assets/images/download.png";
downloadBTN.width="30";
downloadBTN.height="30";
downloadBTN.addEventListener('click',()=>{
    const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    const newTab = window.open('about:blank','image from canvas');
    newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");

})

toolBar.insertAdjacentElement('afterbegin',downloadBTN);


//3

const saveBtN=document.createElement('img')
saveBtN.classList.add('btn')

saveBtN.src="assets/images/save.png";
saveBtN.width="30";
saveBtN.height="30";
saveBtN.addEventListener('click',()=>{

localStorage.setItem('points', JSON.stringify(points));
})
toolBar.insertAdjacentElement('afterbegin',saveBtN)
//4
const restoreBtn=document.createElement('img')
restoreBtn.classList.add('btn')


restoreBtn.src="assets/images/restore.png";
restoreBtn.width="30";
restoreBtn.height="30";

  restoreBtn.addEventListener('click', () => {
    let stringified_points = localStorage.getItem('points');
    points = JSON.parse(stringified_points);
    redraw();//перерисовать
    
  })
  toolBar.insertAdjacentElement('afterbegin',restoreBtn)
  //5
  const dateInfo=document.createElement('img')
dateInfo.classList.add('btn')
dateInfo.src="assets/images/clock.png";
dateInfo.width="30";
dateInfo.height="30";

dateInfo.addEventListener('click',()=>{
    const NowDate=new Date().toLocaleDateString();
    context.lineWidth=0.5;
    context.strokeText(NowDate,10,15);
   
})
toolBar.insertAdjacentElement('afterbegin',dateInfo)

//6 color-picker
const colorChoice=document.querySelector("#color-picker");
colorChoice.addEventListener('input',()=>{
    options.strokeColor=this.value;
myColor=this.value;
})

//7 
const sizeChoice=document.querySelector("#mySize");
sizeChoice.addEventListener('input',()=>{
    options.lineWidth=this.value;
    myWidth=this.value;

})
//8
const ourImage=document.querySelector("#image_canvas")
ourImage.addEventListener('click',()=>{
    const img = new Image;
img.src =`https://www.fillmurray.com/200/300)`;
img.onload = () => {
   context.drawImage(img, 0, 0);
}
})

}


    



 
 