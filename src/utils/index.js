export const login = async (username, password) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("email");
  console.log("hello")
  let res = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username,password }),
  });
  let userId = await fetch(`http://localhost:8000/api/user?search=${username}`, {
    method: "GET",
  });
  if(userId == null || res ==null){
    return res.status(400)
  }
  let response = await res.json();
  userId = await userId.json();
  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("userid", userId[0].id);
    localStorage.setItem("email", userId[0].email);
  }
  return res.ok;
};

export const signup = async (email, name, password,isorganisation) => {
  let res = await fetch("http://localhost:8000/api/user/", { // The route in thebackend which is supposed to get the token
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password, is_organisation: isorganisation }),
  });
  let response = await res.json();
  try{
    await login(email, password)
  }
  catch(e){
    console.log(e)
  }
  return res.ok;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("email");
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
