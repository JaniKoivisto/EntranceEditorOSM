// Display user input after clicking Send:

var userName = document.getElementById("userName");
var userText = document.getElementById("userText");
var sendBtn = document.getElementById("sendBtn");



function inputLength() {
  return userName.value.length;
}


function checkInput() {
  if (inputLength() > 0) {
    alert(userName.value + " says: " + userText.value);
  }
}


sendBtn.addEventListener("click", checkInput)


