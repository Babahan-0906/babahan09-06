function onSignIn (googleUser){
    var first_timee = false, chat_place = document.getElementById('chat_place');
    var profile = googleUser.getBasicProfile();
    $("#login").text(profile.getName());
    $("#login").attr('title', 'username');
    document.getElementById('login').removeAttribute('href');
    
    console.log('herd')
    var user_num;
    firebase.database().ref('users').orderByChild('Email').equalTo(profile.getEmail()).once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            user_num = data.key
            console.log(data.key)
//             console.log(user_num)
        })
        firebase.database().ref('users/' + user_num + '/qstncnt').once('value', function(snapshott){          
            if (snapshott.val() == null)
            {
                console.log(user_num)
                firebase.database().ref('users/' + user_num + '/qstncnt').set('0' + 1)
            }
            else
            {
                firebase.database().ref('users/' + user_num + '/Question').on('value', function(snapshot){
                    var chat = snapshot.val();
                    if (first_timee == false) {
                        for (var i in chat)
                        {
                            if (i[i.length - 1] == 'n') {
                                $('#chat_place').append('<div id="chat_question" class="chat"><span>' + chat[i] + '</span></div>')
                            }
                            else {
                                $('#chat_place').append('<div id="chat_answer" class="chat"><span>' + chat[i] + '</span></div>')
                            }
                        }
                        first_timee = true;
                        chat_place.scroll({
                            top: chat_place.scrollHeight, //scroll to the bottom of the element
                            behavior: 'auto' //auto, smooth, initial, inherit
                        });
                    }
                    else {
                        var i = Object.keys(chat)[Object.keys(chat).length - 1]
                        console.log(i[i.length - 1]);
                        if (i[i.length - 1] == 'r') {
                            console.log('ondanam girdim mth');
                            $('#chat_place').append('<div id="chat_answer" class="chat"><span>' + chat[i] + '</span></div>')
                            chat_place.scroll({
                                top: chat_place.scrollHeight, //scroll to the bottom of the element
                                behavior: 'smooth' //auto, smooth, initial, inherit
                            });
                        }
                    }
                })
            }
        })
    })
    
    
    $('.chat_send_img').on('click', function(){
        
        var chat_letter = $('#chat_text').val(), profile = googleUser.getBasicProfile(), user_num;
        $('#chat_text').val('');
        $('#chat_text').focus();
        if (chat_letter != ''  &&  first_timee == true)
        {
            $('#chat_place').append('<div id="chat_question" class="chat"><span>' + chat_letter + '</span></div>')
            chat_place.scroll({
                top: chat_place.scrollHeight,//scroll to the bottom of the element
                behavior: 'smooth' //auto, smooth, initial, inherit
            });
        }
        if (chat_letter != '')
        {
            firebase.database().ref('users').orderByChild('Email').equalTo(profile.getEmail()).once("value", function(snapshot) {
                snapshot.forEach(function(data) {
                    user_num = data.key
                    console.log(data.key)
                })
                firebase.database().ref('users/' + user_num + '/qstncnt').once('value', function(snapshott){
                    console.log(user_num)
                    if (snapshott.val() != null)
                    {
                        if (snapshott.val()[1] == 9  ||  snapshott.val()[0] != 0)
                        {
                            console.log('girmeli emez yere girdim');
                            firebase.database().ref('users/' + user_num + '/qstncnt').set(parseInt(snapshott.val()) + 1)
                            firebase.database().ref('users/' + user_num + '/Question/' + snapshott.val() + '-question').set(chat_letter)
                        }
                        else
                        {
                            var count = parseInt(snapshott.val()) + 1
                            firebase.database().ref('users/' + user_num + '/qstncnt').set('0' + count)
                            firebase.database().ref('users/' + user_num + '/Question/' + snapshott.val() + '-question').set(chat_letter)
                        }
                    }
                })
            })
        }
        
        
    })
}
