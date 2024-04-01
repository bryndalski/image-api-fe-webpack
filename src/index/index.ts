import "./scss/index.scss"
import {CardList} from "./modules/ClassList";
import {Card} from "./modules/Card";
import {Navbar} from "./modules/Navbar";
import {LoadingState} from "./modules/Loading";



// Fetch cards data and add cards to the list
// fetch('https://api.example.com/cards')
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(cardData => {
//             const card = new Card(cardData.imageUrl, cardData.name, cardData.isFavorited);
//             cardList.addCard(card);
//         });
//
//         // Update the DOM with the list of cards
//         cardList.updateDOM();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//
//         // Show the no cards state
//         container.innerHTML = noCardsState.render();
//     });

///RENDER

document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector('body');
    body.innerHTML += new Navbar().render();
    body.innerHTML += new CardList().render();
    const loadingState = new LoadingState();
    body.innerHTML += loadingState.render();
})
