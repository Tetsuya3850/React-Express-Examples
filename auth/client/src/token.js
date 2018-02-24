function saveToken(token) {
  localStorage.setItem("my-token", token);
  this.token = token;
}

function getToken() {
  if (!this.token) {
    this.token = localStorage.getItem("my-token");
  }
  return this.token;
}

function logout() {
  this.token = "";
  window.localStorage.removeItem("my-token");
}

function getUserDetails() {
  const token = this.getToken();
  let payload;
  if (token) {
    payload = token.split(".")[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  } else {
    return null;
  }
}

function isLoggedIn() {
  const user = this.getUserDetails();
  if (user) {
    return user.exp > Date.now() / 1000;
  } else {
    return false;
  }
}

{
  headers: {
    Authorization: `Bearer ${this.getToken()}`;
  }
}

if (data.token) {
  this.saveToken(data.token);
}


dispatch(signUpUser(values))
 .then((response) => {
 let data = response.payload.data;
 //if any one of these exist, then there is a field error
 if(response.payload.status != 200) {
   //let other components know
   dispatch(signUpUserFailure(response.payload));
   reject(data); //this is for redux-form itself
 } else {
   //store JWT Token to browser session storage
   //If you use localStorage instead of sessionStorage, then this w/
   //persisted across tabs and new windows.
   //sessionStorage = persisted only in current tab

  sessionStorage.setItem(‘jwtToken’, response.payload.data.token);

  //let other components know that we got user and things are fine
  dispatch(signUpUserSuccess(response.payload));
  resolve();//this is for redux-form itself
 }
});


const mapDispatchToProps = (dispatch) => {
 return {
  loadUserFromToken: () => {
   let token = sessionStorage.getItem(‘jwtToken’);
   if(!token || token === ‘’) {//if there is no token, dont bother
    return;
   }
  //fetch user from token (if server deems it’s valid token)
  dispatch(meFromToken(token))
  .then((response) => {
   if (!response.error) {
    //store token
    sessionStorage.setItem(‘jwtToken’, response.payload.data.token);
    dispatch(meFromTokenSuccess(response.payload))
   } else {
    //remove token from storage
    sessionStorage.removeItem(‘jwtToken’);
    dispatch(meFromTokenFailure(response.payload));
   }
  });
 },
 resetMe: () =>{ // logout
 sessionStorage.removeItem(‘jwtToken’); //remove token from storage
 dispatch(resetToken());
 }
 }
}


router.get(‘/me/from/token’, function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
   return res.status(401).json({message: ‘Must pass token’});
  }
// Check token that was passed by decoding token using secret
 jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) throw err;
   //return user using the id from w/in JWTToken
    User.findById({
    ‘_id’: user._id
    }, function(err, user) {
       if (err) throw err;
          user = utils.getCleanUser(user);
         //Note: you can renew token by creating new token(i.e.
         //refresh it)w/ new expiration time at this point, but I’m
         //passing the old token back.
         // var token = utils.generateToken(user);
        res.json({
            user: user, <--- return both user and token
            token: token
        });
     });
  });
});
