import { books, authors, genres, BOOKS_PER_PAGE, html } from './modules/data.js'
import { populateDropDown, createBookPreview, updateShowMoreBtn } from './modules/updateHtml.js'
import { findBookNode, filterBookArray, setThemeProperty } from './modules/helpers.js';

let page = 1;
let matches = books

html.list.items.appendChild(createBookPreview(matches, authors))

populateDropDown(html.search.genres, 'Genres', genres)
populateDropDown(html.search.authors, 'Authors', authors)

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.theme.settings_theme.value = 'night'
    setThemeProperty('night')
} else {
    html.theme.settings_theme.value = 'day'
    setThemeProperty('day')
}

updateShowMoreBtn(matches,page)
page += 1


html.search.cancel.addEventListener('click', () => {
    html.search.overlay.open = false
})

html.theme.settings_cancel.addEventListener('click', () => {
    html.theme.overlay.open = false
})

html.search.search.addEventListener('click', () => {
    html.search.overlay.open = true 
    html.search.title.focus()
})

html.theme.settings_header.addEventListener('click', () => {
    html.theme.overlay.open = true 
})

html.summary.close.addEventListener('click', () => {
    html.summary.active.open = false
})

html.theme.settings_form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    setThemeProperty(theme)
    
    html.theme.overlay.open = false
})

html.search.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)

    page = 1;
    matches = filterBookArray(filters, matches)

    if (matches.length < 1) {
        html.list.message.classList.add('list__message_show')
    } else {
        html.list.message.classList.remove('list__message_show')
    }

    html.list.items.innerHTML = ''

    html.list.items.appendChild(createBookPreview(matches.slice(0, BOOKS_PER_PAGE), authors))

    updateShowMoreBtn(matches, page)

    window.scrollTo({top: 0, behavior: 'smooth'});
    html.search.overlay.open = false
})

html.list.button.addEventListener('click', () => {
    const extracted = matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)

    html.list.button.innerText = `Show more (${extracted.length})`

    html.list.items.appendChild(createBookPreview(extracted))
})

const bookSummaryHandler = (event) => {
    let active = findBookNode(event)
    
    if (active) {
        html.summary.active.open = true
        html.summary.blur.src = active.image
        html.summary.image.src = active.image
        html.summary.title.innerText = active.title
        html.summary.subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        html.summary.description.innerText = active.description
    }
}

html.list.items.addEventListener('click', bookSummaryHandler)