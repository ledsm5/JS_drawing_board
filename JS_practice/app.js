const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange"); //붓 크기조젖ㅇ 
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE=700;



/* 기본적으로 캔버스는 크기 지정해줘야 실행가능 */
canvas.width= CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = "INITIAL_COLOR";    //직선 색깔
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;        /* 붓 크기 */


let painting = false;
let filling = false;
// onMouseMove 의 if문안에서
//   true 냐 false 냐에따라서 선을 그을지 말지를 결정한다.



function stopPainting() {
    painting = false;

}

function startPainting() {
    painting = true; 
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {         /* 마우스 클릭전 */
        console.log('creating path in', x,y)
        ctx.beginPath();    // 시작점 만들겠다 path = 지점
        ctx.moveTo(x,y);    /* 여기서부터 */
    }else {               /* 클릭한후 */
        console.log('creating line in', x,y)
        ctx.lineTo(x,y);    /* 시작점과 끝점을 직선으로 만들겠다. */
        ctx.stroke();       //직선
        //ctx.closePath();  시작점 고정
        //ctx.fill();       채우기
        
    }
}

/* function onMousedown(event) {
    painting = true;

} */

function handleColorClick(event) {
    const color = event.target.style.backgroundColor; //클릭했을때 배경색
    ctx.strokeStyle = color;    //선에다가지정
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    ctx.lineWidth=event.target.value;
}

function hadleModeClick(event) {
    if(filling === true) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
        
    }
}

function handleCanvasClick() {
    if (filling) {
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }
} 

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintOf01";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting); /* 마우스 클릭했을때 */
    canvas.addEventListener("mouseup" , stopPainting)/* 마우스를 놓으면  */
    canvas.addEventListener("mouseleave", stopPainting); /* 마우스가 캔버스를 떠났을때 */
    canvas.addEventListener("click" , handleCanvasClick);
    canvas.addEventListener("contextmenu",handleContextMenu);
}



Array.from(colors).forEach(anything => anything.addEventListener("click",handleColorClick));
//colors 를 배열로 받아와서         해당하는것을 클릭했을때   handleColorClick를 실행
//anything은 배열을 대표하는것  아무거나 넣어줘도 된다






if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click",hadleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}