//Global boolean to know if delete mode or not
var delete_mode = false;

//Event Listeners

//plus icon
document.getElementById("create_new_todo_item").addEventListener("click",
    function(){
        console.log("newtodo item call block");
        create_new_todo_item();        
    }
);

//enter
document.getElementById("add_data").addEventListener("keypress",
    function(event){
        if(event.key=='Enter'){
            console.log("enter key pressed");
            create_new_todo_item();
            document.getElementById("add_data").value="";
        }
    }
);

//delete button
document.getElementById("delete_button").addEventListener("click", 
function(){
    console.log("delete button signal clicked");
    delete_mode = !delete_mode;
});

//delete all button
document.getElementById("delete_all_button").addEventListener("click", 
function(){
    for (var i =0; i< current_application.next_number; i++){
        remove_todo(('row'+i.toString()));
    }
    chrome.storage.sync.clear(function(){
        ;   //Deletes all the todos stored  
    });
    delete_mode = false;
    console.log("Delete all ");
});

//Classes 
class Todo_item {
    constructor(number, message, color, button) {
        this.id_number = number;
        this.todo_message = message;
        this.todo_color = color;
        this.todo_button = button;
    }
    add_to_html(){
        //Create a new_row in the html file
        var new_row = document.createElement('tr');     //create a new row
        new_row.className='row';
        new_row.id = 'row'+this.id_number.toString();  //row1, row2, ...
        
        //Create first Column
        var first_column = document.createElement('td');    //first column
        first_column.className = 'column';
            var new_button = document.createElement('button');  //button
            new_button.id = this.id_number.toString();  //stores the number of the button (0...n-1)
            if(this.todo_button==="o"){
                new_button.className = 'notdone'; //to either display checkmark or circle
                new_button.innerHTML = "o";
            }
            else {
                new_button.className = 'done'; //to either display checkmark or circle
                new_button.innerHTML = "&#10003";
            }            
            new_button.onclick = function() {
                if(delete_mode){
                    remove_todo(('row'+new_button.id.toString())); //when user wants to delete the node
                    delete_mode = false;
                    document.getElementById("delete_button").checked = false;   //uncheck the delete mode
                }
                else{   //swaps between two images and changes color of the corresponding todo item
                    if(new_button.className=='notdone'){    
                        new_button.innerHTML = "&#10003";   
                        this.todo_button = "&#10003";   

                        //change the stored button as well
                        new_button.className = 'done';
                        
                        //Change the color of the element as well
                        document.getElementById(('div'+new_button.id.toString())).style.color="green";
                        this.todo_color = "green";
                    }
                    else if(new_button.className=='done'){
                        new_button.innerHTML = "o";
                        this.todo_button = "o";

                        new_button.className = 'notdone';
                        
                        document.getElementById(('div'+new_button.id.toString())).style.color="purple";
                        this.todo_color = "purple";
                    }
                }   
            }
        first_column.appendChild(new_button);

        var second_column = document.createElement('td');
        second_column.className = 'column';
            var new_division = document.createElement('div');
            new_division.className = this.id_number.toString();
            new_division.id = 'div'+ this.id_number.toString();
            
            //Set the color and message
            new_division.style.color = this.todo_color;
            
            /*
            if(this.message==undefined){
                console.log("else block", this.message);
                this.message = document.getElementById("add_data").value;
                console.log("after", this.message);
            }*/

            new_division.innerHTML = this.todo_message;
            
            new_division.contentEditable = true;        //TODO!-need to track if the content is changed or not
            new_division.onmouseover = new_division.style.cursor = 'pointer';
        second_column.appendChild(new_division);

    new_row.appendChild(first_column);
    new_row.appendChild(second_column);
    document.getElementById("content").appendChild(new_row);
    document.getElementById("add_data").placeholder="Enter a ToDo item";
    document.getElementById("add_data").value='';
    }
}

class Todo_Application {
    constructor(starting_value){
        this.next_number = starting_value;
        this.all_todo_items = [];
    }
    add_todo_item(item){
        this.all_todo_items.push(item);
        this.next_number +=1;
    }
}

// Helper functions
function remove_todo(id){
    el = document.getElementById((id));
    if(el){
        el.remove();
    }
}

//Creates todo item by getting value of text entry box
function create_new_todo_item(){
    if(document.getElementById("add_data").value===""){
        document.getElementById("add_data").placeholder="Please enter new todo!!";
    }
    else {
        //Create a new instance of a todo item
        var data_from_text_box = document.getElementById("add_data").value;
        console.log(data_from_text_box);
        var temp = new Todo_item(current_application.next_number,data_from_text_box,"red","o");
        temp.add_to_html(); //Add the item to the html
        
        //Add the item to the current class
        current_application.add_todo_item(temp);   
    }
}

//Instance a new application
var current_application = new Todo_Application(0);