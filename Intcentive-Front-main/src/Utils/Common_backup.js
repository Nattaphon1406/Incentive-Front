// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("is_login");
};

// set the token and user from the session storage
export const setUserSession = (token, is_login, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("is_login", is_login);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const setComConfig = (config) => {
  sessionStorage.setItem("com_config", config);
 
};

export const getComConfig = () => {
  return JSON.parse( sessionStorage.getItem("com_config")) || null;
};

export const setRemembermetosess = (username, password, remember) => {
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  localStorage.setItem("remember", remember);
};
export const getRememberme = () => {
  const Rememberme = JSON.stringify({
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
    remember: localStorage.getItem("remember"),
  });

  return JSON.parse(Rememberme);
};

export const removeRememberme = (username, password, remember) => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  localStorage.removeItem("remember");
};


export const setOemlist = (oem_id) => {
  sessionStorage.setItem("oem_id",oem_id);
};

export const removeOem = () => {
  sessionStorage.removeItem("oem_id");
};

export const getOem = () => {
  const oem = sessionStorage.getItem("oem_id");
  if (oem) return oem;
  else return null;
};

//---------------------------------------------------

export const setCurrentPath = (path) => {
  sessionStorage.setItem("current_path",path);
};

export const getCurrentPath = () => {
  return sessionStorage.getItem("current_path") || null;
};


export const removeCurrentPath = () => {
 sessionStorage.removeItem("current_path");
};



export const setFeature = (feature) =>{
  sessionStorage.setItem("feature",JSON.stringify(feature));
}

export const getFeature = () =>{
  var feature = sessionStorage.getItem("feature") || null;
  //console.log(feature);
  //if(user_id )
  return feature;
}