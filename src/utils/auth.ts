class Auth {

  static isLoggedIn(request, response, next){
      if (request.isAuthenticated()) {
          return next();
      }
      request.flash("error", "Por favor, inicie sesión")
      return response.redirect('/signin');
  };

}

export default Auth;