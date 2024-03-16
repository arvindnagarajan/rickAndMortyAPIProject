import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {app, auth} from './firebase.js';

let startCount = 60;

setInterval(function() {

    if(startCount == 0) {
        $(".countdown").text("Completed!");
    }
    else {
        $(".countdown").text(startCount--);
    }

}, 1000);