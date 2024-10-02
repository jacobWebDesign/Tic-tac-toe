Ten projekt to prosta gra w kółko i krzyżyk (Tic-Tac-Toe) stworzona w języku JavaScript z wykorzystaniem HTML i CSS.
Celem gry jest umożliwienie dwóch graczy (X i O) rywalizacji na planszy 3x3 poprzez naprzemienne stawianie swoich symboli (X lub O) na dostępnych polach. 
Gracz, który pierwszy ułoży trzy swoje symbole w rzędzie, kolumnie lub na przekątnej, wygrywa. 
W przypadku zapełnienia planszy bez zwycięzcy ogłaszany jest remis.

Kluczowe funkcjonalności:
  Tworzenie planszy gry – plansza generowana jest dynamicznie przy użyciu klasy GridItem, która tworzy 9 kafelków w kontenerze gry.
  Sprawdzanie zwycięzcy – funkcja check() monitoruje kafelki i sprawdza, czy któryś z graczy ułożył trzy symbole w linii, wyświetlając odpowiedni komunikat o zwycięstwie.
  Obsługa tur graczy – po każdym ruchu gracza wyświetlany jest komunikat informujący o tym, kto ma następny ruch (gracz X lub O).
  Przycisk resetu – po zakończeniu gry, czy to wygraną jednego z graczy, czy remisem, pojawia się przycisk do resetowania gry i rozpoczęcia nowej rundy.

Projekt jest prosty i intuicyjny, a wszystkie działania są wykonywane bez konieczności przeładowywania strony.
