const stopWatchTimer= document.querySelector('.spended-time');
const startButtEle=document.querySelector('.start-button');
const stopButtELe=document.querySelector('.stop-button');
const resetButtEle=document.querySelector('.reset-button');


startButtEle.addEventListener('click',startTimer);
stopButtELe.addEventListener('click',stopTimer);
resetButtEle.addEventListener('click',resetTimer);



function storingToSession(elsapeTime){
      sessionStorage.setItem('elapseTime',elsapeTime);
}

function gettingFromSession(){
    const storage = sessionStorage.getItem('elapseTime');
     return (storage ? parseInt(storage) : 0);
}

let startTime=0;
let elsapeTime= gettingFromSession();
let timeInterval;

function startTimer(){
    startTime= Date.now() - elsapeTime;

    timeInterval=setInterval(()=>{
       elsapeTime=Date.now()-startTime;
       stopWatchTimer.textContent= formatElaspeTime(elsapeTime);
       storingToSession(elsapeTime);
    },10);

    startButtEle.disabled=true;
    stopButtELe.disabled=false;
}



let lastMinuteBreak= -1;
function formatElaspeTime(elsapeTime){


    const milliSeconds=Math.floor((elsapeTime%1000)/10);
    const seconds=Math.floor((elsapeTime%(1000*60))/1000);
    const minutes=Math.floor((elsapeTime%(1000*60*60))/(1000*60));
    const hours=Math.floor(elsapeTime/(1000*60*60));

    // displaying the break message every 45 minutes

    /* 
    
    1.here we set lastMinuteBreak= -1; beacuse the time will not contain negative values so , by set this one just a safe starting value to ensure the very first check works correctly.

    2. minutes!== lastMinuteBreak  we used this condition beacuse here we update like whole number by using floor--> so 2.01 , 2.20, 2.50 still consider as 2 only soo i triggers many times on that 2 minutes only soo when minutes beacomes 2 after it stored in lastMinuteBreak soo 2 is not repeated inthis way we avoid mutiple poppus

    3. seconds === 0 we make this as 0 beacuse without this condition the function trigger many times beacuse we upadted the elapsed time for every 10ms soo it will trigger many times soo there is risk for multiple popups if we remove this consition
    
    
    */
  
 if (minutes % 45 === 0 && minutes!=0 &&  minutes!== lastMinuteBreak && seconds === 0){
    lastMinuteBreak=minutes;
    const breakMessage= confirm('Do you want break?');
    if(breakMessage){
        storingToSession(elsapeTime);
        stopTimer();
        setTimeout(()=>{
         window.location.href='zenbreak_page.html'
        },2000)
       
    }



   }

    return (
      (hours ? (hours>9 ? hours : '0'+ hours ) : '00') +
      ':' +
      (minutes? (minutes>9 ? minutes:'0'+ minutes):'00')+
      ':' +
      (seconds?( seconds>9 ? seconds: '0'+ seconds):'00')+
      '.' +
      (milliSeconds?(milliSeconds>9 ? milliSeconds: '0'+milliSeconds):'00')
    )
   
    
    
}

function stopTimer(){
    clearInterval(timeInterval);
     startButtEle.disabled=false;
    stopButtELe.disabled=true;
}

function resetTimer(){
    clearInterval(timeInterval);
    elsapeTime=0;
    stopWatchTimer.textContent='00:00:00.00'
    startButtEle.disabled=false;
    stopButtELe.disabled=true;
}

/* here this we have to write this because when we get back from the another page like break page -> schedule page we actually stroing  the elapsed time in session storage but we are not displaying it on html so that's why we stored and getted the elapsed form session storage the timer reseted to 0 only soo we have to update the time on screen soo if elapsed >0 which means getted from sessionStorage > 0 means it have to show on screen soo we called  formatElaspeTime(elsapeTime); */


    if (elsapeTime > 0) {
        stopWatchTimer.textContent = formatElaspeTime(elsapeTime);
        startTimer();
    }




// todo list


    


const addButtEle=document.querySelector('.js-add-button');

addButtEle.addEventListener('click',()=>{
    addList();
});

const getListFromLocalStorage= JSON.parse(localStorage.getItem('list-items'));

const listItems= getListFromLocalStorage || [
       {
        name:'Example: Excercise',
        time:'6am - 7am',
        done:false
    }
   
];
rendorList();

  
// if we keep let contentInnerHTML=''; outside the function it will shows duplicates also
function rendorList(){

  let contentInnerHTML='';  // here making the list empty when we call the function soo every time new list is created soo no duplicates
    
  listItems.forEach((listItem,index)=>{
    const name=listItem.name;
    const time=listItem.time;
    const done=listItem.done;
    
   

   const html=`

<input type="checkbox" class="js-check-box check-box" data-index="${index}"  ${done ? "checked" : ""}>  
   <div class='todo-name'>${name}</div>
   <div class='todo-time'>${time}</div>
   <button class="delete-button js-delete-button" data-index="${index}"> Delete </button>
   
   `
   contentInnerHTML += html;
   
   
  });

   const todoContainerELe= document.querySelector('.js-list-todo');
    todoContainerELe.innerHTML= contentInnerHTML;

// checkbox

const checkboxesEle= document.querySelectorAll('.js-check-box');
checkboxesEle.forEach((checkbox)=>{
    checkbox.addEventListener('change',()=>{
        const index= parseInt(checkbox.dataset.index);
        listItems[index].done= checkbox.checked;  // here checkbox.checked checks the user is ticked or unticked the check box
        // if user ticked it sets done value is true and if users is unticked it sets the done value is false 
        // here we using done beacuse we have to store the state into our local storage, but ==> checkbox.checked only check the 
        //the checkbox is ticked or not when the page loads only , like it is HTML element’s live state.
        //==> done will store the state for to store in the local storage
        // based on the value stored in the local storage the check is displayed on diaplayed on html page in waht condition it is
        storeListToLocalStoragae();
    })
})




    // delete button
    
const deleteBtnEles= document.querySelectorAll('.js-delete-button');
deleteBtnEles.forEach((deleteBtn,index)=>{
       deleteBtn.addEventListener('click',()=>{
        const index = parseInt(deleteBtn.dataset.index)
         listItems.splice(index,1);
         storeListToLocalStoragae(); // save after deletion
         rendorList();
       })

       
})


}




function addList(){
const inputListEle=document.querySelector('.js-input-list') ;
 const inputValueEle=inputListEle.value;
const inputTimeEle=document.querySelector('.js-input-time');
const timeValueEle=inputTimeEle.value;

if (inputListEle.value.trim() === ''|| inputTimeEle.value.trim() === '') {
     showMessage('Please fill all fields!!!');
    return ;
}
  
 // trim( ) removes extra spaces before and after the string, here  when user doesn't enter anything in the todo input or in the time input that 
 // //array doesn't display on the page soo we return the function early before we pushing the values into the array 
 //but here when user entered spaces that also can be considered as an character so for to remove that spaces we used trim()
 //trim() only works on strings
    listItems.push({
        name:inputValueEle,
        time:timeValueEle,
        done:false
    })
   
    inputListEle.value='';
    inputTimeEle.value='';
    storeListToLocalStoragae(); // save after adding new values
    
  rendorList();

}

 function storeListToLocalStoragae(){
     localStorage.setItem('list-items',JSON.stringify(listItems));
 }


 function showMessage(msg){
    const message=document.querySelector('.showMessage');
    message.textContent=msg;
    message.style.display='block';

    setTimeout(()=>{
         message.style.display='none';
    },2000);
 }
