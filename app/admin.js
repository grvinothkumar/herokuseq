
$(document).ready(function (){
    
    var boardcoins=[]
    var url = (document.URL).slice(0,-14);
    $.get('/images/sequenceboard.txt',function(data){
        $("#butboard").css("background-image",'url(' + data +')')
        //alert("ye");
        return;
    })

    $("#initGame").on('click',function(){
        var players = ["vinoth","divya","rakshan"]
        initGame("Game",players);
        return;
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
        var curattr=$(this).attr("class");
        let color = ''
        if(!curattr){
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
            $(this).attr("class","");
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
                 let color = item.color;
              $("#"+card).attr("class",color);
               
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
    function killGame(name){

        $.post(url + 'killgame', {"name":name}, function(data,xhr){
            //console.log(xhr);
            return;
        });
        return;
    }

    function getPlayers(){
        $.post(url + 'getplayers', {"name":name}, function(data,xhr){
            //console.log(xhr);
           // alert(data);
            $("#playerlist").val(JSON.parse(data));
            //$("#playerlist").html(data);
            return data;
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