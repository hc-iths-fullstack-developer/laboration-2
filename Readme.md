# README

Kursens andra laboration är ett **individuellt projekt**.

Objektivet är att **bygga en webbplats åt en påhittad (eller riktig) organisation/kund**. Tanken är att komma på sin egen projektidé, men här är tre exempel som kan användas för inspiration:

+ En webbplats åt en restaurang, ett café, eller liknande

+ En webbplats åt någon typ av evanemang, till exempel en musikfestival

+ En e-handelsbutik, som till exempel säljer kläder

## Krav

### 1. Gör en skiss

Skapa (innan kodandet påbörjas) en **skiss** (i form av en bild) som beskriver webbplatsens layout/design. Det gör ingenting om skissen slutar vara aktuell, och webbplatsen slutar “uppfylla” skissen, under arbetets gång. Inkludera skissen i inlämningen i form av bildfil. Bildfilen ska vara av typen PNG och ska heta `sketch.png`. (Tips: Skissen kan vara simpel och kan göras med penna och papper eller programvara.)

### 2. Ta fram en färgpalett

Webbplatsen ska bygga på en **färgpalett**. Likt med skissen gör det ingenting om paletten slutar vara aktuell. Inkludera färgpaletten i inlämningen i form av en bildfil. Bildfilen ska vara av typen PNG och ska heta `palette.png`. (Tips: Använd <https://coolors.co/> eller <https://color.adobe.com/>. Du kan ta en skärmbild i dessa tjänster genom att högerklicka och välja **Take Screenshot** i Firefox.)

### 3. Se till att färgkontrasterna är tillgängliga

Webbplatsen ska vara tillgänglig i det avseende att det alltid är [tillräckligt hög kontrast mellan text och bakgrund](https://webbriktlinjer.se/riktlinjer/126-tillrackliga-kontraster/). AA-kraven måste uppfyllas. (Tips: <https://color.review/> kan vara behjälpligt kring att identifiera lämpliga färger att använda.)

### 4. Skapa minst två webbsidor

Webbplatsen måste bestå av **minst två unika webbsidor (HTML-filer)**. En av HTML-filerna (startsidan/hemsidan) ska heta `index.html` så att användaren hamnar på denna webbsida först. **Länkar** (a-element) ska skapas så att användaren kan navigera mellan webbsidorna.

### 5. Implementera en layout med CSS

Webbplatsen ska ha en layout som nyttjar **Flexbox och/eller Grid Layout** på ett lämpligt sätt. Lös problem med dessa tekniker som skulle vara svåra att lösa utan Flexbox eller Grid Layout.

### 6. Gör webbplatsen responsiv

Webbplatsen ska **fungera väl på alla bredder mellan 360px (mobiler) och 980px (desktop)**. Använd **media queries** för detta. Inget innehåll ska hamna “utanför” webbläsaren så att användaren behöver scrolla i sidled. (Tips: Det kommer sannolikt att vara effektivare att bygga sajten med “mobile-first”-process (för små skärmar först), istället för tvärtom (för datorskärmar först, för att sedan “skala ner” den till att fungera väl på små skärmar).)

### 7. Sätt unika title- och description-meta-element

Använd [title-elementet](https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=sv&visit_id=637667214098085977-1872329024&rd=1#uniquepagetitles) och [description-meta-elementet](https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=sv&visit_id=637667214098085977-1872329024&rd=1#descriptionmeta).

### 8. Använd rubriker

[Skapa rubriker med h-element](https://webbriktlinjer.se/riktlinjer/105-skapa-rubriker-med-h-element/) (alltså h1-h6), på ett lämpligt sätt, enligt [Google:s SEO-rekommendationer kring att hjälpa Google och användare att förstå innehållet](https://support.google.com/webmasters/answer/7451184?hl=sv&ref_topic=9460495#understand_your_content) och tillgänglighetsrekommendationerna [Skriv beskrivande sidtitlar](https://webbriktlinjer.se/riktlinjer/135-skriv-beskrivande-sidtitlar/).

### 9. Glöm inte alt-attributet

Inkludera minst ett img-element ska (som utgångspunkt) ha ett beskrivande alt-attribut i linje med tillgänglighetskravet kring att [beskriva med text allt innehåll som inte är text](https://webbriktlinjer.se/riktlinjer/115-textalternativ/) och [Google:s SEO-rekommendationer kring optimering av bilder](https://support.google.com/webmasters/answer/7451184?hl=sv&ref_topic=9460495#images).

### 10. Validera din kod

All kod ska vara **fri från fel i W3C:s valideringstjänster för HTML och CSS**. Varningar från valideringstjänsterna accepteras.

Ett **tillräckligt stort bidrag** måste göras. Insatsen kommer att bedömas utifrån att projektet pågår i runt en vecka.

**Inkludera** (detta är ett krav) en fil som heter `README.txt` i rotmappen på ditt projekt (samma mapp som innehåller `index.html`) som innehåller följande information:

+ vilken eller vilka webbplatser du har hämtat inspiration från, och
+ var bilderna kommer från.

Paketera webbplatsen, README.txt-filen, samt skiss- och palettbilderna, som en **Zip-fil** och ladda upp denna fil här på itslearning.

### 11. Webbplatsen ska också publiceras

Webbplatsen ska även **publiceras på webben** via FTP.

Följande uppgifter ska användas att publicera webbplatsen:

+ **Värdnamn:** ftp.ithsstudent.se
+ **Användarnamn:** <student@ithsundervisning.se>
+ **Lösenord:** hjy@023;GH
+ **Mapp:** public_html/jsu26g/x, där "x" byts ut mot ett valfritt namn

Placera dina filer i en egen mapp inuti `jsu26g`-mappen. Lägg **inte** filer direkt i start-mappen, skapa en egen mapp i mappen jsu26g.

Webbplatsen ska gå att nå via <http://ithsundervisning.se/public_html/jsu26g/x/>, där "x" byts ut mot ett valfritt namn.

Om mappnamnet **inte** är ditt namn, meddela då att det är du som ligger bakom inlämningen så att du kan betygsättas på laborationen.

Se modulen **Publicering** för mer information om hur FTP-överföringar kan göras.

### 12. Extra krav för VG

Skriv **enhetligt formaterad kod**. Indenteringen ska vara konsekvent. Det ska till exempel inte vara två mellanslags indentering i ett CSS-block, och fyra i ett annat. Detta gäller för både HTML och CSS. Se modulen “Några kodkonventioner” för ett exempel kring hur automatisk kodformatering kan konfigureras. Enhetlig formatering bidrar till kod som är enklare att underhålla och vidareutveckla.

Skriv **semantisk HTML-kod** för att [förmedla information, struktur och relationer i koden](https://www.digg.se/webbriktlinjer/alla-webbriktlinjer/formedla-information-struktur-och-relationer-i-koden), det vill säga använda det mest passade HTML-elementet för allt innehåll. Det är till exempel inte acceptabelt att använda ett `div`-element för att kapsla in ett textstycke, eller att använda `h4` för att representera en huvudrubrik. Vidare ska `br`-element generellt sett **inte** användas för att skapa avstånd (det är väldigt ovanligt att br är rätt element att använda för detta; använd som utgångspunkt `margin`- eller `padding`-egenskaperna istället). Semantisk kod bidrar till sökmotoroptimering, tillgänglighet, samt kod som är enklare att underhålla och vidareutveckla.

Använd **HTML5-strukturelement** (till exempel såsom `header`, `main` och `footer`) för att [hjälpa användare med skärmläsare att bläddra mellan sidornas olika delar](https://www.digg.se/webbriktlinjer/alla-webbriktlinjer/gor-det-mojligt-att-hoppa-forbi-aterkommande-innehall). (ARIA behöver inte användas.)

Använd minst **en väljare utöver type selector, class selector och ID selector** (för att lösa ett problem där väljaren i fråga är lämplig).

**Namnge klasser, ID-värden och filer på ett beskrivande sätt**. Det är till exempel inte acceptabelt att skapa en klass som heter “my-class”, eller en bild till “my-image”, eftersom detta namn inte kommunicerar tillräckligt mycket om vad objektet i fråga representerar. Beskrivande namn bidrar till kod som är enklare att underhålla och vidareutveckla.

Gör gärna, om tid finns, ytterligare tillgänglighets- och sökmotorsoptimeringsförbättringar utöver kraven som nämns ovan. Se <https://www.digg.se/webbriktlinjer> för riktlinjer kring tillgänglighet, och [Googles SEO-rekommendationer](https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=sv) för tips kring sökmotoroptimeringar.

## Källor

### CSS

+ [Reset](https://gist.github.com/mindplay-dk/62243f634cdcce4f43d943c36378137d)
+ [Collapsible Menu](https://codeburst.io/how-to-make-a-collapsible-menu-using-only-css-a1cd805b1390)
+ [Image Parallax](https://www.w3schools.com/howto/howto_css_parallax.asp)

### Text

+ [NASA pages on the universe](https://science.nasa.gov/universe/)

### Icon

+ [Icon](https://thenounproject.com/icon/black-hole-7977857/)

### Bilder

#### Hero

+ [Index hero](https://www.esa.int/ESA_Multimedia/Images/2023/11/Euclid_s_view_of_the_Horsehead_Nebula)
+ [Galaxies hero](https://science.nasa.gov/asset/hubble/out-of-this-whirl-the-whirlpool-galaxy-m51-and-companion-galaxy/)
+ [Black-holes hero](https://svs.gsfc.nasa.gov/13326/)
+ [Stars hero](https://www.esa.int/ESA_Multimedia/Images/2022/03/The_Sun_in_high_resolution?lang=en)
+ [Exoplanets hero](https://pixabay.com/illustrations/exoplanet-planet-space-astronomy-7852132/)

#### Galaxies

+ [Spiral galaxy card](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-101/)
+ [Elliptical galaxy card](https://science.nasa.gov/missions/hubble/hubble-peers-through-giant-ellipticals-layers/)
+ [Lenticular galaxy card](https://science.nasa.gov/missions/hubble/hubble-sees-galaxy-with-dark-rings-in-new-light/)
+ [Irregular galaxy card](https://science.nasa.gov/asset/hubble/large-field-hubble-image-of-starburst-galaxy-ngc-1569/)
+ [Seyfert galaxy card](https://esahubble.org/images/potw1422a/)
+ [Quasar galaxy card](https://science.nasa.gov/asset/webb/quasar-outflow-illustration/)
+ [Blazar galaxy card](https://www.esa.int/ESA_Multimedia/Images/2007/10/Artist_s_impression_of_a_blazar/)

#### Black-holes

+ [Stellar black-hole card](https://science.nasa.gov/asset/webb/black-hole-cygnus-x-1-illustration/)
+ [Supermassive black-hole card](https://svs.gsfc.nasa.gov/13086#media_group_325333/)
+ [Intermediate black-hole card](https://science.nasa.gov/asset/hubble/illustration-of-black-hole-system/)
+ [Primordial black-hole card](https://svs.gsfc.nasa.gov/14524/#media_group_374082/)

#### Stars

+ [Main Sequence star card](https://svs.gsfc.nasa.gov/11211/#media_group_346680)
+ [Red Giant star card](https://science.nasa.gov/asset/hubble/cw-leonis/)
+ [White Dwarf star card](https://science.nasa.gov/asset/hubble/artists-impression-of-a-white-dwarf-polluted-with-planet-debris/)
+ [Neutron star card](https://www.nasa.gov/missions/chandra/vela-pulsar/)
+ [Red Dwarf star card](https://science.nasa.gov/asset/hubble/artists-view-of-planets-transiting-red-dwarf-star-in-trappist-1-system/)
+ [Brown Dwarf star card](https://science.nasa.gov/asset/webb/brown-dwarf-w1935-artist-concept/)

#### Exoplanets

+ [Gas giant exoplanet card](https://esahubble.org/images/heic1312a/)
+ [Neptunian exoplanet card](https://science.nasa.gov/universe/exoplanets/discovery-alert-2-planet-system-is-close-and-weird/)
+ [Super-Earth exoplanet card](https://esahubble.org/images/heic1603a/)
+ [Terrestrial exoplanet card](https://science.nasa.gov/exoplanets/terrestrial/)

### Färger

+ [Color Palette](<https://coolors.co/>)

### Typografi

+ [Perfect Fourth Typescale](https://precise-type.com/)
+ [Font-Pairings](https://fonts.google.com/)
