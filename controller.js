
window.addEventListener('keydown', listen_keystrokes, false)

function create_new_todo_item( item){
   console.log(item) 
}

function listen_keystrokes(e){
    if (e.keyCode == 84 && e.shiftKey){ //listen to event of Shift and T pressed.
         create_new_todo_item(window.location.href)
    }
}

