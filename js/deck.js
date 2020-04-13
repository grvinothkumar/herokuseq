class Deck {
    constructor(name, players) {
        this.name = name;
        this.deck = ['AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH']
        this.dropDeck = [];
        this.playerList = players;
        this.players={};
        this.dropLog=[];
        this.gamestarted = false;
        }

    shuffle(deck){
        for (let i = (deck).length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    initPlayers(){
        this.deck = this.shuffle(this.deck)
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
        console.log(this.players);
        this.gamestarted=true;
        return ;
        }
    
        dropCard(playerName,index){
            let dropCard = this.players[playerName][index]
            this.dropDeck.push(dropCard);
            this.players[playerName][index]=this.deck.shift();
            this.dropLog.push({"player":playerName,"dropCard":dropCard})
            console.log(this.deck)

            if(this.deck.length==0){
                this.deck=this.shuffle(this.dropDeck);
                this.dropDeck=[];
                console.log(this.deck);
                console.log(this.dropDeck);
            }

            return (this.players[playerName]);
        }

        loadCard(playerName){
            return (this.players[playerName]);
        }

        log(){
            return (this.dropLog);
        }

        gamestatus(){
            console.log(this.gamestarted);
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