let roomAudio = document.getElementById("room");
let fogAudio = document.getElementById("fog");
let buzzAudio = document.getElementById("buzz");
let beat = document.getElementById("beat");
// let lightAudio = document.getElementById("light");

let roomAudioOn = false;
let fogAudioOn = false;
let lightAudioOn = false;
let buzzAudioOn = false;
let beatAudioOn = false;
let lightScroll = false;
let bodySonic = false;
let roomsound, fogsound;
let black = false;

let slider = document.getElementById("room_slider");
let slider_input;
let hereButton = document.getElementById("here_button");
let qAsked = false;
let promptPlay;

window.addEventListener("load", () => {
  hereButton.style.display = "none";
});

let lastScroll = 0;
let question = document.createElement("p");
let fQ = document.createElement("p");
let p1 = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");
let scrollprompt = document.createElement("p");
let scrollprompt2 = document.createElement("p");
let sp3 = document.createElement("p");
let sp4 = document.createElement("p");
let catchlight = document.createElement("p");
let fQAsked = false;
let prompt1 = false;

let hereClicked = false;

window.addEventListener("scroll", () => {
  let currentScroll = window.scrollY;

  if (currentScroll >= 150 && lastScroll <= currentScroll) {
    p1.innerHTML = "close your eyes";
    // $("prompt").one(append(p1));
    document.getElementById("prompt").appendChild(p1);
    background(0);
    fQ.innerHTML = "";
    prompt1 = true;
    promptPlay = setTimeout(function () {
      buzzAudio.play();
      buzzAudio.volume = 0.6;
      p1.innerHTML = "";
      p1.style.opacity = 0;

      scrollprompt2.innerHTML = "scroll down";
      document.getElementById("scrollprompt2").appendChild(scrollprompt2);
    }, 4000);

    setTimeout(function () {
      buzzAudio.pause();
      buzzAudio.volume = 0;
      p1.innerHTML = "";
    }, 4500);
  }
  if (currentScroll >= 450 && lastScroll <= currentScroll) {
    lastScroll = currentScroll;

    clearTimeout(promptPlay);
    // fQ.innerHTML = "";

    scrollprompt2.innerHTML = "";
    scrollprompt2.style.opacity = 0;
    p1.innerHTML = "";

    question.innerHTML = "Imagine yourself";
    document.getElementById("fog_q").appendChild(question);

    setTimeout(function () {
      question.style.display = "none";
    }, 1800);

    fogAudio.play();
    fogAudioOn = true;

    //shows the here button after the question is displayed
    setTimeout(function () {
      hereButton.style.display = "block";
    }, 1800);

    p2.innerHTML = "Look up";

    if (hereClicked == true) {
      question.style.display = "none";
      question.style.opacity = 0;

      hereButton.style.opacity = 0;
      document.getElementById("prompt2").appendChild(p2);

      sp3.innerHTML = "";
      sp3.style.opacity = 0;

      setTimeout(function () {
        p2.innerHTML = "";
        p2.style.opacity = 0;
        lightScroll = true;
        catchlight.innerHTML = "catch the light";
        document.getElementById("prompt").appendChild(catchlight);
      }, 1500);
    }
  } else {
    lastScroll = currentScroll;
    question.innerHTML = "";
    hereButton.style.display = "none";
  }

  // if (currentScroll >= 800 && lastScroll <= currentScroll) {
  //   lightScroll = true;
  // }

  if (currentScroll >= 1300 && lastScroll <= currentScroll) {
    sp4.innerHTML = "";
    sp4.style.opacity = 0;
    bodySonic = true;
  }

  //in case the user doesn't activate the light sounds
  if (currentScroll >= 1100 && lastScroll <= currentScroll) {
    if (lightAudioOn == false) {
      sound.play();
    }
  }
});

slider.addEventListener("click", () => {
  slider_input = slider.value;
  fQ.innerHTML = "Are you here?";

  if (slider_input == 100) {
    slider.style.opacity = 0;
    document.getElementById("room_q").appendChild(fQ);
    roomAudio.play();
    background(0);

    // setTimeout(function () {
    //   roomAudioOn = true;
    // }, 700);

    setTimeout(function () {
      qAsked = true;
    }, 850);
  }
});

