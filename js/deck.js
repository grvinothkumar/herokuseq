class Deck {
    constructor(name) {
            this.name = name;
            this.deck = [];//['AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH','AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH']
            this.dropDeck = [];
            this.playerList = [];
            this.players={};
            this.dropLog=[];
            this.boardLog=[];
            this.gamestarted = "started";
            this.currentPlayer = 0;
    }

    shuffle(deck){
            for (let i = (deck).length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
            return deck;
    }

    initPlayers(){
            this.deck = ['AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH','AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH']
            this.deck = this.shuffle(this.deck)
           // console.log(this.deck);
            //this.playerList=playersdata;
            let players = {};
            let playerNames = this.playerList;
            playerNames.forEach(names => {
                players[names]=[];
            });
        
            let splitCards = 0;
            while(splitCards<4){
                playerNames.forEach(name =>{
                    players[name].push(this.deck.shift());
                    splitCards = players[playerNames[0]].length;
                })        
            }
            this.players = players;
           // console.log(this.players);
            this.gamestarted='inprogress';
            return ;
    }
    
    dropCard(playerName,index){
        
        if(Object.keys(this.players) == "") return ("Error");

            let dropCard = this.players[playerName][index]
            this.dropDeck.push(dropCard);
            this.players[playerName][index]=this.deck.shift();
            this.dropLog.push({"player":playerName,"dropCard":dropCard})
        
            if(this.deck.length==0){
                this.deck=this.shuffle(this.dropDeck);
                this.dropDeck=[];
            }
            let curposition = this.playerList.indexOf(playerName) + 1;
            curposition = this.playerList.length==curposition ? 0 : curposition;
            this.currentPlayer = curposition;
        return (this.players[playerName]);
    }

    getPlayers(){
        let players = {"players" : this.playerList,"active":this.currentPlayer};
        
        return (players);
    }

    setPlayers(playersdata){

        if(Array.isArray(playersdata)){
            this.playerList=[];
        playersdata.map(data=>{
            this.playerList.push(data);
        })
        }
        else
        {
            this.playerList.push(playersdata);
        }
        
        this.currentPlayer = 0;
        return ("Players are set");

    }

    loadCard(playerName){
        return (this.players[playerName]);
    }

    log(){
        return (this.dropLog);
    }
    getBoard(){
        return (this.boardLog);
    }
    setBoard(boarddata){
        this.boardLog = boarddata;
        return ("board saved");
    }
    gamestatus(){
            return(this.gamestarted);
    }
}

module.exports = Deck;
//deck = shuffle(deck);
//var deck1 = deck
//console.log((deck1));
//console.log((deck));

//players= initPlayers(playerList);
//console.log("Test");