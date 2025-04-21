import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputData= document.querySelector('#datetime-picker')
let userSelectedDate=null;
let intervalId=null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate=selectedDates[0].getTime();
        // console.log(userSelectedDate)
    },
};

const daysEl=document.querySelector('[data-days]');
const hoursEl=document.querySelector('[data-hours]');
const minsEl=document.querySelector('[data-minutes]');
const seconsEl=document.querySelector('[data-seconds]');
const startBtn=document.querySelector('button[data-start]');

 function updateTimer(){
    const currentTime = Date.now();
    const deltaTime=userSelectedDate - currentTime;
    if (deltaTime<=0){
        clearInterval(intervalId);
        daysEl.textContent='00';
        hoursEl.textContent='00';
        minsEl.textContent='00';
        seconsEl.textContent='00';
        startBtn.disabled=false;
        inputData.disabled=false;
        return;
    }
    const{days, hours, minutes, seconds}=convert(deltaTime);
    daysEl.textContent=pad(days);
    hoursEl.textContent=pad(hours);
    minsEl.textContent=pad(minutes);
    seconsEl.textContent=pad(seconds);


}

function startTimer(){
    if (!userSelectedDate || isNaN(userSelectedDate)) return;
    const currentTime=Date.now();
    if(userSelectedDate<=currentTime){
        window.alert("Please choose a date in the future");
        return;
    }
    startBtn.disabled=true;
    inputData.disabled=true;
    updateTimer();
    intervalId=setInterval(updateTimer,1000);
}

function convert(deltaTime){
    const days=Math.floor((deltaTime%(1000*60*60*24*30))/(1000*60*60*24));

    const hours=Math.floor((deltaTime%(1000*60*60*24))/(1000*60*60));

    const minutes=Math.floor((deltaTime%(1000*60*60))/(1000*60));

    const seconds=Math.floor((deltaTime%(1000*60))/1000);
return {days, hours, minutes, seconds}
}

function pad(value){
    return String(value).padStart(2,'0');
}

 flatpickr(inputData,options)
//  startBtn.disabled=true;
 startBtn.addEventListener('click',startTimer)






