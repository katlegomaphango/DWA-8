import { html } from "./data.js"

/**
 * populates a drop down list
 * 
 * @param {HTMLElement} DropDownElement 
 * @param {string} DropDownName
 * @param {object} dataObject 
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

export const updateShowMoreBtn = (bookArray, page, minBooks, booksPerPage) => {
    html.list.button.innerText = `Show more (${bookArray.length - (page * booksPerPage)})`
    html.list.button.disabled = (bookArray.length - (page * booksPerPage)) < minBooks

    html.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(bookArray.length - (page * booksPerPage)) > 0 ? (bookArray.length - (page * booksPerPage)) : 0})</span>
    `
}