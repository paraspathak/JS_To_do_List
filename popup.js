
var number_of_item = 0;
var delete_mode = false;

document.getElementById("create_new_todo_item").addEventListener("click",
    function(){
        console.log("newtodo item call block");
        create_new_todo_item();
        
    }
);

document.getElementById("add_data").addEventListener("keypress",
    function(event){
        if(event.key=='Enter'){
            console.log("enter key pressed");
            create_new_todo_item();
            document.getElementById("add_data").value="";
        }
    }
);


document.getElementById("delete_button").addEventListener("click", 
function(){
    console.log("delete button signal clicked");
    delete_mode = !delete_mode;
});

document.getElementById("delete_all_button").addEventListener("click", 
function(){
    for (var i =0; i< number_of_item; i++){
        remove_todo(('row'+i.toString()));
    }
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
    }
}

