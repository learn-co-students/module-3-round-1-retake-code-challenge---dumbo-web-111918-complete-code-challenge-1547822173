const theatreId = 105;
const url ="https://evening-plateau-54365.herokuapp.com"
document.addEventListener("DOMContentLoaded", () => {
  let showingsNode = document.querySelector(".showings")
  fetch(`${url}/theatres/${theatreId}`)
  .then(res => res.json())
  .then(theatre => theatre.showings.forEach(e => render(e, showingsNode)))
  showingsNode.addEventListener("click", delegate)
})

function delegate(e) {
  if (e.target.classList.contains("button")) {
    buy(e.target.dataset.id)
  }
}

function render({id, film, capacity, showtime, tickets_sold}, node) {
  let div = document.createElement("div")
  let remaining = capacity-tickets_sold
  div.className = "card"
  div.innerHTML = `<div class="content">
    <div class="header">
    ${film.title}
    </div>
    <div class="meta">
      ${film.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${showtime}
      </span>
      <span class="js-${id}">
      ${remaining}
      </span> remaining tickets
    </div>
  </div>
  <div class="extra content">
    <div data-id=${id} class="ui ${remaining && "blue button"} ">${remaining ? "Buy Ticket" : "Sold Out"}</div>
  </div>`
  node.append(div)
}

function buy(id) {
  let o = {showing_id: id}
  fetch(`${url}/tickets`, {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(o)
    }).then(res => res.json())
  .then(data => !data.error && modify(id))
}

function modify(id) {
  let span = document.querySelector(`.js-${id}`)
  let remaining = parseInt(span.innerText) - 1
  span.innerText = remaining
  if (remaining <= 0) {
    let div = document.querySelector(`[data-id='${id}']`)
    div.className = "ui"
    div.innerText = "Sold Out"
  }
}
