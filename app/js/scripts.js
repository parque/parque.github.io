////////TOOLTIPS//////////////////
$(document).ready(function(){
	var too = $(window).width();
	if(too >= 556){
		$(function () {
		  $('[data-toggle="tooltip"]').tooltip()
		});
	}
});
/////////////////////////////////////////////////////////////
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
    videoId: '6hzoDFriH9U', // esto es el id del video que se encuentra en la url
    playerVars: { 'autoplay': 0, 'controls': 1 ,'rel': 0, 'showinfo': 0, 'autohide' : 2},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
// // 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	video = event.target;
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
var ctrlLR;
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
			btn.prev('h3').text('Qué pasó con Romelia?');
			btn.attr('story', 'romelia');
			title.text('Romelia la Tortuga');
			video.loadVideoById('ke05PJnoedA');
		} else{
			if (btn.attr('story') == 'romelia') {
				sv.attr("storyState", "none");
				btn.prev('h3').text('Créditos');
				btn.attr('story', 'liberar');
				title.text('Liberación de Romelia');
				hideButtonsAll();
				video.loadVideoById('9yXTU73NoOE');
			} else {
				if(btn.attr('story') == 'liberar'){
					/// esta es la ultima seccion
					
					video.destroy();
					btn.prev('h3').text(' Final');
					btn.children('i').removeClass('fa fa-chevron-down');
					title.text('');
					$('#idSeccionVideo').remove();
					$('#seccionCreditos').removeClass('hide');
					$('#seccionCreditos').hide();
					setTimeout(function(){
						$('#seccionCreditos').fadeIn(2000);
					},500);
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
			$('.btnLeft h4').text('Historia Romelia');
			$('.btnLeftMov h5').text('Historia Romelia');
			sv.addClass('fadeInRight');
			video.loadVideoById('cB6MEfZA6GU');
			
		},500);
	} else {
		if(sv.attr("storyState") == 'homero'){
			setTimeout(function(){
				reseter();
				sv.addClass('fadeInRight');
				title.text('Romelia la Tortuga');
				sv.attr("storyState", "default");
				btnDown.removeClass("hide");
				$('.btnRight h4').text('Historia Mario');
				$('.btnRightMov h5').text('Historia Mario');
				video.loadVideoById('ke05PJnoedA');

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
			$('.btnLeft h4').text('Historia Homero');
			$('.btnLeftMov h5').text('Historia Homero')
			btnDown.removeClass("hide");	
			video.loadVideoById('ke05PJnoedA');
		},500);
	} else {
		if(sv.attr("storyState")=='default'){
			setTimeout(function(){
				reseter();
				sv.attr("storyState", "homero");
				title.text('Historia de Homero');
				hideButtonsLeft();
				$('.btnRight h4').text('Historia Romelia');
				$('.btnRightMov h5').text('Historia Romelia');
				sv.addClass('fadeInLeft');
				video.loadVideoById('p1o2w8-wofI');
			},500);
			btnDown.addClass("hide");
		}
	} 
});
////
// funcion reseter
var ctrlH;
var ctrlM;

