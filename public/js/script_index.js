import { signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {app, auth} from './firebase.js';

const provider = new GoogleAuthProvider();


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

  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    
    const email = error.customData.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });


});

