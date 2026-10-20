const konyvek = []

function Konyv(cim, szerzo, kiadasiEv, oldalszam, kategoria){
    this.cim = cim
    this.szerzo = szerzo
    this.kiadasiEv = kiadasiEv
    this.oldalszam = oldalszam
    this.kategoria = kategoria
    this.kolcsonozve = false
    if (this.kolcsonozve == true) {
        this.allapot = "Kölcsönözve"
    } else {
        this.allapot = "Kölcsönözhető"
    }
    this.kolcsonzes = function(){
        this.kolcsonozve = true
        this.allapot = "Kölcsönözve"
    }
    this.visszahozas = function(){
        this.kolcsonozve = false
        this.allapot = "Kölcsönözhető"
    }
    
}

const PalUtcaiFiuk = new Konyv("A Pál utcai fiúk", "Molnár Ferenc", 1907, 240, "regény")
konyvek.push(PalUtcaiFiuk)
const EgriCsillagok = new Konyv("Egri csillagok", "Gárdonyi Géza", 1901, 560, "regény")
konyvek.push(EgriCsillagok)
const HarryPotter =  new Konyv("Harry Potter és a bölcsek köve", "J. K. Rowling", 1997, 288, "fantasy")
konyvek.push(HarryPotter)


const konyvekTablazata = document.getElementById("konyvek-listaja")
const kategoriaSzuro = document.getElementById("kategoria-szuro")
let csakSzabadKonyvek = false

function konyvHozzaadasa(){
    const ujKonyv = new Konyv(
        document.getElementById("cim").value,
        document.getElementById("szerzo").value,
        Number(document.getElementById("kiadasiEv").value),
        Number(document.getElementById("oldalszam").value),
        document.getElementById("kategoria").value
    )

    konyvek.push(ujKonyv)
    konyvekMegjelenitese()
}

function konyvekMegjelenitese(){
    const kivalasztottKategoria = kategoriaSzuro.value
    const kategoriak = [...new Set(konyvek.map(function(konyv){
        return konyv.kategoria
    }))].sort()

    kategoriaSzuro.innerHTML = "<option value=\"\">Összes kategória</option>"
    kategoriak.forEach(function(kategoria){
        const opcio = document.createElement("option")
        opcio.value = kategoria
        opcio.textContent = kategoria
        kategoriaSzuro.appendChild(opcio)
    })
    kategoriaSzuro.value = kivalasztottKategoria

    konyvekTablazata.innerHTML = ""

    konyvek.forEach(function(konyv){
        if (kategoriaSzuro.value && konyv.kategoria !== kategoriaSzuro.value) {
            return
        }

        if (csakSzabadKonyvek == true && konyv.kolcsonozve !== false) {
            return
        }

        const sor = document.createElement("tr")
        const adatok = [konyv.cim, konyv.szerzo, konyv.kiadasiEv, konyv.oldalszam, konyv.kategoria, konyv.allapot]

        adatok.forEach(function(adat){
            const cella = document.createElement("td")
            cella.textContent = adat
            sor.appendChild(cella)
        })

        const gombCella = document.createElement("td")
        const kolcsonzesGomb = document.createElement("button")
        kolcsonzesGomb.textContent = "Kölcsönzés"
        kolcsonzesGomb.onclick = function(){
            konyv.kolcsonzes()
            konyvekMegjelenitese()
        }
        gombCella.appendChild(kolcsonzesGomb)

        const visszahozasGomb = document.createElement("button")
        visszahozasGomb.textContent = "Visszahozás"
        visszahozasGomb.onclick = function(){
            konyv.visszahozas()
            konyvekMegjelenitese()
        }
        gombCella.appendChild(visszahozasGomb)
        sor.appendChild(gombCella)

        const torlesGomb = document.createElement("button")
        torlesGomb.textContent = "Törlés"
        torlesGomb.onclick = function(){
            torles(konyvek.indexOf(konyv))
        }
        gombCella.appendChild(torlesGomb)

        konyvekTablazata.appendChild(sor)

    })
}

function szabadKonyvekMegjelenitese(){
    csakSzabadKonyvek = true
    konyvekMegjelenitese()
}

function osszesKonyvMegjelenitese(){
    csakSzabadKonyvek = false
    konyvekMegjelenitese()
}

function legregebbiKonyvMegjelenitese(){
    let legregebbiKonyv = konyvek[0]

    konyvek.forEach(function(konyv){
        if (konyv.kiadasiEv < legregebbiKonyv.kiadasiEv) {
            legregebbiKonyv = konyv
        }
    })

    document.getElementById("legregebbi-konyvFelirat").textContent = "Legrégebbi könyv: "
    document.getElementById("legregebbi-konyv").textContent = legregebbiKonyv.cim + " (" + legregebbiKonyv.kiadasiEv + ")"
}

function legVastagabbKonyvMegjelenitese(){
    let legVastagabbKonyv = konyvek[0]

    konyvek.forEach(function(konyv){
        if (konyv.oldalszam > legVastagabbKonyv.oldalszam) {
            legVastagabbKonyv = konyv
        }
    })

    document.getElementById("legvastagabb-konyvFelirat").textContent = "Legvastagabb könyv: "
    document.getElementById("legvastagabb-konyv").textContent = legVastagabbKonyv.cim + " (" + legVastagabbKonyv.oldalszam + " oldal)"
}

function AtlagosOldalszamMegjelenitese(){
    let osszesOldalszam = 0
    konyvek.forEach(function(konyv){
        osszesOldalszam += konyv.oldalszam
    })
    const atlagosOldalszam = osszesOldalszam / konyvek.length
    document.getElementById("atlagos-oldalszam").textContent = "Átlagos oldalszám: " + atlagosOldalszam.toFixed()
}

function torles(index){
    konyvek.splice(index, 1)
    konyvekMegjelenitese()
}

konyvekMegjelenitese()