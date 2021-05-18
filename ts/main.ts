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

// Example: instantiation and population;
//let item = new ToDoItem();
//item.title = "Testing";
//item.dueDate = new Date(2020, 6, 1);
//item.isComplete = false;

window.onload = function() {
    let addItem = document.getElementById("addBtn");
    addItem.onclick = main;

    // Load saved item(s)
    loadSavedItem();
}

function loadSavedItem(){
    let item = getToDo();
    displayToDoItem(item);
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

/**
 * Check that form data is valid
 */
function isValid():boolean{
    let titleInput = (<HTMLInputElement>document.getElementById("title")).value;
    let dueDateInput = (<HTMLInputElement>document.getElementById("due-date")).value;
    
    if (titleInput.trim() == ""){
        alert("You don't have anything to do? Dang.");
        return false;
    } 
    if (dueDateInput.trim() == ""){
        alert("Set yourself a nice goal date of completion.");
        return false;
    } 



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
    // Heading with ToDo item title
    let itemTitle = document.createElement("h4");
    itemTitle.innerText = item.title;

    // Paragraph with ToDo item due date
    let itemDate = document.createElement("p");
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    // Div for display, give all display divs "todo" class
    let itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("to-do");

    // If ToDoItem is complete, add class "is-complete" to new div for CSS
    if(item.isComplete){
        itemDiv.classList.add("is-complete");  
    }

    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDate);

    // If ToDoItem is complete, add to completed items list
    if(item.isComplete){
        let completedItems = document.getElementById("completed-items");
        completedItems.appendChild(itemDiv);
    }
    else{
        let incompletedItems = document.getElementById("incomplete-items");
        incompletedItems.appendChild(itemDiv);
    }
}

function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("is-complete");

    let completedItems = document.getElementById("completed-items");
    completedItems.appendChild(itemDiv);
}

// Function to store single ToDo Item
function saveToDo(item:ToDoItem):void{
    // Convert object to string
    let itemString = JSON.stringify(item);

    // Save string as web storage
    localStorage.setItem(todokey, itemString);
}

const todokey = "todo";

// Function to retrieve single ToDo Item
/**
 * Gets stored ToDo item or return null if none is found.
 * @returns stored ToDo item or null
 */
function getToDo():ToDoItem{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem = JSON.parse(itemString);
    return item;
}