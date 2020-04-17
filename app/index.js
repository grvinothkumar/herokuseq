$(document).ready(function (){
    var deck = {};
//    var gamestarted = false;
    var thisUser=''
    var selectedCard=-1;
    var gamestatus = false;
    
    var url = (document.URL).slice(0,-4);
    
    $.post(url+'started', function(data,xhr){
    
        if(data!='Error'){
            //(data=="started") ||
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
                $("#boardtable").find("td").on('click' , function(event){

                    if ($("#saveBoard").attr("disabled")=='disabled') return;
                    var curattr=$(this).attr("class");
                    let color = '';
            
                    if((!curattr) || (curattr=='nocoins')){
                        $(this).attr("class","red");
                        color='red'
                    }
                    else if(curattr=='red'){
                        $(this).attr("class","green");
                        color='green'
                    }
                    else if(curattr=='green'){
                        $(this).attr("class","blue");
                        color='blue'
                    }
                    else if(curattr=='blue'){
                        $(this).attr("class","nocoins");
                        color=""
                    }
                    //$(this).attr("class",color+ " selectedCell")
            
                    var col = $(this).parent().children().index($(this));
                    var row = $(this).parent().parent().children().index($(this).parent());
                    //console.log(col+ " " + row);
                })
                
            $("#dropCard").on('click',function(){
                
                if (selectedCard!=-1){
                    $("#" + selectedCard).find("img").hide();
                    $("#saveBoard").removeAttr("disabled");
                    $("#dropCard").attr("disabled","disabled");
                    $("#refresh").attr("disabled","disabled");
                }
                else{
                    alert("Please select a card to drop");
                }
            })
            
            $("#saveBoard").on('click',function(){

                if (confirm("Are you sure to save the board") == true){
                    
                    dropCard(thisUser,selectedCard);
                    let redcount = $(".red").length;
                    let greencount = $(".green").length;
                    let bluecount = $(".blue").length;
                    let nocount = $(".nocoins").length;
                    boardcoins=[];
                    for(let i=0;i<redcount;i++){
                        let card = $(".red").eq(i).attr('id');
                        boardcoins.push({"card":card,"color":"red"})
                    }
                    for(let i=0;i<greencount;i++){
                        let card = $(".green").eq(i).attr('id');
                        boardcoins.push({"card":card,"color":"green"})
                    }
                    for(let i=0;i<bluecount;i++){
                        let card = $(".blue").eq(i).attr('id');
                        boardcoins.push({"card":card,"color":"blue"})
                    }
                    for(let i=0;i<nocount;i++){
                        let card = $(".nocoins").eq(i).attr('id');
                        boardcoins.push({"card":card,"color":"nocoins"})
                    }
                    $.post(url+'setboard', {"boardcoins":JSON.stringify(boardcoins)}, function(data,xhr){
                        //alert(data);
                        $("#" + selectedCard).find("img").show();
                        $("#saveBoard").attr("disabled","disabled");
                        $("#refresh").removeAttr("disabled");
                        getLog();
                    })

                }
                return;
            })

            $(".mycardcol").on('click',function(){
                if ($("#saveBoard").attr("disabled")=='disabled'){
                $(".mycardcol").css("background-color","")
                $(this).css("background-color","royalblue");
                selectedCard = $(this).attr("id");
                }
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
            if (data!='"Error"'){
            loadImage(JSON.parse((data)));
        return;
            }
        });
        return;
    }
    function loadCard(name){
        
        try{
        var data = {'user':name};
        $.post(url + 'loadcard', data, function(data,xhr){
            if((data!='Error')&&(data!="")){
            loadImage(JSON.parse((data)));
            gamestatus=true;
            logstatus();
            }
            return;
        });
        }
        catch(err){

        }
        return;
    }
    
    function getLog(){
        
        if(gamestatus==false) return;

        if ($("#saveBoard").attr("disabled")=='disabled'){
        let log = '';
        $.post(url+'log', function(data,xhr){
            if(data!='Error'){
            data = JSON.parse(data);
            
            data.forEach((element,index) => {
                
                log = "\n Drop " + (index + 1) +" --->  Player : " + element.player + " " + element.dropCard + log
            
                })
            }
            log = "               ---    Dropped Cards    ---" + log;
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
                    //need to change it to current player
            return
            })//get board

        
                $.post(url + 'getplayers', function(data,xhr){
                    //console.log(xhr);
                    //alert(data);
                    data= JSON.parse(data);

                    if (data.players.length==0) 
                    {
                        return;
                    }
                    let playing = data.players[data.active];
                    let bold = '';
                    let currentplayers='<span class="bold" style="color:black;border:1px solid grey;width:500px;display:block"> Who is playing? </span></br>';
                    let playingstatus = ""

                    $("#currentplayerarea").html('');
                    for(let i=0;i<data.players.length;i++){
                        if (data.players[i]==playing) 
                        {
                            bold='bold';
                            playingstatus = " is playing"
                        }
                        else 
                        {
                        bold=''
                        playingstatus=''
                        }
                        currentplayers += "<span class=" + bold + ">"  + "  -  " + data.players[i] + playingstatus + "</span></br>";
                    }
                    $("#currentplayerarea").html(currentplayers);
                    //$("#playerlist").html(data);
                    if(thisUser==playing){
                        $("#dropCard").removeAttr("disabled","")
                    }
                    return data;
                })//get player;
        }//dropcard disabled if end


        return;
        
    }
    function loadImage(cards){
        if(cards.length>0){
            for(let i=0;i<4;i++){
            let img = deck[cards[i]] || ""   //"/images/cards/" + cards[i] + ".jpg"
            $(".cardimages").eq(i).attr("src",img)
            $(".cardimages").eq(i).attr("alt",cards[i])
            }
            $("#cardsstatus").html('');
       
        }
        return
    }

    function logstatus(){
        
        getLog();   
        setTimeout(logstatus, 7000);
    }

    //functions

});