import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {app, auth} from './firebase.js';


$("#createAccountButton").click(function() {

    const email = $("#user-email").val();
    const password = $("#user-password").val();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        
        const currentUser = auth.currentUser;
        
        // if (currentUser !== null) {
        //     const email = user.email;
        //     console.log(email);
        // }

        Swal.fire({
            title: "Success",
            text: "Account successfully created!",
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

        switch (errorCode) {
            case 'auth/weak-password':
                Swal.fire({
                    title: "Error",
                    text: "Password must be greater than 6 characters in length!",
                    icon: "warning"
                });
                break;
            case 'auth/email-already-in-use':
                Swal.fire({
                    title: "Error",
                    text: "This email is already in use!",
                    icon: "warning"
                });
                break;
            default:
                Swal.fire({
                    title: "Error",
                    text: "Unable to create account! Please try again later.",
                    icon: "error"
                });
        }
    });

});

$("#loginButton").click(function() {

    window.location.href = "/home";

});