hereButton.addEventListener("click", () => {
  hereButton.style.display = "none";

  hereClicked = true;

  oscP.start();

  modulator.start();
  modulator.disconnect();
  oscP.freq(modulator);

  if (baseFreq <= 200) {
    oscP.amp(0.1, 1);
  } else if (baseFreq >= 200 && baseFreq <= 400) {
    oscP.amp(0.025, 1);
  } else {
    oscP.amp(0.015, 1);
  }

  p3.innerHTML = "Turn your head from side to side";
  document.getElementById("prompt2").appendChild(p3);

  setTimeout(function () {
    beat.play();
    beatAudioOn = true;
    console.log(beatAudioOn);
  }, 3000);

  setTimeout(function () {
    p3.innerHTML = "";
    p3.style.opacity = 0;
  }, 3000);

  setTimeout(function () {
    sp3.innerHTML = "scroll down";
    document.getElementById("sp3").appendChild(sp3);
  }, 6000);
});

//global variables for fog
let tileCount = 150;
let noiseScale = 0.01;
let grid;
let xnoise;
let ynoise;
let t = 0;

//variables for sonic id path
let cnv;
let oscP, modulator;
let playing;
let analyzer;
let baseFreq;

let modMaxFreq;
let modMinFreq;
let modMaxDepth;
let modMinDepth;

let alpha;
let lastSc = 0;
let scroll = {
  y: null,
  spd: null,
};

//variables for light trigger animation
let fr = 30;
let lx, ly, lr;
let x1, x2;
let centerX, centerY;
let radius;
// let angle = 3.74;
let angle = 0;
let speed = 0.3;
let mhover = false;
let startStrobe = false;

//variables for light strobe
let t1 = 0;
let now = Date.now();

//global variables for p5 Lightroom audio
let sound, amplitude, amplitudeAll, size, level, levelAll;
let roomPan;

//global array for other sonic ids
let f;
let i = 0;
let c = 0;
let sonicIDs = [];
let sonicID;
let oscs = [];
let osc;
let colorsAll = [];
let colorAll, colorAll2;
let barAlpha;
let sonicHover = false;

//g variables for yes text
let content = "YES"; //variable for text string
let xStart = 0; //starting position of the text wall
let x1Start = 0;
let x = 0;
let xSpeed;
let cX, cY, cR;

let p5Font;

function preload() {
  sound = loadSound("Audio/lightM.mp3");
  // roomsound = loadSound("Audio/emptyroomM.mp3");
  p5Font = loadFont("text/VT323-Regular.ttf");
}

function setup() {
  cnv = createCanvas(windowWidth * 2, windowHeight * 2);
  cnv.parent("p5Div");

  frameRate(fr);
  z_off = 0;

  //setup for sonic iD
  oscP = new p5.Oscillator("sine");
  baseFreq = random(70, 800);
  oscP.freq(baseFreq);

  modMaxFreq = baseFreq - 100;
  modMinFreq = 0;
  modMaxDepth = 100;
  modMinDepth = -100;

  modulator = new p5.Oscillator("sawtooth");
  analyzer = new p5.FFT();
  analyzer.setInput(oscP);
  cnv.mouseWheel(changeAlpha);

  //setup for light animation
  centerX = windowWidth / 2;
  // centerY = windowHeight + 100;
  centerY = 0;
  radius = 250;

  amplitude = new p5.Amplitude();
  amplitudeAll = new p5.Amplitude();
  amplitude.setInput(sound);

  //EXAMPLE push other sonic IDs into the array
  for (f = 50; f < 800; f += 5) {
    sonicIDs.push(f);
  }

  for (c = 1; c <= 255; c += 2) {
    colorsAll.push(c);
  }

  //text
  textFont(p5Font);
  textAlign(CENTER, CENTER);
  // textSize(25);
  cX = windowWidth / 2;
  cY = windowHeight / 2;
  cR = 75;
}

