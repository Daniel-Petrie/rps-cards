function chooseCard() {
  const playerCards = document.querySelectorAll('.player-card')
  playerCards.forEach((playerCard) => {
    playerCard.addEventListener('click', function onPlayerCardClick() {
      playerCards.forEach((otherCard) => {
        if (otherCard !== playerCard) {
          otherCard.style.display = 'none'
        }
      })

      document.getElementById('winning-text').innerHTML =
        'You have chosen ' + playerCard.id
      playerCard.removeEventListener('click', onPlayerCardClick)
      document.getElementById('winning-text').innerHTML = 'Opponent thinking...'
      setTimeout(() => {
        generateOpponentCard()
        document.getElementById('winning-text').innerHTML = 'You win!'
      }, 2000)
    })
  })
}

function generateOpponentCard() {
  let randomCard = Math.floor(Math.random() * 3) + 1
  console.log(randomCard)
  if (randomCard === 1) {
    document.getElementById('opponent-fire').style.display = 'flex'
  } else if (randomCard === 2) {
    document.getElementById('opponent-water').style.display = 'flex'
  } else if (randomCard === 3) {
    document.getElementById('opponent-leaf').style.display = 'flex'
  }
}

chooseCard()
