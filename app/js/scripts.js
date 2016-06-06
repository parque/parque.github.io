// Globals
var video;
///////////////////////////////////////////////////////////////
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('videoPrincipal', {
    videoId: 'TUz750W2BYs', // esto es el id del video que se encuentra en la url
    playerVars: { 'autoplay': 0, 'controls': 1 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// // 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	video = event.target;
	console.log(event.target);
    // event.target.playVideo();

   	    	// event.target.loadVideoById('TN-Rub-lmc4');

}

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
function onPlayerStateChange(event) {
  var state = event.target.getPlayerState();

  if (state != 2) {
  	aumentarVideo();
  } else {
  	reducirVideo();
  }
  if(state == 0){
  	reducirVideo();
  }
}
///////////////////////////////////////////////////////

function cambiarTexto(){
	$('.textoCambiante').fadeToggle(200)
}
function aumentarVideo(){
	var seccionV = $('#idSeccionVideo');
	seccionV.css("margin-top", "70px");
	seccionV.removeClass('col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-3');
	seccionV.addClass('col-xs-12 col-sm-7 col-sm-offset-1');
	// seccionV.css('transform', 'translate(0, 0)');
	$('#bgDark').css('background-color', 'rgba(0,0,0,0.7)');
}
function reducirVideo(){
	var seccionV = $('#idSeccionVideo');
	seccionV.css("margin-top", "110px");
	seccionV.removeClass('col-xs-12 col-sm-7 col-sm-offset-1');
	seccionV.addClass('col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-3');
	// seccionV.css('transform', 'translate(0, 10vh)');
	$('#bgDark').css('background-color', 'rgba(0,0,0,0.0)');
}

$('#btnChangeDown').click(function(){
	var btn = $('#btnChangeDown');
	var sv = $('#seccionVideo');
	var title = $('.titleText');
	sv.addClass('animated fadeOutUp');
	setTimeout(function(){
		sv.removeClass('fadeOutUp');
		// si esta en la historia de introduccion
		if (btn.attr('story') == 'main'){
			video.loadVideoById('9edjOnavFE4');
			btn.prev('h3').text('  Liberar a Romelia');
			btn.attr('story', 'romelia');
			title.text('Romelia la Tortuga');
		} else{
			if (btn.attr('story') == 'romelia') {
				video.loadVideoById('YqqDQ-1_pBc');
				btn.prev('h3').text(' Info');
				btn.attr('story', 'liberar');
				title.text('Liberación de Romelia');
			} else {
				if(btn.attr('story') == 'liberar'){
					/// esta es la ultima seccion
					video.destroy();
					btn.prev('h3').text(' Final');
					btn.children('i').removeClass('fa fa-chevron-down');
					title.text('');
				}
			}
		}
		//////////////////////////////////////////

		sv.addClass('fadeInUp');
	},500);
});

/////////////////////
// Boton para moviles
$('#menuBtn').click(function() {
	var ul = $('#ulNav');
	console.log(ul.attr('isOpen'));
	if (ul.attr('isOpen') == 'false') {
		$('#ulNav li').removeClass('hidden-xs');
		ul.addClass('menuOpenUl');
		ul.attr('isOpen', 'true');
	} else{
		$('#ulNav li').addClass('hidden-xs');
		ul.removeClass('menuOpenUl');
		ul.attr('isOpen', 'false');

	}

});
$(window).resize(function(){
	var whith = $(this).width(); //767
	if (whith > 767) {
		$("#ulNav li").addClass('hidden-xs');
		$("#ulNav").removeClass('menuOpenUl');
	}

});

$('#textoBtn').click(function(){
  var texto = $('#seccionTexto');
  var btnClose = $('#btnTxtClose');
  var btnTexto = $('#btnTexto');
  console.log('Mostrando texto');

  btnClose.css('display','block');
  btnTexto.css('display','none');

  texto.removeClass('hidden-xs');

});

$('#textoBtnClose').click(function(){
  var texto = $('#seccionTexto');
  var btnClose = $('#btnTxtClose');
  var btnTexto = $('#btnTexto');

  console.log('Ocultando texto');

  btnClose.css('display','none');
  btnTexto.css('display','block');

  texto.addClass('hidden-xs');
});

// <iframe width="1280" height="720" src="https://www.youtube.com/embed/nlTZuAqB6mI" frameborder="0" allowfullscreen></iframe>
