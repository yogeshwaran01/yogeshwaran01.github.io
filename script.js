const params = new URLSearchParams(document.location.search);

var _id = params.get("id");
var url = "https://yogeshwaran01.herokuapp.com/post?id=" + _id;
var content = "0; URL=" + url;

var meta = document.createElement("meta");
meta.setAttribute("http-equiv", "refresh");
meta.setAttribute("content", content);

document.getElementsByTagName("head")[0].appendChild(meta);

var link = document.createElement("link");
link.setAttribute("rel", "cononical");
link.setAttribute("href", url);

document.getElementsByTagName("head")[0].appendChild(link);
