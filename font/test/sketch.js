let font

function preload() {
  font = loadFont('./PaperOn.ttf')
}

function setup() {
  createCanvas(600, 600);
  textFont(font)
  textSize(128)
}

function draw() {
  background(220);

  // textWrap(CHAR);
  text('कखगघचछजझ', 0, 128);
  text('यरलवसश', 0, 128*2);
}
