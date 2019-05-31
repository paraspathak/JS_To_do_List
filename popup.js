
var number_of_item = 0;
var delete_mode = false;
messages = [];
colors =  [];
buttons = [];

//store the number of items
function increase_number_of_items(){
    chrome.storage.sync.set({"number":number_of_item},function(items){
        console.log("Number of items is stored");
    });    
}

//store the todo item, color and type of button
function store_todo(message_, color_, button_){
    messages.push(message_);
    colors.push(color_);
    buttons.push(button_);
    chrome.storage.sync.set({"messages_stored":messages,
                             "colors_stored":colors,
                             "buttons_stored":buttons},function(){
        console.log("Number of items is stored");
    });
}
//get the number of items stored
chrome.storage.sync.get("number",function(items){
    if (!chrome.runtime.error) {
        console.log(items);
        if(items.number){
            console.log(items.number);
            //number_of_item = items.number;
        }
      }
});


chrome.storage.sync.get(["messages_stored","colors_stored","buttons_stored"],function(items){
    if (!chrome.runtime.error) {
        if(items.messages_stored && items.colors_stored && items.buttons_stored){
            var i = 0;
            console.log(items.messages_stored[i], items.colors_stored[i], items.buttons_stored[i]);
        }
        console.log(items);
      }
});
chrome.storage.sync.get("colors_stored",function(items){
    if (!chrome.runtime.error) {
        console.log(items);
      }
});
chrome.storage.sync.get("buttons_stored",function(items){
    if (!chrome.runtime.error) {
        console.log(items);
      }
});

//when the plus icon is clicked to start a new todo item
document.getElementById("create_new_todo_item").addEventListener("click",
    function(){
        console.log("newtodo item call block");
        create_new_todo_item();
        
    }
);

//entered is pressed to store new data
document.getElementById("add_data").addEventListener("keypress",
    function(event){
        if(event.key=='Enter'){
            console.log("enter key pressed");
            create_new_todo_item();
            document.getElementById("add_data").value="";
        }
    }
);

//delete button is pressed
document.getElementById("delete_button").addEventListener("click", 
function(){
    console.log("delete button signal clicked");
    delete_mode = !delete_mode;
});

//delete all button is pressed
document.getElementById("delete_all_button").addEventListener("click", 
function(){
    for (var i =0; i< number_of_item; i++){
        remove_todo(('row'+i.toString()));
    }
    chrome.storage.sync.clear(function(){
        ;   //Deletes all the todos stored  
    });
    delete_mode = false;
    console.log("Delete all ");
    document.getElementById("delete_button").checked = false;
});


function remove_todo(id){
    el = document.getElementById((id));
    if(el){
        el.remove();
    }
}


function make_row_cleaner(data_to_put_in_row){
    console.log("Inside make row cleaner");
    store_todo(data_to_put_in_row,"red","o");   //store the new data as red and O button
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
                    remove_todo(('row'+new_button.id.toString())); //when user wants to delete the node
                    delete_mode = false;
                    document.getElementById("delete_button").checked = false;
                }
                else{   //swaps between two images and changes color of the corresponding todo item
                    if(new_button.className=='notdone'){    
                        new_button.innerHTML = "&#10003";   //&#10006 is for cross mark
                        //change the stored button as well
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
            new_division.contentEditable = true;
            new_division.onmouseover = new_division.style.cursor = 'pointer';
        second_column.appendChild(new_division);

    new_row.appendChild(first_column);
    new_row.appendChild(second_column);
    document.getElementById("content").appendChild(new_row);
    document.getElementById("add_data").placeholder="Enter a ToDo item";
    document.getElementById("add_data").value='';
}

function create_new_todo_item(){
    console.log("Inside create new todo");
    if(document.getElementById("add_data").value===""){
        document.getElementById("add_data").placeholder="Please enter new todo!!";
    }
    else {
        make_row_cleaner(document.getElementById("add_data").value);
        document.getElementById(('div'+number_of_item.toString())).style.color="red";
        number_of_item += 1;
        increase_number_of_items();
    }
}


