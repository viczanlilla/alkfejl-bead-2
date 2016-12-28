# alkfejl-beadando

FELADAT
- Eladó autókat kezelő alkalmazás
	
KÖVETELMÉNYEK
- Funkcionális követelmények
	- Vendégként szeretnék a hirdetések között szabadon böngészni, eladó autót keresni.
	- Vendégként szeretném egy autó leírását megtekinteni.
	- Vendégként szeretnék tudni regisztrálni az oldalra.
	- Felhasználóként szeretnék tudni bejelentkezni az oldalra.
	- Felhasználóként szeretném tudni a profiladataimat szerkeszteni.
	- Felhasználóként szeretnék új hirdetést feladni.
	- Felhasználóként szeretném a saját hirdetéseimet módosítani vagy törölni.
	- Felhasználóként Like-olhatom a hirdetéseket.
- Nem funkcionális követelmények
	- Felhasználóbarát, ergonomikus elrendezés és kinézet.
	- Gyors működés.
	- Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés.
		
SZAKTERÜLETI FOGALOMJEGYZÉK
- Személygépkocsi: Személygépkocsinak minősül az a 2500 kg-ot meg nem haladó, olyan gépjármű, amely gyárilag kialakítva kettőnél több, de maximum 9 utas szállítására alkalmas.
- Tehergépkocsi: A személygépkocsit, az autóbuszt, a trolibuszt és a vontatót kivéve minden tehergépkocsi.
- Hibrid: Egynél többféle üzemanyaggal működő gépkocsi.
		
SZEREPKÖRÖK
- Vendég: Autók keresését, böngészését és megtekintését végezheti.
- Felhasználó: A vendég szerepkörén túl a saját hirdetéseinek kezelésére (új, módosít, törlés) képes.
		
HASZNÁLATI ESETEK
![Alt text](/bead1_images/HASZNALATI ESETEK.png?raw=true "HASZNALATIESETEK.png")

FOLYAMATOK MEGHATÁROZÁSA
- felhasználó
	- Új hirdetés felvételének folyamata:
	![Alt text](/bead1_images/FOLYAMAT_uj_hirdetes.png?raw=true "FOLYAMAT_uj_hirdetes.png")
	- Bejelentkezés folyamata:
	![Alt text](/bead1_images/FOLYAMAT_bejelentkezes.png?raw=true "FOLYAMAT_bejelentkezes.png")
- vendég
	- Keresés egy autóra:
	![Alt text](/bead1_images/FOLYAMAT_kereses.png?raw=true "FOLYAMAT_kereses.png")
	- Regisztráció:
	![Alt text](/bead1_images/FOLYAMAT_regisztracio.png?raw=true "FOLYAMAT_regisztracio.png")
		
OLDALTÉRKÉP
- Publikus:
	- Főoldal
	- Autók böngészése
		+ Autó megtekintése
	- Belépés
	- Regisztráció
- Felhasználó
	- Kilépés
	- Profiladatok
		+ Profiladatok szerkesztése
	- Új hirdetés felvitele
	- Egy hirdetés megtekintésénél Like
		
VÉGPONTOK
- GET /: főoldal
- GET /register: regisztrációs oldal
- POST /register: regisztrációs oldal felküldése
- GET /login: bejelentkező oldal
- POST /login: bejelentkezési adatok felküldése
- GET /logout: kijelentkező oldal
- GET /editUser: felhasználói adatok szerkesztése
- POST /editUser: felhasználói adatok szerkesztésének felküldése
- GET /cars/createCar: új hirdetés felvitele, űrlap megjelenítése
- POST /cars/createCar: új hirdetés felvitele, adatok küldése
- GET /cars/:id: hirdetés megtekintése, lehetőség like-olásra
- GET /cars: hirdetésekre való keresés
- GET /cars/:id/edit: hirdetés szerkesztése
- POST /cars/:id/edit: hirdetésekre szerkesztésének felküldése
- GET /cars/:id/delete: hirdetés törlése
- GET /mycars: hirdetéseim megtekintése

OLDALVÁZLATOK

![Alt text](/bead1_images/OLDALVAZLATOK_1.jpg?raw=true "OLDALVAZLATOK_1.jpg")
![Alt text](/bead1_images/OLDALVAZLATOK_2.jpg?raw=true "OLDALVAZLATOK_2.jpg")
![Alt text](/bead1_images/OLDALVAZLATOK_3.jpg?raw=true "OLDALVAZLATOK_3.jpg")
![Alt text](/bead1_images/OLDALVAZLATOK_4.jpg?raw=true "OLDALVAZLATOK_4.jpg")
![Alt text](/bead1_images/OLDALVAZLATOK_5.jpg?raw=true "OLDALVAZLATOK_5.jpg")
![Alt text](/bead1_images/OLDALVAZLATOK_6.jpg?raw=true "OLDALVAZLATOK_6.jpg")
![Alt text](/bead1_images/OLDALVAZLATOK_7.jpg?raw=true "OLDALVAZLATOK_7.jpg")

