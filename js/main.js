var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("addBtn");
    addItem.onclick = main;
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var toDo = new ToDoItem();
    var titleInput = document.getElementById("title");
    toDo.title = titleInput.value;
    var dueDateInput = document.getElementById("due-date");
    toDo.dueDate = new Date(dueDateInput.value);
    var isComplete = document.getElementById("is-complete");
    toDo.isComplete = isComplete.checked;
    return toDo;
}
function displayToDoItem(item) {
    var itemTitle = document.createElement("h4");
    itemTitle.innerText = item.title;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    if (item.isComplete) {
        itemDate.classList.add("is-complete");
    }
    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDate);
    if (item.isComplete) {
        var completedItems = document.getElementById("complete-items");
        completedItems.appendChild(itemDiv);
    }
    else {
        var incompletedItems = document.getElementById("incomplete-items");
        incompletedItems.appendChild(itemDiv);
    }
}
