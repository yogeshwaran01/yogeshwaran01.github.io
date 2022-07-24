const api = "https://knffye.deta.dev/api"

document.addEventListener('DOMContentLoaded', async () => {
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems);
    
    await fetch(api + "/visit")
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
    "yogeshwaran01/telebot",
    "yogeshwaran01/website",
    "yogeshwaran01/js",
    "yogeshwaran01/dotfiles",
    "yogeshwaran01/learn-express.ts",
    "yogeshwaran01/weather_app"
)


async function githubRepos() {

    // Function fetch all github repos

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

let fetchBlogs = async () => {
    // Function fetch all github blogs
    const response = await fetch(api + "/blogs")
    return await response.json()
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

fetchBlogs()
    .then(data => {
        let string = ""

        data.forEach(d => {
            var temp = `<div class="col s12">
                <div class="card z-depth-5 light-green">
                    <div class="card-content">
                        <a class="card-title" href="${d.canonical_url}" id="${d.id}btn">${d.title}</a>
                        <span class="new badge black" data-badge-caption="👀">${d.page_views_count}</span>
                        <span class="new badge black" data-badge-caption="❤️">${d.public_reactions_count}</span>
                    </div>
                    <div class="card-action">
                        <span class="ts">${d.published_at}</span>
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

    await fetch(api + '/contact', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            mail: document.getElementById('email').value,
            message: document.getElementById('textarea').value
        })
    })

    M.toast({ html: '<p>Message sented Sucessfully</p>' })

}
