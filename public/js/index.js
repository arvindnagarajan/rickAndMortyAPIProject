import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {app, auth} from './firebase.js';


const provider = new GoogleAuthProvider();

$("#loginButton").click(function() {

  const email = $("#user-email").val();
  const password = $("#user-password").val();

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    Swal.fire({
        title: "Success",
        text: "Successful Login!",
        confirmButtonText: "Continue",
        icon: "success"
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/dashboard";
      }
    });

    
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);

      switch(errorCode) {
          case 'auth/invalid-credential':
            Swal.fire({
              title: "Error",
              text: "Invalid credentials! Please try again.",
              icon: "error"
            });
            break;
          default:
            Swal.fire({
              title: "Error",
              text: "Unsuccessful Login! Please try again later.",
              icon: "error"
            });
      }
  });


});

$("#registerButton").click(function() {
    window.location.href = "/register";
});


$("#signInGoogleButton").click(function() {

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        const currentUser = auth.currentUser;
        
        if (currentUser !== null) {
            
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
        
            console.log(displayName);
            console.log(email);
            console.log(photoURL);
            console.log(emailVerified);
        }

        window.location.href = "/generator";

  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    
    const email = error.customData.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });


});

