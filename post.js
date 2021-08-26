var url_params = new URLSearchParams(document.location.search)
var query = url_params.get('post')

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems);
});

var dkt = document.getElementById('dkt')

dkt.onclick = () => {
    document.body.classList.toggle('dark-mode')


    let fnit = document.getElementById('fnit')

    var txt = "brightness_3"
    if (!!dkt.dataset.clicked) {
        dkt.dataset.clicked = ""
    } else {
        dkt.dataset.clicked = "1";
        txt = "wb_sunny";
    }
    fnit.innerHTML = txt;

}

async function getBlogs() {
    let blogs = Array()
    await fetch("https://yogeshwaran01-api.herokuapp.com/api/get")
        .then(res => res.json())
        .then(data => {
            blogs.push(data)
        })
    return blogs
}

getBlogs()
    .then(data => {
        console.log(data)
        let r = data[0].filter(d => {
            return d.url == query
        })[0]
        if (r == undefined) {
            document.getElementById('head').innerHTML = "404"
            document.getElementById('body').innerHTML = "404"
        } else {
            document.getElementById('head').innerHTML = r.title
            document.getElementById('body').innerHTML = r.body
            document.getElementById('ts').innerHTML = r.timestamp
        }

        document.getElementById('loading').setAttribute("hidden", true)

        var h = document.getElementsByTagName('p');
        for (var i = 0; i < h.length; i++) {
            if (h[i].classList.length === 0) {
                h[i].classList.add("flow-text");
            }
        }

        hljs.highlightAll()

    })