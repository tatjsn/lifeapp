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
  }
  let state;
  if (!req.headers.cookie) {
    state = defaultState;
  } else {
    const { progress, score } = cookie.parse(req.headers.cookie);
    state = { progress: +progress, score: +score };
  }

  if (req.method == 'POST') {
    state.progress += 1;
    if (req.body.correct) {
      state.score += 1;
    }
  }

  res.setHeader(
    'Set-Cookie',
    [cookie.serialize('progress', state.progress, COOKIE_OPTIONS),
    cookie.serialize('score', state.score, COOKIE_OPTIONS)],
  );

  res.setHeader('Content-Type', 'text/html');
  res.send(view().render('game.njk', { state, question: JSON.stringify(questions[state.progress]) }));
}