function draw() {
  //text shows up after room audio
  if (qAsked == true) {
    textSize(25);
    background(0);
    push();
    noStroke();
    allText();
    pop();

    if (
      mouseX >= cX - 0 &&
      mouseX <= cX + cR &&
      mouseY >= cY - cR &&
      mouseY <= cY + cR
    ) {
      xStart = 0;
      x1Start = 0;
      black = true;
    }
  } else {
  }

  if (black == true) {
    background(0);
    roomAudioOn = true;
    fQAsked = true;
  }

  //from sketch https://editor.p5js.org/techty/sketches/HUs2dx-vF
  if (fogAudioOn == true) {
    // background(0);
    createGrid();
    showGrid();
    t += 0.005;
  }

  //sonic id code
  if (hereClicked == true) {
    personalTag();
  }

  if (lightScroll == true) {
    if (mhover == true) {
      //p5 audio analyzer or light audio
      sound.setVolume(0.3);
      sound.play();
      lightAudioOn = true;
      catchlight.innerHTML = "";
      catchlight.style.opacity = 0;

      // sp4.innerHTML = "scroll down";
      // document.getElementById("sp4").appendChild(sp4);
      setTimeout(function () {
        sp4.innerHTML = "scroll down";
        document.getElementById("sp4").appendChild(sp4);
      }, 4000);

      startStrobe = true;
    }

    //light animation code
    lx = centerX + radius * cos(angle);
    ly = centerY + radius * sin(angle);
    lr = 30;
    let lb = random(20, 50);

    if (frameCount % 5 == 0) {
      if (mhover == true) {
        angle = -1;
        lb = 10;
      } else {
        angle = angle + speed;
      }

      stroke(255);
      fill(255, 100);
      ellipse(lx, ly, lb);
      ellipse(lx, ly, lr);

      hover();
    }
    //old angles: angle >= 5.7 || angle <= 3.74
    if (angle >= 3.14 || angle <= 0.2) {
      speed *= -1;
    }
  }

  //strobe code
  if (startStrobe == true) {
    // updateVars();
    //tsize adjusts the rate of the light beam
    level = amplitude.getLevel();
    levelAll = amplitudeAll.getLevel();
    tsize = map(level, 0.001, 0.3, 0, 0.9);
    t1 += tsize;
    // t1 += vars.rate.value;
    let newPoints = map(level, 0.0008, 0.04, 1, 1000);
    let newRadiusNoise = map(level, 0.0008, 0.05, 0.0001, 3);
    let newAlphaNoise = map(level, 0.0008, 0.05, 0.0001, 3);

    //main light animation without the sliders
    // let spacing = PI / 2 / vars.points.value;
    let spacing = PI / 2 / newPoints;
    for (let i = 0; i < newPoints; i++) {
      let theta = i * spacing;
      let nuzz = noise(theta + t1);
      let radius = windowWidth * 2;
      // let radius = vars.radius.value; // + nuzz
      let x = radius * cos(theta + (nuzz - 0.5) * newRadiusNoise);
      let y = radius * sin(theta + (nuzz - 0.5) * newRadiusNoise);
      stroke(255, 255 * (nuzz - 0.3) * newAlphaNoise);
      line(0, 0, x, y);
    }
    p5light();
  }

  //sonic ID mimic

  if (bodySonic == true) {
    toggleAudio(cnv);

    if (sonicHover == true) {
      fill(0);
    } else {
      if (frameCount % 11 == 0) {
        push();
        barAlpha = map(level, 0, 1, 100, 255);
        fill(255, barAlpha);
        noStroke();
        rect(0, 0, 45, windowHeight + 100);
        rect(windowWidth - 25, 0, 50, windowHeight + 100);
        pop();
      }
      text(
        "move your mouse to the edges of the screen",
        windowWidth / 2,
        windowHeight - 100
      );
    }

    if (mouseX >= windowWidth - 100) {
      // sonicHover = true;
      push();
      barAlpha = map(level, 0, 1, 100, 255);
      stroke(255, barAlpha);
      noFill();
      // fill(255, barAlpha);
      // noStroke();
      translate(10, 0);
      rect(windowWidth - 25, 0, 25, windowHeight + 100);
      pop();
    }

    if (mouseX <= 100) {
      // sonicHover = true;
      push();
      barAlpha = map(level, 0, 1, 100, 255);
      stroke(255, barAlpha);
      noFill();
      rect(0, 0, 30, windowHeight + 100);
      pop();
    }

    for (let osc of oscs) {
      osc.sonicTag(colorAll, colorAll2);
    }
  }

  if (oscs.length >= 20) {
    let backgroundAlpha = map(oscs.length, 20, 50, 0, 255);
    background(255, backgroundAlpha);
  }

  if (fQAsked == true) {
    yesText.visible = true;

    setTimeout(function () {
      scrollprompt.innerHTML = "scroll down";
      document.getElementById("scrollprompt").appendChild(scrollprompt);
    }, 1700);
  } else {
    yesText.visible = false;
  }

  if (prompt1 == true) {
    yesText.visible = false;
    scrollprompt.innerHTML = "";
    scrollprompt.style.opacity = 0;
  }

  //call render
  renderer.render(scene, camera);

  moveCamera();

  animate();
}
//end Draw

