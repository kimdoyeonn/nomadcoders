const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const pointer = document.getElementById("jsPointer");

const INITILA_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

const POINTER_SIZE = "10px";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITILA_COLOR;
ctx.strokeStyle = INITILA_COLOR;
ctx.lineWidth = 2.5;

pointer.style.width = POINTER_SIZE;
pointer.style.height = POINTER_SIZE;
pointer.style.backgroundColor = INITILA_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  pointer.style.left = `${event.clientX + 15}px`;
  pointer.style.top = `${event.clientY - 15}px`;
  if (!painting) {
    pointer.style.display = "block";
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    pointer.style.display = "none";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function changeColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  pointer.style.backgroundColor = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handelModeClick() {
  if (filling == true) {
    filling = false;
    mode.innerHTML = "Fill";
  } else {
    filling = true;
    mode.innerHTML = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault(); // 우클릭 비활성화
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
  saveBtn.addEventListener("click", handleSaveClick);
}

if (colors) {
  Array.from(colors).forEach((color) => color.addEventListener("click", changeColorClick));
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handelModeClick);
}
