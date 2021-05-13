// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date());  // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isComplete:boolean;

    //constructor(title:string){
    //    this.title = title;
    //}
}

//let item = new ToDoItem();
//item.title = "Testing";
//item.dueDate = new Date(2020, 6, 1);
//item.isComplete = false;

window.onload = function() {
    let addItem = document.getElementById("addBtn");
    addItem.onclick = main;
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

/**
 * Check that form data is valid
 */
function isValid():boolean{
    return true;
}
 /**
  * Get input from form and wrap in
  * ToDoItem object
  */
function getToDoItem():ToDoItem{
    // create ToDoItem
    let toDo = new ToDoItem();

    // populate fields of ToDoItem
    let titleInput = (<HTMLInputElement>document.getElementById("title"));
    toDo.title = titleInput.value;

    let dueDateInput = (<HTMLInputElement>document.getElementById("due-date"));
    toDo.dueDate = new Date(dueDateInput.value); //create new date

    let isComplete = (<HTMLInputElement>document.getElementById("is-complete"));
    toDo.isComplete = isComplete.checked;

    return toDo;
}

/**
 * Display given ToDoItem on web page
 */
function displayToDoItem(item:ToDoItem):void{
    // Create elements and populate with info
    let itemTitle = document.createElement("h3");
    itemTitle.innerText = item.title;

    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();

    // Div for display
    let itemDiv = document.createElement("div");

    // If ToDoItem is complete, add class to new div for CSS
    if(item.isComplete){
        itemDate.classList.add("is-complete");
    }


    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDate);


    // If ToDoItem is complete, add to completed items list
    if(item.isComplete){
        let completedItems = document.getElementById("complete-items");
        completedItems.appendChild(itemDiv);
    }
    else{
        let incompletedItems = document.getElementById("incomplete-items");
        incompletedItems.appendChild(itemDiv);
    }
}


// Allow user to mark ToDoItem as completed
// Store ToDoItems in web storage