//functions for yes text
function allText() {
  push();
  for (let x = xStart; x < windowWidth; x += 45) {
    //use a for loop to draw the line of text multiple times down the vertical axis
    fill(255, 255, 255, x / 4); //create a gradient by associating the fill color with the y location of the text
    text(content, x, windowHeight / 10); //display text
    text(content, x, windowHeight / 2); //display text
    text(content, x, windowHeight / 4); //display text
    text(content, x, (3 * windowHeight) / 4); //display text
    text(content, x, windowHeight - 50); //display text
  }
  xSpeed = map(mouseY, 0, windowHeight, 5, 18);
  xStart -= xSpeed;

  for (let x = x1Start; x < windowWidth; x += 45) {
    fill(255, 255, 255, 255 - x / 4);
    text(content, x, windowHeight / 8);
    text(content, x, windowHeight / 3);
    text(content, x, (2 * windowHeight) / 3);
    text(content, x, windowHeight - 420);
    text(content, x, windowHeight - 390);
    text(content, x, windowHeight - 150);
  }
  if (x1Start >= windowWidth || x1Start >= 0) {
    x1Start = xStart - 45;
  }
  xSpeed = map(mouseX, 0, windowWidth, 5, 20);
  x1Start += xSpeed;

  if (
    mouseX >= cX - 200 &&
    mouseX <= cX + 200 &&
    mouseY >= cY - 200 &&
    mouseY <= cY + 200
  ) {
    let strokeEllipse = map(mouseY, windowHeight, 0, 0, 255);
    strokeWeight(strokeEllipse);
    stroke(255, strokeEllipse);
    yesEllipse();
    textSize(0);
  }
  pop();
}

let ellipseShown = false;
function yesEllipse() {
  ellipse(cX + 50, cY, cR + 200);
  ellipseShown = true;
}

// functions to make fog
function createGrid() {
  grid = [];
  let tileSize = width / tileCount;
  ynoise = t;
  for (let row = 0; row < tileCount; row++) {
    grid[row] = [];
    xnoise = t;
    for (let col = 0; col < tileCount; col++) {
      let x = col * tileSize;
      let y = row * tileSize;
      let a = noise(xnoise, ynoise) * 150;
      grid[row][col] = new Tile(x, y, tileSize, a);
      xnoise += noiseScale;
    }
    ynoise += noiseScale;
  }
}
function showGrid() {
  for (let row = 0; row < tileCount; row++) {
    for (let col = 0; col < tileCount; col++) {
      grid[row][col].show();
    }
  }
}
class Tile {
  constructor(x, y, size, a) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.c = color(200, a);
  }

  show() {
    noStroke();
    fill(this.c);
    // if (mhover == true) {
    //   fill(0);
    // } else {
    //   fill(this.c);
    // }
    rect(this.x, this.y, this.size, this.size);
  }
}

//sonic ID animation
function personalTag() {
  let modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);

  let modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);

  waveform = analyzer.waveform();

  // cnv.mouseWheel(changeAlpha);

  push();
  beginShape();
  noFill();
  for (let i = 0; i < waveform.length; i++) {
    let y = map(i, 0, waveform.length, windowHeight, 0);
    let d = map(mouseY, windowHeight, 0, 1, 5);
    let x = map(waveform[i], -d, d, -windowWidth / 2, windowWidth / 2);

    let col = map(waveform[i], 0, height, 100, 0);

    let sW = map(mouseY, height, 0, 5, 0.1);
    strokeWeight(sW);

    alpha = map(scroll.y, 0, height / 2 - (scroll.spd % 100), 75, 150);

    if (mhover == true) {
      noStroke();
    } else {
      stroke(50, 25, random(col), alpha);
    }

    let xB = map(baseFreq, 50, 800, 0, windowWidth);

    vertex(x + xB, y);
  }
  endShape();
  pop();
}

