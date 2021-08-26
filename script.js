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

var skipable_repos = Array(
    "yogeshwaran01/yogeshwaran01.github.io",
    "yogeshwaran01/yogeshwaran01",
    "yogeshwaran01/bash-scripting-basics",
    "yogeshwaran01/Java-Learn",
    "yogeshwaran01/python-markdown-maker",
    "yogeshwaran01/telebot",
    "yogeshwaran01/website",
)


async function githubRepos() {
    let repos = Array()
    let api = "https://api.github.com/users/yogeshwaran01/repos"
    await fetch(api)
        .then(res => res.json())
        .then(data => {
            data
                .filter(ele => {
                    return !ele.fork
                })
                .filter(ele => {
                    return !skipable_repos.includes(ele.full_name)
                })
                .forEach(element => {
                    var repo_name = element.full_name
                    var url = `https://github-readme-stats.vercel.app/api/pin/?username=${repo_name.split("/")[0]}&repo=${repo_name.split("/")[1]}&theme=chartreuse-dark`
                    repos.push({
                        "image": url,
                        "link": "https://github.com/" + repo_name
                    })
                });
        })

    return repos
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

githubRepos()
    .then(data => {
        let string = ""
        data.forEach(d => {
            var img = `<div class="col s6">
            <a href="${d.link}"><img class="responsive-img" alt=Repo src="${d.image}"></a></div>`
            string += img
        })
        document.getElementById('caro').innerHTML = string

    })

let modols = Array()

getBlogs()
    .then(data => {
        let string = ""

        data[0].forEach(d => {
            var temp = `<div class="col s12">
                <div class="card light-green">
                    <div class="card-content">
                        <a class="card-title" href="/post?post=${d.url}" id="${d.id}btn">${d.title}</a>
                    </div>
                    <div class="card-action">
                        <span class="ts">${d.timestamp}</span>
                    </div>
                </div>
            </div>
            `
            string += temp
            modols.push(`${d.id}`)
        })

        document.getElementById('blog').innerHTML = string
        document.getElementById('loading').setAttribute("hidden", true)
    })


document.getElementById('submit').onclick = async() => {
    var token = "1960582858:AAFhO8IiZaONEIHde3X8jDRZParbS18t6aA"
    var api_link = `https://api.telegram.org/bot${token}/sendMessage`
    var chat_id_string = "1047531822"

    var string = `
        Name: ${document.getElementById('name').value}
    
Email-id: ${document.getElementById('email').value}
    
Message: 
            ${document.getElementById("textarea").value}
        `

    await fetch(api_link, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chat_id_string,
            text: string
        })
    })

    M.toast({ html: '<p>Message sented Sucessfully</p>' })

}