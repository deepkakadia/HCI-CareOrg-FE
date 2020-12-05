export const login = async (username, password) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("email");
  localStorage.removeItem("is_organisation");
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
  console.log(userId[0])
  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("userid", userId[0].id);
    localStorage.setItem("email", userId[0].email);
    localStorage.setItem("is_organisation", userId[0].is_organisation)
  
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
  localStorage.removeItem("is_organisation")
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
