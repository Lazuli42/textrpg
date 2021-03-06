
var commands = ["LOOK", "USE", "ATTACK", "GET", "TALK", "EQUIP", "DROP"];
$(document).ready(function(){

  var player = new Player("",10,1,"It's you.");
  var linenClothes = new Loot("Linen Clothes","It's your clothes");
  player.inventory.push(linenClothes);

  $("#userInfo").submit(function(event){
    event.preventDefault();

    var name = $("#userName").val();
    player.name = name;

    console.log(player);


  });
  $("#userEntries").submit(function(event){
    event.preventDefault();
    var userEntry = $("#userInput").val().toUpperCase();
    var userEntryArray = userEntry.split(" ");
    var isValid = false;
    // Is it a valid command
    for(var i=0;i<commands.length;i++){
      if(userEntryArray[0] === commands[i]){
        $("#story").append("<li>> " + userEntry + "</li>");
        $("#userInput").val("");
        isValid = true
        //If it is LOOK
        if(userEntryArray[0] === commands[0]){
          //If it is ONLY LOOK
          for(var r=0;r<rooms.length;r++){
            if(userEntryArray.length === 1){
              rooms[r].look();
            }
            //If it is LOOK with more words
            else if(userEntryArray.length > 1){
              for(var i=1;i<userEntryArray.length;i++){
                for(var j=0;j<rooms[r].loot.length;j++){
                  if(userEntryArray[i].includes(rooms[r].loot[j].name)){
                    $("#story").append("<li>" + rooms[r].loot[j].info + "</li>");
                  }
                }
                for(var j=0;j<rooms[r].usable.length;j++){
                  if(userEntryArray[i].includes(rooms[r].usable[j].name)){
                    $("#story").append("<li>" + rooms[r].usable[j].info + "</li>");
                  }
                }
              }
            }
          }
        }
        else if(userEntryArray[0] === commands[3]){
          //If it is ONLY GET
          for(var r=0;r<rooms.length;r++){
            if(userEntryArray.length === 1){
              $("#story").append("<li>You can't grab the air.</li>");
            }
            //If it is GET with more words
            else if(userEntryArray.length > 1){
              for(var get=1;get<userEntryArray.length;get++){
                for(var j=0;j<rooms[r].loot.length;j++){
                  if(userEntryArray[get].includes(rooms[r].loot[j].name)){
                    $("#story").append("<li>You pick up the " + rooms[r].loot[j].name + " and put it in your inventory.</li>");
                    player.inventory.push(rooms[r].loot[j])
                    console.log(player)
                  }
                }
              }
            }
          }
        }
      }
    }
    if(!isValid){
      $("#story").append("<li>You can't '" + userEntry + "'.</li>");
    }
  });
});
