

chrome.commands.onCommand.addListener(function(command) {
    console.log("in callback");
    if(command == "Copy-Webpage-Link"){
        alert("Asdds");
    }
  });
  