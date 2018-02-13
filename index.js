// NOTE: Stopped working with url .gomex.me, changed to glitch.me.

$(document).ready(function() {
  // An array containing the handles of streamers, whose status is to be displayed.
  var streamers = ["ESL_SC2", "cretetion", "comster404", "freecodecamp", "habathcx", "deadmau5", "storbeck", "RobotCaleb", "OgamingSC2", "noobs2ninjas", "brunofin"];


// ===== GETINFO FUNCTION =====
  // The main function.
  function getInfo (item, index) {
    // Generates the HTML structure for each element.
    var streamRow = $("<div>", {id: "streamRow" + index, "class": "row streamRow"});
    var logoCol = $("<div>", {id: "logoCol" + index, "class": "logoCol col-xs-4 col-md-2"});
    var textCol = $("<div>", {id: "textCol" + index, "class": "textCol col-xs-8 col-md-10"});
    var textRow = $("<div>", {id: "textRow" + index, "class": "row textRow"});
    var nameCol = $("<div>", {id:"nameCol" + index, "class": "col-md-4 text-center nameCol"});
    var statusCol = $("<div>", {id:"statusCol" + index, "class": "col-md-8 text-center statusCol"});

    // Assembles the HTML structure.
    streamRow.appendTo("#mainRow");
    logoCol.appendTo("#streamRow" + index);
    textCol.appendTo("#streamRow" + index);
    textRow.appendTo("#textCol" + index);
    nameCol.appendTo("#textRow" + index);
    statusCol.appendTo("#textRow" + index);
    
// ===== CHANNELS GET REQUEST =====
    // Requests information regarding a channel.
    $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + item, function (data) {
      // If the channel doesn't exist:
      if (data.error === "Not Found") {
        // Display a default image as the avatar.
        $("<img>", {src: "http://placehold.it/300x300/4f6c2f/4f6c2f", "class": "img img-responsive"}).appendTo("#logoCol" + index);
        // Show error in the name field.
        $("<span>").text("Error").appendTo("#nameCol" + index);
        // Show error message in the status field.
        $("<span>").text("Channel not found").appendTo("#statusCol" + index)
        // Adds a class to the row containing this channels info.
        streamRow.addClass("error");
      
        // If the channel does exist:
      } else {
        // Creates an anchor tag to house the image.
        $("<a>", {id: "imgA" + index, href: data.url, target: "_blank"}).appendTo("#logoCol" + index);
        // Retrieves avatar url and places it inside anchor tag. 
        $("<img>", {src: data.logo, "class": "img img-responsive"}).appendTo("#imgA" + index);
        // Creates an anchor tag which contains the name of thechannel.
        $("<a>", {href: data.url, target: "_blank"}).text(data.display_name).appendTo("#nameCol" + index);
        
// ===== STREAMS GET REQUEST =====
        $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + item, function (data) {
          // if stream is offline:
          if (data.stream === null) {
            // Set status field to 'offline'.
            $("<span>").text("Offline").appendTo("#statusCol" + index);
            // Adds a class to the row containing this channels info.
            streamRow.addClass("offline");
            
            // If the stream is online:
          } else {
            // Create an anchor tag which displays the streams current status.
            $("<a>", {href: data.stream.channel.url, target: "_blank"}).text(data.stream.game + ": " + data.stream.channel.status).appendTo("#statusCol" + index);
            // Adds a class to the row containing this channels info.
            streamRow.addClass("online");
          }; // else
          
        }); // get & function
      } // else
        
    }); // get channels & function
    
  }; // getInfo
  
  streamers.forEach(getInfo);
  
// ===== BUTTON EVENT =====
  // When the button is clicked:
  $("#hideOfflineBtn").on("click", function () {
    // If button reads 'hide offline:
    if ($("#hideOfflineBtn").text() == "Hide Offline") {
      // Hide all offline and error rows.
      $(".offline, .error").slideUp(25);
      // Change text of button.
      $("#hideOfflineBtn").text("Show Offline");
      // If button reads 'show offline:
    } else {
      // Show all offline and error rows.
      $(".offline, .error").slideDown(25);
      // Change text of button.
      $("#hideOfflineBtn").text("Hide Offline");
    };
  }); // btn
  
}); // document ready