# fesenmeier-restapi-tresmo

# Aufruf der api über HEROKU
https://guarded-temple-58570.herokuapp.com/api/v1/wines

# Notwendige Umgebungsvariablen
- MONGODB_URI
- PORT
- LOG_LEVEL [fatal, error, warn, info, debug]
- NODE_ENV [debug || development um lokales Logging zu aktivieren]

# OPTIMIERUNGSMÖGLICHKEITEN
Bei der aktuellen Umsetzung der RestApi können folgende Punkte in Zukunft verbessert werden:


* HATEOAS einführen
* eslint an Tresmo Guidelines anpassen </br>Da mir die "Tresmo"-Konfiguration für eslint aktuell nicht zu Verfügung steht wurde lediglich eine Standard-Konfiguration mittels eslint --init vorgenommen. Ebenso sollte eslint so konfiguriert werden, dass auch die Testklassen richtig behandelt werden.
* Mocken der Datenbank für Tests
* Beim Erstellen eines Weines muss derzeit eine ID angegeben werden, in Zukunft wäre es besser diese automatisch zu generieren
* Nebenläufigkeit z.B. mit Docker-Prozessen und Queueing bei aufwändigen Operationen
* HEROKU Logging extern anbinden um entsprechende Analysen tätigen zu können.

