# Poradnik jak w używać git'a
Komenda której zawsze można używać i nie zrobi rozpierdolu
```
git status
```
## Przed robieniem zmian
* Pierwsze co robisz to sprawdzasz na jakim jesteś branchu:
```
git branch -a
```
* Najnowsza wersja powinna być na mainie także jak nie jesteś na mainie to używasz switch'a:
```
git switch <nazwa brancha>
```
```
git switch main
```
* Następnie pobierasz najnowsze zmiany
```
git pull
```
* Dane są na bieżąco więc teraz tworzysz nowego branch'a na którym będziesz wprowadzać zmiany
```
git branch -c <nazwa nowego brancha>
```
* Zmieniasz brancha z maina na nowo utowrzony
```
git switch <nazwa nowego brancha>
```
Zajebiście teraz pisz ten kołdzik

## Po wprowadzeniu zmian
* Najpierw przenosisz wszystkie zmiany do staging area (teraz foldery node_modules są w gitignore więc są pomijane)
```
git add .
```
* Następnie robisz commit wraz z krótkim opisem wprowadzonych zmian
```
git commit -m "tresc wiadomości"
```
* W ramach jednego brancha można walić wiele commitów ale jak już skończysz to wypychasz brancha na githuba
* normalnie wypychamy zmiany za pomocą:
```
git push
```
* ewentualnie - ale to cośnie działa: 
```
git push -u origin <nazwa brancha>
```
ŻADNYCH PUSHY NA MAINA!!!!!1!!11
