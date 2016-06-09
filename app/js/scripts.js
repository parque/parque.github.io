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

var sv = $('#seccionVideo');
var title = $('.titleText');
var btnDown = $("#divDown");
var btnL = $('.btnChangeLeft');
var btn = $('#btnChangeDown');

function cambiarTexto(){
	$('.textoCambiante').fadeToggle(200)
}
function aumentarVideo(){
	var seccionV = $('#idSeccionVideo');
	hideButtonsAll();
	seccionV.css("margin-top", "70px");
	seccionV.removeClass('col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-3');
	seccionV.addClass('col-xs-12 col-sm-7 col-sm-offset-1');
	$('#bgDark').css('background-color', 'rgba(0,0,0,0.7)');
	
}
function reducirVideo(){
	var seccionV = $('#idSeccionVideo');
	seccionV.css("margin-top", "110px");
	seccionV.removeClass('col-xs-12 col-sm-7 col-sm-offset-1');
	seccionV.addClass('col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-3');
	$('#bgDark').css('background-color', 'rgba(0,0,0,0.0)');
	if (sv.attr("storyState") == 'default') 
		showButtonsAll();
	if (sv.attr("storyState") == 'mario')
		showButtonsLeft();
	if (sv.attr("storyState") == 'homero')
		showButtonsRight();
}

$('#btnChangeDown').click(function(){
	var btnL = $('.btnLeft');
	var btnLM = $('.btnLeftMov');
	var btnR = $('.btnRight');
	var btnRM = $('.btnRightMov');
	sv.addClass('animated fadeOutUp');
	setTimeout(function(){
		sv.removeClass('fadeOutUp');
		// si esta en la historia de introduccion
		if (btn.attr('story') == 'main'){
			sv.attr("storyState", 'default');
			video.loadVideoById('9edjOnavFE4');
			btn.prev('h3').text('  Liberar a Romelia');
			btn.attr('story', 'romelia');
			title.text('Romelia la Tortuga');
		} else{
			if (btn.attr('story') == 'romelia') {
				sv.attr("storyState", "none");
				video.loadVideoById('YqqDQ-1_pBc');
				btn.prev('h3').text(' Info');
				btn.attr('story', 'liberar');
				title.text('Liberación de Romelia');
				hideButtonsAll();
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
		sv.addClass('fadeInUp');
	},500);
});

//TRANSICIÓN PARA LOS LADOS///////////////////////
// derecha

var sv = $('#seccionVideo');
var title = $('.titleText');
var btnDown = $("#divDown");
var btnL = $('.btnChangeLeft');

$('.btnChangeRight').click(function(){
	var btnR = $('.btnChangeRight');
	reseter();
	sv.addClass('animated fadeOutLeft');
	hideButtonsAll();

	// si esta en la historia de introduccion
	if (sv.attr("storyState") == 'default'){
		setTimeout(function(){
			reseter();
			title.text('Historia de Mario');
			sv.attr("storyState", "mario");
			btnDown.addClass("hide");
			video.loadVideoById('9edjOnavFE4');
			sv.addClass('fadeInRight');
		},500);
	} else {
		if(sv.attr("storyState") == 'homero'){
			setTimeout(function(){
				reseter();
				sv.addClass('fadeInRight');
				title.text('Romelia la Tortuga');
				sv.attr("storyState", "default");
				btnDown.removeClass("hide");
				video.loadVideoById('9edjOnavFE4');
			},500);
		}
	}
	
});

// izquierda
$('.btnChangeLeft').click(function(){
	reseter();
	sv.addClass('animated fadeOutRight');
	hideButtonsAll();

	// si esta en la historia de homero
	if (sv.attr("storyState") == 'mario'){
		setTimeout(function(){
			reseter();
			sv.attr("storyState", "default");
			sv.addClass('fadeInLeft');
			title.text('Romelia la Tortuga');
			video.loadVideoById('9edjOnavFE4');
			btnDown.removeClass("hide");	
		},500);
			/*$('.btnLeft').css('margin-top','67px');*/
	} else {
		if(sv.attr("storyState")=='default'){
			setTimeout(function(){
				reseter();
				sv.attr("storyState", "homero");
				video.loadVideoById('9edjOnavFE4');
				title.text('Historia de Homero');
				hideButtonsLeft();
				sv.addClass('fadeInLeft');
			},500);
			btnDown.addClass("hide");
		}
	} 
});

////
// funcion reseter
function reseter(){
	sv.removeClass('fadeOutLeft');
	sv.removeClass('fadeOutLeft');
	sv.removeClass('fadeInRight');
	sv.removeClass('fadeInUp');
	sv.removeClass('fadeInLeft');
	sv.removeClass('fadeOutRight');
}
function hideButtonsRight(){
	$('.btnRight').addClass('hide');
	$('.btnRightMov').addClass('hide');
}
function showButtonsRight(){
	$('.btnRight').removeClass('hide');
	$('.btnRightMov').removeClass('hide');
}
function hideButtonsLeft(){
	$('.btnLeft').addClass('hide');
	$('.btnLeftMov').addClass('hide');
}
function showButtonsLeft(){
	$('.btnLeft').removeClass('hide');
	$('.btnLeftMov').removeClass('hide');
}
function hideButtonsAll(){
	hideButtonsLeft();
	hideButtonsRight();
}
function showButtonsAll(){
	showButtonsLeft();
	showButtonsRight();
}
////
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

$(document).ready(function(){
	var txtL = $('.txtLeft');
	var txtR = $('.txtRight');
	var show = true;
	var count = 0;

	setInterval(function(){
		if(count < 8){
			txtL.fadeOut(2000);
			txtR.fadeOut(2000);	
			count++;
		}else{
			txtL.fadeIn(2000);
			txtR.fadeIn(2000);
			count = 0;
		}
	}, 1000);

	$('#textoBtn').click(function(){
	  var texto = $('#seccionTexto');
	  var btnClose = $('#btnTxtClose');
	  var btnTexto = $('#btnTexto');
	  console.log('Mostrando texto');
	  btnClose.css('display','block');
	  btnTexto.css('display','none');
	  texto.removeClass('hidden-xs');
	  $('.btnLeftMov').addClass('hidden-xs');
	  $('.btnRightMov').addClass('hidden-xs');
	});

	$('#textoBtnClose').click(function(){
	  var texto = $('#seccionTexto');
	  var btnClose = $('#btnTxtClose');
	  var btnTexto = $('#btnTexto');
	  console.log('Ocultando texto');
	  btnClose.css('display','none');
	  btnTexto.css('display','block');
	  texto.addClass('hidden-xs');
	  $('.btnLeftMov').removeClass('hidden-xs');
	  $('.btnRightMov').removeClass('hidden-xs');
	});
});
