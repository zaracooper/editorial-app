function checkForArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        getArticle(articleId);
    } else {
        showMissingArticleMsg("An article can't be retrieved without an ID.");
    }
}

function getArticle(id) {
    const articleReq = new Request(`http://localhost:1337/articles/${id}`);

    fetch(articleReq)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(article => {
            displayArticle(article);
        })
        .catch(err => {
            showMissingArticleMsg(err);
        });
}

function displayArticle(article) {
    document.getElementById("article-img").src = `http://localhost:1337${article.cover_image.url}`;

    document.getElementById("article-title").innerHTML = article.title;

    document.getElementById("article-description").innerHTML = article.description;

    document.getElementById("published_date").innerHTML = (new Date(article.published_at)).toDateString();

    let articleTags = document.getElementById("article-tags");

    let tag;

    article.tags.forEach(tg => {
        if (tg.name) {
            tag = document.createElement("span")
            tag.classList.add("article-tag");
            tag.innerHTML = tg.name;

            articleTags.appendChild(tag);
        }
    });

    document.getElementById("article-content").innerHTML = window.showdown.Converter().makeHtml(article.content);

    document.getElementById("article-cont").style = "display: flex;";
}

function showMissingArticleMsg(msg) {
    document.getElementById("not-found").style = "display: flex;";
    document.getElementById("err-msg").innerHTML = msg;
}

checkForArticle();