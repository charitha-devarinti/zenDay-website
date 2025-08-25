
/* generating why we need breaks */ 


const reasonArray=[
  {
    heading:'1. Restores Mental Energy',
    description:'Our brains consume a lot of energy while focusing. Short breaks help replenish glucose and oxygen levels in the brain, restoring your mental sharpness and preventing burnout.'
  },
    {
    heading:'2. Improves Focus & Productivity',
    description:'Continuous work can cause cognitive fatigue, which lowers accuracy and slows reaction times. Strategic breaks reset your attention span, allowing you to return with renewed concentration.'
  },
    {
    heading:'3. Boosts Creativity',
    description:'Stepping away from a task activates the brain’s default mode network (DMN) — the area linked to idea generation and problem-solving. Many “aha” moments happen during downtime.'
  },
    {
    heading:'4. Reduces Stress & Tension',
    description:'Breaks give your nervous system time to relax, lowering cortisol levels and reducing physical tension in muscles caused by prolonged sitting or screen time.'
  },
    {
    heading:'5. Supports Physical Health',
    description:'Micro-breaks for stretching or movement improve circulation, reduce the risk of repetitive strain injuries, and help maintain better posture.'
  },
    {
    heading:'6. Enhances Memory & Learning',
    description:'Brief pauses between study or work sessions allow the brain to consolidate information into long-term memory — a process known as memory consolidation.'
  },
  
]

let index=0;
function changingContent(){
          
const headingEle=document.getElementById('heading');
const descriptionEle = document.getElementById('description');
// let index=0;  we have to keep this index outside rhe function because when ever we call the function the index value is keep 
// updating as zero only soo the values didn't updates soo we have to keep the index outside the function

  
     headingEle.innerText=reasonArray[index].heading;
    descriptionEle.innerText=reasonArray[index].description;
    index=(index+1)%reasonArray.length;  // wraps it back to 0 when it reaches the end.
    // if we keep the above values inside the setInterval we will get empty space for the first 10 seconds after 10 seconds only the values will
    //be updated soo for to get the values from starting onwards without that 10 seconds starting gap we use setInterval outside the function.
   
}

setInterval(changingContent,10000);

changingContent();


/*  pausing all songs and videos  when one is playing */


const audios_videos = document.querySelectorAll('audio,video')

audios_videos.forEach(audio_video =>{
  audio_video.addEventListener('play',()=>{
    audios_videos.forEach(other=>{
      if(other!==audio_video){
        other.pause();
        other.currentTime=0;
      }
    })
  })
})


// all timers




 let countdown='null';
function startDisplayTime(timerEle){

  if(countdown){
    clearInterval(countdown)
  }
    let timeLeft= parseInt(timerEle.getAttribute('data-time'))*60 // converting into seconds
  let temp= parseInt(timerEle.getAttribute('data-time'))

   countdown = setInterval(()=>{

    let minutes = Math.floor(timeLeft/60);
    let seconds=timeLeft%60;

    minutes= minutes <10 ? "0" + minutes : minutes;
    seconds= seconds<  10 ? "0" + seconds : seconds;

    timerEle.innerText= `${minutes}:${seconds}`;
    timeLeft--;

    if(timeLeft<0){

      if(temp === 5 || temp === 10){
         clearInterval(countdown);
    const audio=new Audio('audios_videos/beep_sound.wav');
    audio.play();
    setTimeout(()=>{
            window.location.href="time-table.html";
    },3000);
   
  }  else if(temp === 20){
            clearInterval(countdown);
              const sleep_image= document.querySelector('.sleeping-image');
              
              const alaram_section= document.querySelector('.js-alaram-section');
                
              if(sleep_image){
               sleep_image.style.display='none';
                  
              }

              if(alaram_section){
                   alaram_section.style.display='block';
              }

            

          if(sleep_music){       // here we checking is this audio is there or not on page
            sleep_music.pause();     // here we are pausing the song
            sleep_music.currentTime=0;   // reseting to starting position of the song
          }

          const audio_alaram = new Audio('audios_videos/hen_sound.mp3');
          audio_alaram.play();
          setTimeout(()=>{
                  window.location.href="time-table.html";
          },12000);

    } 

    }


  },1000);



}


