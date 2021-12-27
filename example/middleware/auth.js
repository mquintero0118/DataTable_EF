export default function auth({ next }) {
  const isAuth = localStorage.getItem('isAuth');
  if (!isAuth) {
    return next({ name: 'login', replace: true });
  }
  return next();
}
