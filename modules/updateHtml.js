import { html, BOOKS_PER_PAGE } from "./data.js"

/**
 * populates a drop down list
 * 
 * @param {HTMLElement} DropDownElement - Html element you append the drop down to
 * @param {string} DropDownName 
 * @param {object} dataObject - The object will all the data you want to add to the drop down
 */
export const populateDropDown = (DropDownElement, DropDownName, dataObject) => {
    const generateHtml = document.createDocumentFragment()
    const firstElement = document.createElement('option')
    firstElement.value = 'any'
    firstElement.innerText = `All ${DropDownName}`
    generateHtml.appendChild(firstElement)

    for (const [id, name] of Object.entries(dataObject)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        generateHtml.appendChild(element)
    }

    DropDownElement.appendChild(generateHtml)
}

/**
 * Creates a book preview fragment
 * @param {Array} itemsArray - An array of books
 * @param {Object} authorsObj - Authors Object
 * @returns {DocumentFragment}
 */
export const createBookPreview = (itemsArray, authorsObj) => {
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of itemsArray) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authorsObj[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    return newItems
}

/**
 * 
 * @param {Array} bookArray 
 * @param {Number} page 
 */
export const updateShowMoreBtn = (bookArray, page) => {
    html.list.button.innerText = `Show more (${bookArray.length - (page * BOOKS_PER_PAGE)})`
    html.list.button.disabled = (bookArray.length - (page * BOOKS_PER_PAGE)) < 1

    html.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(bookArray.length - (page * BOOKS_PER_PAGE)) > 0 ? (bookArray.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `
}