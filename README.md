# kiventaro.de

Statische Website von KIventaro (Instagram-Chatbots für Friseursalons). HTML, CSS und JavaScript ohne Server, gehostet über GitHub Pages. Stand: Freitag, 20. November 2026.

## Inhalt des Repository

- index.html: einseitige Startseite mit Demo, Video, Ablauf, Preis, Fragen, Kontakt
- impressum.html, datenschutz.html: Entwürfe, offene Stellen gelb markiert (class="open")
- 404.html: Fehlerseite
- assets/css/style.css, assets/js/main.js: Gestaltung, gestellte Chat-Demo, Loom nach Klick
- assets/fonts: Poppins und Inter lokal (SIL Open Font License, Lizenztexte liegen bei)
- assets/img: Favicon, Vorschaubild für Links (og-image.png), Icon für Mobilgeräte
- robots.txt, sitemap.xml, llms.txt: Suchmaschinen und KI-Crawler
- CNAME: eigene Domain kiventaro.de
- .nojekyll: GitHub Pages liefert die Dateien unverändert aus

Die Seite lädt beim Aufruf keine externen Ressourcen und setzt keine Cookies. Deshalb ist kein Cookie-Banner nötig. Loom wird erst nach Klick geladen.

## Offene Stellen vor der Veröffentlichung

1. Telefonnummer im Impressum (impressum.html, "[Telefonnummer folgt]")
2. Umsatzsteuer: Variante A (USt-ID) oder Variante B (Kleinunternehmer) im Impressum, die andere löschen
3. Loom-Link: in index.html bei id="video-box" im Attribut data-src eintragen, Format https://www.loom.com/embed/VIDEO-ID (aus dem Teilen-Link loom.com/share/VIDEO-ID wird loom.com/embed/VIDEO-ID)
4. Darstellung von Linda im Kontaktbereich (index.html), Entscheidung durch Tim
5. Logo: aktuell ein Platzhalter-Zeichen. Echtes Logo als PNG oder SVG nach assets/img, dann Favicon und og-image.png ersetzen
6. Datenschutz: E-Mail-Anbieter des Postfachs linda@kiventaro.de eintragen, Grundlage der US-Übermittlung für GitHub und Loom prüfen, Datum eintragen
7. Impressum und Datenschutz mit einem kostenlosen Generator abgleichen (zum Beispiel eRecht24 oder Datenschutz-Generator, Nutzungsbedingungen vorher lesen) und rechtlich prüfen lassen
8. Gewerbeanmeldung in Offenburg abwarten, erst danach veröffentlichen

## Veröffentlichung über GitHub Pages

Stand der GitHub-Anleitung geprüft am 20. November 2026 (docs.github.com, "Managing a custom domain for your GitHub Pages site").

Schritt 1: Repository
- Repository tim-KBI/kiventaro-website auf "Public" stellen.
- Alle Dateien dieses Ordners in den Zweig main hochladen (die Datei CNAME und .nojekyll mit).

Schritt 2: GitHub Pages einschalten
- Im Repository: Settings, dann Pages.
- Bei "Build and deployment": Source "Deploy from a branch", Branch "main", Ordner "/ (root)", Save.
- Bei "Custom domain" kiventaro.de eintragen und speichern. GitHub empfiehlt, die Domain zuerst in GitHub einzutragen und danach die DNS-Einträge zu setzen.
- Empfohlen: Domain im GitHub-Konto verifizieren (Profilbild, Settings, Pages, "Add a domain"). GitHub zeigt dafür einen TXT-Eintrag an, der bei IONOS ergänzt wird. Das schützt vor Übernahme der Domain durch Dritte.

Schritt 3: DNS bei IONOS (Domains und SSL, kiventaro.de, DNS)
Vorhandene A-, AAAA- und CNAME-Einträge für @ und www, die auf IONOS-Parkseiten zeigen, vorher löschen. MX-Einträge für E-Mail bleiben unverändert.

| Typ   | Hostname | Wert                  |
|-------|----------|-----------------------|
| A     | @        | 185.199.108.153       |
| A     | @        | 185.199.109.153       |
| A     | @        | 185.199.110.153       |
| A     | @        | 185.199.111.153       |
| AAAA  | @        | 2606:50c0:8000::153   |
| AAAA  | @        | 2606:50c0:8001::153   |
| AAAA  | @        | 2606:50c0:8002::153   |
| AAAA  | @        | 2606:50c0:8003::153   |
| CNAME | www      | tim-kbi.github.io     |

Damit ruft www.kiventaro.de die Seite ebenfalls auf und leitet auf kiventaro.de weiter.

Schritt 4: https
- Nach dem Setzen der DNS-Einträge kann es bis zu 24 Stunden dauern, bis GitHub das Zertifikat ausstellt.
- Danach in Settings, Pages den Haken "Enforce HTTPS" setzen.
- Bleibt die Option grau, die Domain in den Pages-Einstellungen einmal entfernen und erneut eintragen.

Schritt 5: Nach dem Start
- Google Search Console: Domain-Property kiventaro.de anlegen (Bestätigung per TXT-Eintrag bei IONOS), Sitemap https://kiventaro.de/sitemap.xml einreichen.
- Bing Webmaster Tools: Import aus der Search Console.
- Link in der Instagram-Bio und im TikTok-Profil eintragen.
- Platzierungen bei Google oder Nennungen in KI-Antworten lassen sich nicht garantieren.

## Lokale Vorschau

Im Ordner ausführen: python3 -m http.server 8000, dann http://localhost:8000 öffnen.
