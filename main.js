const konyvek = []

function Konyv(cim, szerzo, kiadasiEv, oldalszam){
    this.cim = cim
    this.szerzo = szerzo
    this.kiadasiEv = kiadasiEv
    this.oldalszam = oldalszam
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

const PalUtcaiFiuk = new Konyv("A Pál utcai fiúk", "Molnár Ferenc", 1907, 240)
konyvek.push(PalUtcaiFiuk)
const EgriCsillagok = new Konyv("Egri csillagok", "Gárdonyi Géza", 1901, 560)
konyvek.push(EgriCsillagok)
const HarryPotter =  new Konyv("Harry Potter és a bölcsek köve", "J. K. Rowling", 1997, 288)
konyvek.push(HarryPotter)


const konyvekTablazata = document.getElementById("konyvek-listaja")
let csakSzabadKonyvek = false

function konyvHozzaadasa(){
    const ujKonyv = new Konyv(
        document.getElementById("cim").value,
        document.getElementById("szerzo").value,
        Number(document.getElementById("kiadasiEv").value),
        Number(document.getElementById("oldalszam").value)
    )

    konyvek.push(ujKonyv)
    konyvekMegjelenitese()
}

function konyvekMegjelenitese(){
    konyvekTablazata.innerHTML = ""

    konyvek.forEach(function(konyv){
        if (csakSzabadKonyvek == true && konyv.kolcsonozve !== false) {
            return
        }

        const sor = document.createElement("tr")
        const adatok = [konyv.cim, konyv.szerzo, konyv.kiadasiEv, konyv.oldalszam, konyv.allapot]

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

    document.getElementById("legregebbi-konyv").textContent =
        legregebbiKonyv.cim + " - " + legregebbiKonyv.szerzo + " (" + legregebbiKonyv.kiadasiEv + ")"
}

konyvekMegjelenitese()