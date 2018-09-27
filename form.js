// Display user input after clicking Send:

var userName = document.getElementById("userName");
var userText = document.getElementById("userText");
var coordinates = document.getElementById("nodeCoordinates");
var sendBtn = document.getElementById("sendBtn");



function inputLength() {
  return userName.value.length;
}

function checkInput() {
  var entrance = new Entrance(userName, ol.proj.toLonLat(coordinates), userText.value);
  if (inputLength() > 0) {
    var jqxhr = $.post("https://api.openstreetmap.org/api/0.6/notes?lat=" + entrance.getCoordinates()[1] + "&lon=" + entrance.getCoordinates()[0] + "&text=" + entrance.getText(), function() {
    console.log("success");
  })
  .done(function() {
    console.log("done");
  })
  .fail(function() {
    console.log("fail");
  })
  .always(function() {
    //console.log("finished")
  });
}
}

sendBtn.addEventListener("click", checkInput)