//mouseWheel and changeAlpha functions for the sonic id
function mouseWheel(event) {
  scroll.spd += event.deltaY;
  scroll.y = event.delta;
}

function changeAlpha(event) {
  if (lastSc < scroll.spd) {
    scroll.spd *= 2;
    lastSc = scroll.spd;
  } else {
  }
}

//functions for light animation
function hover() {
  let d = dist(mouseX, mouseY, lx, ly);
  if (d < lr + 50) {
    changeColor();
    mhover = true;
  } else {
    mhover = false;
    noStroke();
    blendMode(BLEND);
  }
}
function changeColor() {
  for (let i = 0; i < width; i++) {
    x1 = map(mouseX, 0, width, 0, radius * cos(i));
    y1 = map(mouseY, 0, height, 0, radius * sin(i));
  }
  push();
  blendMode(SCREEN);
  noStroke();
  fill("blue");
  ellipse(lx, ly, lr);
  stroke(212, 235, 245, alpha);

  line(lx, ly, x1, height);
  noStroke();
  fill("lightblue");
  ellipse(lx - 5, ly + 5, lr);
  stroke(212, 235, 252, alpha);
  line(lx, ly, width - x1, height);
  pop();
}

//strobe functions
// Slider helpers
let vars = {};
function lslider(name, min, max, val, step = 1) {
  vars[name] = {
    nameSpan: createSpan(name).style("color", "darkgrey"),
    lslider: createSlider(min, max, val, step),
    valueSpan: createSpan(val).style("color", "darkgrey"),
    value: val,
  };

  createDiv().class("lslider");
}

function updateVars() {
  let values = {};
  Object.keys(vars).forEach((name) => {
    let newVal = vars[name].lslider.value();
    vars[name].value = newVal;
    vars[name].valueSpan.html(newVal);

    values[name] = vars[name].value;
  });
  return values;
}

let colorS;
function p5light() {
  size = map(level, 0.08, 0.3, 0, 255);
  colorS = {
    r: random(0, 50),
    g: random(50, 100),
    b: random(200, 255),

    one: color("#DC143C"),
    two: color("#0000FF"),
  };

  if (random(1) > 0.5) {
    background(colorS.r, 0, colorS.b, size);
  } else {
    background(0, colorS.g, colorS.b, size);
  }
}

//functions to trigger new Oscillator ids
function playSounds() {
  sonicID = sonicIDs[Math.floor(Math.random(i) * sonicIDs.length)];

  colorAll = colorsAll[Math.floor(Math.random(c) * colorsAll.length)];
  colorAll2 = colorsAll[Math.floor(Math.random(c) * colorsAll.length)];

  oscs.push(new Osc(sonicID));

  for (let osc of oscs) {
    osc.play();
  }

  sonicHover = true;
}

let toggleBody = false;

function toggleAudio(cnv) {
  // let wRadius = 1000;
  cnv.mouseOver(function () {
    toggleBody = true;
    playSounds();
    console.log("right hit");
  });
}

function mouseMoved() {
  if (toggleBody == true) {
    if (mouseX >= 0 && mouseX <= 20) {
      playSounds();
      console.log("left hit");
    }
  }
}

// contructor for new Oscillators
class Osc {
  constructor(freq) {
    this.oscC = new p5.Oscillator("sine");
    this.freq = freq;
    this.analyzer = new p5.FFT();
  }

  play() {
    this.oscC.freq(this.freq);
    this.oscC.start();
    this.oscC.amp(0.1);
  }

  sonicTag(r, g) {
    this.analyzer.setInput(this.oscC);
    let waveform = this.analyzer.waveform();

    push();
    beginShape();
    noFill();
    for (let i = 0; i < waveform.length; i++) {
      let y = map(i, 0, waveform.length, height, 0);
      let d = map(mouseY, height, 0, 1, 5);
      let x = map(waveform[i], -d, d, -width, width);

      let col = map(waveform[i], 0, height, 255, 0);

      let sW = map(mouseY, height, 0, 5, 0.1);

      strokeWeight(sW);

      alpha = map(scroll.y, 0, height / 2 - (scroll.spd % 100), 50, 255);

      stroke(random(r), random(g), random(col), alpha);

      let xB = map(this.freq, 50, 800, 0, width);

      vertex(x + xB, y);
    }
    endShape();
    pop();
  }
}

//need 3 things: scene, camera, renderer

