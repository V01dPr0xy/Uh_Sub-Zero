var eye_val = 1, nose_val = 1, mouth_val = 1;
var r_val, g_val, b_val;

function addEyes() {
    eye_val++;
    update();
}
function addNose() {
    nose_val++;
    update();
}
function addMouth() {
    mouth_val++;
    update();
}

function subEyes() {
    eye_val--;
    update();
}
function subNose() {
    nose_val--;
    update();
}
function subMouth() {
    mouth_val--;
    update();
}

document.getElementById('R_VALUE').oninput = function () {
    r_val = Number(document.getElementById('R_VALUE').value).toString(16);
    update();
}
document.getElementById('G_VALUE').oninput = function () {
    g_val = Number(document.getElementById('G_VALUE').value).toString(16);
    update();
}
document.getElementById('B_VALUE').oninput = function () {
    b_val = Number(document.getElementById('B_VALUE').value).toString(16);
    update();
}

function update() {
    var img = document.getElementById('avatar');
    img.src = "https://api.adorable.io/avatars/face/eyes" + eye_val + "/nose" + nose_val + "/mouth" + mouth_val + "/" + r_val + g_val + b_val;
}

// var doc = document.getElementById('eyes');
document.getElementById('avatar').src = document.getElementById('avatar').src
    .replace(/NOSEVAL/g, nose_val)
    .replace(/MOUTHVAL/g, mouth_val)
    .replace(/EYEVAL/g, eye_val);

document.getElementById('EYESADD').addEventListener('click', addEyes);
document.getElementById('MOUTHADD').addEventListener('click', addMouth);
document.getElementById('NOSEADD').addEventListener('click', addNose);

document.getElementById('EYESSUB').addEventListener('click', subEyes);
document.getElementById('MOUTHSUB').addEventListener('click', subMouth);
document.getElementById('NOSESUB').addEventListener('click', subNose);
