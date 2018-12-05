/**
 * Class to contain the methods for measuring time during the game
 * @class Timer
 */
class Timer {
  /**
   * @description Method to start the timer and store the start time
   * @memberof Timer
   */
  startTimer() {
    this.startTime = new Date();
  }
  /**
   * @description Method to end the timer and store the end time
   * @memberof Timer
   */
  endTimer() {
    this.endTime = new Date();
  }
  /**
   * @description Gets the time difference between now and the start time (in seconds)
   * @return {number} TimeDifference
   * @memberof Timer
   */
  getCurrentTime() {
    return Math.floor((new Date() - this.startTime) / 1000);
  }
  /**
   * @description Gets the time difference between the end time and the start time (in seconds)
   * @return {number} TimeDifference
   * @memberof Timer
   */
  getTimeDifference() {
    return Math.floor((this.endTime - this.startTime) / 1000);
  }
}
