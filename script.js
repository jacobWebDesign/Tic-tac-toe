// Klasa GridItem służy do tworzenia elementów siatki gry
class GridItem {
    // Konstruktor przyjmuje wewnętrzną zawartość HTML elementu (innerHtml)
    constructor(innerHtml) {
        this.innerHtml = innerHtml; // Przypisanie wewnętrznej zawartości HTML
    };
    // Klasa CSS przypisana do każdego elementu
    styleClassName = 'grid-item';
    
    // Metoda create tworzy nowy element div i dodaje go do rodzica
    create(parent) {
        let newGridItem = document.createElement('div'); // Tworzenie nowego elementu div
        newGridItem.className = this.styleClassName; // Przypisanie klasy CSS
        newGridItem.innerHTML = this.innerHtml; // Ustawienie wewnętrznej zawartości HTML
        parent.appendChild(newGridItem); // Dodanie nowego elementu do rodzica
    }
}

// Funkcja check sprawdza, czy dany gracz (x lub o) wygrał
function check(char) {
    const tiles = document.getElementsByClassName('grid-item'); // Pobranie wszystkich elementów z klasy 'grid-item'
    
    // Sprawdzanie wierszy
    for (let i = 3; i < 10; i += 3) {
        if (tiles[i - 3].innerHTML == char && tiles[i - 2].innerHTML == char && tiles[i - 1].innerHTML == char) {
            return true; // Zwraca true, jeśli 3 elementy w jednym wierszu są identyczne
        };
    }

    // Sprawdzanie kolumn
    for (let i = 0; i < 3; i++) {
        if (tiles[i].innerHTML == char && tiles[i + 3].innerHTML == char && tiles[i + 6].innerHTML == char) {
            return true; // Zwraca true, jeśli 3 elementy w jednej kolumnie są identyczne
        }
    }

    // Sprawdzanie przekątnych
    if (tiles[0].innerHTML == char && tiles[4].innerHTML == char && tiles[8].innerHTML == char) return true; // Sprawdzanie pierwszej przekątnej
    if (tiles[2].innerHTML == char && tiles[4].innerHTML == char && tiles[6].innerHTML == char) return true; // Sprawdzanie drugiej przekątnej

    return false; // Jeśli nie ma zwycięzcy, zwraca false
}

// Pobieranie elementu z napisem o stanie gry
const info = document.getElementById('info');

// Pobieranie kontenera gry
const gameContainer = document.getElementById('game');

// Obiekt button odpowiedzialny za resetowanie gry
const button = {
    selector: document.getElementById('reset-btn'), // Pobranie przycisku resetu
    show() {
        this.selector.className = 'show'; // Pokazuje przycisk ustawiając klasę CSS 'show'
    },
    hide() {
        this.selector.className = 'hide'; // Ukrywa przycisk ustawiając klasę CSS 'hide'
    }
}

// Funkcja tworzy kafelki (elementy siatki) i dodaje je do kontenera
function tilesCreate() {
    if (!document.querySelector('.grid-container')) { // Sprawdza, czy nie istnieje już element 'grid-container'
        button.hide(); // Ukrywa przycisk resetu
        info.textContent = 'Grę rozpoczyna gracz X'; // Ustawia początkowy komunikat
        let gridContainer = document.createElement('div'); // Tworzy nowy element div dla siatki
        gridContainer.className = 'grid-container'; // Przypisuje klasę CSS dla kontenera siatki
        gameContainer.append(gridContainer); // Dodaje kontener siatki do elementu gameContainer
        
        // Tworzy 9 kafelków siatki
        for (let i = 0; i < 9; i++) {
            let gridItem = new GridItem(' '); // Tworzy nowy obiekt GridItem z pustą zawartością
            gridItem.create(gridContainer); // Dodaje każdy kafelek do kontenera siatki
        }
    } else {
        // Jeśli kontener już istnieje, usuwa go i tworzy ponownie
        document.getElementsByClassName('grid-container')[0].remove();
        tilesCreate();
    }
}

// Funkcja informująca o tym, czyja jest tura
function whoseTurn(element, tour) {
    if (tour % 2 == 0) {
        element.innerHTML = 'Kolej gracza X'; // Jeśli tura parzysta, to kolej gracza X
    } else {
        element.innerHTML = 'Kolej gracza O'; // Jeśli tura nieparzysta, to kolej gracza O
    }
}

// Funkcja rozpoczynająca grę
game();
function game() {
    tilesCreate(); // Tworzy planszę
    const tiles = document.getElementsByClassName('grid-item'); // Pobiera wszystkie kafelki siatki
    let tour = 0; // Zmienna licząca tury

    // Dodaje event listener do każdego kafelka
    for (const element of tiles) {
        element.addEventListener('click', function () {

            // Sprawdza, czy pole jest puste i czy nie ma zwycięzcy
            if (element.innerHTML != 'x' && element.innerHTML != 'o' && check('x') != true && check('o') != true) {
                if (tour % 2 == 0) {
                    element.innerHTML = 'x'; // Jeśli tura parzysta, gracz X wykonuje ruch
                    tour++; // Zwiększa licznik tury
                } else {
                    element.innerHTML = 'o'; // Jeśli tura nieparzysta, gracz O wykonuje ruch
                    tour++; // Zwiększa licznik tury
                }

                whoseTurn(info, tour); // Aktualizuje informację, czyja jest tura

                // Sprawdza, czy jest remis (brak zwycięzcy po 9 ruchach)
                if (tour == 9) {
                    info.textContent = 'Nikt nie wygrał :c'; // Wyświetla informację o remisie
                    button.show(); // Pokazuje przycisk resetu
                }
                // Sprawdza, czy wygrał gracz X
                if (check('x')) {
                    info.textContent = 'Wygrał gracz X'; // Wyświetla informację o wygranej gracza X
                    button.show(); // Pokazuje przycisk resetu
                }
                // Sprawdza, czy wygrał gracz O
                if (check('o')) {
                    info.textContent = 'Wygrał gracz O'; // Wyświetla informację o wygranej gracza O
                    button.show(); // Pokazuje przycisk resetu
                }

                console.log(tour); // Wyświetla licznik tury w konsoli
            }
        });
    }
}