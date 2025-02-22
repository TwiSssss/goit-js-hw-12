import axios from "axios";

const API_KEY = "48857458-08a5976c2d7ede66ca4c44a57";
const BASE_URL = "https://pixabay.com/api/";
const perPage = 40;

export const getImages = (wordKey, page = 1) => {
    return axios
        .get(BASE_URL, {
            params: {
                key: API_KEY,
                q: wordKey,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: perPage,
                page: page,
            },
        })
        .then((response) => {
            return {
                images: response.data.hits,
                totalHits: response.data.totalHits,
            };
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
};
