async function getCard() {
    const res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
}

getCard();

async function get2Cards() {
    const {data: {cards}} = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
    for (let card of cards) {
        console.log(`${card.value} of ${card.suit}`)
    };
}

get2Cards();

const $drawBtn = $('.btn');
const $card = $('#card');

class Deck {
    constructor(id) {
        this.id = id;
    }

    static async init() {
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        return new Deck(res.data.deck_id);
    };

    async drawCard(id) {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
        $card.attr("src", res.data.cards[0].image);
        if (res.data.remaining === 0) {
            $drawBtn.attr("disabled", true);
            $drawBtn.addClass("disabled");
        }
    };
}

$(function() {
    Deck.init()
        .then(deck => {
            $drawBtn.show();
            $drawBtn.click(() => deck.drawCard(deck.id));
        })
});