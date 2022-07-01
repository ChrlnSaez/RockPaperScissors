const options = {
  rock: '/images/rock.png',
  paper: '/images/paper.png',
  scissors: '/images/scissor.png',
};

let SCORE = 0;
let AI_SCORE = 0;
let matches = [];
const DECISIONS = {
  lose: 'You Lose!',
  win: 'You Won!',
  tie: "It's a tie!",
};

const pickUserHand = (hand) => {
  let hands = document.querySelector('.hands');
  hands.style.display = 'none';

  let contest = document.querySelector('.contest');
  contest.style.display = 'flex';

  document.getElementById('userPickImage').src = options[hand];

  pickComputerHand(hand);
};

const pickComputerHand = (hand) => {
  let hands = ['rock', 'paper', 'scissors'];
  let cpHand = hands[Math.floor(Math.random() * hands.length)];

  document.getElementById('computerPickImage').src = options[cpHand];

  referee(hand, cpHand);
};

const referee = (userHand, cpHand) => {
  console.log(userHand, cpHand);
  if (userHand == 'paper' && cpHand == 'scissors') {
    setDecision(DECISIONS.lose, { userHand, cpHand });
    setScore(AI_SCORE + 1, true);
  }
  if (userHand == 'paper' && cpHand == 'rock') {
    setDecision(DECISIONS.win, { userHand, cpHand });
    setScore(SCORE + 1, false);
  }
  if (userHand == 'paper' && cpHand == 'paper') {
    setDecision(DECISIONS.tie, { userHand, cpHand });
  }
  if (userHand == 'rock' && cpHand == 'scissors') {
    setDecision(DECISIONS.win, { userHand, cpHand });
    setScore(SCORE + 1, false);
  }
  if (userHand == 'rock' && cpHand == 'paper') {
    setDecision(DECISIONS.lose, { userHand, cpHand });
    setScore(AI_SCORE + 1, true);
  }
  if (userHand == 'rock' && cpHand == 'rock') {
    setDecision(DECISIONS.tie, { userHand, cpHand });
  }
  if (userHand == 'scissors' && cpHand == 'scissors') {
    setDecision(DECISIONS.tie, { userHand, cpHand });
  }
  if (userHand == 'scissors' && cpHand == 'rock') {
    setDecision(DECISIONS.lose, { userHand, cpHand });
    setScore(AI_SCORE + 1, true);
  }
  if (userHand == 'scissors' && cpHand == 'paper') {
    setDecision(DECISIONS.win, { userHand, cpHand });
    setScore(SCORE + 1, false);
  }
};

const restartGame = () => {
  let results = document.querySelector('.results');
  let contest = document.querySelector('.contest');
  let hands = document.querySelector('.hands');
  if (SCORE === 3 || AI_SCORE === 3) {
    contest.style.display = 'none';
    results.style.display = 'flex';

    if (AI_SCORE === 3) {
      document.querySelector('.results h1').innerHTML = 'SORRY, TRY AGAIN';
      document.querySelector('.results p').innerHTML = 'You Lost';
    } else {
      document.querySelector('.results h1').innerHTML = 'CONGRATULATIONS';
      document.querySelector('.results p').innerHTML = 'You Won!';
    }
  } else {
    contest.style.display = 'none';
    hands.style.display = 'block';
  }
};

const startAgain = () => {
  SCORE = 0;
  AI_SCORE = 0;
  matches = [];

  document.querySelector('.results').style.display = 'none';
  document.querySelector('.match-history').style.display = 'none';
  document.querySelector('.hands').style.display = 'block';

  document.querySelector('.ai-score h1').innerText = SCORE;
  document.querySelector('.score h1').innerText = AI_SCORE;
};

const showMatchHistory = () => {
  document.querySelector('.results').style.display = 'none';
  document.querySelector('.match-history').style.display = 'flex';
  const histories = document.querySelector('.histories');

  histories.innerHTML = matches
    .map((match) => {
      if (match.decision === DECISIONS.win)
        return `<p style='color: green;'>${match.matchResult}</p>`;

      if (match.decision === DECISIONS.lose)
        return `<p style='color: red;'>${match.matchResult}</p>`;

      return `<p style='color: yellow;'>${match.matchResult}</p>`;
    })
    .join('');
};

const setDecision = (decision, match) => {
  document.querySelector('.decision h1').innerText = decision;

  const { userHand, cpHand } = match;
  const matchResult = `${userHand} vs ${cpHand}`;
  console.log(matchResult);
  matches.push({ matchResult: matchResult.toUpperCase(), decision });
};

const setScore = (newScore, ai) => {
  if (ai) {
    AI_SCORE = newScore;
    return (document.querySelector('.ai-score h1').innerText = newScore);
  }

  SCORE = newScore;
  return (document.querySelector('.score h1').innerText = newScore);
};
