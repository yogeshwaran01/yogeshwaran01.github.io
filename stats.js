const params = new URLSearchParams(document.location.search);

var username = params.get("username")
var _id = params.get("theme");
var url = `https://github-stats-terminal-style.herokuapp.com/${username}?theme=${_id}`
var content = "0; URL=" + url;

var meta = document.createElement("meta");
meta.setAttribute("http-equiv", "refresh");
meta.setAttribute("content", content);

document.getElementsByTagName("head")[0].appendChild(meta);

var link = document.createElement("link");
link.setAttribute("rel", "cononical");
link.setAttribute("href", url);

document.getElementsByTagName("head")[0].appendChild(link);
