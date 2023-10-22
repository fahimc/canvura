import superagent from 'superagent';
import secretsJson from '../secrets.json' assert { type: 'json' };
import { get } from 'https';
import { createWriteStream, rmSync, mkdirSync, writeFileSync } from 'fs';

const imageSearches = ['background', 'beach'];
let searchIndex = 0;
rmSync('public/assets/background-images', { recursive: true, force: true });
mkdirSync('public/assets/background-images');

const imageJson = [];
let count = 0;
async function getImageBySearch(index) {
    const searchTerm = imageSearches[index];
    if (!searchTerm) {
        return;
    }

    const response = await superagent.get(
        `https://pixabay.com/api/?key=${secretsJson.pixabayKey}&q=${searchTerm}&image_type=photo`,
    );
    //save images
    const responseJson = JSON.parse(response.text);
    responseJson.hits.forEach((hit) => {
        const fileName = hit.webformatURL.substr(hit.webformatURL.lastIndexOf('/') + 1);
        const file = createWriteStream(`public/assets/background-images/${fileName}`);
        get(hit.webformatURL, (imageResponse) => {
            imageResponse.pipe(file);
            count++;
            file.on('finish', () => {
                count--;
                file.close();
                console.log(`Image downloaded as ${hit.id}`);
                imageJson.push({ _id: hit.id, img: `public/assets/background-images/${fileName}` });
                if (count <= 0) writeFileSync('src/generated/images.json', JSON.stringify(imageJson, null, 2), 'utf-8');
            });
        }).on('error', (err) => {
            fs.unlink(hit.id);
            console.error(`Error downloading image: ${err.message}`);
        });
    });
    searchIndex = searchIndex + 1;
    await getImageBySearch(searchIndex);
}
(async function () {
    await getImageBySearch(searchIndex);
})();
