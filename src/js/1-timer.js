import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputData= document.querySelector('#datetime-picker')
let userSelectedDate;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate=selectedDates[0].getTime();
    },
  };
console.log(inputData)
flatpickr(inputData, options)





