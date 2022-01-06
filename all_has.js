$('.img_zoom').hide();

$('img:not(.iz_img)').click (function (){
    $('.img_zoom').show();
    // console.log(this);
    // var a = document.getElementsByClassName('iz_img')[0];
    // a.src = this.src;
    document.getElementsByClassName('iz_img')[0].src = this.src;
    
    $('.iz_img').css('max-width', window.innerWidth);
    $('.iz_img').css('height', window.innerHeight);
})

$('.iz_img, .img_zoom').click (function() {
    $('.img_zoom').hide();
    document.getElementsByClassName('iz_img')[0].src = "";
})
