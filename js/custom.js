"use strict";
// $(document).ready(function(){

(function() {

    //console.log('hi1');
    var username=getCookie("username");
    if (username!="") {
    //console.log('hi2');
        //alert("Welcome again " + username);
        startGame();
    }else{
          //console.log(username);
          window.location.assign("/tic/signup.html");
        //username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            /*setCookie("username", username, 365);
            startGame();*/
        }
    }
})();

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
//$(document).ready(function() {
  $('a.logout').click(function(e){
    console.log('I am here');
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.replace("/tic/signup.html");
    e.preventDefault();
    return false;
  })
//});
function startGame(){


  $('.name').html("Welcome " + getCookie("username"));
  console.log('hi');
  function gameRestart(){
    boxValue = "x btn-primary b"
    $('.boxHolder').removeClass('won');
    $('.boxHolder').html('');
    for(var i=1; i<=9; i++){
      $('.boxHolder').append("<div class='span1 btn' id='b" + i + "'> + </div>")
    }
  }
  gameRestart();
  var boxValue = "x btn-primary b"
  var wonPlayer;
  $('.boxHolder .btn').live('click',function(){
    //alert($('.b').length);
    if($('.boxHolder').hasClass('won')){
      alert(wonPlayer + ' has already won this Game');
      gameRestart();
    }else if(!($(this).hasClass('x')||$(this).hasClass('o'))){
      if(boxValue == "x btn-primary b"){
        $(this).addClass(boxValue).html('X');
        boxValue = "o btn-success b"
      }else{
        $(this).addClass(boxValue).html('O');
        boxValue = "x btn-primary b"
      }
      if(
              $('#b1').hasClass('x') && $('#b2').hasClass('x') && $('#b3').hasClass('x')||
              $('#b4').hasClass('x') && $('#b5').hasClass('x') && $('#b6').hasClass('x')||
              $('#b7').hasClass('x') && $('#b8').hasClass('x') && $('#b9').hasClass('x')||
              $('#b1').hasClass('x') && $('#b4').hasClass('x') && $('#b7').hasClass('x')||
              $('#b2').hasClass('x') && $('#b5').hasClass('x') && $('#b8').hasClass('x')||
              $('#b3').hasClass('x') && $('#b6').hasClass('x') && $('#b9').hasClass('x')||
              $('#b1').hasClass('x') && $('#b5').hasClass('x') && $('#b9').hasClass('x')||
              $('#b3').hasClass('x') && $('#b5').hasClass('x') && $('#b7').hasClass('x')
              ){
        $('.boxHolder').addClass('won');
        wonPlayer = 'X';
        var xOldValue = $('#prependedInput1').val();
        var xNewValue = parseInt(xOldValue) + 1;
        $('#prependedInput1').val(xNewValue);
        boxValue = "x btn-primary b"
        alert('X has won the game');
      }else if(
              $('#b1').hasClass('o') && $('#b2').hasClass('o') && $('#b3').hasClass('o')||
              $('#b4').hasClass('o') && $('#b5').hasClass('o') && $('#b6').hasClass('o')||
              $('#b7').hasClass('o') && $('#b8').hasClass('o') && $('#b9').hasClass('o')||
              $('#b1').hasClass('o') && $('#b4').hasClass('o') && $('#b7').hasClass('o')||
              $('#b2').hasClass('o') && $('#b5').hasClass('o') && $('#b8').hasClass('o')||
              $('#b3').hasClass('o') && $('#b6').hasClass('o') && $('#b9').hasClass('o')||
              $('#b1').hasClass('o') && $('#b5').hasClass('o') && $('#b9').hasClass('o')||
              $('#b3').hasClass('o') && $('#b5').hasClass('o') && $('#b7').hasClass('o')
              ){
        $('.boxHolder').addClass('won');
        wonPlayer = 'O';
        var oOldValue = $('#prependedInput2').val();
        var oNewValue = parseInt(oOldValue) + 1;
        $('#prependedInput2').val(oNewValue);
        alert('O has won the game');
      }else if($('.b').length == 9){
        alert('Game is Tie, it will restart');
        gameRestart()
      }
    }else{
      alert('Already have value, please click on another box.')
    }

  })
  $('a.refreshGame').click(function(){
    gameRestart()
  })

};
// })