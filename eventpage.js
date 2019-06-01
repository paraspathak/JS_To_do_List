
function create_new_todo_item_by_selection(word){
    console.log("signal received", word);
}

chrome.contextMenus.create({
    id:"Todolist",
    title: "Add to Todo List",
    contexts : ["selection"],
    onclick : create_new_todo_item_by_selection
});

chrome.contextMenus.onClicked.addListener(function(word){
    if(word.menuItemId == "Todolist" && word.selectionText){
        chrome.storage.sync.get("whole-application",function(item){
            if(item && !chrome.runtime.error){
                var loaded_application = item["whole-application"];
                loaded_application.all_todo_items.push(
                    {
                        id_number : loaded_application.next_number,
                        todo_message : word.selectionText,
                        todo_color : "red",
                        todo_button : "o"
                    }
                );
                loaded_application.next_number+=1;
                chrome.storage.sync.clear(function(event){
                    console.log(event, "Cleared item before saving");
                });
                //Save this instance of the class
                console.log({"whole-application":loaded_application});
                chrome.storage.sync.set({"whole-application":loaded_application}, function(event){
                    console.log("storing success",event);
                });
            }
        });
        
    }
});
