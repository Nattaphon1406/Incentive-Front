




  
 




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
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  localStorage.removeItem("remember");
  localStorage.setItem("username", username);
  ///localStorage.setItem("password", password);
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

export const setOemlist_ = (oem) => {
  sessionStorage.setItem("oem_",oem);
};

export const getOemlist_ = () => {
  const oem_ = sessionStorage.getItem("oem_");
  if (oem_) return oem_;
  else return null;
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


export const getAcademy = () =>{
  var academy = sessionStorage.getItem("academyLink") || null;
  //console.log(feature);
  //if(user_id )
  return academy;
}



var checked = sessionStorage.getItem("token") || null;
if(checked !== null){
  const events = [
    'load',
    'mousemove',
    'mousedown',
    'click',
    'scroll',
    'keypress'
  ];
   
}
export function DistinctDataArray(data, key) {
  return [...new Map(data.map((item) => [item[key], item])).values()];
}

export const fixOEMForSST= ()=>{

return {
  ST_Civil:"360e9f89-6b60-4edd-9f4d-a6e487c97cf3",
  STP:"c8de2754-d8f9-4e18-97db-4201efca6e2f",
  STS:"08721f6f-ee1d-4900-8d67-2c7ce03b601e",
  SST:"b717f172-5013-4aa3-a040-65f4f116870b",
  STC:"d937f81b-9743-4c33-886f-e1c575f4cf21"

}

}