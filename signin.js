function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    $("#login").text('value', profile.getName());
}
