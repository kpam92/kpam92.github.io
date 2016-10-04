
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

}


Sound.prototype.play = function(){
        this.sound.play();
        let music = document.getElementById("music-pic");
        music.style.opacity = "1";
    }
Sound.prototype.stop = function(){
        this.sound.pause();
        let music = document.getElementById("music-pic");
        music.style.opacity = "0.5";
    }

module.exports = Sound;
