//Js file for website
window.onload = function() {
    loadBrackets();

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

function voteButton(clicked_id) {
    //document.getElementById(clicked_id).innerHTML = "clicked";

    //button id format goes as follows: b r roundID t teamID
    var roundid = parseInt(clicked_id[2]);
    var teamid = parseInt(clicked_id[4]);

    //get other team id
    var otherTeamid = teamid + ((teamid + 1) % 2) - (teamid % 2);

    //disable both buttons
    document.getElementById(clicked_id).disabled = true;
    document.getElementById('br' + roundid + 't' + otherTeamid).disabled = true;

    voteTeam(teamid);
}

function voteTeam(teamId) {

}

function  writeTextFile(file, text, callback) {

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

function loadBrackets()
{
    readTextFile("bracketdata.json", function(text){
        var data = JSON.parse(text);

        let teamCount = data.teams.length;
        var i;
        for(i = 0; i < teamCount; i++)
        {
            document.getElementById('r1t' + (i).toString()).innerHTML = '<button type="button" id = "br1t' + i + '" onClick="voteButton(this.id)">' +
            '<img src="' + data.teams[i].itemPath + '" title="' + data.teams[i].itemName +'" width="240" height="150"/></button><br>' + data.teams[i].itemName;
        }
    });
}