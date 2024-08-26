/* Etch and Sketch script:
 * Global variables are meant to store user variables that change over the course of usage.
 *
 * Create functions create each part of the UI including buttons, canvas, sliders, and HTML color picker blah blah blah:
 * - Each object function contains an action listener and innerText as label.
 * - Each object function returns the object for the createUI function to append to it's respective div.
 *
 * Other things to note:
 * - When the background color changes,
 *   it has to be converted to RGB values for the change backgroud color
 *   to compare newBackgroundColor's value and current background color's value.
 * */

// Default settings
let ColorPicked = "rainbow";
let BrushColor = "";
let BackgroundColor = "white";
let MousedownOnCanvas = false;

// Divs
const SlidersDiv = document.getElementById("slider");
const CanvasDiv = document.getElementById("canvas");
const ColorPickersDiv = document.getElementById("color-pickers");
const ButtonsDiv = document.getElementById("buttons");

createUI();

function createUI() {
  // Default layout of canvas is 16x16
  createCanvas(16);

  // Initilizes all dom elements into arrays
  const objectsSlidersDiv = [
    canvasDimensionsRangeSliderObject(),
    canvasDimensionsLabelObject(),
  ];
  const objectsColorPickersDiv = [
    brushColorPickerLabelObject(),
    brushColorPickerObject(),
    backgroundColorPickerLabelObject(),
    backgroundColorPickerObject(),
  ];
  const objectsButtonsDiv = [
    resetButtonObject(),
    brushColorButtonObject(),
    rainbowColorButtonObject(),
    eraserButtonObject(),
  ];

  // Appends all all dom elements to respective dom element
  objectsSlidersDiv.forEach((dom) => SlidersDiv.appendChild(dom));
  objectsColorPickersDiv.forEach((dom) => ColorPickersDiv.appendChild(dom));
  objectsButtonsDiv.forEach((dom) => ButtonsDiv.appendChild(dom));
}

function createCanvas(dimensions) {
  // Adds dots, Y-axis for the first loop, X-axis for the second loop
  for (let index = 0; index < dimensions; index++) {
    for (let index = 0; index < dimensions; index++) {
      CanvasDiv.appendChild(dot(dimensions));
    }
  }

  CanvasDiv.addEventListener("touchmove", (e) => canvasTouchmoveAction(e));
  CanvasDiv.addEventListener("mouseup", () => (MousedownOnCanvas = false));
  CanvasDiv.addEventListener("mousedown", (e) => canvasMousedownAction(e));
}

/* Meant to color the canvas as finger drags across the canvas.
 *
 * If statement is there to prevent the brush to continously change colors of each dot when rainbow mode is on. It does this by preventing the color manager from changing the color of the selected dot once it's changed once.
 * */
function canvasTouchmoveAction(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
  const hasColored = targetElement.getAttribute("rainbowColored") === "true";

  if (targetElement.class === "dot" && !hasColored) {
    targetElement.style.backgroundColor = colorManager(ColorPicked);
    targetElement.setAttribute("rainbowColored", "true");
    canvasResetAllOtherElements(targetElement);
  }
}

/* Resets the state of every other dot so they can be colored.
 * */
function canvasResetAllOtherElements(targetElement) {
  const dotElements = CanvasDiv.children;

  for (let i = 0; i < dotElements.length; i++) {
    if (targetElement !== dotElements[i]) {
      dotElements[i].removeAttribute("rainbowColored");
    }
  }
}

/* Grants access to dots action listener while changing the color of the currently selected dot. Makes canvas feel instantanious.
 * */
function canvasMousedownAction(e) {
  const targetElement = document.elementFromPoint(e.clientX, e.clientY);
  if (targetElement.class === "dot") {
    targetElement.style.backgroundColor = colorManager(ColorPicked);
  }
  MousedownOnCanvas = true;
}

// Dots for canvas object
function dot(dimensionsOfCanvas) {
  const dot = document.createElement("div");
  const length = 100 / dimensionsOfCanvas;
  let rainbowColored = false;

  dot.style.width = length.toString() + "%";
  dot.style.height = length.toString() + "%";
  dot.style.backgroundColor = BackgroundColor;
  dot.class = "dot";

  dot.addEventListener("mousemove", () => {
    dotMousemoveAction(dot, rainbowColored);
    rainbowColored = true;
  });
  dot.addEventListener("mouseleave", () => (rainbowColored = false));

  return dot;
}

