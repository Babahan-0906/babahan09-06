function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    $("#username").attr('value', profile.getName());
    $("#email").attr('value', profile.getEmail());
    $("#image").attr('src', profile.getImageUrl());
    $("#user_photo").css('display', 'block');
    $(".sign_out").css("display", "block");
    $(".sign_in").css("display", "block");
    $(".g-signin2").css("display", "none");
    firebase.database().ref('users/srcnt').once('value', function(snapshot){          
        if (snapshot.val() != null)
        {
            firebase.database().ref('users').orderByChild('Email').equalTo(profile.getEmail()).once("value", function(snapshott) {
                if (snapshott.val() == null)
                {
                    var data = {
                        Name: profile.getName(),
                        Image: profile.getImageUrl(),
                        Email: profile.getEmail()
                    };
                    firebase.database().ref("users/user" + snapshot.val()).set(data);
                    firebase.database().ref("users/srcnt").set(snapshot.val() + 1);
                }
            });
        }
    })
    
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have successfully logged out!");
        $("#user_photo").css("display", "none");
        $(".g-signin2").css("display", "block");
        $("#username").attr('value', "");
        $(".sign_out").css("display", "none");
        $(".sign_in").css("display", "none");
        $("#email").attr('value', "");
    });
}

function redirectBack () {
    var link = window.location.href, href;
    if (link.indexOf('=') != -1)
    {
        href = link.substring (link.indexOf('=') + 1, link.length);
        // window.location.href = 'https://babahan-0906.github.io/babahan09-06/' + href;
        window.location.href = "https://babahan-0906.github.io/babahan09-06/" + href;
    }
    else
    {
        // href = "file:///C:/Downloads/New Project/home.html";
        href = "https://babahan-0906.github.io/babahan09-06/home.html";
        window.location.href = href;
    }
}
