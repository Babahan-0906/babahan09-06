function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    $("#login").attr('value', profile.getName());
    alert('lol');
}
