//Global boolean to know if delete mode or not
var delete_mode = false;
var current_application = {};

full_date = new Date();
y = full_date.getFullYear();
m = full_date.getMonth() + 1;
d = full_date.getDate();

document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

//Event Listeners

//menu icon
document.getElementById("menu_appear").addEventListener("click",function(){
    if(document.getElementById("make_menu").style.visibility == "visible"){
        document.getElementById("make_menu").style.visibility = "collapse";
    }
    else{
        document.getElementById("make_menu").style.visibility = "visible";
    }

});

//save icon
document.getElementById("save_all_button").addEventListener("click",function(){
    for(var i=0; i<current_application.all_todo_items.length; i++){
        var temp = document.getElementById(('div'+ current_application.all_todo_items[i].id_number.toString()));
        if(temp){
            current_application.all_todo_items[i].todo_message = temp.innerHTML;
        }        
    }
    current_application.save();
});

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
        remove_todo((i.toString()));
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
            new_button.style.width = '28px';
            new_button.style.background = 'transparent' ;
            if(this.todo_button==="o"){
                new_button.className = 'notdone'; //to either display checkmark or circle
                new_button.innerHTML = "o";
            }
            else {
                new_button.className = 'done'; //to either display checkmark or circle
                new_button.innerHTML = "&#10003";
            }
            new_button.style.border = '2px solid';            
            new_button.style.borderColor = this.todo_color;
            new_button.style.borderRadius = '6px';
            new_button.onclick = function() {
                if(delete_mode){
                    remove_todo((new_button.id.toString())); //when user wants to delete the node
                    delete_mode = false;
                    document.getElementById("delete_button").checked = false;   //uncheck the delete mode
                    current_application.save();
                    console.log(current_application);
                }
                else{   //swaps between two images and changes color of the corresponding todo item
                    if(new_button.className=='notdone'){    
                        //change the button status
                        new_button.innerHTML = "&#10003";   
                        new_button.className = 'done';
                        new_button.style.borderColor = "green"; 
                        //Update the array
                        update_stored_value(new_button.id,"green","&#10003");
                        //Change the color of the element as well
                        document.getElementById(('div'+new_button.id.toString())).style.color="green";
                        
                    }
                    else if(new_button.className=='done'){
                        new_button.innerHTML = "o";
                        this.todo_button = "o";
                        new_button.style.borderColor = "purple"; 
                        new_button.className = 'notdone';

                        update_stored_value(new_button.id,"purple","o");
                        
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
        this.save();
    }
    save(){
        //First remove the current instance of the class
        chrome.storage.sync.clear(function(event){
            console.log(event, "Cleared item before saving");
        });
        //Save this instance of the class
        console.log({"whole-application":this});
        chrome.storage.sync.set({"whole-application":this}, function(event){
            console.log("storing success");
        });
    }
    load(){
        //loop through current elements and create a new instance using current elements name,... and replace the value of current element
        for (var i =0; i<this.all_todo_items.length; i++){
            //only messages are being load
            console.log(this.all_todo_items[i].id_number,this.all_todo_items[i].todo_message,this.all_todo_items[i].todo_color, this.all_todo_items[i].todo_button);
            var temp = new Todo_item(this.all_todo_items[i].id_number,this.all_todo_items[i].todo_message,this.all_todo_items[i].todo_color, this.all_todo_items[i].todo_button);
            temp.add_to_html();
            console.log(temp);
            this.all_todo_items[i] = temp;
        }
    }
}

// Helper functions

function update_stored_value(item_id, color_to_change_to, button_to_change_to){
    for(var i =0; i<current_application.all_todo_items.length; i++){
        if(current_application.all_todo_items[i].id_number==item_id){
            current_application.all_todo_items[i].todo_button = button_to_change_to;
            current_application.all_todo_items[i].todo_color = color_to_change_to;
            current_application.save();
        }
    }
}

//Remove given todo
function remove_todo(id){
    el = document.getElementById(('row'+id));
    if(el){
        el.remove();
        for(var i =0; i<current_application.all_todo_items.length; i++){
            if(current_application.all_todo_items[i].id_number==id){
                current_application.all_todo_items.splice(i,1);
                break;
            }
        }
        current_application.save();
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

//Main Script

//intialize an empty object
current_application = new Todo_Application(0);


//Load saved data
chrome.storage.sync.get("whole-application",function(item){
    if(item && !chrome.runtime.error){
        var loaded_application = item["whole-application"];
        if(loaded_application){
            current_application.all_todo_items = loaded_application.all_todo_items;
            current_application.next_number = loaded_application.next_number;
            current_application.load();
        }        
    }
});
