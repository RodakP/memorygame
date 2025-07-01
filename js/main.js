let counter = document.querySelector('.counter')

let cardsImages = [
    "ciri.png",
    "ciri.png",
    "geralt.png",
    "geralt.png",
    "jaskier.png",
    "jaskier.png",
    "iorweth.png",
    "iorweth.png",
    "triss.png",
    "triss.png",
    "yen.png",
    "yen.png",
]


let cardsArray = new Array()

for(i = 12; i > 0; i--){
    let randomId = Math.floor(Math.random() * i);
    cardsArray.push(cardsImages[randomId]);
    cardsImages.splice(randomId, 1);
}

let oneVisible = false;
let turnCounter = 0;
let visibleCardIndex;
let lock = false;
let pairsLeft = 6;
 

function revealCard(number) {

    let opacityValue = $('#card' + number).css('opacity')

    if(opacityValue != 0 && lock == false && number != visibleCardIndex) {

        lock = true;

        let image = `url("../img/${cardsArray[number]}")`;
        $('#card' + number).css('background-image', image);
        $('#card' + number).addClass('card-active');
        $('#card' + number).removeClass('card');

        if(oneVisible == false) {
            // first card

            oneVisible = true;
            visibleCardIndex = number;
            lock = false;
        } else {
            // second card

            if(cardsArray[visibleCardIndex] == cardsArray[number]) {
                // pair
                setTimeout( function() {
                    hideCardPairs(number, visibleCardIndex);
                }, 750 );
            } else {
                // not a pair
                setTimeout( function() {
                    restoreCards(number, visibleCardIndex);
                }, 1000 );
            }

            turnCounter++;
            counter.textContent = turnCounter;
            oneVisible = false;
        }
    }

}

function hideCardPairs(firstCard, secondCard) {
    $('#card' + firstCard).css('opacity', '0')
    $('#card' + secondCard).css('opacity', '0')

    lock = false;
    pairsLeft--;

    if(pairsLeft == 0) {
        $('.board').html('<h2>You win! <br /> Done in ' + turnCounter + ' turns. <br /> <span class="reload" onclick="location.reload()">Click to reload.</span></h2>');
        $('.board').addClass('board-win')
        $('.score').css('display', 'none')
    }
}

function restoreCards(firstCard, secondCard) {
    $('#card' + firstCard).css('background-image', 'url("img/card.png")');
    $('#card' + firstCard).addClass('card');
    $('#card' + firstCard).removeClass('card-active');

    $('#card' + secondCard).css('background-image', 'url("img/card.png")');
    $('#card' + secondCard).addClass('card');
    $('#card' + secondCard).removeClass('card-active');

    lock = false;
}