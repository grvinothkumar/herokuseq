
$(document).ready(function (){

    var deck = {};
    var gamestarted = false;
    var thisUser=''
    var selectedCard=-1;
    
    var url = (document.URL).slice(0,-4);


    function gamestatus(){
     $.post(url+'started', function(data,xhr){
        alert(data);
        if(data!='Error'){
            loadGamePage();
        }
        return;

    });
    }
    
    $("#joingame").on('click',function(event){

        thisUser = $("#playername").val();
        alert("Good Luck !!!  " + thisUser); 
        loadGamePage();
        return;
    })//Join button

    function loadGamePage(){
        
       

        $.get('/images/sequenceboard.txt',function(data){
            $("#board").css("background-image",'url(' + data +')')
            return;
        })

        $.get('/images/deck.json',function(data){
            deck = (data);
            loadCard(thisUser);
            getLog();
            return;
        })


        //functions Load Game page
 
        $.get("gameboard.html", function(data, status){
                $(".container").html(data);
        
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
        
            return
        })// end load board page
        
       return;
    }//loadgame page

    //functions
    function initGame(name,players){

        var data = {"game":name,"players":players};
        $.post(url + 'initgame', data, function(data,xhr){
            //console.log(xhr);
            loadCard(thisUser);
            getLog();
            return;
        });
        return;
    }
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
    
        let log = "               ---Log---";
        $.post(url+'log', function(data,xhr){
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
        let img = deck[cards[i]] || ""   //"/images/cards/" + cards[i] + ".jpg"
        $(".cardimages").eq(i).attr("src",img)
        $(".cardimages").eq(i).attr("alt",cards[i])
        
        }
        return
    }
    //functions

});