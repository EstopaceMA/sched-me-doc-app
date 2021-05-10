  function useGenerateTimeSlots(timeInterval, startTime, endTime) {
    // get the total minutes between the start and end times.
    var totalMins = subtractTimes(startTime, endTime);
    
    // set the initial timeSlots array to just the start time
    var timeSlots = [startTime];
    
    // get the rest of the time slots.
    return getTimeSlots(timeInterval, totalMins, timeSlots);
  }
  
  function getTimeSlots(timeInterval, totalMins, timeSlots) {
    // base case - there are still more minutes
    if (totalMins - timeInterval >= 0) {
      // get the previous time slot to add interval to
      var prevTimeSlot = timeSlots[timeSlots.length - 1];
      // add timeInterval to previousTimeSlot to get nextTimeSlot
      var nextTimeSlot = addMinsToTime(timeInterval, prevTimeSlot);
      timeSlots.push(nextTimeSlot);
      
      // update totalMins
      totalMins -= timeInterval;
      
      // get next time slot
      return getTimeSlots(timeInterval, totalMins, timeSlots);
    } else {
      // all done!
      return timeSlots;
    }
  }
  
  function subtractTimes(t2, t1) {
    // get each time's hour and min values
    var [t1Hrs, t1Mins] = getHoursAndMinsFromTime(t1);
    var [t2Hrs, t2Mins] = getHoursAndMinsFromTime(t2);
    
    // time arithmetic (subtraction)
    if (t1Mins < t2Mins) {
      t1Hrs--;
      t1Mins += 60;
    }
    var mins = t1Mins - t2Mins;
    var hrs = t1Hrs - t2Hrs;
    
    // this handles scenarios where the startTime > endTime
    if (hrs < 0) {
      hrs += 24;
    }
    
    return (hrs * 60) + mins;
  }
  
  function getHoursAndMinsFromTime(time) {
    return time.split(':').map(function(str) {
      return parseInt(str);
    });
  }
  
  function addMinsToTime(mins, time) {
    // get the times hour and min value
    var [timeHrs, timeMins] = getHoursAndMinsFromTime(time);
    
    // time arithmetic (addition)
    if (timeMins + mins >= 60) {
      var addedHrs = parseInt((timeMins + mins) / 60);
      timeMins = (timeMins + mins) % 60
      if (timeHrs + addedHrs > 23) {
        timeHrs = (timeHrs + addedHrs) % 24;
      } else {
        timeHrs += addedHrs;
      }
    } else {
      timeMins += mins;
    }
    
    // make sure the time slots are padded correctly
    return String("00" + timeHrs).slice(-2) + ":" + String("00" + timeMins).slice(-2);
  }

export default useGenerateTimeSlots;