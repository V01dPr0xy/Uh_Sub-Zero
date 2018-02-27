var eye_val = 1, nose_val = 1, mouth_val = 1;

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

function update() {
   var img = document.getElementById('avatar');

   img.src = "https://api.adorable.io/avatars/face/eyes" + eye_val + "/nose" + nose_val + "/mouth" + mouth_val + "/f00";
}

// var doc = document.getElementById('eyes');
document.getElementById('avatar').src = document.getElementById('avatar').src
   .replace(/NOSEVAL/gi, nose_val)
   .replace(/MOUTHVAL/gi, mouth_val)
   .replace(/EYEVAL/gi, eye_val);

document.getElementById('EYESADD').addEventListener('click', addEyes);
document.getElementById('MOUTHADD').addEventListener('click', addMouth);
document.getElementById('NOSEADD').addEventListener('click', addNose);

document.getElementById('EYESSUB').addEventListener('click', subEyes);
document.getElementById('MOUTHSUB').addEventListener('click', subMouth);
document.getElementById('NOSESUB').addEventListener('click', subNose);