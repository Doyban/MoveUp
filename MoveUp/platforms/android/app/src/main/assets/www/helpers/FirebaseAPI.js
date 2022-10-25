(function (global) {
  var FirebaseAPI = global.FirebaseAPI = function () { };

  FirebaseAPI.prototype.loginUser = function () {
    "use strict";
    var provider = new firebase.auth.GoogleAuthProvider(); // Create an instance of the Google provider object.


    firebase.auth().signInWithRedirect(provider).then(function () { // Sign in by redirecting to the sign-in page.
      // Retrieve Google provider's OAuth token.
      firebase.auth().getRedirectResult().then(function (result) {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        alert(token);
        alert(result.credential);
        alert(result);
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        alert(errorCode);
        alert(error);
        var errorMessage = error.message;
        alert(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        alert(email);
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        alert(credential);
      });
    });

    firebase.auth().signInWithRedirect(provider); // Sign in by redirecting to the sign-in page.

    // Retrieve Facebook provider's OAuth token.
    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        alert(token);
        alert(result.credential);
        alert(result);
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      alert(errorCode);
      alert(error);
      var errorMessage = error.message;
      alert(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      alert(email);
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      alert(credential);
      // ...
    });
  }
}(this));
