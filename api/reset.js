import cookie from 'cookie';

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 100 * 24 * 60 * 60,
  path: '/',
  sameSite: 'strict',
  secure: true,
};

export default async function handler(req, res) {
  const { progress, score, incorrect } = req.body;

  res.setHeader('Set-Cookie', [
    cookie.serialize('progress', progress, COOKIE_OPTIONS),
    cookie.serialize('score', score, COOKIE_OPTIONS),
    cookie.serialize('incorrect', incorrect, COOKIE_OPTIONS),
  ]);

  // change method to get
  res.redirect(302, '/');
}