//create a scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("white");

//Create a camera
const camera = new THREE.PerspectiveCamera(
  500,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

//create a renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
//add renderer to the DOM
document.body.appendChild(renderer.domElement);

//Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

//adding items, need 3 things: geometry (shape), material (skin), and the mesh (pairs shape with material)
//adding room
const materialR = new THREE.LineBasicMaterial({
  color: "white",
  transparent: true,
  opacity: 0.25,
});

const pointsR = [];
//floor line
pointsR.push(new THREE.Vector3(-10, window.innerHeight, 0));
pointsR.push(new THREE.Vector3(-10, -4, 0));
pointsR.push(new THREE.Vector3(-window.innerWidth, -window.innerHeight, 0));
pointsR.push(new THREE.Vector3(-10, -4, 0));
pointsR.push(new THREE.Vector3(10, -4, 0));
pointsR.push(new THREE.Vector3(window.innerWidth, -window.innerHeight, 0));
pointsR.push(new THREE.Vector3(10, -4, 0));
pointsR.push(new THREE.Vector3(10, window.innerHeight, 0));

const geometryR = new THREE.BufferGeometry().setFromPoints(pointsR);

const room = new THREE.Line(geometryR, materialR);
scene.add(room);

//adding 3D text?
let yesText;
var loader = new THREE.FontLoader();
loader.load("text/Tangerine_Bold.json", function (font) {
  var materialT = new THREE.MeshPhongMaterial({
    // color: 0x0033ff,
    color: "white",
    specular: 0x555555,
    shininess: 30,
    transparent: true,
  });

  var geometryT = new THREE.TextGeometry("Yes", {
    font: font,
    size: 8,
    height: 3,
    curveSegments: 6,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 0.5,
    bevelSegments: 2,
  });

  yesText = new THREE.Mesh(geometryT, materialT);
  yesText.name = "myText";

  yesText.position.set(-7, -2, -8);

  scene.add(yesText);
});

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

//some animation
let rotate = false;
let scale = true;
let rotateX = 0.01;
let rotateY = 0.5;
let rotateZ = 0.01;
let rotateL = Math.PI / 30;
let scaleX = 0.0001;
let scaleY = 0.001;
let pageX, pageY;

//https://stackoverflow.com/questions/63713635/how-to-make-textgeometry-in-three-js-follow-mouse
document.body.addEventListener("mousemove", (event) => {
  pageX = event.pageX / window.innerWidth;
  pageY = event.pageY / window.innerHeight;
});

function render() {
  scene.getObjectByName("myText").rotation.x = (pageY - 0.5) * 2;
  scene.getObjectByName("myText").rotation.y = (pageX - 0.5) * 2;
  renderer.render(scene, camera);
}

//define and animate function / call it repeatedly
function animate() {
  room.scale.x = room.scale.x + scaleX;
  room.scale.y = room.scale.y + scaleY;

  // if (rotate) {
  //   room.rotation.y += rotateY;
  // }

  if (scale) {
    if (room.scale.x > 1.03 || room.scale.x < 1) {
      scaleX *= -1;
    } else {
      scaleX *= 0;
    }

    if (room.scale.y > 1.03 || room.scale.y < 1) {
      scaleY *= -1;
    } else {
      scaleX *= 0;
    }
  }
  //allow for controls to update
  controls.update();

  render();

  //call render
  // renderer.render(scene, camera);

  //call animate again (like p5's loop)
  // requestAnimationFrame(animate);
}

let cameraDistance = 100;
let cameraHeight = 300;
let cameraScale = 0;
let cameraScaleIncrement = 0.0005;
// let cameraAngle = 3.14;
// let cameraAngleIncrement = 0.025;
let zoom;

function mouseDragged() {
  zoom = !zoom;
}

function moveCamera() {
  if (fogAudioOn) {
    if (zoom) {
      cameraScale += cameraScaleIncrement;
      // cameraAngle += cameraAngleIncrement;

      // var x = cameraDistance * cos(cameraAngle);
      // var z = cameraDistance * sin(cameraAngle);
    } else {
      cameraScale -= cameraScaleIncrement;
    }
  }

  var z = cameraDistance * cameraScale;
  camera.position.set(0, 0, z);
  camera.lookAt(new THREE.Vector3(0, cameraHeight * 0.5, 0));
}