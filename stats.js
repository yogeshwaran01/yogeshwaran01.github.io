const params = new URLSearchParams(document.location.search);

var username = params.get("username")
var _id = params.get("theme");
var url = `https://github-stats-terminal-style.herokuapp.com/${username}?theme=${_id}`

document.title = username

// var content = "0; URL=" + url;

// var meta = document.createElement("meta");
// meta.setAttribute("http-equiv", "refresh");
// meta.setAttribute("content", content);

// document.getElementsByTagName("head")[0].appendChild(meta);

// var link = document.createElement("link");
// link.setAttribute("rel", "cononical");
// link.setAttribute("href", url);

// document.getElementsByTagName("head")[0].appendChild(link);

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.body.innerHTML = xhttp.responseText

    }
};
xhttp.open("GET", url);
xhttp.send();
