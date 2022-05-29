var pos = 0;
var current_top = 0;
var turn = 0;

function update() {
  pos = -$(window).scrollTop();
}
$(window).bind("scroll", update);

window.onload = function() {
  function updateScrollSmooth() {
    current_top -= (current_top - pos) * 0.05;
    document.getElementById("big-logo-image").style.top =
      current_top + Math.cos(turn) * 6 + "px";
    turn += 0.01;
  }
  setInterval(updateScrollSmooth, 1);
};

function selectGroup(i) {
  document.getElementById("group-small-id").style.border = "0";
  document.getElementById("group-medium-id").style.border = "0";
  document.getElementById("group-large-id").style.border = "0";

  document.getElementById(i).style.border = "thick solid white";
}

function selectState(i) {
  document.getElementById("loc-utah-id").style.border = "0";
  document.getElementById("loc-colorado-id").style.border = "0";
  document.getElementById("loc-idaho-id").style.border = "0";

  document.getElementById(i).style.border = "thick solid white";

  document.getElementById("utah-rivers").style.display = "none";
  document.getElementById("colorado-rivers").style.display = "none";
  document.getElementById("idaho-rivers").style.display = "none";
  document.getElementById("no-state-selected").style.display = "none";

  if (i == "loc-utah-id") {
    document.getElementById("utah-rivers").style.display = "block";
  }
  if (i == "loc-colorado-id") {
    document.getElementById("colorado-rivers").style.display = "block";
  }
  if (i == "loc-idaho-id") {
    document.getElementById("idaho-rivers").style.display = "block";
  }
}


function addParticipant() {
  var ul = document.getElementById("participants-list");
  var li = document.createElement("li");
  var text = document.getElementById("name").value;
  li.appendChild(document.createTextNode(text));
  ul.appendChild(li);
}

