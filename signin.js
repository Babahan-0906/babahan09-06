function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    $("#login").text(profile.getName());
    $("#login").attr('title', 'username');
    document.getElementById('login').removeAttribute('href');
}
