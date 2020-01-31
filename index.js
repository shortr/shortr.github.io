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

  var version = "2.1.4";
  var v = document.getElementById("version");
  v.innerText = "v. " + version;

  var linksh = document.getElementById("mainlink");
  var bu = document.getElementById("submit");
  var displaytext = document.getElementById("redirlink");

  var randChars = "abcdefghijklmnopqrstuvwxyz";
  var randChars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randChars3 = "1234567890";

  function conv(num){
    var nn = num;
    var nn2 = nn;
    var rep = true;
    var string = ""; //string of shortlink
    var l = 0; //length of string

    var max = (randChars.length * randChars2.length * randChars3.length - 1);

    while (rep==true){
      if(nn2 >= max){
        nn = nn2;
        nn2 = nn - max;
        nn = max;
      }else{
        nn = nn2;
        rep = false;
      }
      if(Math.floor((nn/(randChars2.length * randChars.length))-1 >= 0)){
        string = string + randChars3[Math.floor(nn/(randChars2.length*randChars.length))-1];
      }
      nn = nn % (randChars2.length * randChars.length);
      if(Math.floor(nn/randChars2.length)-1 >= 0){
        string = string + randChars2[Math.floor(nn/randChars2.length)-1];
      }
      nn = nn % randChars2.length;
      if(nn - 1 >= 0){
        string = string + randChars[nn - 1];
      }
      if(rep == true){
        //nope
      }else{
        ref.child(string).set(linksh.value,function(err){
          if(err){
            // try again.
            console.log("Error occured. Retrying.");
            conv(num + 1);
            displaytext.innerHTML = "<p>There was an error. Please wait as we try again. This is probably because I put more characters into the shortening process.</p>"
          }
        });
        let clink = linksh.value;
        if(linksh.value.length >= 60){
          clink = linksh.value.substr(0,60) + "...";
        }
        displaytext.innerHTML = "<p>Success! Your link leads to " + clink.replace(/</gm,"&lt;").replace(/>/gm,"&gt;") + ":<br><a href=\"https://shortr.github.io/?" + string + "\">https://shortr.github.io/?" + string + "</a></p>";
      }
    }
  }

  function send(){
    displaytext.innerHTML = "<p>Loading... (0%)</p>";
    var n = 0;
    let x= new XMLHttpRequest();
    x.open("GET","https://rickroll-4b28d.firebaseio.com/.json");
    x.send();
    x.onload = function() {
      n = Object.keys(JSON.parse(x.response)).length;
      var l = JSON.parse(x.response);
      var exists = false;
      for(var i in l){
        if(l[i] === linksh.value){
          let clink = linksh.value;
          if(linksh.value.length >= 60){
            clink = linksh.value.substr(0,60) + "...";
          }
          displaytext.innerHTML = "<p>Success! Your link leads to " + clink.replace(/</gm,"&lt;").replace(/>/gm,"&gt;") + ":<br><a href=\"https://shortr.github.io/?" + i + "\">https://shortr.github.io/?" + i + "</a></p>";
          exists = true;
          break;
        }
      }
      if(exists === false){
        console.log(n + 1);
        conv(n + 1);
      }
    };
    x.onprogress = function(e) {
      displaytext.innerHTML = `<p>Loading... (${((e.loaded/e.total)*100).toFixed(1)}%)</p>`;
    };
  };

  linksh.addEventListener("keydown",e=>{
    if(e.key == "Enter"){
      send();
    }
  });

  if(location.pathname.search("tips") != -1 && !location.search){
    location.search = "llorkcir";
  }

  bu.onclick = send;

  if(!location.href.split("?")[1]){
    //donothing
    document.getElementById("con").style.display = "block";
  }else{
    //redirect
    var hi = window.location.href.split("?");
    delete hi[0];
    hi = hi.join().replace(/,/img,"");
    //faster loading
    ref.child(hi).once("value",function(url){
      if(url.val() !== null){
        var k = url.val().replace(/"/,"%22");
        k = url.val().replace(/'/,"%27");
        document.write("<h1>Click the window to continue to your link</h1>");
        document.write("<h4>if it doesn't work, click this link: " + "<a href=\"" + encodeURIComponent(k) + "\" target=\"_blank\" onclick=\"window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')\">" + "Click Me!" + "</a></h4><textarea width=\"100%\" style=\"width: 100%\">"+k+"</textarea>");
        getScreenshot(url.val());
        window.onmousedown = function(){
          if(url.val().substr(0,20).search("://") == -1){
            if(url.val().search("data:") == -1){
              // if not even a url at all
              if(url.val().search("\\.") == -1){
                var w = window.open("about:blank","_blank");
                w.document.write(url.val());
                return;
              }
              window.open("https://" + url.val(),"_blank");
            }else{
              // if was a data: thing
              var newWin = window.open("about:blank","_blank");
              if(url.val().substr(0,15).search("img") != -1 || url.val().substr(0,13).search("image") != -1){
                newWin.document.write("<img src='" + k + "'/>");
              }else if(url.val().substr(0,15).search("audio") != -1){
                newWin.document.write("<audio src='" + k + "'/>");
              }else if(url.val().substr(0,15).search("video") != -1){
                newWin.document.write("<video src='" + k + "'/>");
              }else if(url.val().substr(0,20).search("html") != -1){
                try{
                  newWin.document.write(atob(url.val().split(",").slice(1).join(",")));
                }catch(err){
                  newWin.document.write(url.val().split(",").slice(1).join(","));
                }
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
      }else{
        alert("Error 404 - URL not found");
        window.location.replace("https://shortr.github.io");
      }
    });
  }
  function getScreenshot(url){
    var img;
    const te = document.createElement("p");
    te.innerHTML = "Basic render of url:";
    document.body.append(te);
    if(url.substr(0,20).search("://") == -1){ // might be data url
      if(url.substr(0,20).search("image") != -1){ // image
        img = new Image();
        img.width = Math.ceil(window.innerWidth / 1.5);
        img.src = url;
      }else{ // assume html
        let g = url.split(",").slice(1).join(",");
        try{
          g = atob(g);
        }catch(e){
          // nothing
        }
        img = renderPreview(g);
      }
    }else if(url.search("\\.") == -1){ // just text
      // append
      img = document.createElement("p");
      img.innerHTML = url.replace(/</gm,"&lt;").replace(/>/gm,"&gt;");
      document.body.append(te,img);
    }else{ // url
      const x = new XMLHttpRequest();
      x.open("GET",`https://cors-anywhere.herokuapp.com/${url}`);
      x.send();
      x.onprogress = function(e){
        if(e.total > 2e+6){ // bigger than 2 mb
          x.abort();
        }
      };
      x.onload = function(){
        const cot = x.getResponseHeader("Content-Type");
        if(cot.search("image") != -1){ // is an image
          img = new Image();
          img.width = Math.ceil(window.innerWidth / 1.5);
          img.src = url;
        }else{
          // render by putting html into document... (remove scripts and stuff)
          img = renderPreview(x.responseText);
        }
      };
    }
  }
  function renderPreview(html){
    const t = document.createElement("template");
    t.innerHTML = html;
    let img = t.content.cloneNode(true);
    img.querySelectorAll("script,iframe,audio,video").forEach(o=>{o.innerHTML = "";if(o.href){o.href="";}if(o.src){o.src="";}});
    img.querySelectorAll("[onload],[onerror],[onmouseover],[onmousedown],[onmouseup],[onkeydown],[onkeypress],[onkeyup],[ontouchstart],[ontouchend],[onmousemove],[onscroll]").forEach(o=>{
      function a(){}
      o.onload = o.onerror = o.onmouseover = o.onmousedown = o.onmouseup = o.onkeydown = o.onkeypress = o.onkeyup = o.ontouchstart = o.ontouchend = o.onmousemove = o.onscroll = a;
    });
    const fr = document.createElement("iframe");
    document.body.append(fr);
    const div = document.createElement("div");
    div.append(img);
    setTimeout(function(){
      fr.contentDocument.body.append(div);
    },1000);
    div.style = `overflow: hidden; height: 100%;`;
    fr.style = `width: 100%; height:${window.innerHeight / 1.5}px;`;
    return document.body.append(fr);
  }
};
