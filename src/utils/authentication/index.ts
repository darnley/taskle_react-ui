import authenticatedAxios from '@app/services/authenticatedAxios';

/**
 * Deals with user authentication through API
 */
class Auth {
  /**
   * The constant of Local Storage key which stores the API token
   *
   * @private
   * @static
   * @type {string}
   * @memberof Auth
   */
  private static readonly LOCALSTORAGE_API_TOKEN_KEY: string =
    'taskle_endpoint_api_bearer';

  /**
   * Handle the authentication using email and password.
   * @param email The email for logging in
   * @param password The password for logging in
   */
  signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      authenticatedAxios
        .post('/auth/token', {
          email,
          password,
        })
        .then(value => {
          this.token = value.data.token;
          resolve(value);
        })
        .catch(reason => {
          reject(reason.response ?? reason);
        });
    });
  }

  /**
   * Clean the token.
   */
  signOut() {
    localStorage.removeItem(Auth.LOCALSTORAGE_API_TOKEN_KEY);
  }

  /**
   * Get the token stored in Local Storage.
   *
   * @type {(string | null)}
   * @memberof Auth
   */
  get token(): string | null {
    const token = localStorage.getItem(Auth.LOCALSTORAGE_API_TOKEN_KEY);

    return token;
  }

  /**
   * Set the token in the Local Storage.
   *
   * @memberof Auth
   */
  set token(token: string | null) {
    localStorage.setItem(Auth.LOCALSTORAGE_API_TOKEN_KEY, String(token));
  }

  /**
   * Check if the current user is authenticated.
   *
   * @readonly
   * @type {boolean}
   * @memberof Auth
   */
  get isAuthenticated(): boolean {
    const token = this.token;

    return token !== null;
  }
}

export default new Auth();
