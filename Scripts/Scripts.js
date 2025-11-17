const books = [
    {
        id: 1,
        title: "El nombre del viento",
        author: "Patrick Rothfuss",
        category: "fantasy",
        description: "La historia de Kvothe, un arcanista legendario.",
        year: 2007
    },
    {
        id: 2,
        title: "Breve historia del tiempo",
        author: "Stephen Hawking",
        category: "science",
        description: "Introducción a conceptos de cosmología y física teórica.",
        year: 1988
    },
    {
        id: 3,
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        category: "fiction",
        description: "La saga de la familia Buendía en Macondo.",
        year: 1967
    },
    {
        id: 4,
        title: "Sapiens: De animales a dioses",
        author: "Yuval Noah Harari",
        category: "history",
        description: "Un repaso a la historia de la humanidad.",
        year: 2011
    }
    // Puedes añadir más libros de prueba
];

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

    // Mostrar todos los libros al cargar por primera vez
    renderBooks(books);
});

// ---------- Lógica principal de búsqueda ----------
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    // Mostrar "cargando"
    showLoading(true);
    showNoResults(false);
    clearResults();

    
    setTimeout(() => {
        // 1. Filtrar por texto
        let filtered = books.filter(book => {
            const text = (book.title + " " + book.author + " " + book.description).toLowerCase();
            const matchesText = text.includes(query);

            // 2. Filtrar por categoría
            const matchesCategory = currentFilter === "all" || book.category === currentFilter;

            return matchesText && matchesCategory;
        });

        showLoading(false);

        if (filtered.length === 0) {
            showNoResults(true);
        } else {
            renderBooks(filtered);
        }
    }, 400); // 400 ms solo para que se vea el "Buscando libros..."
}

// ---------- Funciones de UI ----------
function renderBooks(bookList) {
    clearResults();

    bookList.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Año:</strong> ${book.year}</p>
            <p><strong>Categoría:</strong> ${mapCategory(book.category)}</p>
            <p>${book.description}</p>
            <button class="add-btn">Añadir a mi biblioteca</button>
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
function addToMyBooks(book) {
    // Si ya está, no lo duplicamos
    const alreadyAdded = myBooks.some(b => b.id === book.id);
    if (alreadyAdded) {
        alert("Este libro ya está en tu biblioteca.");
        return;
    }

    myBooks.push(book);
    renderMyBooks();
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
}