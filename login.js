function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    $("#username").attr('value', profile.getName());
    $("#email").attr('value', profile.getEmail());
    $("#image").attr('src', profile.getImageUrl());
    $("#user_photo").css('display', 'block');
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("Siz problemasyz çykdynyz indi başga google akkountdan girip bilersiniz");
        $("#user_photo").css("display", "none");
        $(".g-signin2").css("display", "block");
        $("#username").attr('value', "");
        $("#email").attr('value', "");
    });
}
