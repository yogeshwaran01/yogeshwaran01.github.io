var query = window.location.href.split("/")[4];
console.log(query)
const Http = new XMLHttpRequest();

const url = "https://yogeshwaran01-api.herokuapp.com/api/get";
Http.open("GET", url);
Http.send();



Http.onloadend = (e) => {
    var data = JSON.parse(Http.responseText);

    for (let index = 0; index < data.length; index++) {
        var element = data[index];
        if (element.url == query) {
            var requried_body = element;
            document.title = requried_body.title;
            var content = requried_body.body;

            document.body.innerHTML = content;
        } else {
            continue;
        }
    }
};