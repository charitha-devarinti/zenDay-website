const quoteEle=document.querySelector('.quote-motivation')

const happyEmojiEle=document.getElementById('happy-emoji-btn');
const neutralEmojiEle=document.getElementById('neutral-emoji-btn');
const excitedEmojiEle=document.getElementById('excited-emoji-btn');
const sadEmojiEle=document.getElementById('sad-emoji-btn');
const calmEmojiEle=document.getElementById('calm-emoji-btn');


happyEmojiEle.addEventListener('click',()=>{
     emojiesBasedQuote('happy');
});

neutralEmojiEle.addEventListener('click',()=>{
    emojiesBasedQuote('neutral');
})

excitedEmojiEle.addEventListener('click',()=>{
    emojiesBasedQuote('excited');

})

sadEmojiEle.addEventListener('click',()=>{
    emojiesBasedQuote('sad');
})

calmEmojiEle.addEventListener('click',()=>{
    emojiesBasedQuote('calm');
})

 let timeoutId;
function emojiesBasedQuote(userDay){
    const randomNumber= Math.floor(Math.random()*4)+1;
    clearTimeout(timeoutId);
    
   if(userDay==='happy'){
    if(randomNumber=== 1){
        quoteEle.innerText='"Small wins add up. Keep going!"';
    }else if(randomNumber===2){
        quoteEle.innerText='"Happiness fuels progress — cherish it."'; 
    }else if(randomNumber===3){
        quoteEle.innerText='"Today’s smile is tomorrow’s motivation."'; 
    }else if(randomNumber===4){
        quoteEle.innerText='"A good day is a gift you gave yourself."'; 
    }

   }
   else if(userDay==='neutral'){
     if(randomNumber=== 1){
        quoteEle.innerText='"Not every day is exciting — and that’s okay."';
    }else if(randomNumber===2){
        quoteEle.innerText='"Steady days keep you grounded."'; 
    }else if(randomNumber===3){
        quoteEle.innerText='"Even ordinary days move you forward."'; 
    }else if(randomNumber===4){
        quoteEle.innerText='"Progress hides in the quiet moments."'; 
    }

   }
   else if(userDay==='excited'){
     if(randomNumber=== 1){
        quoteEle.innerText='"Your energy is contagious — keep shining!"';
    }else if(randomNumber===2){
        quoteEle.innerText='"Lock this feeling in and chase it again tomorrow."'; 
    }else if(randomNumber===3){
        quoteEle.innerText='"You’re on fire! Use this momentum."'; 
    }else if(randomNumber===4){
        quoteEle.innerText='"This is the standard you set for yourself — own it."'; 
    }
   }
   else if(userDay==='sad'){
     if(randomNumber=== 1){
        quoteEle.innerText='"Storms don’t last forever — keep walking."';
    }else if(randomNumber===2){
        quoteEle.innerText='"One tough day won’t stop a strong heart."'; 
    }else if(randomNumber===3){
        quoteEle.innerText='"You’ve survived harder days. You’ll get through this."'; 
    }else if(randomNumber===4){
        quoteEle.innerText='"Bad days are just chapters, not the whole story."'; 
    }
   }
   else if(userDay==='calm'){
    if(randomNumber=== 1){
        quoteEle.innerText='"Calm days recharge your soul."';
    }else if(randomNumber===2){
        quoteEle.innerText='"Peace is a sign of balance — treasure it."'; 
    }else if(randomNumber===3){
        quoteEle.innerText='"Rest today, rise stronger tomorrow."'; 
    }else if(randomNumber===4){
        quoteEle.innerText='"Still waters run deep — your progress is steady."'; 
    }
   }
   
   timeoutId=setTimeout(()=>{
     quoteEle.innerText='';
     },4000);
   
   
}






// js for feedback section

const btnEl=document.getElementById('btn');
const appEl=document.getElementById('app');


getNotes().forEach(note=>{
    const noteEl=createNoteEl(note.id,note.content);
    appEl.insertBefore(noteEl,btnEl); /*  we used this thing here load all existing notes from localStorage.
For each saved note, we call insertBefore() to put it back into the DOM.==> for to display excisting old notes on the page*/ 
    
})




// function for to create note 



function createNoteEl(id, content) {
  // Create container for note elements
  const container = document.createElement("div");
  container.classList.add("note-container");
  
  // Create textarea element
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Write about your Day";
  element.value = content;
  
  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "&times;"; // × symbol
  deleteBtn.title = "Delete note";
  
  // Event listeners
  deleteBtn.addEventListener("click", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, container);
    }
  });
  
  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });
  
  // Add elements to container
  container.appendChild(element);
  container.appendChild(deleteBtn);
  
  return container;
}



/*
function createNoteEle(id,content){
    const element=document.createElement("textarea");
    element.classList.add('note');
    element.placeholder='Write about your day';
    element.value=content;

    element.addEventListener('dblclick',()=>{
        const warning=confirm('Do you want to delete this note?');
        if(warning){
            deleteNote(id,element);
        }
    })

    element.addEventListener('input',()=>{
        updateNote(id,element.value);
    });

    return element;  // here we are giving to outside the function beacuse we have to use this element for to adding and do somethings lately so for that we returned this value
}

*/




// for to add each note when we click the button
function addNote(){
    const notes= getNotes();

    const noteObj={
        id: Math.floor(Math.random()*100000),// for to get the specific note we created each id for every note
        content:''  // for to get the content in note 
    } 
     const noteEl=createNoteEl(noteObj.id,noteObj.content);// here in the noteEl we are storing the createNoteEle() function means we are storing // value so for to store that value we use return in the createNoteEle() function

     appEl.insertBefore(noteEl,btnEl); // by using this , the note visually appearing on the page// we used this for to create new note when ever we click on the button==> for to create new note
    
     notes.push(noteObj);

     saveNote(notes);
}




 function deleteNote(id,element){
    const notes=getNotes().filter(note=>note.id!== id);
    saveNote(notes)  // by these lines we can remove the content on the local but not on page which is visually appearing
    appEl.removeChild(element);

 }
 
 function updateNote(id,content){   /*  this is for to update the content to the local storage what we write on the page */
  const notes = getNotes();
  const target= notes.filter((note)=>note.id === id)[0]; /* The filter array ends up with exactly one element.==>The filter array ends up with exactly one element. */
  target.content=content;
  saveNote(notes);

 }

 function saveNote(notes){
     localStorage.setItem('note-app',JSON.stringify(notes)); /*but after creating this when we click the button the id and content is displaying on the localStorage but it replaced by another id and content when we click the new note this is happening beacause in addNote() by notes=[] we making the array always starts with empty , so for to overcome this we get the values from the local storage and we have to store in that notes ==> array */
 }

 function getNotes(){
   return  JSON.parse(localStorage.getItem('note-app') || '[]' );
 }


 btnEl.addEventListener('click',addNote)

