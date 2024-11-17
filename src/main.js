import { fetchImages } from './js/pixabay-api';
import { createImageMarkup } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
const perPage = 15;

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let lightbox = new SimpleLightbox('.gallery a');

iziToast.settings({
    position: 'topRight',
    timeout: 5000,
});

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();
    query = e.target.elements.searchQuery.value.trim();
    e.target.elements.searchQuery.value = '';
    if (!query) {
        iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
        return;
    }
    page = 1;
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('hidden');
    const endMessage = document.querySelector('.end-message');
    endMessage.classList.add('hidden');
    try {
        const { hits, totalHits } = await fetchImages(query, page, perPage);
        if (!hits.length) {
            iziToast.warning({ title: 'No Results', message: 'No images found.' });
            return;
        }
        gallery.innerHTML = createImageMarkup(hits);
        lightbox.refresh();
        iziToast.success({ title: 'Success', message: `Found ${totalHits} images!` });
        if (hits.length >= perPage) loadMoreBtn.classList.remove('hidden');
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong!' });
    }
}

async function onLoadMore() {
    page += 1;
    try {
        const { hits, totalHits } = await fetchImages(query, page, perPage);


        gallery.insertAdjacentHTML('beforeend', createImageMarkup(hits));
        lightbox.refresh();

        const totalLoaded = gallery.querySelectorAll('.photo-card').length;
        if (totalLoaded >= totalHits) {
            loadMoreBtn.classList.add('hidden');
            const endMessage = document.querySelector('.end-message');
            endMessage.classList.remove('hidden');
        }


        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to load more images.' });
    }
}
