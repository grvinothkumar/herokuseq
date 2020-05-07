$(document).ready(function (){
    var deck = {};
//    var gamestarted = false;
    var thisUser=''
    var selectedCard=-1;
    var selectedCardName="";
    var gamestatus = false;
    var interval = 3000;
    
    var url = (document.URL).slice(0,-4);
   
    
    logstatus();

    $.post(url+'started', function(data,xhr){
        if(data!='Error'){
            //
            if ((data=="inprogress")){

                if((localStorage.getItem("name")!=null) && (localStorage.getItem("name")!=""))
                {
                      thisUser = localStorage.getItem("name");    
                      loadGamePage();
                      //alert("started");
                }

            }
            else if(data=='started'){
                thisUser = localStorage.getItem("name");
                $("#playername").val(thisUser);
                //alert('Please wait game not started yet')
                getTeamLog();
            }
        }
            else{
            localStorage.removeItem("name");
        }
        return
    }) 
/*     $.post(url+'started', function(data,xhr){
    
        if(data!='Error'){
            if ((data=='newgame')){
                localStorage.removeItem("name");
                return;    
            }
            //
            if ((data=="started") || (data=="inprogress")){

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
    }) */
 /*    
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
    })//Join button */

    /* Join Team */

    $("#joinred").on('click',function(event){
        joinTeam('red')
       
    })
    $("#joingreen").on('click',function(event){
        joinTeam('green')
       
    })
    $("#joinblue").on('click',function(event){
        joinTeam('blue')
       
    })
    //Join button
    

    function joinTeam(team){

        let playername = $("#playername").val().trim().toLowerCase();
        

        if ((playername=='') || (playername.search(/[^A-Za-z0-9]+/g)>-1)) {
            alert("Enter your name without space.");
            return;
        }

        $.post(url+'started', function(gamestarted,xhr){

        if(gamestarted=="inprogress"){

            alert("Game is already in progress, please join next game.");
            return;

        }
            if(gamestarted=="started"){
                $.post(url+'jointeam', {'playername':playername, 'team':team},function(data,xhr){

                    if (data=="Player Joined"){
                        thisUser = playername;
                        localStorage.setItem("name", thisUser);
                        getTeamLog();
                    }
                    else{
                        alert('Sorry, "' + playername + '" has already joined the team. You can change team' );
                    }

                })
            }
            else{
                alert("Please wait game not started yet");
                return;
            }
        })
        
        return;
    }

    function getTeamLog(){
        $.post(url+'started', function(data,xhr){
                if ((data=="inprogress")){
                    loadGamePage();  
                    return;
                }
            })
        $.post(url+'getteams', function(data,xhr){
            if(data=='Players are not set'){ return }

            data = JSON.parse(data);
                let red = data.red;
                let green = data.green;
                let blue = data.blue;
                let redteam = "<span class='teamtitle'>RED TEAM</span><br>";
                let greenteam = "<span class='teamtitle'>GREEN TEAM</span><br>";
                let blueteam = "<span class='teamtitle'>BLUE TEAM</span><br>";

            for(i=0;i<red.length;i++){
                redteam += "<span>" + red[i] + "</span><br>"
            }
            for(i=0;i<green.length;i++){
                greenteam += "<span>" + green[i] + "</span><br>"
            }
            for(i=0;i<blue.length;i++){
                blueteam += "<span>" + blue[i] + "</span><br>"
            }
            $("#redteam").html(redteam);
            $("#greenteam").html(greenteam);
            $("#blueteam").html(blueteam);
        })
        return;      
    }
    
    /* end join team */


    function loadGamePage(){
        
        //functions Load Game page
 
        $.get("gameboard.html", function(data, status){
                $(".container").html(data);
                $("#logcontainer").hide();
        
                $.get('/images/deck.json',function(data){
                    deck = (data);
                    loadCard(thisUser);
                    interval = 6000;
                    //getLog();
                    return;
                })

                /* new code for layout */
                    var layout = [{"i":"no"},{"i":"0","c":"s","n":"2"},{"i":"0","c":"s","n":"3"},{"i":"0","c":"s","n":"4"},{"i":"0","c":"s","n":"5"},{"i":"0","c":"s","n":"6"},{"i":"0","c":"s","n":"7"},{"i":"0","c":"s","n":"8"},{"i":"0","c":"s","n":"9"},{"i":"no"},{"i":"0","c":"c","n":"6"},{"i":"0","c":"c","n":"5"},{"i":"0","c":"c","n":"4"},{"i":"0","c":"c","n":"3"},{"i":"0","c":"c","n":"2"},{"i":"0","c":"h","n":"A"},{"i":"0","c":"h","n":"K"},{"i":"0","c":"h","n":"Q"},{"i":"0","c":"h","n":"T"},{"i":"0","c":"s","n":"T"},{"i":"0","c":"c","n":"7"},{"i":"1","c":"s","n":"A"},{"i":"1","c":"d","n":"2"},{"i":"1","c":"d","n":"3"},{"i":"1","c":"d","n":"4"},{"i":"1","c":"d","n":"5"},{"i":"1","c":"d","n":"6"},{"i":"1","c":"d","n":"7"},{"i":"0","c":"h","n":"9"},{"i":"0","c":"s","n":"Q"},{"i":"0","c":"c","n":"8"},{"i":"1","c":"s","n":"K"},{"i":"1","c":"c","n":"6"},{"i":"1","c":"c","n":"5"},{"i":"1","c":"c","n":"4"},{"i":"1","c":"c","n":"3"},{"i":"1","c":"c","n":"2"},{"i":"1","c":"d","n":"8"},{"i":"0","c":"h","n":"8"},{"i":"0","c":"s","n":"K"},{"i":"0","c":"c","n":"9"},{"i":"1","c":"s","n":"Q"},{"i":"1","c":"c","n":"7"},{"i":"1","c":"h","n":"6"},{"i":"1","c":"h","n":"5"},{"i":"1","c":"h","n":"4"},{"i":"1","c":"h","n":"A"},{"i":"1","c":"d","n":"9"},{"i":"0","c":"h","n":"7"},{"i":"0","c":"s","n":"A"},{"i":"0","c":"c","n":"T"},{"i":"1","c":"s","n":"T"},{"i":"1","c":"c","n":"8"},{"i":"1","c":"h","n":"7"},{"i":"1","c":"h","n":"2"},{"i":"1","c":"h","n":"3"},{"i":"1","c":"h","n":"K"},{"i":"1","c":"d","n":"T"},{"i":"0","c":"h","n":"6"},{"i":"0","c":"d","n":"2"},{"i":"0","c":"c","n":"Q"},{"i":"1","c":"s","n":"9"},{"i":"1","c":"c","n":"9"},{"i":"1","c":"h","n":"8"},{"i":"1","c":"h","n":"9"},{"i":"1","c":"h","n":"T"},{"i":"1","c":"h","n":"Q"},{"i":"1","c":"d","n":"Q"},{"i":"0","c":"h","n":"5"},{"i":"0","c":"d","n":"3"},{"i":"0","c":"c","n":"K"},{"i":"1","c":"s","n":"8"},{"i":"1","c":"c","n":"T"},{"i":"1","c":"c","n":"Q"},{"i":"1","c":"c","n":"K"},{"i":"1","c":"c","n":"A"},{"i":"1","c":"d","n":"A"},{"i":"1","c":"d","n":"K"},{"i":"0","c":"h","n":"4"},{"i":"0","c":"d","n":"4"},{"i":"0","c":"c","n":"A"},{"i":"1","c":"s","n":"7"},{"i":"1","c":"s","n":"6"},{"i":"1","c":"s","n":"5"},{"i":"1","c":"s","n":"4"},{"i":"1","c":"s","n":"3"},{"i":"1","c":"s","n":"2"},{"i":"0","c":"h","n":"2"},{"i":"0","c":"h","n":"3"},{"i":"0","c":"d","n":"5"},{"i":"no"},{"i":"0","c":"d","n":"A"},{"i":"0","c":"d","n":"K"},{"i":"0","c":"d","n":"Q"},{"i":"0","c":"d","n":"T"},{"i":"0","c":"d","n":"9"},{"i":"0","c":"d","n":"8"},{"i":"0","c":"d","n":"7"},{"i":"0","c":"d","n":"6"},{"i":"no"}]
                    var boardcoins=[];
                    
                    for (i=0;i<100;i++){
                        let layouts=layout[i];
                        let num = layouts.n=="T"?"10":layouts.n;
                        let classname = layouts.c+"sym";
                        let tabid = num + layouts.c + (layouts.i=="0"?"":layouts.i)
                        let textcolor = layouts.c;

                        if ((textcolor=="h") || (textcolor=="d")){
                            $("td").eq(i).find($(".mainimg")).find($(".num")).attr("style","color:red");    
                        }
                        $("td").eq(i).find($(".mainimg")).find($(".num")).html(num);
                        let divv = $("td").eq(i).find($(".mainimg")).find($("div"));
                        divv.eq(2).attr("class",classname);
                        $("td").eq(i).attr("id",tabid);
                    }
                /* new code*/
                    $("#gameboard").find("td").on('click' , function(event){

                    if ($("#saveBoard").attr("disabled")=='disabled') return;

                            //alert(selectedCardName);
                            
                           /*  let thisId = $(this).attr("id").substr(0,2).toLowerCase();

                            if (thisId != selectedCardName.toLowerCase()) return;
 */
                            var div = $(".mainimg");
                            var curattr=$(this).find(div).attr("class");
                            let color = '';
                            
                            if((curattr=="mainimg") || (curattr=="mainimg nocoins")){
                                $(this).find(div).attr("class","mainimg red");
                                color='red'
                            }
                            else if(curattr=='mainimg red'){
                                $(this).find(div).attr("class","mainimg green");
                                color='green'
                            }
                            else if(curattr=='mainimg green'){
                                $(this).find(div).attr("class","mainimg blue");
                                color='blue'
                            }
                            else if(curattr=='mainimg blue'){
                                $(this).find(div).attr("class","mainimg nocoins");
                                color=""
                            }

                            //$(this).attr("class",color+ " selectedCell")
                    
                            var col = $(this).parent().children().index($(this));
                            var row = $(this).parent().parent().children().index($(this).parent());
                            //console.log(col+ " " + row);
                })
                
            $("#dropCard").on('click',function(){
                
                if (selectedCard!=-1){
                    //selectedCardName = $("#" + selectedCard).find($("img")).attr("alt");
                    $("#" + selectedCard).find("img").hide();
                    $("#dropCard").attr("disabled","disabled");
                    $("#refresh").attr("disabled","disabled");
                    $("#saveBoard").removeAttr("disabled");
                    
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
                        let card = $(".red").eq(i).parent().attr('id');
                        boardcoins.push({"card":card,"color":"red"})
                    }
                    for(let i=0;i<greencount;i++){
                        let card = $(".green").eq(i).parent().attr('id');
                        boardcoins.push({"card":card,"color":"green"})
                    }
                    for(let i=0;i<bluecount;i++){
                        let card = $(".blue").eq(i).parent().attr('id');
                        boardcoins.push({"card":card,"color":"blue"})
                    }
                    for(let i=0;i<nocount;i++){
                        let card = $(".nocoins").eq(i).parent().attr('id');
                        boardcoins.push({"card":card,"color":"nocoins"})
                    }

                    $.post(url+'setboard', {"boardcoins":JSON.stringify(boardcoins)}, function(data,xhr){
                        //alert(data);
                        $("#" + selectedCard).find("img").show();
                        $("#dropCard").attr("disabled","disabled");
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
               // alert(data);
            loadImage(JSON.parse((data)));
            gamestatus=true;
            //getLog();
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
        
        $("#logcontainer").show();
        if ($("#saveBoard").attr("disabled")=='disabled'){
        let log = '';
        $.post(url+'log', function(data,xhr){
            
            if(data!='Error'){
            data = JSON.parse(data);
            if (data.length==0){
                loadCard(thisUser);
            }
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
                    let color = "mainimg " + item.color;
                    $("#"+card).find($(".mainimg")).removeClass("newitem");
                    let existingcolor = $("#"+card).find($(".mainimg")).attr("class");

                    $("#"+card).find($(".mainimg")).attr("class",color);
                    //alert($("#"+card).find($(".mainimg")).attr("class"))
                    color='';  
                })
                    //need to change it to current player
            return
            })//get board

        
                $.post(url + 'getplayers', function(data,xhr){
                    //console.log(xhr);

                    if((data=='Players are not set')){
                        location.reload();
                        return;
                    }
                    data= JSON.parse(data);

                    if (data.players.length==0) 
                    {
                        location.reload();
                        return;
                    }
                    let playing = data.players[data.active];
                    let bold = '';
                    let currentplayers='<span class="bold" style="color:black;border:1px solid grey;width:400px;display:block"> Who is playing? </span></br>';
                    let playingstatus = ""
                    let teamscount =  data.teams.length;
                    let color = '';
                    let coloritr = 0;
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
                        
                        color = data.teams[coloritr];
                        coloritr++;
                        if (coloritr==teamscount) coloritr=0;

                        let attributes = "class='" + bold + "' style= 'color:" + color + "'>";

                        currentplayers += "<span " + attributes + " >"  + "  -  " + data.players[i] + playingstatus + "</span></br>";
                    }
                    $("#currentplayerarea").html(currentplayers);
                    //$("#playerlist").html(data);
                    if(thisUser==playing){
                        $("#dropCard").removeAttr("disabled","")
                    }
                    else{
                        $("#dropCard").attr("disabled","disabled");
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
       
        if(gamestatus==false){
            getTeamLog();
            loadCard(thisUser);
        }
        getLog();   
        setTimeout(logstatus, interval);
    }

    //functions

});