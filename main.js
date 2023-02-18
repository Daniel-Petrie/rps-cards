const playAgain = document.getElementById('play-again')
let opponentCardGenerated = false
let roundEnded = false
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
  if (roundEnded) {
    return
  }

  roundEnded = true
  if (playerCard === computerCard) {
    document.getElementById('winning-text').innerHTML = 'Its a tie!'
    drawWinCounter = drawWinCounter + 1
    document.getElementById('drawCounter').innerHTML =
      'Games Tied: ' + drawWinCounter
    console.log('draw  ' + drawWinCounter)
  } else if (
    (playerCard === 'fire' && computerCard === 'leaf') ||
    (playerCard === 'water' && computerCard === 'fire') ||
    (playerCard === 'leaf' && computerCard === 'water')
  ) {
    document.getElementById('winning-text').innerHTML = 'You win!'
    playerWinCounter = playerWinCounter + 1
    document.getElementById('playerWinCounter').innerHTML =
      'Player Wins: ' + playerWinCounter
    console.log('player ' + playerWinCounter)
  } else {
    document.getElementById('winning-text').innerHTML = 'The Computer Wins'
    computerWinCounter = computerWinCounter + 1
    document.getElementById('computerWinCounter').innerHTML =
      'Computer Wins: ' + computerWinCounter
    console.log('computer ' + computerWinCounter)
  }

  setTimeout(() => {
    roundEnded = false
  }, 2000)
}

chooseCard()
