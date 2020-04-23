
$(document).ready(function (){
    
    var layout = [{"i":"no"},{"i":"0","c":"s","n":"2"},{"i":"0","c":"s","n":"3"},{"i":"0","c":"s","n":"4"},{"i":"0","c":"s","n":"5"},{"i":"0","c":"s","n":"6"},{"i":"0","c":"s","n":"7"},{"i":"0","c":"s","n":"8"},{"i":"0","c":"s","n":"9"},{"i":"no"},{"i":"0","c":"c","n":"6"},{"i":"0","c":"c","n":"5"},{"i":"0","c":"c","n":"4"},{"i":"0","c":"c","n":"3"},{"i":"0","c":"c","n":"2"},{"i":"0","c":"h","n":"A"},{"i":"0","c":"h","n":"K"},{"i":"0","c":"h","n":"Q"},{"i":"0","c":"h","n":"T"},{"i":"0","c":"s","n":"T"},{"i":"0","c":"c","n":"7"},{"i":"1","c":"s","n":"A"},{"i":"1","c":"d","n":"2"},{"i":"1","c":"d","n":"3"},{"i":"1","c":"d","n":"4"},{"i":"1","c":"d","n":"5"},{"i":"1","c":"d","n":"6"},{"i":"1","c":"d","n":"7"},{"i":"0","c":"h","n":"9"},{"i":"0","c":"s","n":"Q"},{"i":"0","c":"c","n":"8"},{"i":"1","c":"s","n":"K"},{"i":"1","c":"c","n":"6"},{"i":"1","c":"c","n":"5"},{"i":"1","c":"c","n":"4"},{"i":"1","c":"c","n":"3"},{"i":"1","c":"c","n":"2"},{"i":"1","c":"d","n":"8"},{"i":"0","c":"h","n":"8"},{"i":"0","c":"s","n":"K"},{"i":"0","c":"c","n":"9"},{"i":"1","c":"s","n":"Q"},{"i":"1","c":"c","n":"7"},{"i":"1","c":"h","n":"6"},{"i":"1","c":"h","n":"5"},{"i":"1","c":"h","n":"4"},{"i":"1","c":"h","n":"A"},{"i":"1","c":"d","n":"9"},{"i":"0","c":"h","n":"7"},{"i":"0","c":"s","n":"A"},{"i":"0","c":"c","n":"T"},{"i":"1","c":"s","n":"T"},{"i":"1","c":"c","n":"8"},{"i":"1","c":"h","n":"7"},{"i":"1","c":"h","n":"2"},{"i":"1","c":"h","n":"3"},{"i":"1","c":"h","n":"K"},{"i":"1","c":"d","n":"T"},{"i":"0","c":"h","n":"6"},{"i":"0","c":"d","n":"2"},{"i":"0","c":"c","n":"Q"},{"i":"1","c":"s","n":"9"},{"i":"1","c":"c","n":"9"},{"i":"1","c":"h","n":"8"},{"i":"1","c":"h","n":"9"},{"i":"1","c":"h","n":"T"},{"i":"1","c":"h","n":"Q"},{"i":"1","c":"d","n":"Q"},{"i":"0","c":"h","n":"5"},{"i":"0","c":"d","n":"3"},{"i":"0","c":"c","n":"K"},{"i":"1","c":"s","n":"8"},{"i":"1","c":"c","n":"T"},{"i":"1","c":"c","n":"Q"},{"i":"1","c":"c","n":"K"},{"i":"1","c":"c","n":"A"},{"i":"1","c":"d","n":"A"},{"i":"1","c":"d","n":"K"},{"i":"0","c":"h","n":"4"},{"i":"0","c":"d","n":"4"},{"i":"0","c":"c","n":"A"},{"i":"1","c":"s","n":"7"},{"i":"1","c":"s","n":"6"},{"i":"1","c":"s","n":"5"},{"i":"1","c":"s","n":"4"},{"i":"1","c":"s","n":"3"},{"i":"1","c":"s","n":"2"},{"i":"0","c":"h","n":"2"},{"i":"0","c":"h","n":"3"},{"i":"0","c":"d","n":"5"},{"i":"no"},{"i":"0","c":"d","n":"A"},{"i":"0","c":"d","n":"K"},{"i":"0","c":"d","n":"Q"},{"i":"0","c":"d","n":"T"},{"i":"0","c":"d","n":"9"},{"i":"0","c":"d","n":"8"},{"i":"0","c":"d","n":"7"},{"i":"0","c":"d","n":"6"},{"i":"no"}];
    var boardcoins=[]
    var url = (document.URL).slice(0,-14);
    
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
    

    $.get('/images/sequenceboard.txt',function(data){
        $("#butboard").css("background-image",'url(' + data +')')
        //alert("ye");
        return;
    })

    $("#initGame").on('click',function(){
        var players = ["vinoth","divya","rakshan"]
        initGame("Game");
        return;
    })
    $("#assignPlayers").on('click',function(){
        assignPlayers();

    })
    $("#killGame").on('click',function(){
        //var players = ["vinoth","divya","rakshan"]
        killGame("Game");
        return;
    })
    $("#getplayers").on('click',function(){
       getPlayers();
        return;
    })
    $("#setplayers").on('click',function(){
        setPlayers( $("#playerlist").val());
         return;
     })
     $("#getitem").on('click',function(){
        alert(localStorage.getItem('name'));
         return;
     })

     $("td").on('click' , function(event){
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

        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        //console.log(col+ " " + row);
    });

    $('#saveboard').on('click',function(){
        
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
            alert(data);
            return
        })
        return;
    })

    $('#updateboard').on('click',function(){
        $.post(url+'getboard', function(data,xhr){
            let boardcoins = JSON.parse(data);
            boardcoins.forEach(item=>{
                 let card = item.card;
                 let color = "mainimg " + item.color;
              $("#"+card).find($(".mainimg")).attr("class",color);
              $("#"+card).find($(".mainimg")).css("border","4px solid blue");
             })
             return
            })
    })

     
    //functions
    function initGame(name,players){

        var data = {"game":name,"players":players};
        $.post(url + 'initgame', data, function(data,xhr){
            //console.log(xhr);
            //loadCard(thisUser);
            return;
        });
        return;
    }

    function assignPlayers(){
        
        $.post(url + 'initplayers', function(data,xhr){
            
            return;
        });
        return;
    }
    function killGame(name){

        $.post(url + 'killgame', {"name":name}, function(data,xhr){
            //console.log(xhr);
            return;
        });
        return;
    }

    function getPlayers(){
        $.post(url + 'getplayers', function(data,xhr){
            //console.log(xhr);
            try{
            data = JSON.parse(data);
            $("#playerlist").val(data.players);
            //$("#playerlist").html(data);
            return data;
            }
            catch(err){
                alert(data);
                return data;
            }
        });

    }

    function setPlayers(list){
        $.post(url + 'setplayers', {"list":list}, function(data,xhr){
            //console.log(xhr);
            alert(data);
            //$("#playerlist").html(data);
            return data;
        });
    }
    
    //functions

});