function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    $("#login").text(profile.getName());
    alert('lol');
}
alert('kkkkkk');
