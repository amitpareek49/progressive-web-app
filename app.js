`use strict`

fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5a1e3883c629428f86afbdd386446694').then(response => {
  if (response.status === 200) {
    response.json().then(function (matches) {
      let matches_div = '';
      for (let index in matches.articles) {
         if (matches.articles[index]['urlToImage'] != null && matches.articles[index]['urlToImage'] != undefined 
           && matches.articles[index]['urlToImage'].substring(0, 5) ==='https'){     
            matches_div += `<div class="demo-card">
                  <div class="image-card">
                      <img src="${matches.articles[index]['urlToImage']}" class="image">
                  </div>
                  <div>
                    <h4>
                      <a href="${matches.articles[index]['url']}" target="#"> ${matches.articles[index]['title']} </a>
                    </h>
                  </div>
                  <div>
                      <p> ${matches.articles[index]['description']} </p>
                  </div>
                  <div>
                  </div>
                </div>
              </div>`;
      }
    }
      document.getElementById('upcoming_matches').innerHTML = matches_div;
    });
  }
})