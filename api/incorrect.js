import cookie from 'cookie';
import view from './clients/view.js';
import questions from './questions.json';

export default async function handler(req, res) {
  const { incorrect: incorrectRaw } = cookie.parse(req.headers.cookie);
  const incorrect = incorrectRaw
    .split(',')
    .slice(1)
    .map((x) => +x);

  res.setHeader('Content-Type', 'text/html');
  res.send(
    view().render('incorrect.njk', {
      questions,
      incorrect,
    })
  );
}
