import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn=document.querySelector('button[data-start]');
startBtn.disabled=true;
const inputData=document.querySelector('#datetime-picker')
let userSelectedDate=null;
let intervalId=null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate=selectedDates[0];//getTime()
        const currentTime=Date.now();
        if(userSelectedDate<=currentTime){
        iziToast.show({
            message:"Please choose a date in the future"
        });
        return;
    }
    startBtn.disabled=false;
    inputData.disabled=false;
    },
};
const daysEl=document.querySelector('[data-days]');
const hoursEl=document.querySelector('[data-hours]');
const minsEl=document.querySelector('[data-minutes]');
const seconsEl=document.querySelector('[data-seconds]');

flatpickr(inputData,options)
startBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    startBtn.disabled=true;
    inputData.disabled=true;
console.log(inputData);
    intervalId=setInterval(()=>{
        const currentTime = Date.now();
        const deltaTime=userSelectedDate - currentTime;
        if(deltaTime<=0){
            clearInterval(intervalId);
            daysEl.textContent='00';
            hoursEl.textContent='00';
            minsEl.textContent='00';
            seconsEl.textContent='00';
            return;
        }
        const{days, hours, minutes, seconds}=convertMs(deltaTime);
            daysEl.textContent=addLeadingZero(days);
            hoursEl.textContent=addLeadingZero(hours);
            minsEl.textContent=addLeadingZero(minutes);
            seconsEl.textContent=addLeadingZero(seconds);
        function convertMs(ms) {
                // Number of milliseconds per unit of time
                const second = 1000;
                const minute = second * 60;
                const hour = minute * 60;
                const day = hour * 24;
                // Remaining days
                const days = Math.floor(ms / day);
                // Remaining hours
                const hours = Math.floor((ms % day) / hour);
                // Remaining minutes
                const minutes = Math.floor(((ms % day) % hour) / minute);
                // Remaining seconds
                const seconds = Math.floor((((ms % day) % hour) % minute) / second);
              
                return { days, hours, minutes, seconds };
              }
              
            //   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
            //   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
            //   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
            function addLeadingZero(value){
                return String(value).padStart(2,'0');
            }
    },1000);
});
