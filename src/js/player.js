class Player {
  constructor(playList) {
    this.playList = playList;
    this.counter = 0;
    this.audio = new Audio();
  }

  getSongElement() {
    return this.audio;
  }

  getSongName() {
    return this.playList[this.counter].title;
  }

  formateTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds - min * 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  }

  getSongTiming(timerElement, progressBarElement, controller) {
    if (this.formateTime(this.audio.duration) === `NaN:NaN`) return;
    if (!controller) return;
    timerElement.textContent = `${this.formateTime(
      this.audio.currentTime
    )}/${this.formateTime(this.audio.duration)}`;
    progressBarElement.max = this.audio.duration;
    progressBarElement.value = this.audio.currentTime;
  }

  changSongTime(progressBarElement) {
    this.audio.currentTime = progressBarElement.value;
  }

  changeAudioSrc(index = this.counter) {
    this.audio.src = this.playList[index].src;
  }

  showCurrentSong(index = this.counter) {
    const songsList = document.querySelectorAll(".song");
    songsList.forEach((item) => (item.classList = "song"));
    songsList[index].classList.add("current-song");
  }

  play(controller, progressBarElement = 0) {
      this.changeAudioSrc();
      if(progressBarElement.value) this.audio.currentTime = progressBarElement.value
    controller ? this.audio.play() : this.audio.pause();
    this.showCurrentSong();
  }

  playPrev() {
    this.counter <= 0
      ? (this.counter = this.playList.length - 1)
      : this.counter--;
    this.changeAudioSrc();
    this.audio.play();
    this.showCurrentSong();
  }

  playNext() {
    this.counter + 1 >= this.playList.length
      ? (this.counter = 0)
      : this.counter++;

    this.changeAudioSrc();
    this.audio.play();
    this.showCurrentSong();
  }

  createPlayList(plElement) {
    this.playList.forEach((i, index) => {
      const li = document.createElement("li");
      li.classList.add("song");
      li.dataset.ind = index;
      li.textContent = i.title;
      plElement.append(li);
    });
  }

  changeSong(index, controller) {
    this.changeAudioSrc(index);
    this.counter = index;
    this.play(controller);
    }
    
    changeSound(volume) {
        this.audio.volume = volume/100
    }
}

export default Player;
