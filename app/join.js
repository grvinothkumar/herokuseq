$(document).ready(function (){
    var deck = {};
//    var gamestarted = false;
    var thisUser=''
    var selectedCard=-1;
    var gamestatus = false;
    
    var url = (document.URL).slice(0,-4);
    
    $.post(url+'started', function(data,xhr){
    
        if(data!='Error'){
            //
            if ((data=="inprogress")){

                if((localStorage.getItem("name")!=null) && (localStorage.getItem("name")!=""))
                {
                    thisUser = localStorage.getItem("name");
                    loadGamePage();
                }

            }
            else{

                localStorage.removeItem("name");
                //alert('Please wait game not started yet')
            }
        }
            else{
            localStorage.removeItem("name");
        }
        return
    })
    
    $("#joingame").on('click',function(event){

        let playername = $("#playername").val().trim().toLowerCase();
        
        if (playername.search(/[^A-Za-z0-9]+/g)>-1) {
            alert("Enter your name without space.");
            return;
        }

        $.post(url+'started', function(gamestarted,xhr){

        if(gamestarted=="inprogress"){

            alert("Game is already in progress, please join next game.");
            return;

        }
            if(gamestarted=="started"){
                $.post(url+'join', {'playername':playername},function(data,xhr){

                    if (data=="Player Joined"){
                        thisUser = playername;
                        localStorage.setItem("name", thisUser);
                        alert("Good Luck !!!  " + thisUser); 
                        loadGamePage();
                    }
                    else{
                        alert('Sorry, "' + playername + '" has already joined the game. Please choose different name' );
                    }

                })
            }
            else{
                alert("Please wait game not started yet");
                return;
            }
        })
        return;
    })//Join button

    function getLog(){
        
        if(gamestatus==false) return;

        if ($("#saveBoard").attr("disabled")=='disabled'){
      
                $.post(url + 'getplayers', function(data,xhr){
                    data= JSON.parse(data);

                    if (data.players.length==0) 
                    {
                        return;
                    }
                   
                })//get player;
        }//dropcard disabled if end
        return;      
    }
    
    function logstatus(){
        
        getLog();   
        setTimeout(logstatus, 7000);
    }

    //functions

});