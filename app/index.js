
$(document).ready(function (){
    var deck = {};
//    var gamestarted = false;
    var thisUser=''
    var selectedCard=-1;
    
    var url = (document.URL).slice(0,-4);
    
    $.post(url+'started', function(data,xhr){

        if(data!='Error'){
            
            if (data=="true"){

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

        $.post(url+'started', function(gamestarted,xhr){

        
            if(gamestarted=="true"){
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

    function loadGamePage(){
        
        //functions Load Game page
 
        $.get("gameboard.html", function(data, status){
                $(".container").html(data);

                $.get('/images/sequenceboard.txt',function(data){
                    $("#board").css("background-image",'url(' + data +')')
                    //alert("ye");
                    return;
                })
        
                $.get('/images/deck.json',function(data){
                    deck = (data);
                    loadCard(thisUser);
                    getLog();
                    return;
                })
                
            $("#dropCard").on('click',function(){
                dropCard(thisUser,selectedCard);
            })

            $("#initGame").on('click',function(){
                var players = ["vinoth","divya","rakshan"]
                initGame("Game",players);
            })
            $("#killGame").on('click',function(){
                //var players = ["vinoth","divya","rakshan"]
                killGame("Game");
            })
            $(".mycardcol").on('click',function(){
                $(".mycardcol").css("border","1px solid black")
                $(this).css("border","3px solid Red");
                selectedCard = $(this).attr("id");
                
            })
           
            return
        })// end load board page
        
        logstatus();
       return;
    }//loadgame page

    //functions

    function dropCard(name,index){
        
        var data = {'user':name,'index':index};
        $.post(url + 'dropcard', data, function(data,xhr){
            loadImage(JSON.parse((data)));
            getLog();
        return;
        });
        return;
    }
    function loadCard(name){

        var data = {'user':name};
        $.post(url + 'loadcard', data, function(data,xhr){
            if(data!='Error'){
            loadImage(JSON.parse((data)));
            }
            return;
        });
        return;
    }
    
    function getLog(){
    
        let log = '';
        $.post(url+'log', function(data,xhr){
            if(data!='Error'){
            data = JSON.parse(data);
            
            data.forEach((element,index) => {
                
                log = "\n Drop " + (index + 1) +" --->  Player : " + element.player + " " + element.dropCard + log
            
                })
            }
            log= "               ---Log---" + log
                $("#dropLog").html(log) 
                return;
        });

        $.post(url+'getboard', function(data,xhr){
        
                let boardcoins = JSON.parse(data);
                boardcoins.forEach(item=>{
                    // alert(JSON.stringify(item));
        
                    let card = item.card;
                    let color = item.color;
        
                    $("#"+card).attr("class",color);
                    
                })
         return
        })

        return;
        
    }

    function loadImage(cards){
        for(let i=0;i<4;i++){
        let img = deck[cards[i]] || ""   //"/images/cards/" + cards[i] + ".jpg"
        $(".cardimages").eq(i).attr("src",img)
        $(".cardimages").eq(i).attr("alt",cards[i])
        
        }
        return
    }

    function logstatus(){
        console.log("status"); 
        getLog();   
        setTimeout(logstatus, 9000);
    }

    //functions

});