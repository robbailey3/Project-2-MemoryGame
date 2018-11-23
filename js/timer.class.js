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
  getTimeDifference() {
    return Math.floor((this.endTime - this.startTime) / 1000);
  }
}
