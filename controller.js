
window.addEventListener('keydown', listen_keystrokes, false)

var number_of_item = 0;
var delete_mode = false;

//removing rows when delete is pressed
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

//search for copying the URL as a todo list
function listen_keystrokes(e){
    if (e.keyCode == 84 && e.shiftKey){ //listen to event of Shift + T pressed.
        document.getElementById("add_data").value="";
        create_new_todo_item_link(window.location.href);
    }
}

//working function that creates the todo item
function make_row_cleaner(data_to_put_in_row){
    var new_row = document.createElement('tr');     //create a new row
    new_row.className='row';
    new_row.id = 'row'+number_of_item.toString();
        
        var first_column = document.createElement('td');    //first column
        first_column.className = 'column';
            var new_button = document.createElement('button');  //button
            new_button.id = number_of_item.toString();  //stores the number of the button (0...n-1)
            new_button.className = 'notdone'; //to either display checkmark or circle
            new_button.innerHTML = "o";
            new_button.onclick = function() {
                if(delete_mode){
                    remove_todo(new_button.id); //when user wants to delete the node
                    delete_mode = false;
                    document.getElementById("delete_button").checked = false;
                }
                else{   //swaps between two images and changes color of the corresponding todo item
                    if(new_button.className=='notdone'){    
                        new_button.innerHTML = "&#10003";   //&#10006 is for cross mark
                        new_button.className = 'done';
                        document.getElementById(('div'+new_button.id.toString())).style.color="green";
                    }
                    else if(new_button.className=='done'){
                        new_button.innerHTML = "o";
                        new_button.className = 'notdone';
                        document.getElementById(('div'+new_button.id.toString())).style.color="purple";
                    }
                }   
            }
        first_column.appendChild(new_button);

        var second_column = document.createElement('td');
        second_column.className = 'column';
            var new_division = document.createElement('div');
            new_division.className = number_of_item.toString();
            new_division.id = 'div'+number_of_item.toString();
            new_division.innerHTML = data_to_put_in_row;
            //new_division.onclick = alert("edit todo here!");
        second_column.appendChild(new_division);

    new_row.appendChild(first_column);
    new_row.appendChild(second_column);
    document.getElementById("content").appendChild(new_row);
    document.getElementById("add_data").placeholder="Enter a ToDo item";
    document.getElementById("add_data").value='';
}

//function that creates a new todo items, plus button or enter is pressed to call on here
function create_new_todo_item() {
    if(document.getElementById("add_data").value===""){
        document.getElementById("add_data").placeholder="Please enter new todo!!";
    }
    else {
        make_row_cleaner(document.getElementById("add_data").value);
        document.getElementById(('div'+number_of_item.toString())).style.color="red";
        number_of_item += 1;
    }
    
}
//function that gets called to create a new todo item with the websites current link
function create_new_todo_item_link(item_name){
    make_row_cleaner(item_name);
    document.getElementById(('div'+number_of_item.toString())).style.color="blue";
    number_of_item +=1;
}

//handler for the case when enter is pressed during adding todo items
function search(ele){
    if(event.key==='Enter'){
        create_new_todo_item();
        document.getElementById("add_data").value="";
    }
}

function remove_todo(id){
    document.getElementById((id)).remove();
}

//Deletes all the todo items
function delete_all_nodes(){
    for (var i =0; i< number_of_item; i++){
        remove_todo(('row'+i.toString()));
    }
    delete_mode = false;
    document.getElementById("delete_button").checked = false;
}


function edit_todo(){
    for (var i =0; i< number_of_item; i++){

    }
}
