/**
 * 
 * @param {Event} event 
 * @returns {Node}
 */
export const findBookNode = (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let activeNode = null

    for (const node of pathArray) {
        if (activeNode) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            activeNode = result
        }
    }
    return activeNode
}

/**
 * 
 * @param {object} filters 
 * @param {object} books 
 * @returns {Array}
 */
export const filterBookArray = (filters, books) => {
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    return result
}

/**
 * An object with the theme setting for day and night
 */
const themeObj = {
    day: {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    night: {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
}

/**
 * Function that sets the app theme property
 * @param {string} theme - string theme you want to set
 */
export const setThemeProperty = (theme) => {
    if(theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', themeObj.night.dark);
        document.documentElement.style.setProperty('--color-light', themeObj.night.light);
    } else {
        document.documentElement.style.setProperty('--color-dark', themeObj.day.dark);
        document.documentElement.style.setProperty('--color-light', themeObj.day.light);
    }
}