class Timer {
    start() {
        this.startTime = new Date();
    }
    stop() {
        this.endTime = new Date();
    }
    /**
     * Method to get the time difference.
     * @returns Time difference in seconds between start and end
     * @memberof Timer
     */
    getTime() {
        return (this.endTime - this.startTime) / 1000;
    }
}