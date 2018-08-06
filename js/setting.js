let mycanvas = document.getElementById('mycanvas');
let ctx = mycanvas.getContext('2d');
let btn = document.getElementById('btn');
let pause_btn = document.getElementById('pause');
let pauseBanner = document.getElementById('pauseBanner');

let w = mycanvas.width;
let h = mycanvas.height;
let snakeSize = w / 35; // k = 1/35

// TODO: Сделать увеличение скорости змейки по мере набора очков.
const defaultFPS = 80;
let fps = defaultFPS;

let minNumOfObst = 3;
let maxNumOfObst = 10;

let direction = 'down';
let maxScore = getMaxValFromCookies() || 0;
let score = 0;

let isPause = false;
let snake;
let obstacles;
let food;

