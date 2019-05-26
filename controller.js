
window.addEventListener('keydown', listen_keystrokes, false)

var number_of_item = 0
//search for copying the URL as a todo list
function listen_keystrokes(e){
    if (e.keyCode == 84 && e.shiftKey){ //listen to event of Shift + T pressed.
         create_new_todo_item_(window.location.href,2);
    }
}

function remove_todo(id){
    var element = document.getElementById(id);
    element.style.color = "green" ;
    element.style.setProperty("text-decoration","line-through")
    
}

function format_string (front, middle, back){
    var str = front + middle.toString() + back;
    return str;
}

function create_new_todo_item() {
    var new_row = document.createElement('div');
    new_row.className = 'row';
    var button_tags = '<input type="button" value="o" id = "';
    button_tags= button_tags + number_of_item.toString() + 'onclick="remove_todo(' + number_of_item.toString() + ')">'; 
    var div_tags= '<div class ="';
    div_tags = div_tags + number_of_item.toString() + '" id ="' +number_of_item.toString()+  '" ></div>' ;
    var tags = button_tags + div_tags;
    new_row.innerHTML = tags;
    document.getElementById("content").appendChild(new_row);
    document.getElementsByClassName(number_of_item.toString())[0].addEventListener('click',function(event){
        document.getElementsByID(number_of_item.toString()).innerHTML = document.getElementById(number_of_item.toString()).value;
        } );
    number_of_item += 1;
}

function add_data_to_division(item_to_add){
    number_of_item -=1;
    document.getElementById(number_of_item).innerHTML=item_name;
    number_of_item +=1;
}

function create_new_todo_item_(item_name, item_type){
    create_new_todo_item();
    number_of_item -=1;
    document.getElementById(number_of_item).innerHTML=item_name;
    if(item_type===1){
        document.getElementById(number_of_item).style.color = "red";
    }
    else if(item_type===2){
        document.getElementById(number_of_item).style.color = "blue";
    }
    number_of_item +=1;
}

