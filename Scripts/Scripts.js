// ---------- Configuración de la API ----------
const API_URL = "https://www.googleapis.com/books/v1/volumes";

// ---------- Referencias a elementos del DOM ----------
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const loadingElement = document.getElementById("loading");
const noResultsElement = document.getElementById("noResults");
const filterButtons = document.querySelectorAll(".filter-btn");

const myBooksSection = document.getElementById("myBooksSection");
const myBooksList = document.getElementById("myBooksList");

// Estado actual
let currentFilter = "all";
let myBooks = [];

// ---------- Inicialización ----------
document.addEventListener("DOMContentLoaded", () => {
    // Cargar libros guardados del localStorage
    loadMyBooksFromStorage();

    // Buscar cuando se haga clic en el botón
    searchBtn.addEventListener("click", handleSearch);

    // Buscar cuando se pulse Enter en el input
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    // Filtros por categoría
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Quitar clase "active" de todos y ponerla al pulsado
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentFilter = btn.dataset.filter;
            handleSearch(); // Reaplicar la búsqueda con el nuevo filtro
        });
    });
});

// ---------- Lógica principal de búsqueda ----------
async function handleSearch() {
    // Si no hay query, usar una búsqueda por defecto
    let query = searchInput.value.trim();
    if (!query) {
        query = "books"; // Búsqueda por defecto: libros populares
    }

    showLoading(true);
    showNoResults(false);
    clearResults();

    try {
        const books = await fetchBooksFromAPI(query, currentFilter);

        showLoading(false);

        if (!books || books.length === 0) {
            showNoResults(true);
            return;
        }

        renderBooks(books);
    } catch (error) {
        console.error("Error al buscar libros:", error);
        showLoading(false);
        showNoResults(true);
        noResultsElement.innerHTML = "<p>⚠️ Ha ocurrido un error al buscar libros. Inténtalo de nuevo más tarde.</p>";
    }
}

// ---------- Llamada a la API de Google Books ----------
async function fetchBooksFromAPI(query, filter) {
    // Añadimos un pequeño refinamiento según el filtro
    let finalQuery = query;

    const filterMap = {
        fiction: "subject:fiction",
        science: "subject:science",
        history: "subject:history",
        fantasy: "subject:fantasy"
    };

    if (filter !== "all" && filterMap[filter]) {
        finalQuery += ` ${filterMap[filter]}`;
    }

    const url = `${API_URL}?q=${encodeURIComponent(finalQuery)}&maxResults=20&langRestrict=es`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Respuesta no válida de la API");
    }

    const data = await response.json();

    if (!data.items) {
        return [];
    }

    // Transformamos los datos de la API al formato que usa nuestra app
    const books = data.items.map((item, index) => {
        const info = item.volumeInfo || {};
        const imageLinks = info.imageLinks || {};
        const categories = info.categories || [];

        return {
            id: item.id || index,
            title: info.title || "Sin título",
            author: (info.authors && info.authors.join(", ")) || "Autor desconocido",
            year: info.publishedDate ? info.publishedDate.slice(0, 4) : "—",
            category: inferCategory(categories),
            description: info.description || "Sin descripción disponible.",
            thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || ""
        };
    });

    return books;
}

// ---------- Inferir categoría a partir de los temas ----------
function inferCategory(categoriesArray) {
    if (!categoriesArray || categoriesArray.length === 0) return "others";

    const text = categoriesArray.join(" ").toLowerCase();

    if (text.includes("fantasy")) return "fantasy";
    if (text.includes("fiction") || text.includes("novela")) return "fiction";
    if (text.includes("history") || text.includes("historia")) return "history";
    if (text.includes("science") || text.includes("ciencia")) return "science";

    return "others";
}

// ---------- Funciones de UI ----------
function renderBooks(bookList) {
    clearResults();

    bookList.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
            <div class="book-card-inner">
                ${book.thumbnail ? `<img class="book-cover" src="${book.thumbnail}" alt="Portada de ${book.title}">` : ""}
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p><strong>Autor:</strong> ${book.author}</p>
                    <p><strong>Año:</strong> ${book.year}</p>
                    <p><strong>Categoría:</strong> ${mapCategory(book.category)}</p>
                    <p class="book-description">${book.description}</p>
                    <button class="add-btn">Añadir a mi biblioteca</button>
                </div>
            </div>
        `;

        const addBtn = card.querySelector(".add-btn");
        addBtn.addEventListener("click", () => addToMyBooks(book));

        resultsContainer.appendChild(card);
    });
}   

function clearResults() {
    resultsContainer.innerHTML = "";
}

function showLoading(show) {
    loadingElement.style.display = show ? "block" : "none";
}

function showNoResults(show) {
    noResultsElement.style.display = show ? "block" : "none";
}

function mapCategory(category) {
    switch (category) {
        case "fiction": return "Ficción";
        case "science": return "Ciencia";
        case "history": return "Historia";
        case "fantasy": return "Fantasía";
        default: return "Otros";
    }
}

// ---------- Gestión de "Mi Biblioteca" ----------
// Guardar libros en localStorage
function saveMyBooksToStorage() {
    try {
        localStorage.setItem("myBooksLibrary", JSON.stringify(myBooks));
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
    }
}

// Cargar libros del localStorage
function loadMyBooksFromStorage() {
    try {
        const savedBooks = localStorage.getItem("myBooksLibrary");
        if (savedBooks) {
            myBooks = JSON.parse(savedBooks);
            renderMyBooks();
        }
    } catch (error) {
        console.error("Error al cargar del localStorage:", error);
    }
}

function addToMyBooks(book) {
    const alreadyAdded = myBooks.some(b => b.id === book.id);
    if (alreadyAdded) {
        alert("Este libro ya está en tu biblioteca.");
        return;
    }

    myBooks.push(book);
    renderMyBooks();
    saveMyBooksToStorage(); // Guardar después de agregar
}

function renderMyBooks() {
    myBooksList.innerHTML = "";

    if (myBooks.length === 0) {
        myBooksSection.style.display = "none";
        return;
    }

    myBooksSection.style.display = "block";

    myBooks.forEach(book => {
        const item = document.createElement("div");
        item.classList.add("my-book-item");

        item.innerHTML = `
            <span>${book.title} — ${book.author}</span>
            <button class="remove-btn">Quitar</button>
        `;

        const removeBtn = item.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => removeFromMyBooks(book.id));

        myBooksList.appendChild(item);
    });
}

function removeFromMyBooks(bookId) {
    myBooks = myBooks.filter(b => b.id !== bookId);
    renderMyBooks();
    saveMyBooksToStorage(); // Guardar después de eliminar
}