// 시작 시 게임 bgm
$( document ).ready(function() {
  var bgm2 = document.getElementById("bgm2");
  var clear_bgm = document.getElementById("clear_bgm");
  var correct_bgm = document.getElementById("correct_bgm");
  bgm2.pause();
  clear_bgm.pause();
  correct_bgm.pause();
});

// 시작 시 게임 bgm끄기
// 동적 이미지 맵핑을 위한 코드
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});
// 동적 이미지 맵핑을 위한 코드
// 음악 이미지 클릭 시 켜고 끄기
function bgm_function() {
  var bgm1 = document.getElementById("bgm1");
  if(document.getElementById("sound_on").style.display == "block") {
    $("#sound_on").css("display","none");
    $("#sound_off").css("display","block");
    bgm1.pause();
  }
  else {
    $("#sound_on").css("display","block");
    $("#sound_off").css("display","none");
    bgm1.play();
  }
}
// 음악 이미지 클릭 시 켜고 끄기
// 음악 이미지 클릭 시 켜고 끄기
function bgm2_function() {
  var bgm2 = document.getElementById("bgm2");
  if(document.getElementById("sound_on2").style.display == "block") {
    $("#sound_on2").css("display","none");
    $("#sound_off2").css("display","block");
    bgm2.pause();
  }
  else {
    $("#sound_on2").css("display","block");
    $("#sound_off2").css("display","none");
    bgm2.play();
  }
}
// 음악 이미지 클릭 시 켜고 끄기
var question_array = new Array(); // 문제를 넣을 배열
var remain_stage = 4;
// 게임시작 눌렀을 때 화면 변경
function start() {
  var bgm1 = document.getElementById("bgm1");
  var bgm2 = document.getElementById("bgm2");
  bgm1.pause();
  bgm2.play();
  var Game_UI = document.getElementById("Game_UI");
  Game_UI.style.transform = "translate(0,-100%)";

  // 문제를 랜덤하게 배열에 담음
  var temp;
  var rnum;

  for(var i=1; i<=15; i++){
      question_array.push(i);
  }

  for(var i=0; i<question_array.length ; i++)
  {
      rnum = Math.floor(Math.random() *15);
      temp = question_array[i];
      question_array[i] = question_array[rnum];
      question_array[rnum] = temp;
  }
  // 문제를 랜덤하게 배열에 담음

  setTimeout(function() {
    Stage(remain_stage);
    $("#score").fadeIn(200);
    $("#timer").fadeIn(200);
    $("#remain").fadeIn(200);
  }, 1000);
}
// 게임시작 눌렀을 때 화면 변경
// 스테이지 구현 함수
function Stage(i) {
  var x = document.getElementsByClassName("correct_img");
  var y = document.getElementsByClassName("correct_map");
  var x_len = x.length;
  var j = 0;
  while (j < x_len) {
    $(x[0]).remove();
    $(y[0]).remove();
    j++;
  }

  count = 60;
  $('#stage_clear').hide();
  $('#time_over').hide();
  document.getElementById("remain").innerHTML = 5;
  $("#Q" + question_array[i]).fadeIn(500);
  $("#A" + question_array[i]).fadeIn(500);
  timer_a();
}
// 스테이지 구현 함수
// 게임설명 눌렀을 때 화면 변경
function explain() {
  var explain = document.getElementById("explain");
  $(explain).css("display","block");
}

function explain_close() {
  var explain = document.getElementById("explain");
  $(explain).css("display","none");
}
// 게임설명 눌렀을 때 화면 변경
var stra = new Array(); // area 값을 담기위한 배열
var ia = 0; // 임시변수
// 정답 맞췄을 때 동그라미 이미지 생성
function correct(obj) {
   var coords_str = $(obj).attr("coords");
   var strArray = coords_str.split(',');
   var x = event.x;
   var y = event.y;

   var temp_area = document.getElementsByClassName("area");

   // 정답 중복 체크 후 중복일 경우 생성하지 않음
   for(var i = 0; i < temp_area.length; i++) {
      if(temp_area[i].getAttribute("coords") == coords_str) {
        return
      }
   }
   var correct_bgm = document.getElementById("correct_bgm");
   correct_bgm.play();

   var img = document.createElement("img");
   img.setAttribute("src", "img/correct.png");
   img.setAttribute("class", "correct_img");
   img.setAttribute("usemap", "#correct_img");
   var map = document.createElement("map");
   map.setAttribute("class", "correct_map");
   $("#img_cont").append(img);
   $("#img_cont").append(map);
   var area = document.createElement("area");
   area.setAttribute("class", "area");
   $(map).append(area);
   area.setAttribute("coords", coords_str);

   img.style.position = "absolute";
   img.style.zIndex = 2;
   img.style.cursor = "pointer";
   img.style.left = parseInt(strArray[0]) + "px";
   img.style.top = parseInt(strArray[1]) + "px";
   img.style.height = "9%";
   img.style.width = "3.5%";
   img.style.display = "none";
   img.style.transform = "translate(-40%,-40%)";
   $(img).fadeIn(400);
   stra[ia++] = obj;
   var img2 = document.createElement("img");
   img2.setAttribute("src", "img/correct.png");
   img2.setAttribute("class", "correct_img");

   img2.style.position = "absolute";
   img2.style.zIndex = 2;
   img2.style.cursor = "pointer";
   img2.style.left = img.offsetLeft + "px";
   img2.style.top = img.offsetTop + "px";
   img2.style.height = "9%";
   img2.style.width = "3.5%";
   img2.style.display = "none";
   img2.style.transform = "translate(1400%,-40%)";
   $("#img_cont").append(img2);
   $(img2).fadeIn(400);

   document.getElementById("score").innerHTML = (parseInt(document.getElementById("score").innerHTML)+200);
   document.getElementById("remain").innerHTML = (parseInt(document.getElementById("remain").innerHTML)-1);
   stage_clear();
 }
