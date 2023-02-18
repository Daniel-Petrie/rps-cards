const playAgain = document.getElementById('play-again')
let opponentCardGenerated = false
let opponentCard
let playerWinCounter = 0
let drawWinCounter = 0
let computerWinCounter = 0

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
        playAgain.style.display = 'block'
        checkForWin(playerCard.id, opponentCard)
      }, 2000)
    })
  })
}

function generateOpponentCard() {
  if (opponentCardGenerated) {
    return
  }
  opponentCardGenerated = true
  let randomCard = Math.floor(Math.random() * 3) + 1
  console.log(randomCard)
  if (randomCard === 1) {
    document.getElementById('opponent-fire').style.display = 'flex'
    opponentCard = 'fire'
  } else if (randomCard === 2) {
    document.getElementById('opponent-water').style.display = 'flex'
    opponentCard = 'water'
  } else if (randomCard === 3) {
    document.getElementById('opponent-leaf').style.display = 'flex'
    opponentCard = 'leaf'
  }
  setTimeout(() => {
    opponentCardGenerated = false
  }, 2000)
}

playAgain.addEventListener('click', function () {
  document.getElementById('opponent-fire').style.display = 'none'
  document.getElementById('opponent-water').style.display = 'none'
  document.getElementById('opponent-leaf').style.display = 'none'
  document.getElementById('fire').style.display = 'flex'
  document.getElementById('water').style.display = 'flex'
  document.getElementById('leaf').style.display = 'flex'
  document.getElementById('winning-text').innerHTML = 'Choose A Card'
  playAgain.style.display = 'none'
  chooseCard()
})

function checkForWin(playerCard, computerCard) {
  if (playerCard === computerCard) {
    document.getElementById('winning-text').innerHTML = 'Its a tie!'
  } else if (
    (playerCard === 'fire' && computerCard === 'leaf') ||
    (playerCard === 'water' && computerCard === 'fire') ||
    (playerCard === 'leaf' && computerCard === 'water')
  ) {
    document.getElementById('winning-text').innerHTML = 'You win!'
  } else {
    document.getElementById('winning-text').innerHTML = 'The Computer Wins'
  }
}

chooseCard()
