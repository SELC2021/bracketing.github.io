//Js file for website
window.onload = function() {
    loadBrackets();

    openTab(null, "Main");
}

//opens a tab when a tab button is pressed
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

//called when a button is pressed
function voteButton(clicked_id) {
    //document.getElementById(clicked_id).innerHTML = "clicked";

    //button id format goes as follows: id b r roundID t teamID
    var id = parseInt(clicked_id[0]);
    var roundid = parseInt(clicked_id[3]);
    var teamid = parseInt(clicked_id.substring(5, clicked_id.length + 1));

    alert(teamid);

    //TODO: vote for team here
    advanceTeam(id, roundid, teamid);
}

//advances a team to the next bracket
function advanceTeam(bracketId, currentRoundId, teamId)
{
    //set the next one to this team
    document.getElementById(bracketId.toString() + 'br' + (currentRoundId + 1) + 't' + Math.floor(teamId / 2)).innerHTML = document.getElementById(bracketId.toString() + 'br' + currentRoundId + 't' + teamId).innerHTML;

    //clear all of the next ones, so if there is another team there, there will no longer be
    var tId = Math.floor(teamId / 4);
    for(var i = currentRoundId + 2; i < 10; i++, tId = Math.floor(tId / 2))
    {
        document.getElementById(bracketId.toString() + 'br' + (i) + 't' + tId).innerHTML = '';
    }
}

function  writeTextFile(file, text, callback) {

}

//reads json from a file, as text
function readTextFile(file, callback) {
    fetch (file)
        .then(x => x.text())
        .then(y => callback(y));
}

//loads all brackets from the json file
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

//loads an individual bracket
function loadBracketById(id, data)
{
    var items = data.brackets[id];

    let count = items.length;

    var i;
    for(i = 0; i < count; i++)
    {
        document.getElementById((id.toString()) + 'r1t' + (i).toString()).innerHTML = '<button type="button" id = "' + id.toString() + 'br1t' + i + '" onClick="voteButton(this.id)">' +
            '<img src="' + items[i].itemPath + '" title="' + items[i].itemName +'" width=' + data.width + ' height=' + data.height + '/></button><br>' + items[i].itemName;
    }

    //fill out the other rounds, but empty
    var j;
    for(j = 1; j < bracketSize(count); j++)
    {
        for(i = 0; i < count / (Math.pow(2, j)); i++)
        {
            document.getElementById((id.toString()) + 'r' + (j + 1) + 't' + (i)).innerHTML = '<button type="button" id = "' + (id.toString()) + 'br' + (j + 1) + 't' + i + '" onClick="voteButton(this.id)"></button><br>';
        }
    }
}

//get's the size of the bracket (amount of items) for the next round
function bracketSize(teamCount)
{
    if(teamCount === 1) return 1;

    return bracketSize(teamCount / 2) + 1;
}