// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
import {play} from './music.js';
import convertToRoman from './roman.js';
import { restartAnimation } from './restart-animation.js';
import { friendlyFetch } from './friendly-fetch.js';

const API_ENDPOINT = 'https://swapi.dev/api';

const audioUrl = 'audio/tema-sw.mp3';
const coverImageUrl ='imgs/logo.svg';
const title ='Intro';
const artist ='John Williams';

play({audioUrl, coverImageUrl, title, artist}, document.body);

// const filmesRaw = await fetch(API_ENDPOINT + '/films'); // No friendlyFetch
// const filmes = (await filmesRaw.json()).results; // No friendlyFetch
const filmesRaw = await friendlyFetch(API_ENDPOINT + '/films');
const filmes = filmesRaw.results
console.log(filmes);

const filmesListaEl = document.querySelector('#filmes ul');
const textoAmareloEl = document.querySelector('pre.introducao');
console.log(filmesListaEl);
filmesListaEl.innerHTML = '';

filmes.sort((a,b) => a.episode_id - b.episode_id).forEach(f => {
    var node = document.createElement('li');
    node.innerHTML = `Episode ${(convertToRoman(f.episode_id)).padEnd(4)} - ${f.title}`;
    filmesListaEl.appendChild(node);
    node.addEventListener('click', () => {
        textoAmareloEl.innerHTML = f.opening_crawl;

        restartAnimation(textoAmareloEl)
    });
});
