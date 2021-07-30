$('.chat_send_img').on('click', function(){
    
    var chat_letter = $('#chat_text').val();
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
})
