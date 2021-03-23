//Js file for website
window.onload = function() {
    openTab(null, "Main");
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function show(name) {
    var popup = document.getElementById(name);
    popup.classList.toggle("show");
}

function voteButton() {
    var test = "";
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function loadBracket(bracketID)
{
    readTextFile("bracketdata.json", function(text){
        var data = JSON.parse(text);

        let teamCount = 8;
        var i;
        for(i = 0; i < teamCount; i++)
        {
            document.getElementById('r1t' + (i + 1).toString()).innerHTML = '<img src="' + data.teams[i].itemPath + '" title="' + data.teams[i].itemName +'" width="240" height="150"/>' + data.teams[i].itemName;
        }
    });
}