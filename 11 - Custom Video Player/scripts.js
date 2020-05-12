"use strict";

const video = document.querySelector('video');
const playBtn = document.querySelector('.player__button.toggle');
const volSlider = document.querySelector('input[name=volume]');
const playRateSlider = document.querySelector('input[name=playbackRate]');
const seek = document.querySelector('.progress__filled');

video.autoplay = true;
video.loop = true;
video.addEventListener('timeupdate',handlePlay);
video.addEventListener('click',playpause);
playBtn.addEventListener('click',playpause);
document.querySelectorAll('.player__button').forEach((ele) => {ele.addEventListener('click', handleSkip)});
video.addEventListener('play', () => {playBtn.innerHTML = "⏸"});
video.addEventListener('pause', () => {playBtn.innerHTML = "►"});
volSlider.addEventListener('change', setVidProp);
playRateSlider.addEventListener('change', setVidProp);
seek.style.flexBasis = 0;
document.querySelector('.progress').addEventListener('mouseDown', handleSeek);

function handleSeek(evt) {
  //DUE TO NOT HAVING DRAG, WE HAVE TO SEEK USING MOUSEDOWN/MOVE/UP?

}

function handlePlay(evt) {
  //DUE TO THE WAY CSS IS SETUP WITH FLEXBOX, WE CAN'T DO EASY WIDTH EDIT
  //seek.style.width = (this.currentTime / this.duration)*100+'%';
  seek.style.flexBasis = (this.currentTime / this.duration)*100+'%';
}

function setVidProp(evt) {
  video[this.name] = this.value
}

function handleSkip(evt) {
  if(!this.dataset.skip) return;
  video.currentTime = video.currentTime + parseInt(this.dataset.skip);
}

document.addEventListener("keydown", function(event) {
  //NEEDED IN CASE USER CLICKS ON BROWSER (STEALS FOCUS, DOESN'T FOLLOW FRONTSCRIPTS)
  switch (event.keyCode){
    case 32:
      playpause();
      break;
    case 38:
      incrementVolume();
      break;
    case 40:
      decrementVolume();
      break;
    case 39:
      incrementPlaybackRate();
      break;
    case 37:
      decrementPlaybackRate();
      break;
    }
});
function setLoop(p){
  video.loop = p;
}
function playpause() {
  if (video.paused == false) {
    pause();
  } else {
    play();
  }
}

function replay() {
  video.currentTime = 0;
}
function play() {
  //RESET PLAYRATE
  //video.playbackRate = 1.0;
  //playBtn.innerHTML = "⏸";
  video.play();
}

function pause() {
  //playBtn.innerHTML = "►";
  video.pause();
}

function isPaused() {
  return video.paused;
}

function incrementPlaybackRate(){
  let p = video.playbackRate;
  p+= 0.1;
  video.playbackRate = p > 2 ? 2 : p;
}

function decrementPlaybackRate(){
  let p = video.playbackRate;
  p-= 0.1;
  video.playbackRate = p < 0.5 ? 0.5 : p;
}

function setPlaybackRate(p) {
  video.playbackRate = p;
}

function getPlaybackRate() {
  return video.playbackRate;
}

// function mirror(){
//   video.classList.toggle("mirror");
// }

// function setMirror(p){
//   p?video.classList.add("mirror"):video.classList.remove("mirror")
// }

function setSrc(source){
  video.src = source;
}

function setVolume(v) {
  video.volume = v;
}

function incrementVolume(){
  let v = video.volume;
  v+= 0.05;
  video.volume = v > 1 ? 1 : v;
}

function decrementVolume(){
  let v = video.volume;
  v-= 0.05;
  video.volume = v < 0 ? 0 : v;
}

// function toggleMute(){
//   if(video.volume === 0){
//     video.volume = vol/100;
//     showGrowl("&#128266;")
//   } else {
//     video.volume = 0;
//     showGrowl("&#128263;")
//   }
// }
// function showGrowl(message) {
//   growl.innerHTML=message;
//   clearTimeout(timeoutGrowl);
//   growl.classList.add("show-growl");
//   timeoutGrowl= setTimeout(function(){
//     growl.classList.remove("show-growl");
//   },1000);
// }

// function playbackGrowl(playrate) {
//   if(playrate < 0) return "<<"+(0 - playrate);
//   else return playrate + ">>";
// }