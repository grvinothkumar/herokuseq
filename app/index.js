
$(document).ready(function (){

    $.get('/images/card.txt',function(data){
        $("#board").css("background-image",'url(' + data +')')
        return;
    })

//functions
var thisUser='vinoth'

var selectedCard=-1;
loadCard(thisUser);
getLog();

//actions   
$("td").on('click' , function(event){
    var curattr=$(this).attr("class");

    if(!curattr){
        $(this).attr("class","red");
    }
    else if(curattr=='red'){
        $(this).attr("class","green");
    }
    else if(curattr=='green'){
        $(this).attr("class","blue");
    }
    else if(curattr=='blue'){
        $(this).attr("class","");
    }
    
    var col = $(this).parent().children().index($(this));
    var row = $(this).parent().parent().children().index($(this).parent());
    //console.log(col+ " " + row);
 });

 $("#dropCard").on('click',function(){
     dropCard(thisUser,selectedCard);
 })

 $("#initGame").on('click',function(){
     var players = ["vinoth","divya","rakshan"]
     initGame("Game1",players);
 })
 
 $(".mycardcol").on('click',function(){
     $(".mycardcol").css("border","1px solid black")
     $(this).css("border","3px solid Red");
     selectedCard = $(this).attr("id");
    
 })
 function initGame(name,players){

    var url = (document.URL).slice(0,-4) + 'initgame';
    var data = {"game":name,"players":players};
    $.post(url, data, function(data,xhr){
        //console.log(xhr);
        loadCard(thisUser);
        getLog();
        return;
    });
    return;
 }
 function dropCard(name,index){
    var url = (document.URL).slice(0,-4) + 'dropcard';
    var data = {'user':name,'index':index};
    $.post(url, data, function(data,xhr){

        loadImage(JSON.parse((data)));
        getLog();
    return;
    });
    return;
 }
 function loadCard(name){

    var url = (document.URL).slice(0,-4) + 'loadcard';
    var data = {'user':name};
    $.post(url, data, function(data,xhr){
        if(data!='Error'){
          loadImage(JSON.parse((data)));
        }
        return;
    });
    return;
 }
 
function getLog(){
 
    var url = (document.URL).slice(0,-4) + 'log';
    let log = "               ---Log---";
    $.post(url, function(data,xhr){
        if(data!='Error'){
        data = JSON.parse(data);
        
        data.forEach((element,index) => {
            
            log += "\n Drop " + (index + 1) +" --->  Player : " + element.player + " " + element.dropCard
        
            })
        }
            $("#dropLog").html(log) 
            return;
    });

    return;
    
}

function loadImage(cards){
    for(let i=0;i<4;i++){
    let img = "/images/cards/" + cards[i] + ".jpg"
        //alert(img);
    $(".cardimages").eq(i).attr("src",img)
    }
    return
}
});