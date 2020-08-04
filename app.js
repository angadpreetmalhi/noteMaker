// get all all saved notes on refresh
savedNotes();
//get data from user and make object of arrays
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let titleTxt = document.getElementById("titleTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let data={
  notesData:addTxt.value,
  titleData:titleTxt.value
    }
  if(addTxt.value!='' && titleTxt.value!=''){
  notesObj.push(data);
  localStorage.setItem("notes", JSON.stringify(notesObj));
}
  addTxt.value = "";
  titleTxt.value="";
  savedNotes();
});
//function to get all saved notes 
function savedNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
   notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 ml-5 card" id="impCol" style="width: 18rem; " >
                    <div class="card-body">
                       <div class="card-header">
                         <button id="${index}"onclick="delNotes(this.id)" class="close">&times;</button>
                         <h5 class="card-title">${element.titleData}</h5>
                       </div>
                         <p class="card-text"> ${element.notesData}</p>

                    </div>
                </div>`;

  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
    document.getElementById("savedNotes").innerHTML=`<div class="alert alert-success ml-5" role="alert" style="margin:2%;">
    <h4 class="alert-heading">Saved Notes</h4>
</div>`;
  } else {
    notesElm.innerHTML = '';
    document.getElementById("savedNotes").innerHTML=`<div class="alert alert-warning ml-5" role="alert" style="margin:2%;">
    <h4 class="alert-heading">Nothing is available yet! Create Your first Note</h4>
    </div>`;
  }
}
//function to delete saved notes
function delNotes(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  savedNotes();
}
// function to search notes by title or text data
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let searchedValue = search.value.toLowerCase();
    // console.log('Input event fired!', searchedValue);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(searchedValue) || cardTitle.includes(searchedValue) ){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
       
    })
})
