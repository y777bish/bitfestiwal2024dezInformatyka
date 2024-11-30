import { readFile } from "fs";

type DistanceMetric = 'euclidean'
type Result = {
    distance: number,
    label: string,
}

function columnAverages(matrix: number[][]) {
    // Get the number of rows and columns
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Initialize an array to store column averages
    const averages = new Array(numCols).fill(0);

    // Sum each column
    for (let col = 0; col < numCols; col++) {
        let sum = 0;
        for (let row = 0; row < numRows; row++) {
            sum += matrix[row][col];
        }
        // Compute the average for this column
        averages[col] = sum / numRows;
    }

    return averages;
}

class KNN {
    private trainFeatures: number[][] = [];
    private trainLabels: string[] = [];
    private k: number;
    private distanceMetric: DistanceMetric;
    private trainAverageFeatures: number[] = [];

    constructor(k: number = 3, distanceMetric: DistanceMetric = 'euclidean') {
        if (k < 1) {
            throw new Error("Parametr k musi być większy lub równy 1.");
        }
        this.k = k;
        this.distanceMetric = distanceMetric;
    }

    /**
     * Trenuje model na podstawie danych wejściowych
     * @param features - Dane wejściowe (macierz cech)
     * @param labels - Wartości docelowe (wektor etykiet lub wartości ciągłych)
     */
    train(features: number[][], labels: string[]): void {
        this.trainAverageFeatures  = columnAverages(features)
        this.trainFeatures = features;
        this.trainLabels = labels;
    }

    elliminateVisual(target: number[]): string[] {
        const displayedTargets = []
        for (let i = 0; i < this.trainFeatures.length; i++) {
            if (target.every((targetValue, idx) => Math.abs(targetValue - features[i][idx]) >= 1)) {
                displayedTargets.push(this.trainLabels[i])
            }
        };
        return displayedTargets;
    }

    /**
     * Dokonuje predykcji dla pojedynczego przykładu
     * @param sample - Pojedynczy przykład wejściowy
     * @returns Obiekt zawierający przewidywaną wartość oraz najbliższych sąsiadów
     */
    predict(sample: number[]): Result[] {
        const distances = this.trainFeatures.map((trainSample, index) => ({
            distance: this.calculateDistance(sample, trainSample.slice(0, sample.length)),
            label: this.trainLabels[index],
        }));

        // Posortuj sąsiadów według odległości
        distances.sort((a, b) => a.distance - b.distance);

        // Wybierz k najbliższych sąsiadów
        const nearestNeighbors = distances.slice(0, this.k) as Result[];

        return nearestNeighbors;
    }

    /**
     * Oblicza odległość między dwoma punktami
     * @param a - Pierwszy punkt
     * @param b - Drugi punkt
     * @returns Odległość między punktami
     */
    private calculateDistance(a: number[], b: number[]): number {
        if (a.length !== b.length) {
            throw new Error("Wektory a i b muszą mieć tę samą długość.");
        }

        if (this.distanceMetric === 'euclidean') {
            return Math.sqrt(a.reduce((sum, ai, i) => sum + (ai - b[i]) ** 2, 0));
        } else if (this.distanceMetric === 'manhattan') {
            return a.reduce((sum, ai, i) => sum + Math.abs(ai - b[i]), 0);
        } else {
            throw new Error(`Nieznana metryka odległości: ${this.distanceMetric}`);
        }
    }
}

