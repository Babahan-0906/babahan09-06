function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    $("#username").attr('value', profile.getName());
    $("#email").attr('value', profile.getEmail());
    $("#image").attr('src', profile.getImageUrl());
    $("#user_photo").css('display', 'block');
    $(".sign_out").css("display", "block");
    $(".sign_in").css("display", "block");
    $(".g-signin2").css("display", "none");
    var data = {
        Name: profile.getName()),
        Image: profile.getImageUrl()),
        Password: profile.getPassword
    };
    firebase.database().ref(profile.getEmail()).set(data);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("Siz problemasyz çykdynyz indi başga google akkountdan girip bilersiniz");
        $("#user_photo").css("display", "none");
        $(".g-signin2").css("display", "block");
        $("#username").attr('value', "");
        $(".sign_out").css("display", "none");
        $(".sign_in").css("display", "none");
        $("#email").attr('value', "");
    });
}
