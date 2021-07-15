function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    $("#username").attr('value', profile.getName());
    $("#email").attr('value', profile.getEmail());
    $("#image").attr('src', profile.getImageUrl());
    $("#user_photo").show();
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have been signed out successfully");
        $(".data").css("display", "none");
        $(".g-signin2").css("display", "block");
    });
}
