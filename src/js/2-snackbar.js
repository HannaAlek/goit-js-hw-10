import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form=document.querySelector('.form')
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const delay=Number(form.delay.value);
    const state=form.state.value;
    const promise=new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(state === 'fulfilled'){
                resolve(delay);
            }else{
                reject(delay);
            }
        }, delay);
    });
    promise.then(delay=>{
        iziToast.success({
            message:`✅ Fulfilled promise in ${delay}ms`
        })
    })
    .catch(delay=>{
        iziToast.error({
            message:`❌ Rejected promise in ${delay}ms`
        })
    })
    form.reset()
})