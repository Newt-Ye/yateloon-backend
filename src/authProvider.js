import axios from 'axios';

const authProvider = {
  login: ({ account, password }) => {
    return axios.post(
          `${process.env.REACT_APP_API_URL}/auth/login`, 
          { account, password },
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        )
        .then(response => {
          const data = response.data;
          var expiresAt = new Date(data.expires_at);

          localStorage.setItem('auth_token', data.access_token);
          localStorage.setItem('auth_expires_at', expiresAt.getTime());
          localStorage.setItem('identity', JSON.stringify(data.user));
        })
        .catch(error => {
          throw new Error(error.response.data.message || 'Login failed'); 
        });
  },
  logout: async () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_expires_at")
    localStorage.removeItem("identity")

    return Promise.resolve()
  },
  checkError: async ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_expires_at")
      localStorage.removeItem("identity")

      return Promise.reject({ redirectTo: "/login" });
    }
    return Promise.resolve();
  },
  checkAuth: async () => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      return Promise.reject()
    }
    if (isTokenExpired()) {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_expires_at")
      localStorage.removeItem("identity")

      return Promise.reject({ redirectTo: "/login" });
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    const identity = localStorage.getItem('identity');
    if (identity) {
      const user = JSON.parse(identity);
      return Promise.resolve({
        id: user.id,
        fullName: user.name,
        avatar: user.avatar || '' 
      })
    }
  }
}

// 檢查Token過期狀況
const isTokenExpired = () => {
  const expiresAt = localStorage.getItem("auth_expires_at");
  return expiresAt ? Date.now() >= parseInt(expiresAt) : true;
};

export default authProvider
