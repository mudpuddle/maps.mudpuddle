var open = 0;
function panelToggle() {
  if (open == 0) {
    $("#block" ).animate({ "right": "+=252px" }, "slow" );
    setTimeout(function(){
      $("#menuToggle").removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-right");
      $('#location').focus();
    },500);
    open = 1;
  }
  else if (open == 1) {
    $("#block" ).animate({ "right": "-=252px" }, "slow" );
    setTimeout(function(){
      $("#menuToggle").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-left");
    },500);
    open = 0;
  }
}

function addAlert(message, alerttype, appendTo, link){
  var alertMessage = '<div class="alert alert-' +  alerttype + ' alert-dismissable"><button class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
  if (link) {
    alertMessage += '<a href="#" class="alert-link" onclick="updateSearch(&apos;' + message + '&apos;)">' + message + '</a>';
  }
  else {
    alertMessage += message;
  }
  alertMessage += '</div>';

  $('#'+appendTo).append(alertMessage);
}

function updateSearch(message) {
  $('#location').val(message);
  addHistory = false;
  codeLocation();
}

$(".trigger" ).click(function() {
  panelToggle();
});

$(document).ready(function () {
    setTimeout(function () {
        $('#info').stop().fadeTo("slow", 0.001);
    }, 10000);
    setTimeout(function() {
      window.scrollTo(0, 1)
    }, 100);

    initialize();

    $('#zoomReset').click(function() { resetMap(); });

    $('#printButton').click(printMap);
    //$('#printButton').click(function() { window.open('http://www.google.com'); });
    //document.getElementById('printButton').onclick=printMap;

    $('#location').bind('keyup', function(e) {
      if ( e.keyCode === 13 ) {
        codeLocation(true);
      }
    });

  // $('#location').append(geocoder.onAdd(map));
});