// Parsowanie danych CSV
const csvData = `
Hobby,Physical Activity Level,Time Consumption,Sociability,Mobility,Competition,Relaxation Level,Monetization Potential,Noise Level,Environmental Impact,Mental Health Impact,Physical Health Impact,Artistic Expression,Initial Cost,Ongoing Cost
Gotowanie,2,4,3,2,2,4,4,2,2,4,3,4,3,3
Pieczenie,2,4,2,1,2,4,4,2,2,4,2,4,3,3
Malowanie,1,4,1,1,1,4,3,1,2,4,1,4,3,2
Rysowanie,1,3,1,1,1,4,3,1,1,4,1,4,2,2
Fotografia,2,3,2,4,2,4,4,1,1,4,2,4,4,2
Gra na gitarze,2,4,2,2,2,4,3,3,1,4,2,4,3,2
Gra na pianinie,2,4,2,1,2,4,3,3,1,4,2,4,4,2
Gra na perkusji,3,4,2,1,2,3,3,4,1,4,3,4,4,2
Czytanie książek,1,3,1,1,1,4,1,1,1,4,1,2,2,2
Pisanie poezji,1,3,1,1,2,4,2,1,1,4,1,4,1,1
Pisanie opowiadań,1,4,1,1,2,4,3,1,1,4,1,4,1,1
Gry komputerowe,1,4,3,1,4,3,3,2,1,3,1,2,4,3
Gry planszowe,1,3,4,2,4,3,2,2,1,4,1,2,3,2
Układanie puzzli,1,3,1,1,1,4,1,1,1,4,1,2,2,2
Oglądanie filmów,1,3,2,1,1,4,1,2,1,3,1,1,2,3
Oglądanie seriali,1,4,2,1,1,4,1,2,1,3,1,1,2,3
Słuchanie muzyki,1,2,1,1,1,4,1,2,1,4,1,1,2,2
Medytacja,1,2,1,1,1,4,2,1,1,4,2,1,1,1
Joga,3,3,2,2,1,4,3,1,1,4,4,2,2,2
Wędkowanie,2,4,2,3,2,4,2,1,2,4,2,1,3,3
Wspinaczka górska,4,4,3,4,3,3,2,1,2,4,4,1,4,3
Pływanie,4,3,2,3,3,4,2,1,1,4,4,1,2,2
Bieganie,4,3,2,4,3,4,2,1,1,4,4,1,2,2
Jazda na rowerze,4,3,2,4,3,4,2,1,1,4,4,1,3,2
Jazda na rolkach,4,3,2,3,2,3,2,1,1,4,4,1,2,2
Jazda na deskorolce,4,3,2,3,3,3,2,2,1,4,4,2,2,2
Spacery w naturze,3,2,2,3,1,4,1,1,1,4,4,1,1,1
Pielęgnacja ogrodu,3,4,1,2,1,4,2,1,4,4,3,3,3,3
Uprawa roślin domowych,2,3,1,1,1,4,2,1,3,4,2,3,2,2
Kolekcjonowanie znaczków,1,3,1,1,2,3,2,1,1,3,1,2,3,3
Kolekcjonowanie monet,1,3,1,1,2,3,2,1,1,3,1,2,4,3
Kolekcjonowanie figurek,1,3,1,1,2,3,2,1,1,3,1,2,4,3
Szachy,1,3,2,1,4,3,3,1,1,4,1,1,2,1
Warcaby,1,2,2,1,4,3,2,1,1,3,1,1,1,1
Nauka języków obcych,1,4,2,1,2,3,4,2,1,4,1,2,3,2
Taniec,4,3,4,3,3,4,3,2,1,4,4,4,2,2
Fitness,4,3,3,2,2,4,3,2,1,4,4,2,2,2
Pilates,3,3,2,2,1,4,3,1,1,4,4,2,2,2
Łucznictwo,2,3,2,2,3,4,2,1,1,4,3,1,4,3
Strzelectwo,2,3,2,2,3,3,2,4,1,3,2,1,4,3
Boks,4,4,3,2,4,3,3,2,1,4,4,1,3,3
Karate,4,4,3,2,4,3,3,2,1,4,4,1,3,2
Kickboxing,4,4,3,2,4,3,3,2,1,4,4,1,3,2
Judo,4,4,3,2,4,3,3,2,1,4,4,1,3,2
Modelarstwo,2,4,1,1,2,4,2,1,2,4,2,4,3,3
Budowanie domków dla ptaków,2,3,1,1,1,4,2,2,3,4,2,3,2,2
Robótki ręczne (szydełkowanie haftowanie),2,4,1,1,1,4,3,1,1,4,2,4,2,2
Dziewiarstwo,2,4,1,1,1,4,3,1,1,4,2,4,2,2
Szycie,2,4,1,1,1,4,4,2,2,4,2,4,3,2
Gra na ukulele,1,3,2,2,1,4,2,3,1,4,1,4,2,1
Tworzenie terrariów dla roślin,2,3,1,1,1,4,3,1,3,4,2,4,3,2
Uprawa bonsai,2,3,1,1,1,4,3,1,2,4,2,4,3,2
Zbieranie minerałów i kamieni szlachetnych,2,3,2,3,1,3,2,1,2,3,2,2,3,3
Paleontologia amatorska,3,4,2,4,1,3,2,1,2,3,3,1,3,3
Oglądanie gwiazd,1,3,2,2,1,4,2,1,1,4,1,1,4,2
Astrofotografia,2,4,2,2,2,4,3,1,1,4,1,4,4,2
Budowanie rakiet amatorskich,3,4,3,3,2,3,2,3,2,3,2,3,4,3
Polowanie na zorze polarne,2,4,2,4,1,4,3,1,2,4,2,3,4,4
Detekcja metali (poszukiwanie skarbów),3,4,2,4,2,3,2,1,2,3,3,1,3,2
Origami,1,3,1,1,1,4,2,1,1,4,1,4,1,1
Kaligrafia,1,4,1,1,1,4,3,1,1,4,1,4,2,2
Projektowanie tatuaży,1,4,2,1,2,4,4,1,1,4,1,4,2,2
Grafika komputerowa,1,4,1,1,2,3,4,1,1,4,1,4,4,2
Zbieranie starych map,1,3,1,2,1,3,2,1,1,3,1,2,3,3
Kartografia amatorska,2,4,1,3,1,3,2,1,1,3,2,4,3,2
Geocaching,3,3,3,4,2,3,1,1,2,4,4,1,2,2
Urban exploration,3,3,2,4,1,3,2,1,3,3,3,3,2,2
Tworzenie escape roomów,3,4,3,2,2,3,4,2,2,3,2,4,4,3
Sztuka kintsugi,2,4,1,1,1,4,3,1,2,4,2,4,3,3
Tworzenie biżuterii,2,4,1,1,1,4,4,2,2,4,2,4,3,3
Majsterkowanie,3,4,1,2,1,4,3,3,2,4,3,4,3,3
Złotnictwo,2,4,1,1,2,4,4,2,2,4,2,4,4,3
Lutowanie i elektronika,2,4,1,1,2,3,4,2,2,3,2,3,3,3
Robotyka,2,4,2,1,3,3,4,2,2,4,2,4,4,3
Programowanie,1,4,1,1,3,3,4,1,1,4,1,4,2,1
Budowanie i malowanie figurek do gier,2,4,1,1,1,4,3,1,2,4,2,4,3,3
Cosplay,3,4,3,2,3,3,3,1,2,4,2,4,4,3
Pisanie bloga,1,4,2,1,2,3,4,1,1,4,1,4,1,1
Prowadzenie podcastu,1,4,3,1,2,3,4,2,1,4,1,3,3,2
Streamowanie gier,1,4,4,1,3,2,4,2,1,3,1,2,4,2
Łowienie owadów i ich obserwacja,2,3,1,3,1,4,1,1,2,3,2,1,2,2
Hodowla pszczół,3,4,2,2,1,4,3,2,4,4,2,1,4,3
Akwarystyka słodkowodna,2,3,1,1,1,4,2,1,2,4,1,3,4,3
Akwarystyka morska,2,4,1,1,1,4,2,1,2,4,1,3,4,4
Hodowla mrówek,2,3,1,1,1,4,1,1,2,3,1,1,3,2
Prowadzenie farmy jedwabników,3,4,1,2,1,3,2,1,2,3,2,1,3,3
Zbieranie nasion,2,3,1,3,1,4,2,1,3,3,2,1,1,1
Wyrób świec,2,3,1,1,1,4,3,1,2,4,1,4,3,3
Wyrób mydła,2,3,1,1,1,4,3,1,2,4,1,4,3,3
Destylacja zapachów,2,3,1,1,1,4,3,1,2,4,1,3,4,3
Degustacja win,1,3,3,2,1,4,3,1,1,3,1,2,4,4
Degustacja kawy,1,3,2,2,1,4,3,1,1,3,1,2,3,4
Degustacja herbaty,1,3,2,2,1,4,3,1,1,3,1,2,3,4
Pieczenie chleba na zakwasie,2,4,2,1,1,4,3,1,1,4,2,4,2,3
Ręczne wytwarzanie makaronu,2,3,1,1,1,4,3,1,1,4,2,4,2,3
Budowanie modeli kolejek,2,4,1,1,1,4,2,2,2,4,1,4,4,3
Naprawa starych mebli,3,4,1,2,1,4,4,2,3,4,3,4,3,3
Renowacja antyków,3,4,1,2,1,4,4,2,2,4,2,4,3,3
Ręczne oprawianie książek,2,4,1,1,1,4,3,1,2,4,2,4,3,2
Bookbinding artystyczny,2,4,1,1,1,4,3,1,2,4,2,4,3,2
Skoki spadochronowe,4,3,3,4,3,3,2,2,2,4,4,1,4,4
Nurkowanie z akwalungiem,4,4,3,4,2,4,3,1,2,4,4,2,4,4
Freediving,4,4,3,4,3,3,3,1,1,4,4,2,3,3
Paralotniarstwo,4,4,3,4,3,3,3,2,2,4,4,2,4,4
Base jumping,4,3,3,4,4,2,3,2,2,3,4,2,4,4
Kajakarstwo ekstremalne,4,4,3,4,4,3,3,2,2,4,4,2,4,3
Zorbing,3,2,3,3,2,3,2,1,2,3,3,1,3,3
Snowboarding,4,4,3,4,3,3,3,1,2,4,4,2,4,3
Jazda na nartach,4,4,3,4,3,3,3,1,2,4,4,2,4,3
Nurkowanie jaskiniowe,4,4,3,4,3,2,3,1,2,3,4,2,4,4
Wspinaczka lodowa,4,4,3,4,3,2,3,1,2,4,4,2,4,4
Slacklining,4,3,2,3,2,3,2,1,1,4,4,2,3,2
Kitesurfing,4,4,3,4,3,3,3,2,1,4,4,3,4,3
Windsurfing,4,4,3,4,3,3,3,2,1,4,4,3,4,3
Parkour,4,4,3,4,3,2,3,1,1,4,4,3,2,2
Survival,4,4,3,4,2,3,3,1,2,4,4,1,3,3
Budowanie schronień w lesie,3,3,2,4,1,4,2,1,3,4,3,2,2,2
Sztuka przetrwania w dżungli,4,4,2,4,1,3,3,1,2,4,4,1,3,3
Hodowla gadów,2,4,1,1,1,3,2,1,2,3,1,1,4,4
Hodowla egzotycznych ptaków,2,4,1,1,1,3,3,3,2,3,1,2,4,4
Tworzenie lampionów,2,3,1,1,1,4,2,1,2,4,2,4,2,2
Rzeźbienie w glinie,2,4,1,1,1,4,3,1,2,4,2,4,3,2
Rzeźbienie w drewnie,3,4,1,2,1,4,3,2,2,4,3,4,3,2
Tworzenie rzeźb z metalu,3,4,1,2,1,4,3,3,2,4,3,4,4,3
Tkactwo artystyczne,2,4,1,1,1,4,3,1,1,4,2,4,3,2
Malowanie akwarelami,1,3,1,1,1,4,3,1,1,4,1,4,2,2
Malowanie olejami,1,4,1,1,1,4,3,1,2,4,1,4,3,3
Grafika warsztatowa,2,4,1,1,1,4,3,2,2,4,2,4,3,3
Fotografia analogowa,2,3,2,3,1,4,3,1,2,4,2,4,4,3
Filmowanie amatorskie,2,4,3,3,2,3,4,2,1,4,2,4,4,3
Animacja poklatkowa,2,4,1,1,2,4,4,1,1,4,1,4,3,2
Pisanie scenariuszy,1,4,1,1,2,4,4,1,1,4,1,4,1,1
Projektowanie gier,1,4,2,1,2,3,4,1,1,4,1,4,3,2
Składanie modeli z papieru (papercraft),2,3,1,1,1,4,2,1,1,4,1,4,2,2
Modelowanie 3D,1,4,1,1,2,3,4,1,1,4,1,4,3,2
Rysowanie mandali,1,3,1,1,1,4,2,1,1,4,1,4,1,1
Scrapbooking,2,3,1,1,1,4,2,1,2,4,1,4,3,2
Robienie albumów ze zdjęciami,1,3,1,1,1,4,2,1,1,4,1,4,3,2
Pisanie listów odręcznych,1,2,2,1,1,4,1,1,1,4,1,3,1,1
Projektowanie ubrań,1,4,1,1,2,4,4,1,2,4,1,4,3,3
Wolontariat,3,3,4,3,1,4,1,2,3,4,3,2,1,2
Organizowanie wydarzeń,2,4,4,3,2,3,4,3,2,4,2,3,3,3
Rekonstrukcja historyczna,3,4,4,3,2,3,2,2,2,4,3,4,4,3
LARP,3,3,4,3,2,3,2,2,1,4,3,4,3,2
D&D,1,3,4,1,2,4,2,2,1,4,1,4,2,2
Wspólne gotowanie,2,3,4,2,1,4,2,2,2,4,2,3,3,3
Organizowanie festynów lokalnych,3,4,4,3,1,3,3,4,2,4,2,3,4,3
Udział w maratonach,4,4,3,4,4,3,2,1,1,4,4,1,3,2
Zajęcia taneczne grupowe,4,3,4,3,2,4,2,3,1,4,4,4,2,2
Chór,2,3,4,2,2,4,2,3,1,4,2,4,1,1
Sudoku,1,2,1,1,2,4,1,1,1,4,1,1,1,1
Krzyżówki,1,2,1,1,2,4,1,1,1,4,1,2,1,1
Szarady,1,2,1,1,2,4,1,1,1,4,1,2,1,1
Rozwiązywanie łamigłówek logicznych,1,2,1,1,2,4,1,1,1,4,1,2,1,1
Nauka kodowania,1,4,1,1,3,3,4,1,1,4,1,3,2,1
Eksperymenty chemiczne,2,3,2,1,1,3,2,2,3,4,1,2,3,3
Mikroskopia amatorska,1,3,1,1,1,4,2,1,1,4,1,2,4,2
Filozofia,1,3,2,1,1,4,2,1,1,4,1,2,1,1
Historia sztuki,1,3,2,1,1,4,3,1,1,4,1,3,2,2
Udział w quizach,1,2,4,2,4,3,2,2,1,3,1,1,1,1
Tworzenie quizów,1,3,2,1,1,3,3,1,1,3,1,2,1,1
Obserwacja ptaków,2,3,2,3,1,4,2,1,1,4,2,2,3,2
Obserwacja dzikich zwierząt,2,3,2,4,1,4,2,1,1,4,2,2,3,2
Survival w górach,4,4,3,4,2,3,3,1,2,4,4,1,4,3
Zbieranie ziół,2,3,1,3,1,4,2,1,2,4,2,2,2,1
Uprawa grzybów,2,3,1,1,1,4,3,1,2,4,2,2,3,2
Wyprawy kajakowe,4,3,3,4,2,4,2,1,2,4,4,2,4,3
Kolarstwo górskie,4,3,2,4,3,3,2,1,2,4,4,1,4,2
Biwakowanie,3,3,3,4,1,4,1,1,2,4,3,1,3,2
Przygody w lesie,3,3,3,4,1,4,1,1,2,4,3,1,2,1
Testowanie oprogramowania,1,4,2,1,1,2,4,1,1,3,1,2,2,1
Tworzenie aplikacji mobilnych,1,4,2,1,2,3,4,1,1,3,1,4,2,1
Obróbka zdjęć,1,3,1,1,2,3,4,1,1,3,1,4,3,1
Obróbka wideo,1,4,1,1,2,3,4,1,1,3,1,4,3,1
Tworzenie stron internetowych,1,4,2,1,2,3,4,1,1,3,1,4,2,1
Nauka AI i machine learning,1,4,1,1,2,3,4,1,1,3,1,3,2,2
Tworzenie chatbotów,1,4,1,1,2,3,4,1,1,3,1,3,2,
Inżynieria dźwięku,1,4,2,1,2,3,4,2,1,3,1,4,4,2
Uprawa warzyw w domu,2,3,1,1,1,4,2,1,3,4,2,2,2,2
Hodowla mikroliści,2,3,1,1,1,4,2,1,2,3,2,2,2,2
Robienie eksperymentów naukowych w domu,2,3,2,1,1,3,2,2,2,4,1,2,3,3
Rozwój umiejętności barmańskich,2,3,3,1,2,3,4,2,1,3,2,4,3,3
Testowanie kosmetyków DIY,2,3,1,1,1,3,2,1,2,3,2,3,3,3
Produkcja naturalnych perfum,2,3,1,1,1,4,3,1,2,3,1,4,3,3
Dogtrekking,4,3,2,4,2,4,2,2,1,4,4,1,3,3
Hodowla motyli,2,3,1,1,1,4,2,1,2,3,1,3,3,3
Żonglowanie,3,3,2,2,2,4,2,1,1,4,3,4,1,1
Nauka sztuczek magicznych,2,3,3,2,2,3,3,1,1,4,2,4,2,2
Jazda na monocyklu,4,3,2,3,2,3,2,1,1,4,4,3,2,1
Prowadzenie kanału YouTube,1,4,3,1,2,2,4,2,1,3,1,4,3,2
Projektowanie wnętrz,1,4,2,2,2,3,4,1,2,3,1,4,3,3
Dekorowanie ciast artystycznych,2,4,2,1,2,4,4,1,1,4,1,4,3,3
Projektowanie zabawek,2,4,1,1,2,4,4,1,2,3,1,4,3,2
Rozwiązywanie starych zagadek historycznych,1,4,2,2,1,3,2,1,1,4,1,2,2,2
Genealogia,1,4,2,2,1,3,3,1,1,3,1,2,2,2
Tworzenie drzewek genealogicznych,1,3,2,1,1,3,3,1,1,3,1,3,2,2
Badanie archiwów lokalnych,2,4,2,2,1,3,2,1,1,3,1,2,2,2
Tworzenie ilustracji książkowych,1,4,1,1,2,4,4,1,1,4,1,4,3,2
Hodowla jedwabników,2,4,1,1,1,3,2,1,2,3,1,1,3,3
Tworzenie własnych gier karcianych,1,4,3,1,2,3,3,1,2,4,1,4,2,2
`;

function parseCSV(data: string): { features: number[][]; targets: string[], headers: string[] } {
    const rows = data.trim().split('\n')
    const headers = rows[0].split(',').slice(1);
    const dataRows = rows.slice(1);
    const features: number[][] = [];
    const targets: string[] = [];

    for (const row of dataRows) {
        const [l, ...f] = row.split(',');
        features.push(f.map(Number));
        targets.push(l);
    }

    return { features, targets, headers };
}

const { features, targets, headers } = parseCSV(csvData);

const NEAREST_NEIGHBOR = 5
// Użycie klasy KNN
const knn = new KNN(NEAREST_NEIGHBOR); // Ustawienie liczby sąsiadów na 3
knn.train(features, targets);


if (import.meta.main) {
// this is the main module
const g = []
for (let i = 0; i < features[0].length; i++) {
    const v = prompt(`${headers[i]}:`);
    g.push(Number(v));
    const neighbors = knn.predict(g);
    const left = knn.elliminateVisual(g)
    console.log({ neighbors })
    console.log({ left })
}
} else {
// we were require()d from somewhere else
}
