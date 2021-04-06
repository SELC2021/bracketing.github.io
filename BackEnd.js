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
    advanceTeam(roundid, teamid);
}

function voteTeam(teamId) {

}

function advanceTeam(currentRoundId, teamId)
{
    document.getElementById('br' + (currentRoundId + 1) + 't' + Math.floor(teamId / 2)).innerHTML = document.getElementById('br' + currentRoundId + 't' + teamId).innerHTML;
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

        var i;
        for(i = 0; i < data.brackets.length; i++)
        {
            loadBracketById(i, data);
        }
    });
}

function loadBracketById(id, data)
{
    var items = data.brackets[id];

    let count = items.length;

    var i;
    for(i = 0; i < count; i++)
    {
        document.getElementById('r1t' + (i).toString()).innerHTML = '<button type="button" id = "br1t' + i + '" onClick="voteButton(this.id)">' +
            '<img src="' + items[i].itemPath + '" title="' + items[i].itemName +'" width="240" height="150"/></button><br>' + items[i].itemName;
    }

    //fill out the other rounds, but empty
    var j;
    for(j = 1; j < bracketSize(count); j++)
    {
        for(i = 0; i < count / (Math.pow(2, 1 + j)); i++)
        {
            document.getElementById('r' + (j + 1) + 't' + (i)).innerHTML = '<button type="button" id = "br' + (j + 1) + 't' + i + '" onClick="voteButton(this.id)"></button><br>';
        }
    }
}

function bracketSize(teamCount)
{
    if(teamCount === 1) return 1;

    return bracketSize(teamCount / 2) + 1;
}