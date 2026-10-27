# 🗣️ AIAphasia

AIAphasia è un progetto che mappa l'intersezione tra intelligenza artificiale e afasiologia clinica — catalogando come gli strumenti basati su IA (terapie digitali adattive, classificatori diagnostici ASR/NLP, modelli prognostici di machine learning, decodificatori BCI del linguaggio interiore, AAC generativa) vengono applicati alla diagnosi, prognosi, trattamento e comunicazione assistita dell'afasia, confrontando questo panorama con la reale eterogeneità clinica del disturbo.

Il risultato è un'ontologia OWL formale e un knowledge graph popolato che copre **40 strumenti/studi IA (2007–2026)**, **1585 triple RDF**, validate con il reasoner HermiT (nessuna inconsistenza logica). L'ontologia allinea esplicitamente le proprie classi di primo livello a DOLCE-Ultralite (pattern Descriptions & Situations) e, a livello di singolo dominio linguistico/modalità, alla classificazione ICF dell'OMS; documenta inoltre i propri Ontology Design Pattern e le proprie domande di competenza negative. Test diagnostici, tecniche IA e domini extra-linguistici — tre gruppi di nodi che restavano ai margini del grafo, raggiungibili solo tramite `rdf:type` — portano ora proprie relazioni uscenti (`assessesModality`, `detectsSymptom`, `processesModality`, `associatedExtraLinguisticDomain`), e una proprietà simmetrica (`coOccursWithSymptom`) collega orizzontalmente i sintomi clinicamente riportati come concomitanti, con la direzione inversa inferita dal reasoner senza bisogno di asserirla a mano. Alcune caratteristiche la rendono più di un semplice catalogo: **due classi definite** — `UndifferentiatedByAphasiaSubtype`, operazionalizzata come query SPARQL a mondo chiuso sul catalogo curato dei 40 strumenti, e `HighEvidenceApplication`, derivata invece da valori dichiarati e quindi correttamente inferita da HermiT senza bisogno di chiudere il mondo — che fanno emergere rispettivamente quanto il settore tratti "l'afasia" come categoria indifferenziata, e quante delle sue applicazioni poggino su evidenza clinica robusta; vincoli di cardinalità qualificata che rendono ogni `ClinicalApplication` un'istanza ben formata per costruzione, non solo per convenzione; una **proprietà derivata via property chain** (`toolTargetsAphasiaType`) che permette al reasoner di collegare direttamente uno strumento al sottotipo trattato attraverso la cerniera reificata; e una **meta-analisi statistica formalizzata** che confronta gli strumenti IA che lavorano sul comportamento osservabile con quelli che decodificano direttamente dal segnale neurale durante il linguaggio interiore/immaginato, con effect size, stime aggregate a effetti casuali e un test di significatività rappresentati come individui di prima classe nel grafo.

---

## L'ontologia

L'ontologia è modellata in RDF/OWL (Turtle), progettata in Protégé e validata con il reasoner HermiT. Formalizza due domini intrecciati, connessi tramite una classe-cerniera reificata, `ClinicalApplication`, allineata esplicitamente a `dul:Situation` (DOLCE-Ultralite, pattern Descriptions & Situations — stub locali non importati per intero, per restare verificabili offline) e vincolata da restrizioni di cardinalità qualificata (esattamente un `isApplicationOf`, esattamente un `hasEvidenceLevel`, almeno un `hasLimitation`):