ADATMODELL

![Alt text](/bead1_images/ADATMODELL.png?raw=true "ADATMODELL.png")

----
Felhasználói dokumentáció

- A webes alkalmazás összes funkciójának futtatásához szükséges egy tetszőleges operációs rendszeren lévő böngésző, és javascript. 

- Program használata

	- Böngészőben nyissuk meg a főoldalt
	- Jobb felső sarokban kattintsunk a Bejelentkezés feliratra
	- Bejelentkezés/Regisztráció után a főoldalra jutunk
	- Hirdetéseim/Új hirdetés feladása menüpontnál tudunk új hirdetést feladni
	- Töltsük ki az űrlapot
	- Hibás adatok esetén az űrlap jelezni fogja a hibát
	- Kész! gombra kattintva mentsük el az adatokat
	- Hirdetéseim menüpont alatt a hirdetések megtekinthetőek, szerkeszthetőek és törölhetőek egyesével
	- Bejelentkezett felhasználó jobb felső sarokban látja az "Adataim" gombot, amelyre kattintva szerkesztheti profilját
	- Bal felső sarokban Autók böngészése gombra kattintva tetszőleges tulajdonságokat megadva tudunk böngészni az autók között
	- Az így kapott eredmények között kiválaszthatunk egyet, amelyet megtekinthetünk, like-olhatun

----
- A funkcióban érintett fájlok mind kliens- és szerveroldalon:
	- public/script/delete.js (hirdetés törlésére szolgáló js)
	- public/script/popup_login.js (bejelentkezés modalhoz js)
	- public/script/popup_registration.js (regisztrációs modalhoz js)
	- resources/views/carSearch.njk
	- resources/views/createCar.njk (input mezők validálásához szüks. módosítások)
	- resources/views/index.njk
	- resources/views/layout.njk
	- resources/views/login.njk
	- resources/views/register.njk (input mezők validálásához szüks. módosítások)
	- resources/views/showCar.njk 
	- ../Controllers/carController.js (ajaxDelete fgv)
	- ../Controllers/UserController.js (ajaxLogin, ajaxRegister fgv)
	- ../routes.js

- Az 5 funkció kliensoldali JavaScript segítségével
	- /cars/:id URL-en, a felhasználó (Ajax-szal) törölheti létező hirdetéseit
	- a kezdőlapról és a /cars URL-ről a Bejelentkezés gombra kattintva egy modal segíti a bejelentkezést (Ajax)
	- a kezdőlapról és a /cars URL-ről a Regisztráció gombra kattintva egy modal segíti a regisztrálást (Ajax)
	- /cars/createCar URL-en, a js ellenőrzi, hogy üres mezőkkel ne lehessen hirdetést feladni
	- /register URL-en, a js ellenőrzi, hogy az űrlap csak helyesen kitöltve kerülhessen leadásra

Szekvencia diagram (hirdetés törlése)
	![Alt text](/bead1_images/szekvencia.png?raw=true "szekvencia.png")

- Selenium IDE telepítése (Firefoxban)
	- https://addons.mozilla.org/hu/firefox/addon/selenium-ide/ plugin telepítése

- Selenium IDE
	- Eszközök/Selenium IDE
	- a felugró ablakban tudunk új teszteket készíteni (piros gomb lenyomása után végezzük el azt az utasítássorozatot, amit teszt formájában viszont szeretnénk látni.)
	- a felugró ablakban tudunk már megírt teszteket újra futtatni:
		- Fájl/Open/"kiválasztjuk a megfelelő tesztet"/
		- kiválasztás után "Play entire test suite" gombra kattintva újra és újra le játszhatóak a teszteket

- Tesztesetek
	- Regisztrált felhasználóként való bejelentkezés (test/bejelentkezés.html)
	- Bejelentkezett felhasználó módosítja az adatait (test/bejelentkezve, adataim változtatása.html)
	- Bejelentkezett felhasználó hirdetést ad fel (test/bejelentkezve, hidetés feladása.html)
	- Vendég vagy bejelentkezett felhasználó rákeres az "Audi" kulcsszóra és megtekinti az első ilyen hidetést (test/hirdetések közt Audi keresése, és megtekintése.html)

Szerkesztette: Viczián Lilla