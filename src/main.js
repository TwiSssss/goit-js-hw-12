import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from "./js/pixabay-api";
import { photosTemplate } from "./js/render-functions";

let lightbox = new SimpleLightbox(".gallery-item a", {
    captionsData: "alt",
    captionDelay: 250,
});

const refs = {
    gallery: document.querySelector(".gallery"),
    searchMenu: document.querySelector(".search-menu"),
    searchBtn: document.querySelector(".search-btn"),
    searchInput: document.querySelector(".search-input"),
    loader: document.querySelector(".loader"),
    btnLoadMore: document.querySelector(".btn-load"),
};

const params = {
    query: "",
    page: 1,
    total: 0,
    perPage: 40,
};

refs.searchMenu.addEventListener("submit", async (event) => {
    event.preventDefault();
    const wordKey = refs.searchInput.value.trim();
    params.page = 1;
    if (!wordKey) {
        return;
    }
    params.query = wordKey;
    refs.gallery.innerHTML = "";
    refs.searchInput.value = "";
    refs.loader.style.display = "inline-block";
    try {
        const result = await getImages(wordKey, params.page);
        params.total = result.totalHits;
        if (result.images.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            refs.gallery.innerHTML = "";
        } else {
            refs.gallery.innerHTML = photosTemplate(result.images);
            lightbox.refresh();
            checkBtnStatus();
        }
    } catch (err) {
        console.error(err);
        refs.gallery.innerHTML = "";
    } finally {
        refs.loader.style.display = "none";
    }
});

refs.btnLoadMore.addEventListener("click", async () => {
    const wordKey = params.query;
    params.page += 1;
    hideLoadMoreBtn();
    refs.loader.style.display = "inline-block";
    try {
        const result = await getImages(wordKey, params.page);
        params.total = result.totalHits;
        const markup = photosTemplate(result.images);
        refs.gallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();
        window.scrollBy({
            top: 650,
            left: 100,
            behavior: "smooth",
        });
    } catch (err) {
        console.error(err);
    } finally {
        refs.loader.style.display = "none";
        checkBtnStatus();
    }
});

function showLoadMoreBtn() {
    refs.btnLoadMore.style.display = "block";
}

function hideLoadMoreBtn() {
    refs.btnLoadMore.style.display = "none";
}

function checkBtnStatus() {
    const perPage = 40;
    const total = params.total;
    const maxPage = Math.ceil(total / perPage);
    if (params.page >= maxPage) {
        hideLoadMoreBtn();
        iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: "topRight",
        });
    } else {
        showLoadMoreBtn();
    }
}
