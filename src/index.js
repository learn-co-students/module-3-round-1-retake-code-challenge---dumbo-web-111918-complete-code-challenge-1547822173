// const theatreId = 106;
// let url = "https://evening-plateau-54365.herokuapp.com/theatres/106"

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM HERE")

  fetch("https://evening-plateau-54365.herokuapp.com/theatres/106")
  .then(res => res.json())
  .then(theater => showMovies(theater))

  let showings = document.querySelector("#cards-showings")
  showings.addEventListener("click", getBuy)


})

function showMovies(theater){
  let showings = document.querySelector("#cards-showings")
  theater.showings.forEach(function(movie){
    showings.append(createDiv(movie))
  })
}
function createDiv(movie) {
    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.dataset.id = movie.id
    cardDiv.innerHTML =
  `<div class="content">
    <div class="header">
      ${movie.film.title}
    </div>
    <div class="meta">
      ${movie.film.runtime}
    </div>
    <div class="description">
      <span class="ui label">
        ${movie.showtime}
      </span>
      <p id ="buy-num">${movie.tickets_sold}<p>
    </div>
  </div>
  <div class="extra content">
    <div class="ui blue button" id="buy-button">Buy Ticket</div>
  </div>`
  return cardDiv
}

function getBuy(){
  if (event.target.id === "buy-button"){
    let btn = event.target
    let theCard = event.target.parentNode.parentNode
    let pTag = theCard.querySelector("#buy-num")
    let buyNum = parseInt(pTag.innerText)
    let id = parseInt(theCard.dataset.id)
    buyNum--
    updateDb(btn, pTag, theCard, buyNum, id)
  }
}

function updateDb(btn, pTag, theCard, buyNum, id) {
  if (buyNum >= 0) {
  fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id: 106, showing_id: id, tickets_sold: buyNum})
  }).then(res => {
    pTag.innerText = buyNum
  })

} else {
  alert("ticket sold out! Choose Another Showing")
  btn.style = "display:none"
}
}
