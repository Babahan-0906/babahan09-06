function onSignIn (googleUser){
    $('.chat_send_img').on('click', function(){
    
        var chat_letter = $('#chat_text').val(), profile = googleUser.getBasicProfile(), user_num;
        if (chat_letter != '')
        {
            $('#chat_place').append('<div id="chat_question" class="chat">' + chat_letter + '</div>')
            $('#chat_text').val('')
            $('#chat_text').focus()
            var chat_place = document.getElementById('chat_place');
            chat_place.scroll({
                top: chat_place.scrollHeight,//scroll to the bottom of the element
                behavior: 'smooth' //auto, smooth, initial, inherit
            });
        }
        firebase.database().ref('users').orderByChild('Email').equalTo(profile.getEmail()).once("value", function(snapshot) {
            snapshot.forEach(function(data) {
                user_num = data.key
                console.log(data.key)
            })
        })
        firebase.database().ref('users/' + user_num + 'qstncnt').once('value', function(snapshot){          
            if (snapshot.val() != null)
            {
                firebase.database().ref('users/' + user_num + '/qstncnt').set(snapshot.val() + 1)
                firebase.database().ref('users/' + user_num + '/Question/' + (snapshot.val()) + '-question').set(chat_letter)
            }
        })
        
    })
}
