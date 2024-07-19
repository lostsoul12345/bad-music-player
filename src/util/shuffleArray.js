function shuffleArray(array) {
    if(!Array.isArray(array)){
        return [];
    }
    const result = Array.from(array);
    let currentIndex = result.length;

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [result[currentIndex], result[randomIndex]] = [
            result[randomIndex], result[currentIndex]];
    }

    return result;
}

export default shuffleArray