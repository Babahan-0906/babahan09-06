/* let obj = {"1 q": 100, "10 a": 75, "11 q": 116, "2-a": 15};

let entries = Object.entries(obj);
// [["you",100],["me",75],["foo",116],["bar",15]]

let sorted = entries.sort((a, b) => a[1] - b[1]);

for (var i in sorted)     console.log(sorted[i]) */

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

$('#chat_text').keypress(function(event) {
    if (event.which == '13') {
        event.preventDefault();
    }
})
var users = {};
firebase.database().ref('users').once('value', function(snapshot){
    console.log(snapshot.val().srcnt);
    for (var i in snapshot.val())
    {
        if (i != 'srcnt') {
            var data = {
                    'Name': snapshot.val()[i].Name,
                    'Image': snapshot.val()[i].Image
            };
            users[i] = data;
            console.log(snapshot.val()[i].Name);
            $('#chat_users').append('<div id="chat_user" onclick="UserClick(this)" user_num="' + i + '">' + 
                                        '<div id="chat_user_image"> <img src="' + snapshot.val()[i].Image + '"> </div>' + 
                                        '<div id="chat_user_name">' + htmlEntities(snapshot.val()[i].Name) + '</div>' + 
                                    '</div>')
        }
    }
    console.log(users);
})
var first_timee, chat_place = document.getElementById('chat_place'), user_num;

function UserClick(user)
{
    first_timee = false;
    user_num = user.getAttribute('user_num')
    // document.getElementById('user_num').setAttribute('class', user_num);

    console.log(users[user_num]);
    $('#chat_admin img').attr('src', users[user_num]['Image'])
    $('#chat_admin span').text(users[user_num]['Name'])

    console.log(user_num);
    console.log(user);
    
    firebase.database().ref('users/' + user_num + '/qstncnt').once('value', function(snapshot){
        if (snapshot.val() == null)
        {
            firebase.database().ref('users/' + user_num + '/qstncnt').set('0' + 1)
        }
    })

    // console.log(first_timee);
    $('.chat').remove();
    var ref = 'users/' + user_num + '/Question'
    var database = firebase.database().ref(ref)
    database.on('value', function(snapshot){
        console.log('hazyr: ' + database.parent.key);
        console.log(user_num);
        if (database.parent.key == user_num)
        {
            var chat = snapshot.val();
            console.log((Object.keys(chat)).length)
            if (first_timee == false) {
                for (var i in chat)
                {
                    if (i[i.length - 1] == 'n') {
                        $('#chat_place').append('<div class="chat_question chat"><span>' + htmlEntities(chat[i]) + '</span></div>')
                    }
                    else {
                        $('#chat_place').append('<div class="chat_answer chat"><span>' + htmlEntities(chat[i]) + '</span></div>')
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
                console.log('senin yazanyn gelmedi');
                // console.log(i[i.length - 1]);
                if (i[i.length - 1] == 'n') {
                    console.log('ondanam girdim mth');
                    $('#chat_place').append('<div class="chat_question chat"><span>' + htmlEntities(chat[i]) + '</span></div>')
                    chat_place.scroll({
                        top: chat_place.scrollHeight, //scroll to the bottom of the element
                        behavior: 'smooth' //auto, smooth, initial, inherit
                    });
                }
            }
        }
    })
}

/*if (first_timee == true)
{
    firebase.database().ref('users/' + user_num + '/Question').on('value', function(snapshot){
        console.log(user_num);
        var chat = snapshot.val();
        var i = Object.keys(chat)[Object.keys(chat).length - 1]
        console.log('senin yazanyn gelmedi');
        // console.log(i[i.length - 1]);
        if (i[i.length - 1] == 'n') {
            console.log('ondanam girdim mth');
            $('#chat_place').append('<div class="chat_question chat"><span>' + htmlEntities(chat[i]) + '</span></div>')
            chat_place.scroll({
                top: chat_place.scrollHeight, //scroll to the bottom of the element
                behavior: 'smooth' //auto, smooth, initial, inherit
            });
        }
    })
}*/

$('#chat_text').on('keydown', function(event) {
    // console.log(user);
    if ((event.ctrlKey || event.metaKey) && (event.keyCode == 13 || event.keyCode == 10)) {
        // console.log("ctr + e");
        // console.log(document.getElementById('chat_text').value);
        document.getElementById('chat_text').value = document.getElementById('chat_text').value + '\n'
    }
    else if (event.key === 'Enter'  &&  user_num != undefined)
    {
        $('.chat_send_img').click()
    }
})

$('.chat_send_img').on('click', function(){
    
    console.log(user_num);
    // console.log(user);
    var chat_letter = $('#chat_text').val()
    $('#chat_text').val('')
    $('#chat_text').focus()
    if (chat_letter != ''  &&  first_timee == true)
    {
        $('#chat_place').append('<div class="chat_answer chat"><span>' + htmlEntities(chat_letter) + '</span></div>')
        chat_place.scroll({
            top: chat_place.scrollHeight, //scroll to the bottom of the element
            behavior: 'smooth' //auto, smooth, initial, inherit
        });
    }

    if (chat_letter != '')
    {
        firebase.database().ref('users/' + user_num + '/qstncnt').once('value', function(snapshot){     
            // console.log(parseInt(snapshot.val()) + 1);     
            if (snapshot.val() != null)
            {
                if (snapshot.val()[1] == 9  ||  snapshot.val()[0] != 0)
                {
                    // console.log('girmeli emez yere girdim');
                    firebase.database().ref('users/' + user_num + '/qstncnt').set(parseInt(snapshot.val()) + 1)
                    firebase.database().ref('users/' + user_num + '/Question/' + snapshot.val() + '-answer').set(chat_letter)
                }
                else
                {
                    var count = parseInt(snapshot.val()) + 1
                    firebase.database().ref('users/' + user_num + '/qstncnt').set('0' + count)
                    firebase.database().ref('users/' + user_num + '/Question/' + snapshot.val() + '-answer').set(chat_letter)
                }
            }
        })
    }

})