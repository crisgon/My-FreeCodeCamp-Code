(function(win, doc){
  'use strict';

const $ = document.querySelector.bind(document);
const $url = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&namespace=0&limit=50&search=";
const $input_search = $('.input-search');
const $button_search = $('.button-search');
const $result_list =  $('.results');
let resultsFormated;

function app() {
  return {
    init() {
      $button_search.addEventListener('click', async function(event){
        event.preventDefault();
        let results = await startSearch($input_search.value);
        await createHTML(formatResults(results));
      });
    }
  };

  async function startSearch(nameSearch){
    return await fetch($url + nameSearch).then(response => response.json());
  }
  
  function formatResults(results) {
    resultsFormated = [];
    for (let index = 0; index < results.length; index++) {
      resultsFormated.push({
        title: results[1][index],
        resume: results[2][index],
        link: results[3][index],
      })
    }
    return resultsFormated;
  }
  
  function createHTML(resultsFormated) {
    $result_list.innerHTML = '';
    let html = resultsFormated.map(function(item){
      return `<a href="${item.link}" target="_blank">
                <li class="result-card"> 
                  <h2>${item.title}</h2>
                  <p>${item.resume}</p>
                </li>
             </a>`;
    }).join('');
    $result_list.innerHTML += html;
  }
}
app().init();
}(window, document));
