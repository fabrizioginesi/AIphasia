# Domande di competenza negative

Le otto query in questa cartella (`cq1`...`cq8`) documentano cosa l'ontologia **può**
rispondere. Questo file elenca invece cosa l'ontologia **non può** rispondere, e perché —
non per un'omissione da correggere, ma per un limite intrinseco di OWL DL (monotono,
senza tempo, open-world). Non sono tradotte in file `.rq` perché non sono interrogabili:
la loro assenza è il punto.

Le stesse quattro domande, con la motivazione completa, sono annotate anche nel grafo
stesso come valori di `aiaph:negativeCompetencyQuestionNote` sull'IRI dell'ontologia
(`ontology/aiaphasia-ontology.ttl`, §17), così da restare un'affermazione verificabile
e non solo un commento di documentazione esterna.

**CQ-NEG-1 — Evoluzione temporale.** "Lo strumento X è diventato più accurato tra la
versione pubblicata nel 2022 e quella del 2024?" Non rispondibile: il grafo non modella
il tempo come dimensione delle proprietà. Ogni `aiaph:EffectSizeMeasurement` è legata a
una singola `ClinicalApplication`-istante, non a una serie storica dello stesso strumento.

**CQ-NEG-2 — Causalità.** "Perché gli strumenti covert/consciential mostrano un'eterogeneità
(I²) molto più alta di quelli comportamentali?" Non rispondibile come inferenza del
reasoner: OWL DL descrive cosa è vero nel grafo (i valori di `iSquared` asseriti sui due
`aiaph:MetaAnalyticPool`), non relazioni causali tra la natura del segnale neurale e la
dispersione statistica osservata. L'interpretazione resta nel testo discorsivo
(`datasets/meta-analysis-direction.md`), non nell'assiomatica.

**CQ-NEG-3 — Chiusura del mondo per le annotazioni di limite.** "Quali applicazioni non
hanno ancora un limite dichiarato, cioè sono scientificamente solide senza riserve?" Non
rispondibile come fatto clinico: l'assenza di una tripla `hasLimitation` non autorizza a
concludere che un limite non esista, solo che non è stato ancora annotato (Open World
Assumption). Questo è diverso, e lo diciamo esplicitamente, dal caso di
`UndifferentiatedByAphasiaSubtype` (§1b dell'ontologia): lì il catalogo delle 40
`ClinicalApplication` è trattato come deliberatamente chiuso a fini analitici (è un
elenco curato e completo delle fonti reperite), e l'assenza di `targetsAphasiaType` è
proprio il fenomeno misurato — un'equivalenza extensionale fatta esplicita tramite la
query a mondo chiuso `cq5_undifferentiated_applications.rq`. Qui invece nessuna fonte
originaria ha mai descritto una delle 40 applicazioni come "priva di limiti": un'assenza
di annotazione significherebbe lacuna di documentazione, non un fatto clinico.

**CQ-NEG-4 — Profili clinici misti.** "Un paziente con un profilo misto, non classificabile
in una sola sindrome, a quale sottotipo appartiene?" Non rispondibile in modo univoco: le
sindromi foglia non-globali sono dichiarate `owl:AllDisjointClasses`, quindi il reasoner
segnalerebbe un'inconsistenza se un singolo individuo-paziente fosse asserito come
istanza di due di esse contemporaneamente. È un limite dichiarato del modello
categoriale-neoclassico stesso (si veda la nota epistemologica su `aiaph:AphasiaType`),
non un bug della modellazione OWL: `aiaph:AtypicalOrUnclassifiedPPA` è la sola valvola di
sfogo prevista, e solo per il ramo della PPA.
