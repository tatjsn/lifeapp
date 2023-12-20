import cookie from 'cookie';

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 100 * 24 * 60 * 60,
  path: '/',
  sameSite: 'none',
  secure: true,
};

export default async function handler(req, res) {
  const { progress, score, incorrect, exam } = req.body;

  res.setHeader('Set-Cookie', [
    cookie.serialize(
      'progress',
      progress === undefined ? (exam - 1) * 24 : progress,
      COOKIE_OPTIONS,
    ),
    cookie.serialize('score', score, COOKIE_OPTIONS),
    cookie.serialize('incorrect', incorrect, COOKIE_OPTIONS),
  ]);

  // change method to get
  res.redirect(303, '/');
}
