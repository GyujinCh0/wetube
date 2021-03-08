const videoContainer =document.getElementById("jsVideoPlayer");
const videoPlayer= document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreenButton");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
function handlePlayClick() {
    if(videoPlayer.paused){
        videoPlayer.play();
        playButton.innerHTML='<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playButton.innerHTML='<i class="fas fa-play"></i>';
    }
}
function handleVolumeClick() {
    if(videoPlayer.muted){
        videoPlayer.muted=false;
        volumeButton.innerHTML='<i class="fas fa-volume-up"></i>';
    } else {
        videoPlayer.muted=true;
        volumeButton.innerHTML='<i class="fas fa-volume-mute"></i>';
    }
}
function exitFullScreen() {
    fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenButton.addEventListener("click",goFullScreen);
    if( document.exitFullScreen){
        document.exitFullScreen();
       } else if( document.mozExitFullScreen){
        document.cancelFullScreen();
       } else if( document.webkitExitFullScreen){
        document.webkitExitFullScreen();
       } else if( document.msExitFullScreen){
        document.msExitFullScreen();
       }
}
function goFullScreen(){
   if( videoContainer.requestFullscreen){
    videoContainer.requestFullscreen();
   } else if( videoContainer.mozRequestFullscreen){
    videoContainer.mozRequestFullscreen();
   } else if( videoContainer.webkitRequestFullscreen){
    videoContainer.webkitRequestFullscreen();
   } else if( videoContainer.msRequestFullscreen){
    videoContainer.msRequestFullscreen();
   }
    fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenButton.removeEventListener("click",goFullScreen);
    fullScreenButton.addEventListener("click",exitFullScreen);
}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds,10);
    let hours = Math.floor(secondsNumber/3600);
    let minutes = Math.floor((secondsNumber-hours*3600)/60);
    let totalSeconds = secondsNumber-hours*3600-minutes*60;

    if(hours<10){
        hours=`0${hours}`;
    }
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    if(totalSeconds<10){
        totalSeconds=`0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
}
function setTotalTime() {
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML=totalTimeString;
    setInterval(getCurrentTime,1000);
}
function getCurrentTime() {
    currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}
function init () {
    playButton.addEventListener("click",handlePlayClick);
    volumeButton.addEventListener("click", handleVolumeClick);
    fullScreenButton.addEventListener("click",goFullScreen);
    videoPlayer.addEventListener("loadedmetadata",setTotalTime);
}

if(videoContainer) {
    init();
}