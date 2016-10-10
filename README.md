# fesenmeier-restapi-tresmo

# Aufruf der api über HEROKU
https://guarded-temple-58570.herokuapp.com/api/v1/wines

# OPTIMIERUNGSMÖGLICHKEITEN
Bei der aktuellen Umsetzung der RestApi können folgende Punkte in Zukunft verbessert werden:
* Vollständiges Logging über Log-Files
  Für den produktiven Einsatz sollten alle aufgerufenen REST-Calls über LOG-Files nachvollziehbar sein.
* HATEOAS einführen
* eslint an Tresmo Guidelines anpassen
  Da mir die "Tresmo"-Konfiguration für eslint aktuell nicht zu Verfügung steht wurde lediglich eine Standard-Konfiguration mittels eslint --init vorgenommen.
  Ebenso sollte eslint so konfiguriert werden, dass auch die Testklassen richtig behandelt werden.
* Mocken der Datenbanken 
* Beim Erstellen eines Weines muss derzeit eine ID angegeben werden, in Zukunft wäre es besser diese automatisch zu generieren