- **Tassonomia clinica dell'afasia** — due rami eziologici, `PostStrokeAphasia` (modello neoclassico di Boston, 8 sindromi) e `PrimaryProgressiveAphasia` (criteri di Gorno-Tempini et al. 2011, 3 varianti canoniche + una categoria atipica/non classificabile), allineati a ICD-11 (MA80.0) e ICD-10-CM (R47.01), con una nota epistemologica esplicita sullo status contestato dello stesso modello categoriale. I domini linguistici, le modalità comunicative e i domini extra-linguistici sono inoltre allineati, dominio per dominio, alla classificazione ICF dell'OMS (es. `OralComprehension`→b1670, `Acalculia`→b172).
- **Panorama degli strumenti IA** — 40 strumenti/studi distribuiti su quattro tipi di applicazione disgiunti (`TherapeuticApplication`, `DiagnosticApplication`, `PrognosticApplication`, `AssistiveApplication`), ciascuno con una tecnica IA dichiarata, un punteggio di evidenza a 5 livelli, e almeno un `Limitation` dichiarato (dati, governance clinica, generalizzabilità, validità di costrutto, accessibilità, o confine nosografico). Nove di questi portano una **misura di effect size** reificata (Cohen's h rispetto a una baseline di chance), aggregata in due pool a effetti casuali — uno per gli strumenti che operano sul comportamento osservabile, uno per quelli che decodificano il linguaggio covert/interiore — con un confronto formale di significatività tra i due.
- **Pattern di progettazione e domande di competenza negative** — l'ontologia nomina esplicitamente i propri Ontology Design Pattern (reificazione n-aria, Classification ODP, tassonomia ortogonale dei limiti, due forme di classe definita, property chain) e documenta, oltre alle otto domande di competenza positive, quattro domande di competenza che l'ontologia **non può** rispondere per limite strutturale di OWL DL (evoluzione temporale, causalità, chiusura del mondo, profili clinici misti) — si veda `sparql/negative-competency-questions.md`.

Un solo file:

`ontology/aiaphasia-ontology.ttl` — l'ontologia completa + il knowledge graph popolato (schema e istanze insieme)

---

## Il dataset

`datasets/aiaphasia-tools.csv` — esportazione tabellare dei 40 strumenti mappati (anno, categoria tecnica, sviluppatore, URL fonte, tipo di applicazione).
`datasets/state-of-the-art-analysis.md` — l'analisi completa dello stato dell'arte (crescita nel tempo, maturità dell'evidenza, lacune di copertura per modalità/sottotipo).
`datasets/meta-analysis-direction.md` — la meta-analisi statistica completa: protocollo, calcolo degli effect size, pool a effetti casuali, forest plot, confronto tra le due famiglie di approccio.

---

## Lavori correlati

Tre punti di riferimento si collocano vicino ad AIphasia, e nessuno fa esattamente lo stesso lavoro — individuare lo scarto rispetto a ciascuno è il modo più chiaro per dichiarare il contributo specifico di questo progetto.

- **SNOMED CT** — la terminologia clinica più estesa in uso, centinaia di migliaia di concetti e relazioni che coprono praticamente ogni diagnosi, reperto e procedura in medicina, afasia inclusa. Non fa: non è un sistema di inferenza costruito attorno a una domanda di ricerca specifica; non ha alcuna nozione di "strumento IA", "livello di evidenza" o "effect size aggregato", e nulla al suo interno è pensato per essere interrogato da un reasoner DL su un confronto statistico puntuale.
- **HPO (Human Phenotype Ontology)** — un'ontologia OWL formale dei fenotipi anomali, costruita per lo stesso stile di ragionamento DL che AIphasia impiega, e la più vicina delle tre per rigore di ingegneria ontologica: classi definite, cross-reference verso altre ontologie, uso a scala reale nella diagnostica di malattie rare. Non fa: descrive fenotipi, non gli strumenti costruiti per rilevarli o trattarli, e non porta alcun livello di sintesi dell'evidenza — nessun effect size, nessuna stima aggregata, nulla che somigli a una meta-analisi come cittadino di prima classe nel grafo.
- **ICF (OMS)** — la classificazione che questo progetto riusa effettivamente: domini linguistici e modalità comunicative portano codici ICF espliciti (es. `OralComprehension`→b1670), letti direttamente da uno standard clinico esterno riconosciuto invece che inventati localmente. Non fa: ICF classifica funzione e disabilità in modo descrittivo, non è formalizzata in OWL DL, non porta alcun controllo di consistenza automatico, e non è mai stata pensata per catalogare strumenti IA o la loro evidenza di supporto.

**Cosa c'è di effettivamente nuovo.** Nessun progetto in questo insieme combina un catalogo OWL formale di un campo IA clinico con un livello di sintesi statistica dell'evidenza *dentro lo stesso grafo*: Cohen's h, stime pooled a effetti casuali, eterogeneità I² e un controllo di publication bias sono individui interrogabili via SPARQL, non numeri che vivono in un PDF separato accanto all'ontologia. Questa combinazione — allineamento clinico di livello terminologico (ICF) più rigore formale di livello DL (lo stile di HPO) più una meta-analisi come parte interrogabile del grafo — è la nicchia specifica che nessuno dei due progetti di riferimento occupa.

---

## Validazione formale

Le otto domande di competenza positive (`sparql/cq1_*.rq` – `sparql/cq8_*.rq`) non sono state solo scritte: sono state eseguite fresche con rdflib contro il grafo attuale (1585 triple), confrontando ogni risultato atteso dichiarato nel file `.rq` con il risultato osservato realmente.

| CQ | Domanda | Atteso | Osservato | Esito |
|---|---|---|---|---|
| 1 | Distribuzione del livello di evidenza | Maggioranza a Livello 4; un solo caso a Livello 1 | Livello 4: 26/40; Livello 1: 1/40 | ✅ confermato |
| 2 | Crescita nel tempo | Crescita concentrata nel 2022–2026 | 28 dei 40 strumenti pubblicati nel 2022–2026 | ✅ confermato |
| 3 | Copertura per modalità comunicativa | Produzione orale dominante; comprensione scritta a copertura zero | Produzione orale 27, comprensione orale 11, produzione scritta 3, comprensione scritta 0 | ✅ confermato |
| 4 | Sottotipi scoperti | Transcorticali (motoria/sensoriale/mista) e PPA atipica a copertura zero | Tutte e quattro a 0 | ✅ confermato |
| 5 | Applicazioni indifferenziate per sottotipo | 27 su 40 | 27 su 40 | ✅ confermato |
| 6 | Confronto tra le due famiglie meta-analitiche | h=0,962/I²=54,5% (A), h=0,878/I²=84,8% (B), p=0,796 | Valori identici letti direttamente dal grafo | ✅ confermato |
| 7 | Strumenti che trattano l'afasia di Broca | 8 strumenti | 8 strumenti — inclusa Careful Whisper, la cui `ClinicalApplication` dichiara esplicitamente Broca come uno dei quattro sottotipi distinti | ✅ confermato |
| 8 | Applicazioni con evidenza robusta | 4 su 40 | 4 su 40, e la classe definita `HighEvidenceApplication` inferisce correttamente gli stessi 4 individui via HermiT, senza alcuna tripla di appartenenza asserita a mano | ✅ confermato, con cross-check indipendente |

Tutte e otto le domande di competenza restituiscono esattamente il risultato atteso, verificato contro il grafo reale e non assunto.

**Controllo leggero stile OOPS! sulla `.ttl`**, oltre alle otto CQ:

- **Domini e range**: tutte le 39 proprietà dichiarate (21 object property, 18 datatype property) hanno sia `rdfs:domain` sia `rdfs:range` — nessuna lacuna silenziosa.
- **Cicli e ridondanze**: nessun ciclo nella gerarchia di classi; nessuna asserzione di sottoclasse ridondante (nessuna classe ridichiara sia un genitore diretto sia uno dei suoi antenati).
- **Disgiunzione**: dichiarata tramite tre gruppi `owl:AllDisjointClasses` (le 4 tipologie di `ClinicalApplication`; le 7 sindromi foglia post-ictus non-globali; le 4 varianti di PPA). `GlobalAphasia` è deliberatamente esclusa dal gruppo post-ictus perché è asserita come sottoclasse sia di `FluentAphasia` sia di `NonFluentAphasia` — un'eccezione documentata nel file stesso, non una svista.
- **Classi senza istanze asserite (34 su totale)**: non sono peso morto. 12 sono le sindromi foglia, che l'ontologia rende deliberatamente sia classi (per la gerarchia e la disgiunzione) sia individui nominati via punning esplicito (così possono fungere da valore di `targetsAphasiaType`), già documentato inline nel file; 2 sono le classi definite, correttamente popolate solo per inferenza, mai a mano; 1 è lo stub locale di `dul:Description`, mantenuto per allineamento documentale e mai dichiarato equivalente ad alcuna classe di AIphasia.
- **HermiT**: ri-eseguito su questo stesso file, zero classi inconsistenti; `HighEvidenceApplication` inferisce correttamente 4 istanze; `UndifferentiatedByAphasiaSubtype` ne inferisce 0, esattamente come previsto dalla nota epistemologica sull'open-world assumption già presente nell'ontologia — la query SPARQL a mondo chiuso (CQ5) resta l'unico modo corretto di ottenere il conteggio di 27.

---

## Riprodurre il controllo di consistenza

```bash
pip install rdflib owlready2 --break-system-packages
python3 -c "
import rdflib
g = rdflib.Graph(); g.parse('ontology/aiaphasia-ontology.ttl', format='turtle')
g.serialize(destination='ontology.owl', format='xml')
import owlready2 as owl
onto = owl.get_ontology('file://' + __import__('os').path.abspath('ontology.owl')).load()
with onto:
    owl.sync_reasoner_hermit(infer_property_values=False, debug=0)
print('Classi inconsistenti:', list(onto.inconsistent_classes()))
"
```

---

## Sul progetto

Questo progetto è stato sviluppato come progetto universitario, per esplorare come i metodi di ontology engineering e knowledge graph — comuni nei corsi di Digital Humanities — possano essere applicati a una domanda di informatica clinica: cosa copre davvero l'IA, e cosa non copre ancora, nel trattamento dell'afasia.

## Autori

- @fabrizioginesi

## Licenza

Ontologia e dataset: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Eventuale codice del sito: MIT (vedi `LICENSE`).
