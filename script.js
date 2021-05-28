var blogs_elements = document.getElementById('blogs')
var contact_elements = document.getElementById('contact')
var projects_elements = document.getElementById('projects')
var about_elements = document.getElementById('about')

var blogs_btn = document.getElementById('blogs_btn')
var contact_btn = document.getElementById('contact_btn')
var projects_btn = document.getElementById('projects_btn')
var about_btn = document.getElementById('about_btn')

var form_btn = document.getElementById('form')

document.getElementById('alert').style.display = "none"

// Blogs post fetcher

const Http = new XMLHttpRequest();
const url = 'https://yogeshwaran01-api.herokuapp.com/api/get';
Http.open("GET", url);
Http.send();

Http.onloadend = (e) => {
    var data = JSON.parse(Http.responseText)

    for (let index = 0; index < data.length; index++) {
        var element = data[index];
        var url_ = "/post?post=" + element.url
        var title_ = element.title
        var date_ = element.timestamp
        var ele_template = `<div class="card-body">
<a href="${url_}">
    <h2 class="card-title">${title_}</h2>
</a>
</div>
<div class="card-footer text-muted">
${date_}
</div>`
        var a = document.createElement('div')
        a.setAttribute('class', 'card mb-4')
        a.innerHTML = ele_template

        blogs_elements.appendChild(a)

    }

}


blogs_elements.style.display = "none"
contact_elements.style.display = "none"
projects_elements.style.display = "none"
about_elements.style.display = "block"

// Button Click enent Manager

blogs_btn.onclick = function() {
    blogs_elements.style.display = "block"
    contact_elements.style.display = "none"
    projects_elements.style.display = "none"
    about_elements.style.display = "none"
}

about_btn.onclick = function() {
    blogs_elements.style.display = "none"
    contact_elements.style.display = "none"
    projects_elements.style.display = "none"
    about_elements.style.display = "block"
}

projects_btn.onclick = function() {
    blogs_elements.style.display = "none"
    contact_elements.style.display = "none"
    projects_elements.style.display = "block"
    about_elements.style.display = "none"
    window.open("https://github.com/yogeshwaran01")
}

contact_btn.onclick = function() {
    blogs_elements.style.display = "none"
    contact_elements.style.display = "block"
    projects_elements.style.display = "none"
    about_elements.style.display = "none"
}

form_btn.onclick = function() {
    document.getElementById('alert').style.display = "block"
}

// Dark Mode

var theme_btn = document.getElementById('theme')

theme_btn.onclick = function() {
    document.body.classList.toggle("dark-mode")
    document.getElementById('name').classList.toggle("name-dark")
    eles = document.getElementsByClassName('card-body')
    for (let index = 0; index < eles.length; index++) {
        var element = eles[index];
        element.classList.toggle("dark-mode")

    }
    eles = document.getElementsByClassName('card-footer')
    for (let index = 0; index < eles.length; index++) {
        var element = eles[index];
        element.classList.toggle("dark-mode")

    }
    var txt = "🌜 Dark"
    if (!!this.dataset.clicked) {
        this.dataset.clicked = ""
    } else {
        this.dataset.clicked = "1";
        txt = "🌞 Light";
    }
    this.innerHTML = txt;
}