import cookie from 'cookie';
import view from './clients/view.js';
import questions from './questions.json';

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 100 * 24 * 60 * 60,
  path: '/',
  sameSite: 'strict',
  secure: true,
};

export default async function handler(req, res) {
  const defaultState = {
    progress: 0,
    score: 0,
    incorrect: [],
  };

  let state = defaultState;
  let incorrectQuestion;

  if (req.headers.cookie) {
    // existence of cookie doesn't meant the app is initialised
    const { progress, score, incorrect } = cookie.parse(req.headers.cookie);
    if (progress !== undefined) {
      state = {
        progress: +progress,
        score: +score,
        incorrect: incorrect.split(',').map((x) => +x),
      };
    }
  }

  if (req.method == 'POST') {
    const currentQ = questions[state.progress];
    if (
      currentQ.corrects
        .map((isCorrect, index) => isCorrect === !!req.body[`answer${index}`])
        .every((x) => x)
    ) {
      state.score += 1;
    } else {
      incorrectQuestion = questions[state.progress];
      state.incorrect.push(state.progress);
    }
    state.progress += 1;
  }

  res.setHeader('Set-Cookie', [
    cookie.serialize('progress', state.progress, COOKIE_OPTIONS),
    cookie.serialize('score', state.score, COOKIE_OPTIONS),
    cookie.serialize('incorrect', state.incorrect, COOKIE_OPTIONS),
  ]);

  res.setHeader('Content-Type', 'text/html');
  res.send(
    view().render('game.njk', {
      state,
      question: questions[state.progress],
      incorrectQuestion,
    })
  );
}
