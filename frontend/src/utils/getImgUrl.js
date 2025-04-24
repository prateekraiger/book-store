const bookImages = import.meta.glob('../assets/books/*', { eager: true, import: 'default' });
const defaultImg = bookImages['../assets/books/default-book.png'] || '';

function getImgUrl(name) {
    if (!name) {
        console.log('No name provided, using default image');
        return defaultImg;
    }
    // Try to find the image by filename
    const match = Object.entries(bookImages).find(([path]) => path.endsWith(`/${name}`));
    const result = match ? match[1] : defaultImg;
    console.log('getImgUrl:', name, '=>', result);
    return result;
}

export { getImgUrl };