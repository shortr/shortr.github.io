//version 1.4.1
/*global firebase*/
window.onload = function(){
  var config = {
    apiKey: "AIzaSyCMrZkWALgQ9IC7__7LA8GG_xzhmVrONCA",
    authDomain: "rickroll-4b28d.firebaseapp.com",
    databaseURL: "https://rickroll-4b28d.firebaseio.com",
    projectId: "rickroll-4b28d",
    storageBucket: "rickroll-4b28d.appspot.com",
    messagingSenderId: "836606014111"
  };
  firebase.initializeApp(config);
  
  var ref = firebase.database().ref();
  
  var version = "1.4.3";
  var v = document.getElementById("version");
  v.innerText = "v. " + version;
  
  var linksh = document.getElementById("mainlink");
  var bu = document.getElementById("submit");
  var displaytext = document.getElementById("redirlink");
  
  var randChars = ["a","b","c","d","e","f"];
  var randChars2 = ["A","B","C","D","E","F"];
  var randChars3 = ["1","2","3","4","5","6"];
  
  //converts numbers to chars. beware using custom chars for links, they can be overwritten more easily
  function conv(num){
    var nn = num;
    var string = ""; //string of shortlink
    var l = 0; //length of string
    if(Math.floor(nn/49)-1 >= 0){
      string = string + randChars3[Math.floor(nn/49)-1];
    }
    nn = nn % 49;
    if(Math.floor(nn/7)-1 >= 0){
      string = string + randChars2[Math.floor(nn/7)-1];
    }
    nn = nn % 7;
    if(nn - 1 >= 0){
      string = string + randChars[nn - 1];
    }
    ref.child(string).set(linksh.value);
    displaytext.innerText = "Success! Your link leads to " + linksh.value + ": https://shortr.github.io/?" + string;
  }
  
  bu.onclick = function(){
      var n = 0;
      ref.once("value", function(snapshot) {
          n = snapshot.numChildren();
          var l = snapshot.val();
          var exists = false;
          for(var i in l){
            if(l[i] === linksh.value){
              displaytext.innerText = "Success! Your link leads to " + linksh.value + ": https://shortr.github.io/?" + i;
              exists = true;
              break;
            }
          }
          if(exists === false){
            conv(n + 1);
          }
      });
  };
  
  if(window.location.href.split("?")[1] === "_c9_id=livepreview3&_c9_host=https://ide.c9.io" || window.location.href.split("?")[1] === "_c9_id=livepreview0&_c9_host=https://ide.c9.io" || window.location.href.split("?")[1] === "_c9_id=livepreview1&_c9_host=https://ide.c9.io" || window.location.href.split("?")[1] === "" || window.location.href.split("?")[1] === undefined || window.location.href.split("?")[1] === null){
      //donothing
        setTimeout(function(){
        document.getElementById("con").style.display = "block";
        },2000);
  }else{
      //alert("There is indeed a link that is being shortened."); //used for debugging purposes currently (V 1.4.1) (WORKS)
      //redirect
      var hi = window.location.href.split("?");
      delete hi[0];
      hi = hi.join().replace(/,/img,"");
      ref.once('value',function(s){
          if(s.hasChild(hi)){
              alert("Child has been found!"); //More debugging... (V 1.4.1)
              ref.child(hi).once('value',function(url){
                var k = url.val().replace(/"/,"%22");
                k = url.val().replace(/'/,"%27");
                document.write("<h1>Click the window to continue to your link</h1>");
                document.write("<h4>if it doesn't work, click this link:" + "<a href='" + k + "' target=_blank onclick=window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')>" + "Click Me!" + "</a></h4><textarea width='100%' style='width: 100%'>"+k+"</textarea>");
                window.onmousedown = function(){
                  if(url.val().search("://") === -1){
                    if(url.val().search("data:") === -1){
                      window.open("https://" + url.val(),"_blank");
                    }else{
                      var newWin = window.open("","_blank");
                      if(url.val().substr(0,10).search("img") != -1 || url.val().substr(0,13).search("image") != -1){
                        newWin.document.write("<img src='" + k + "'/>");
                      }else if(url.val().substr(0,13).search("audio") != -1){
                        newWin.document.write("<audio src='" + k + "'/>");
                      }else if(url.val().substr(0,13).search("video") != -1){
                        newWin.document.write("<video src='" + k + "'/>");
                      }else{
                        newWin.document.write("<iframe src='" + k + "' frameBorder=0 width=100% height=100%>");
                      }
                    }
                  }else{
                    window.open(url.val(),"_blank");
                  }
                  window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                };
                if(window.ontouchstart){
                  window.ontouchstart = window.onmousedown;
                }
              });
          }else{
              alert("Error 404 - URL not found");
              window.location.replace("https://shortr.github.io");
          }
      });
  }
};