function getImgUrl(name) {
    if (!name) {
        // Fallback to a default image if name is not provided
        return new URL('../assets/books/default-book.png', import.meta.url);
    }
    return new URL(`../assets/books/${name}`, import.meta.url);
}

export { getImgUrl };