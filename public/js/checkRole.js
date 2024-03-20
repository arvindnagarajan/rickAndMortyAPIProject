import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {app, auth} from './firebase.js';

function checkUserRole() {

    onAuthStateChanged(auth, (user) => {

        if(!user) {
            Swal.fire({
                title: "Error",
                text: "Please login to access this page!",
                confirmButtonText: "Continue",
                icon: "error"
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/home";
                }
            });
        }

    });

}

checkUserRole();
