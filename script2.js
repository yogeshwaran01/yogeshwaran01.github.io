var query = new URLSearchParams(document.location.search).get('post')

const Http = new XMLHttpRequest();

const url = "https://yogeshwaran01-api.herokuapp.com/api/get";
Http.open("GET", url);
Http.send();

var spinner = document.getElementById('spinner')
var lister = document.getElementById('lister')

Http.onloadend = (e) => {
    var data = JSON.parse(Http.responseText);

    for (let index = 0; index < data.length; index++) {

        var element = data[index];
        var url_ = "/post?post=" + element.url
        var title_ = element.title
        var a = document.createElement('li')
        a.setAttribute('class', 'list-group-item')
        var temp_ele = `<a href="${url_}" style="text-decoration: none;">${title_}</a>`
        a.innerHTML = temp_ele
        lister.appendChild(a)

        if (element.url == query) {
            var requried_body = element;
            document.title = requried_body.title;
            var content = requried_body.body;
            var t = `<h2 class="blog-post-title" id="t">${requried_body.title}</h2>`
            var d = `<p class="blog-post-meta" id="d">${requried_body.timestamp}</p>`
            spinner.classList.add('visually-hidden')
            document.getElementById('art').innerHTML = t + d + content;
        } else {
            continue;
        }
    }
};

// Dark Mode

var theme_btn = document.getElementById('theme')

theme_btn.onclick = function() {
    document.body.classList.toggle("dark-mode")
    document.getElementById('name').classList.toggle("name-dark")
    eles = document.getElementsByClassName('list-group-item')
    for (let index = 0; index < eles.length; index++) {
        var element = eles[index];
        element.classList.toggle("dark-mode-card")

    }
    // eles = document.getElementsByClassName('card-footer')
    // for (let index = 0; index < eles.length; index++) {
    //     var element = eles[index];
    //     element.classList.toggle("dark-mode")

    // }
    var txt = "🌜 Dark"
    if (!!this.dataset.clicked) {
        this.dataset.clicked = ""
    } else {
        this.dataset.clicked = "1";
        txt = "🌞 Light";
    }
    this.innerHTML = txt;
}