const musicButtonELe= document.querySelector('.js-music-button');
const motivationBtnEle=document.querySelector('.js-video-button');
const meditationBtnEle= document.querySelector('.js-meditaion-button');
const funGameEle=document.querySelector('.js-emoji-button');

const ten_songsEle= document.querySelector('.songs-button');
const ten_excercise=document.querySelector('.brain-excercise-button');

const nap_buttELe = document.querySelector('.nap-song-but');



musicButtonELe.addEventListener('click',() => {
   showBreak('fivemin-songs');    
});

motivationBtnEle.addEventListener('click',() =>{
  showBreak('fivemin-motivation');
});

meditationBtnEle.addEventListener('click',() =>{
  showBreak('fivemin-meditation');
})

funGameEle.addEventListener('click',()=>{
  showBreak('fivemin-fungame')
})

ten_songsEle.addEventListener('click',()=>{
   showBreak('tenmin-songs');
});

ten_excercise.addEventListener('click',()=>{
  showBreak('tenmin-excercise')
})

nap_buttELe.addEventListener('click',() =>{
     showBreak('nap-break');
})

let sleep_music;  // created outside because we have to stop when localTime<0 so for to acces there we declared as a global variable
function showBreak(breakElem){
  const breakEles= document.querySelectorAll('.js-break-content');
   
  breakEles.forEach(breakEle=>{
     //pausing and reseting any audio and video in hidden sections
    breakEle.querySelectorAll('audio,video').forEach(audvid=>{
      audvid.pause();
      audvid.currentTime=0;
    })

    breakEle.style.display='none';

  })

  const displayBreak= document.getElementById(breakElem);
  displayBreak.style.display='block';

   displayBreak.scrollIntoView({behavior:'smooth'});

   if(breakElem === 'nap-break'){
      sleep_music= new Audio('audios_videos/sleep-music.mp3');
      sleep_music.play();
   }

   const timerEle = displayBreak.querySelector('.timer');
   if (timerEle){
         startDisplayTime(timerEle);
   }
  

}



// exhale and inhale 

const textEle= document.querySelector('.meditaion-animation-text');
const textstage=['Inhale','Hold','Exhale','hold'];
let  stageIndex=0;
setInterval(()=>{
    textEle.innerText= textstage[stageIndex];
    stageIndex = (stageIndex + 1) % textstage.length;
},4000);


//Emoji Game


const inputBtnEle=document.querySelector('.submit-btn');
 inputBtnEle.addEventListener('click',() =>{
         guesscheck();
 });


 

 
let timeoutId;
 function guesscheck(){
    clearTimeout(timeoutId);
    let inputEle= document.querySelector('.input-num');
    const randomNumber= Math.floor(Math.random() * 10)+1;
    const inputValue= Number(inputEle.value);
    const result= document.querySelector('.js-result');
    const displayResult=document.querySelector('.js-display-result');

    if (inputValue === randomNumber){
         generatingEmoji();
         result.innerText='Super! you found me, Now Imitate me'

    }else{
         result.innerText='Sorry! try again'
    }

    displayResult.innerText= ` I am in ${randomNumber} , You entered ${inputValue} `;

    inputEle.value='';

    timeoutId = setTimeout(() =>{
      document.querySelector('.gif-container').innerHTML='';
      result.innerText='';
      displayResult.innerText='';
    },30000);
 }




 function generatingEmoji(){
      const containerEle= document.querySelector('.gif-container');
       containerEle.innerHTML='';
      const randomNumber= Math.floor(Math.random()*15)+1;
      const imgEle=document.createElement('img');
      const imgPath=`emojies/emoji${randomNumber}.gif`;
      imgEle.src=imgPath;
      imgEle.alt='Emoji';
      containerEle.appendChild(imgEle);

 }


 const eventKeyEle= document.body.addEventListener('keydown',(event) =>{
   const enteredKey = event.key;
   if(enteredKey === 'Enter'){
     guesscheck();
   }
 })


 









 

 


 



 

 



