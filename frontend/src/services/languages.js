const baseUrl = "/api/languages";

let token = null;

/**
 * Sets the bearer token for authentication.
 * @param {string} newToken - The new bearer token.
 */
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { setToken };