function reseter(){
	sv.removeClass('fadeOutLeft');
	sv.removeClass('fadeOutLeft');
	sv.removeClass('fadeInRight');
	sv.removeClass('fadeInUp');
	sv.removeClass('fadeInLeft');
	sv.removeClass('fadeOutRight');
	ctrlH = 0;
	ctrlM = 0;
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
		if(count < 6){
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


///////////////////////////////////////////////
/// Logica del texto 
var newT = true;

var textV = $('.textoCambiante');
textV.addClass('animated');

setInterval(function(){
	var time = video.getCurrentTime();
	console.log(time);

	if(btn.attr('story') == "main"){
		textVideo1(time);
	} else if(true) {
		// otro video
	} 
	if(sv.attr("storyState") == 'homero'){
		textVideoHomero(time);
	} else if(true){

	}
	if(sv.attr("storyState") == 'mario'){
		textVideoMario(time);
	} else if(true){

	}
	if(btn.attr('story') == 'liberar'){
		textLiberacionRomelia(time);
	} else if(true){

	}
},1000);
// textos primer video
var textoMain1 = "El Parque Marino del Pacífico es una organización interdisciplinaria e interinstitucional que promueve, apoya y difunde la investigación, la educación y el uso sostenible de la biodiversidad marina. Es además un centro para la recreación.";
var textoMain2 = "El Parque practica y promueve valores como: equidad, solidaridad, responsabilidad, trabajo en equipo, eficiencia, trabajo comunal y búsqueda del equilibrio de los ecosistemas.";
var textoMain3 = "Desde el año 2005, el programa ha venido mejorando la tecnología de reproducción y alevinaje del Pargo Manchado, especie de alto interés comercial con un excelente mercado en los Estados Unidos.";
var textoMain4 = "El Programa de Educación Ambiental del Parque Marino, facilita para todo público, charlas cortas formativas sobre temas relevantes, tanto del ámbito marino, como sobre tópicos socio-ambientales.";
var textoMain5 = "El Parque Marino considera primordial el mejoramiento de la calidad de vida de los pobladores de la zona costera...";
var textoMain6 = "por lo que promueve un área aplicada a crear alternativas por medio de la investigación, el desarrollo y la innovación, en el campo de la producción marina.";
var textoMain7 = "El Parque Marino es el ente de referencia en Puntarenas en cuanto a la conservación de recursos marinos.";

// textos Homero
var textoHomer1 = "Los pelícanos en exhibición fueron encontrados principalmente en distintas playas con sus alas fracturadas, lo cual hace imposible que vuelvan a volar.";
var textoHomer2 = "Homero es el pelícano con más años en el Parque Marino.";
var textoHomer3 = "Los pelícanos no tienen la capacidad de recuperarse de fracturas en sus huesos.";
var textoHomer4 = "Los pelícanos se alimentan de pescados pequeños. El Parque Marino se encarga del alimento que ellos necesitan y los cuidados necesarios.";
var textoHomer5 = "Los pelícanos son un ejemplo del esfuerzo que realiza el Parque por brindar apoyo a los animales costeros.";
var textoHomer6 = "Por medio de las historias de los pelícanos se hace conciencia en los jóvenes y niños para que respeten la fauna costera.";

// textos de Mario
var textoMario1 = "Mario es una tortuga lora que se encuentra de manera permanente en exhibición en el Parque Marino.";
var textoMario2 = "Las tortugas marinas bajo ninguna circunstancia pueden estar encerradas como mascotas.";
var textoMario3 = "Mario es uno de los casos más extraños ya que debido a su condición previa no sabía nadar.";
var textoMario4 = "Aunque Mario es una tortuga saludable sus hábitos y poca noción del exterior no le permitirán salir del acuario.";

// textos de liberación de Romelia
var textoLR1 = "La Historia de Romelia ha sido conocida a nivel nacional como una representación del esfuerzo del Parque Marino por la conservación de la vida marina.";
var textoLR2 = "La liberación se realizó con presencia de alumnos de escuelas y kinders.";
var textoLR3 = "El rostro de la tortuga se cubre para que ella tenga la menor interacción con los humanos.";
var textoLR4 = "Aunque para Romelia moverse en la arena es difícil en el agua se desenvuelve muy bien.";

function type(texto){
	console.log("type");
	textV.fadeOut(1500);
	setTimeout(function(){
		textV.empty();
		textV.html('<p id="TC" style="font-size: 1em;"></p>');
	
		textV.fadeIn(1500);
		$('#TC').typed({
		    strings: [texto],
		    typeSpeed: 30,
		    showCursor: false,
		    contentType: 'text',
		});
	},3000);
}

function textVideo1(time){
	if(time > 65 && time < 100 && newT){
		newT = false;
		type(textoMain1);
	} else if(time > 100 && time < 150 && newT == false){
		newT = true;
		type(textoMain2);
	} else if (time > 150 && time < 170 && newT == true){
		newT = false;
		type(textoMain3);
	} else if(time > 170 && time < 210 && newT ==false){
		newT = true;
		type(textoMain4);
	} else if(time > 210 && time < 225 && newT == true){
		newT = false;
		type(textoMain5);
	} else if(time > 225 && time < 245 && newT == false){
		newT = true;
		type(textoMain6);
	} else if(time > 245 && time < 262 && newT == true){
		newT = false;
		type(textoMain7);
	}
};
// TEXTOS HOMERO
function textVideoHomero(time){
	if(ctrlH == 0){
		newT = true;
		ctrlH = 1;
	}
	if(time > 1 && time < 65 && newT){
		newT = false;
		type(textoHomer1);
	} else if(time > 65 && time < 100 && newT == false){
		newT = true;
		type(textoHomer2);
	} else if(time > 100 && time < 118 && newT){
		newT = false;
		type(textoHomer3);
	} else if(time > 118 && time < 156 && newT == false){
		newT = true;
		type(textoHomer4);
	} else if(time > 156 && time < 222 && newT){
		newT = false;
		type(textoHomer5);
	} else if(time > 222 && time < 328 && newT == false){
		newT = true;
		type(textoHomer6);
	}
};
// TEXTOS MARIO
function textVideoMario(time){
	if(ctrlM == 0){
		newT = true;
		ctrlM = 1;
	}
	if(time > 1 && time < 45 && newT){
		newT = false;
		type(textoMario1);
	} else if(time > 45 && time < 94 && newT == false){
		newT = true;
		type(textoMario2);
	} else if(time > 94 && time < 200 && newT){
		newT = false;
		type(textoMario3);
	} else if(time > 200 && time < 212 && newT == false){
		newT = true;
		type(textoMario4);
	}
};
function textLiberacionRomelia(time){
	if(ctrlLR == 0){
		newT = true;
		ctrlLR = 1;
	}
	if(time > 1 && time < 98 && newT){
		newT = false;
		type(textoLR1);
	} else if(time > 98 && time < 285 && newT == false){
		newT = true;
		type(textoLR2);
	} else if(time > 285 && time < 347 && newT){
		newT = false;
		type(textoLR3);
	} else if(time > 347 && time < 600 && newT == false){
		newT = true;
		type(textoLR4);
	}
};