// 정답 맞췄을 때 동그라미 이미지 생성
// 창의 사이즈가 바뀌면 두번 실행되는데 한번만 실행되도록
var delta = 300;
var timer = null;

$(window).on('resize', function(){
   // resize 후 한번만 실행
   clearTimeout(timer);
   timer = setTimeout( resizeDone, delta );
});
// 창의 사이즈가 바뀌면 두번 실행되는데 한번만 실행되도록
// 창의 사이즈가 바뀌었을 때 실행하는 함수
function resizeDone(){
  var x = document.getElementsByClassName("correct_img");
  var y = document.getElementsByClassName("correct_map");
  var x_len = x.length;
  var j = 0;
  while (j < x_len) {
    $(x[0]).remove();
    $(y[0]).remove();
    j++;
  }

   for (var i = 0; i < stra.length; i++) {
      var coords_str = $(stra[i]).attr("coords");
      alert(coords_str);
      var strArray = coords_str.split(',');

      var img = document.createElement("img");
      img.setAttribute("src", "img/correct.png");
      img.setAttribute("class", "correct_img");
      img.setAttribute("usemap", "#correct_img");
      var map = document.createElement("map");
      map.setAttribute("class", "correct_map");
      $("#img_cont").append(img);
      $("#img_cont").append(map);
      var area = document.createElement("area");
      $(map).append(area);
      area.setAttribute("coords", coords_str);

      img.style.position = "absolute";
      img.style.zIndex = 2;
      img.style.cursor = "pointer";
      img.style.left = parseInt(strArray[0]) + "px";
      img.style.top = parseInt(strArray[1]) + "px";
      img.style.height = "9%";
      img.style.width = "3.5%";
      img.style.display = "none";
      img.style.transform = "translate(-40%,-40%)";
      $(img).fadeIn(400);

      var img2 = document.createElement("img");
      img2.setAttribute("src", "img/correct.png");
      img2.setAttribute("class", "correct_img");

      img2.style.position = "absolute";
      img2.style.zIndex = 2;
      img2.style.cursor = "pointer";
      img2.style.left = img.offsetLeft + "px";
      img2.style.top = img.offsetTop + "px";
      img2.style.height = "9%";
      img2.style.width = "3.5%";
      img2.style.display = "none";
      img2.style.transform = "translate(1400%,-40%)";
      $("#img_cont").append(img2);
      $(img2).fadeIn(400);
    }
}
// 창의 사이즈가 바뀌었을 때 실행하는 함수
// 타이머
var count = 60;
var counter = null;
function timer_a() {
  clearInterval(counter);
  counter = setInterval(timer_b, 1000);
}

function timer_b() {
  count--;

  if(count <=0) {
    clearInterval(counter);
    stage_pass();
  }
  if(count <=15) {
  document.getElementById("timer").style.color = "red";
  } else {
  document.getElementById("timer").style.color = "black";
  }
  document.getElementById("timer").innerHTML = count;
}
// 타이머

// 문제를 다 맞추었을 때 다음스테이지로 이동
function stage_clear() {
  if(document.getElementById("remain").innerHTML == 0) { // 다 맞췄을 경우
    var clear_bgm = document.getElementById("clear_bgm");
    clear_bgm.play();
    $('#stage_clear').show(500);
    document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) + (parseInt(document.getElementById("timer").innerHTML)*30);
    stra = []; // 맞춘 것 초기화
    ia = 0;
    setTimeout(function() {
      $("#Q" + question_array[remain_stage]).fadeOut(500);
      $("#A" + question_array[remain_stage]).fadeOut(500);
      remain_stage--; // 남은 스테이지 --
      Stage(remain_stage);
    }, 1500);
    if(remain_stage == 0) { // 5 스테이지 모두 끝났을 경우
      setTimeout(function() {
        while(1) {
          var name = prompt("닉네임을 입력해주세요!");
          if(name == null) {
              alert("빈칸말구요");
              continue;
          }
          else if(isNaN(name) == false) {
            alert("문자로 입력해주세요");
            continue;
          }
          else {
            break;
          }
        }
        game_over(name);
      }, 1000);
    }
  }
}
// 문제를 다 맞추었을 때 다음스테이지로 이동
// 문제를 다 못 맞추었을 때 다음스테이지로 이동
function stage_pass() {
  $('#time_over').show(500);
  stra = []; // 맞춘 것 초기화
  ia = 0;
  setTimeout(function() {
    $("#Q" + question_array[remain_stage]).fadeOut(500);
    $("#A" + question_array[remain_stage]).fadeOut(500);
    remain_stage--; // 남은 스테이지 --
    Stage(remain_stage);
  }, 1500);
  if(remain_stage == 0) { // 5 스테이지 모두 끝났을 경우
    setTimeout(function() {
      while(1) {
        var name = prompt("닉네임을 입력해주세요!");
        if(name == null) {
            alert("빈칸말구요");
            continue;
        }
        else if(isNaN(name) == false) {
          alert("문자로 입력해주세요");
          continue;
        }
        else {
          break;
        }
      }
      game_over(name);
    }, 1000);
  }
}
// 문제를 다 못 맞추었을 때 다음스테이지로 이동
// 게임 종료
function game_over(name) {
  var GameOver_UI = document.getElementById("GameOver_UI");
  GameOver_UI.style.transform = "translate(0,-100%)";
  var handle = document.getElementById("handle");
	var temp = "location.href='TP2_201604140.jsp?name=" + name +"'";
  handle.setAttribute("onclick", temp);
}
// 게임 종료
