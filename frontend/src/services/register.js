const register = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  return response.data;
};

export default { register };
// The register service is similar to the login service.
// The only difference is that the register service sends a POST request to the address http://localhost:8080/api/users.
// The request contains the username and password provided by the user.
