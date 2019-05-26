
window.addEventListener('keydown', listen_keystrokes, false)

var number_of_item = 0;
var edit_mode = false;

//search for copying the URL as a todo list
function listen_keystrokes(e){
    if (e.keyCode == 84 && e.shiftKey){ //listen to event of Shift + T pressed.
        document.getElementById("add_data").value="";
        create_new_todo_item_link(window.location.href);
    }
}

function remove_todo(id){
    //var element = document.getElementById(id);
    //element.style.color = "green" ;
    //element.style.setProperty("text-decoration","line-through");
    alert("ASdsa");
}

function edit_todo(){
    for (var i =0; i< number_of_item; i++){

    }
}

function make_row_cleaner(data_to_put_in_row){
    var new_row = document.createElement('tr');
    new_row.className='row';
    new_row.id = 'row'+number_of_item.toString();
        
        var first_column = document.createElement('td');
        first_column.className = 'column';
            var new_button = document.createElement('button');
            new_button.id = number_of_item.toString();
            new_button.className = 'notdone';
            new_button.innerHTML = "o";
            new_button.onclick = function() {
                if(edit_mode){
                    remove_todo(new_button.id);
                }
                else{
                    if(new_button.className=='notdone'){
                        new_button.innerHTML = "&#10003";   //&#10006 is for cross mark
                        new_button.className = 'done';
                        document.getElementById(('div'+new_button.id.toString())).style.color="green";
                    }
                    else if(new_button.className=='done'){
                        new_button.innerHTML = "o";
                        new_button.className = 'notdone';
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

function create_new_todo_item_link(item_name){
    make_row_cleaner(item_name);
    document.getElementById(('div'+number_of_item.toString())).style.color="blue";
    number_of_item +=1;
}

function search(ele){
    if(event.key==='Enter'){
        create_new_todo_item();
        document.getElementById("add_data").value="";
    }
}

