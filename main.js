const playAgain = document.getElementById('play-again')
let opponentCardGenerated = false
let roundEnded = false
let opponentCard
let playerWinCounter = 0
let drawWinCounter = 0
let computerWinCounter = 0
let cardIds = ['fire', 'water', 'leaf']
let opponentCardIds = ['opponent-fire', 'opponent-leaf', 'opponent-water']

function chooseCard() {
  const playerCards = document.querySelectorAll('.player-card')
  playerCards.forEach((playerCard) => {
    playerCard.addEventListener('click', function onPlayerCardClick() {
      playerCards.forEach((otherCard) => {
        if (otherCard !== playerCard) {
          otherCard.style.display = 'none'
          otherCard.removeEventListener('click', onPlayerCardClick)
        }
      })

      playerCard.removeEventListener('click', onPlayerCardClick)
      document.getElementById('winning-text').innerHTML = 'Opponent thinking...'
      setTimeout(() => {
        generateOpponentCard()
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
  for (i = 0; i < cardIds.length; i++) {
    document.getElementById(cardIds[i]).style.display = 'flex'
    document.getElementById(cardIds[i]).classList.remove('winner')
  }

  for (i = 0; i < opponentCardIds.length; i++) {
    document.getElementById(opponentCardIds[i]).style.display = 'none'
    document.getElementById(opponentCardIds[i]).classList.remove('winner')
  }

  document.getElementById('winning-text').innerHTML = 'Choose A Card'
  playAgain.style.display = 'none'
  chooseCard()
})

function checkForWin(playerCard, computerCard) {
  if (roundEnded) {
    return
  }

  roundEnded = true
  if (playerCard === computerCard) {
    document.getElementById('winning-text').innerHTML = 'Its a tie!'
    drawWinCounter = drawWinCounter + 1
    document.getElementById('drawCounter').innerHTML =
      'Games Tied: ' + drawWinCounter
  } else if (
    (playerCard === 'fire' && computerCard === 'leaf') ||
    (playerCard === 'water' && computerCard === 'fire') ||
    (playerCard === 'leaf' && computerCard === 'water')
  ) {
    document.getElementById('winning-text').innerHTML = 'You win!'
    playerWinCounter = playerWinCounter + 1
    document.getElementById('playerWinCounter').innerHTML =
      'Player Wins: ' + playerWinCounter
    document.getElementById(playerCard).classList.add('winner')
  } else {
    document.getElementById('winning-text').innerHTML = 'The Computer Wins!'
    computerWinCounter = computerWinCounter + 1
    document.getElementById('computerWinCounter').innerHTML =
      'Computer Wins: ' + computerWinCounter
    document.getElementById('opponent-' + computerCard).classList.add('winner')
  }

  setTimeout(() => {
    roundEnded = false
  }, 2000)
}

chooseCard()
