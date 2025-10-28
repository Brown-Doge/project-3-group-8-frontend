export function loginWithGoogle() {
  window.location.href = process.env.REACT_APP_API_URL + '/oauth2/authorization/google';
}
