class Player {
  constructor(playList) {
    this.playList = playList;
    this.counter = 0;
    this.audio = new Audio();
  }

  changeAudioSrc() {
    this.audio.src = this.playList[this.counter].src;
  }

  play(controller) {
    this.changeAudioSrc();
    controller ? this.audio.play() : this.audio.pause();
  }

  playPrev() {
    this.counter === 0
      ? (this.counter = this.playList.length - 1)
      : this.counter--;
    this.changeAudioSrc();
    this.audio.play();
  }

  playNext() {
    this.counter + 1 === this.playList.length
      ? (this.counter = 0)
      : this.counter++;
    this.changeAudioSrc();
    this.audio.play();
  }
}

export default Player;