function dotMousemoveAction(dot, rainbowColored) {
  if (!MousedownOnCanvas) return null;
  if (ColorPicked === "rainbow" && !rainbowColored) {
    dot.style.backgroundColor = colorManager(ColorPicked);
  }
  if (ColorPicked !== "rainbow") {
    dot.style.backgroundColor = colorManager(ColorPicked);
  }
}

// Canvas Size Changer, Labels, Color Picker/Finders
function canvasDimensionsLabelObject() {
  const label = document.createElement("p");
  label.id = "canvasDimensionsLabel";
  label.innerText = "change dimensions of canvas: 16";
  return label;
}

function canvasDimensionsRangeSliderObject() {
  const canvasSizeChanger = document.createElement("input");
  canvasSizeChanger.type = "range";
  canvasSizeChanger.min = "1";
  canvasSizeChanger.max = "56";
  canvasSizeChanger.value = "16";
  canvasSizeChanger.id = "canvasSizeChanger";

  canvasSizeChanger.oninput = () => {
    document.getElementById("canvasDimensionsLabel").innerText =
      "change dimensions of canvas: " + canvasSizeChanger.value;
    changeDimensionsOfCanvas(canvasSizeChanger.value);
  };

  return canvasSizeChanger;
}

function changeDimensionsOfCanvas(newDimensions) {
  while (CanvasDiv.firstChild) CanvasDiv.removeChild(CanvasDiv.firstChild);

  createCanvas(newDimensions);
}

function brushColorPickerLabelObject() {
  const brushColorPickerLabel = document.createElement("p");
  brushColorPickerLabel.innerText = "change color of brush:";

  return brushColorPickerLabel;
}

function backgroundColorPickerLabelObject() {
  const backgroundColorPickerLabel = document.createElement("p");
  backgroundColorPickerLabel.innerText = "change color of background:";

  return backgroundColorPickerLabel;
}

function brushColorPickerObject() {
  const brushColorPicker = document.createElement("input");
  brushColorPicker.onchange = "colorSelected(this)";
  brushColorPicker.type = "color";
  brushColorPicker.id = "colorPicker";

  brushColorPicker.onchange = (e) => {
    ColorPicked = e.target.value;
    BrushColor = e.target.value;
  };

  return brushColorPicker;
}

// Buttons
function resetButtonObject() {
  const resetButton = document.createElement("button");
  resetButton.innerText = "reset the dang canvas";
  resetButton.className = "mc-button";
  resetButton.addEventListener("mousedown", () => resetCanvas());

  return resetButton;
}

function resetCanvas() {
  const dots = CanvasDiv.querySelectorAll("div");

  for (let index = 0; index < dots.length; index++) {
    dots[index].style.backgroundColor = BackgroundColor;
  }
}

function brushColorButtonObject() {
  const brushColorButton = document.createElement("button");
  brushColorButton.innerText = "brush mode";
  brushColorButton.className = "mc-button";
  brushColorButton.addEventListener(
    "mousedown",
    () => (ColorPicked = BrushColor)
  );

  return brushColorButton;
}

function rainbowColorButtonObject() {
  const randomColorButton = document.createElement("button");
  randomColorButton.innerText = "rainbow mode";
  randomColorButton.className = "mc-button";
  randomColorButton.addEventListener(
    "mousedown",
    () => (ColorPicked = "rainbow")
  );

  return randomColorButton;
}

function backgroundColorPickerObject() {
  const backgroundColorPicker = document.createElement("input");
  backgroundColorPicker.onchange = "colorSelected(this)";
  backgroundColorPicker.type = "color";

  backgroundColorPicker.onchange = (e) => {
    const backgroundColorPicked = e.target.value;
    changeBackground(backgroundColorPicked);
    BackgroundColor = htmlToRGB(backgroundColorPicked);
  };

  return backgroundColorPicker;
}

function htmlToRGB(color) {
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 7), 16);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function changeBackground(newBackgroundColor) {
  const dots = CanvasDiv.children;

  for (let index = 0; index < dots.length; index++) {
    if (dots[index].style.backgroundColor === BackgroundColor) {
      dots[index].style.backgroundColor = newBackgroundColor;
    }
  }
}

function eraserButtonObject() {
  const eraserButton = document.createElement("button");
  eraserButton.innerText = "erase me plz :D";
  eraserButton.className = "mc-button";
  eraserButton.addEventListener("mousedown", () => (ColorPicked = "erase"));

  return eraserButton;
}

// Managers
function colorManager(colorPicked) {
  if (colorPicked === "erase") return BackgroundColor;

  if (colorPicked !== "rainbow") return colorPicked;

  // Generate random color and return it
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
