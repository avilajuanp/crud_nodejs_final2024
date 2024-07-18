import express from "express";
import passport from "passport"
import Auth from "../utils/auth";

const routerAuth = express.Router();

// SIGNIN (iniciar sesion)
routerAuth.get('/signin', (request, response) => {
    response.render('login/signin');
});

routerAuth.post('/signin', (request, response, next) => {
    passport.authenticate('local.signin', {
      successRedirect: "/home",
      failureRedirect: '/signin',
      failureFlash: true
    })(request, response, next);
});


//salir de la sesión
routerAuth.get('/logout', (request, response, next) =>{

    request.session.destroy(function(error){
      response.redirect('/signin');
    });
  });


export {routerAuth};