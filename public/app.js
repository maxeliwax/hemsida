document.getElementById("loginBtn").addEventListener("click", function() {
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // User signed in successfully
        var user = userCredential.user;
        // Redirect to the admin panel or perform any other actions
        window.location.href = "admin.html";
      })
      .catch(function(error) {
        // Handle login error
        var errorCode = error.code;
        var errorMessage = error.message;
        // Display error message to the user
        console.error(errorMessage);
      });
  });
  