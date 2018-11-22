class Timer {
  startTimer() {
    this.startTime = new Date();
  }
  endTimer() {
    this.endTime = new Date();
  }
  getCurrentTime() {
    return Math.floor((new Date() - this.startTime) / 1000);
  }
}
