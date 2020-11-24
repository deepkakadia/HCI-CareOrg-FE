export const login = async (username, password) => {
  localStorage.removeItem("token");
  let res = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  let response = await res.json();
  if (response.token) {
    localStorage.setItem("token", response.token);
  }
  return res.ok;
};

export const signup = async (email, name, password) => {
  let res = await fetch("http://localhost:8000/api/profile/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
  });
  let response = await res.json();
  if (response.email & response.name) {
    localStorage.setItem("username", response.email);
    localStorage.setItem("name", response.name);
  }
  return res.ok;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLogin = () => {
  if (
    localStorage.getItem("token") === "undefined" ||
    typeof localStorage.getItem("token") === undefined ||
    localStorage.getItem("token") === null
  ) {
    return false;
  }

  return true;
};
