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
    videoId: '9edjOnavFE4', // esto es el id del video que se encuentra en la url
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// // 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();

    console.log(event.target.getCurrentTime());
    setInterval(function(){
   	    if(event.target.getCurrentTime() > 2 && event.target.getCurrentTime() < 5){
   	    	console.log('El tiempo es mayor a 2');
   	    	cambiarTexto();
   	    }
   	    if(event.target.getCurrentTime() > 5){
   	    	cambiarTexto();

   	    	console.log('El tiempo es mayor a 5')
   	    }
    },2000);
}

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
function onPlayerStateChange(event) {
  console.log('cambio el estado a: '+event.target.getPlayerState());

  if (event.target.getPlayerState() != 2) {
  	aumentarVideo();
  } else {
  	reducirVideo();
  }
}

function cambiarTexto(){
	$('.textoCambiante').fadeToggle(200)
}
function aumentarVideo(){
	$('#idSeccionVideo').removeClass('col-sm-3 col-sm-offset-3');
	$('#idSeccionVideo').addClass('col-sm-7 col-sm-offset-1');
}
function reducirVideo(){
	$('#idSeccionVideo').removeClass('col-sm-7 col-sm-offset-1');
	$('#idSeccionVideo').addClass('col-sm-3 col-sm-offset-3');
}