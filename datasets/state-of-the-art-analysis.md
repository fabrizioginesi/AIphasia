# Lo stato dell'arte dell'Intelligenza Artificiale nel trattamento clinico dell'afasia
### Un'analisi basata su knowledge graph (33 strumenti/studi, 2007-2026)

## 1. Ambito e metodo

Questa panoramica si basa sull'ontologia `AIAphasia` (983 triple, validata con reasoner HermiT, nessuna inconsistenza logica), popolata attraverso una ricerca per categorie tematiche dichiarate — terapia digitale adattiva, classificazione/diagnosi automatica, modelli prognostici, tecnologie assistive (AAC/BCI) — su arXiv, PubMed/PMC, medRxiv, ASHA Journals, Nature/ScienceDirect, e siti di prodotto per gli strumenti commerciali. Include **33 strumenti o studi**, ciascuno con: tecnica IA impiegata, dominio linguistico e modalità comunicativa indirizzati, livello di evidenza su scala 1-5, e almeno un limite esplicitamente dichiarato.

**Nota metodologica per il paper**: questa è una ricerca per categorie, non ancora una revisione sistematica in senso stretto (mancano stringhe di ricerca booleane fisse, doppio screening indipendente, diagramma PRISMA). È il passo naturale successivo se si intende procedere verso una pubblicazione (vedi §5).

## 1bis. I quattro grafici di riferimento

![Distribuzione del livello di evidenza](charts/01_evidenza.png)

![Crescita nel tempo](charts/02_crescita.png)

![Copertura per modalità comunicativa](charts/03_modalita.png)

![Copertura per sottotipo di afasia](charts/04_sottotipi.png)

*Generati direttamente dal knowledge graph (`aiaphasia-ontology.ttl`, 1068 triple) tramite query SPARQL; rigenerabili in qualunque momento rieseguendo le stesse query se il grafo viene ampliato.*

## 2. Le quattro famiglie di applicazione

Classificare ogni strumento per **funzione clinica**, non solo per tecnica, è ciò che permette confronti quantitativi altrimenti impossibili:

- **Applicazioni terapeutiche** (17/33, 52%) — trattano direttamente la funzione linguistica compromessa. Include sia la generazione più consolidata di terapie digitali adattive (Constant Therapy, iTalkBetter, Big CACTUS, AphasiaScripts, VNeST computerizzato), sia le più recenti basate su modelli generativi (RehabilitIA, ChatPhasia, SpeakNow) e su interfacce cervello-computer (training EEG, BCI P300).
- **Applicazioni diagnostiche** (9/33, 27%) — rilevano, classificano o quantificano il disturbo: pipeline ASR+classificatore per il rilevamento dell'afasia dal parlato spontaneo, classificazione dei sottotipi di Primary Progressive Aphasia, rilevamento automatico di parafasie, stima della gravità (AQ) da neuroimmagini o da discorso.
- **Applicazioni prognostiche** (4/33, 12%) — predicono l'esito futuro senza trattare: PLORAS e i suoi successori basati su machine learning, predizione precoce (fase acuta) del recupero a 12 mesi, predizione del recupero in popolazioni bilingui.
- **Applicazioni assistive** (3/33, 9%) — sostituiscono o aumentano la comunicazione residua senza necessariamente mirare al recupero: AAC potenziata da LLM, neuroprotesi vocale, fusione LLM+speller BCI.

## 3. Tre pattern quantitativi che il grafo rende visibili

**3.1 Il campo è immaturo dal punto di vista dell'evidenza, in modo sistematico**

Su 33 strumenti, **19 (58%) si fermano al livello "prototipo sperimentale"**, e un solo strumento (Big CACTUS/CSLT) raggiunge evidenza di RCT multicentrico.

Il divario non è distribuito casualmente: le applicazioni **terapeutiche** hanno il punteggio medio di evidenza più alto (2,71/5) — comprensibile, dato che sono la categoria più matura e storicamente più studiata — mentre diagnostica, prognostica e assistiva si attestano tutte intorno a 2,0/5. **Questa è probabilmente la scoperta più citabile del progetto**: la comunità di ricerca ha investito sforzo clinico di validazione soprattutto sugli strumenti che somministrano terapia, lasciando le applicazioni diagnostiche/prognostiche/assistive — nonostante il loro potenziale interesse per la pratica clinica quotidiana — a uno stadio più preliminare.

**3.2 Crescita esponenziale recente, concentrata nell'ultimo quinquennio**

Dal 2007 al 2021 il grafo raccoglie in tutto 9 strumenti in 15 anni; dal 2022 al 2026 ne raccoglie 23 in appena 5 anni, con una tecnica — LLM generativi — che compare per la prima volta nel campione nel 2023 e già raggiunge la stessa frequenza (7 strumenti) dell'ASR, la tecnica più longeva e consolidata del settore. Questo colloca il progetto in una posizione favorevole: sta mappando un campo che sta letteralmente esplodendo mentre lo si osserva, il che rende una "fotografia" strutturata particolarmente utile alla comunità.

**3.3 Un vuoto netto sulle modalità scritte**

La produzione orale è indirizzata da 26 applicazioni su 33; la comprensione orale da appena 5; la produzione scritta da 3; **la comprensione scritta (alessia) da zero**. Nonostante il materiale clinico di partenza di questo stesso progetto descriva l'alessia come una conseguenza frequente sia dell'afasia di Broca sia di quella di Wernicke, **nessuno dei 33 strumenti mappati la indirizza esplicitamente**. Allo stesso modo, 22 applicazioni su 33 (67%) non dichiarano un sottotipo di afasia specifico come target, trattando "l'afasia" come categoria indifferenziata — un disallineamento rispetto alla pratica clinica reale, dove il sottotipo guida fortemente la scelta terapeutica (come documentato nel materiale clinico all'origine di questo progetto).

## 3bis. La tassonomia clinica matura, e perché conta per l'analisi

La classificazione dell'afasia nel grafo è stata approfondita rispetto alla versione iniziale, su due assi:

**Asse eziologico**: `AphasiaType` si divide ora in `PostStrokeAphasia` (eziologia vascolare/acuta, modello neoclassico di Boston — 8 sindromi, inclusa l'Afasia Transcorticale Mista/da isolamento, spesso omessa nelle trattazioni sintetiche) e `PrimaryProgressiveAphasia` (eziologia neurodegenerativa, criteri di consenso Gorno-Tempini et al. 2011 — varianti semantica, non-fluente/agrammatica, logopenica, più una categoria per i casi atipici che la letteratura più recente, Neurology 2024, documenta come non riconducibili nettamente a nessuna delle tre). Sono rami nosograficamente distinti: la ricerca ha dovuto tenerli separati perché gli strumenti diagnostici mappati nel grafo (es. la classificazione automatica delle varianti PPA da trascrizione Whisper) si rivolgono esplicitamente all'uno o all'altro, mai a entrambi.

**Asse epistemologico**: l'ontologia dichiara esplicitamente, nel commento alla classe `AphasiaType`, che il modello categoriale adottato (quello clinicamente più diffuso) è oggetto di critica consolidata in letteratura — non cattura tutti i profili reali, tratta il linguaggio come funzione isolata, ignora le alterazioni cognitive concomitanti — e che un modello alternativo (cognitivo-neuropsicologico, basato su batterie come la PALPA) scompone il linguaggio in moduli di elaborazione invece che in sindromi. La scelta del modello categoriale è dichiarata come decisione di modellazione, motivata dalla sua compatibilità con gli strumenti diagnostici IA mappati (quasi tutti addestrati per classificare in categorie discrete), non presentata come unico fatto clinico possibile.

**Allineamento a standard**: `AphasiaType` riporta ora il codice ICD-11 (MA80.0) e ICD-10-CM (R47.01), con una nota esplicita che questi standard sanitari non distinguono i sottotipi clinici — motivo per cui una tassonomia OWL dedicata, più granulare, ha valore descrittivo autonomo.

## 3ter. La lacuna di differenziazione: dove l'IA non segue la clinica

Con 12 sottotipi ora formalmente distinti (8 post-ictus + 4 PPA) e 33 strumenti mappati, il grafo permette di chiedere: *quanti strumenti si rivolgono esplicitamente a ciascun sottotipo?*

| Sottotipo | N. strumenti che lo targettizzano |
|---|---|
| Broca | 8 |
| Anomica | 8 |
| Conduzione | 4 |
| Wernicke | 3 |
| Globale | 1 |
| Variante semantica (svPPA) | 1 |
| Variante non-fluente/agrammatica (nfvPPA) | 1 |
| Variante logopenica (lvPPA) | 1 |
| **Transcorticale motoria** | **0** |
| **Transcorticale mista (da isolamento)** | **0** |
| **Transcorticale sensoriale** | **0** |
| **PPA atipica/non classificabile** | **0** |

**Questa è probabilmente la scoperta più utile per un paper**: l'intera famiglia delle afasie "transcorticali" (motoria, sensoriale, mista) — tre sottotipi su otto della classificazione post-ictus — non è targettizzata da **nessuno** dei 33 strumenti mappati, nonostante siano sindromi cliniche riconosciute con profilo di trattamento specifico (la ripetizione conservata le rende, in teoria, buone candidate per protocolli di rinforzo diversi da Broca/Wernicke). Allo stesso modo, la categoria "PPA atipica" — che la letteratura clinica più recente stima essere una porzione non trascurabile dei casi di PPA — è del tutto assente dagli strumenti diagnostici automatici, che si concentrano sulle tre varianti canoniche.

A questo si aggiunge il dato già noto: **20 strumenti su 33 (61%) non dichiarano affatto un sottotipo target**, trattando "l'afasia" come categoria indifferenziata. Le due osservazioni insieme suggeriscono una lettura precisa: l'IA applicata all'afasia non ignora la sotto-tipizzazione clinica per scelta motivata, ma converge — probabilmente per ragioni di disponibilità dei dati di addestramento — su un piccolo numero di sindromi "prototipiche" (Broca, Anomica) ben rappresentate nei corpora di parlato patologico più usati in ricerca (es. AphasiaBank), lasciando scoperte le sindromi meno frequenti o più difficili da distinguere automaticamente.

## 4. Sintesi per un abstract

*"Analizzando sistematicamente 33 strumenti di intelligenza artificiale applicati alla diagnosi, prognosi, terapia e comunicazione assistita nell'afasia (2007-2026) attraverso un knowledge graph OWL validato con reasoner — la cui tassonomia clinica distingue 12 sottotipi lungo due assi eziologici (afasia post-ictus secondo il modello di Boston, afasia progressiva primaria secondo i criteri Gorno-Tempini) — emerge un campo in rapida crescita (23 strumenti negli ultimi 5 anni) ma strutturalmente immaturo sul piano dell'evidenza clinica (58% allo stadio di prototipo sperimentale) e sistematicamente concentrato su un sottoinsieme ristretto di sindromi: l'intera famiglia delle afasie transcorticali (3 sottotipi su 8) e la categoria di PPA atipica non sono targettizzate da alcuno strumento, e il 61% degli strumenti non dichiara affatto un sottotipo, indicando una convergenza della ricerca IA su sindromi 'prototipiche' più che un adattamento alla reale eterogeneità clinica dell'afasia."*

## 5. Cosa manca per essere un paper, non solo un'overview

1. **Formalizzare il protocollo come sistematico**: stringhe di ricerca booleane esplicite per database (PubMed, ACL Anthology, IEEE Xplore, arXiv), criteri di inclusione/esclusione pre-registrati, e idealmente un secondo revisore per un sottoinsieme (calcolo di accordo inter-rater).
2. **Espandere ulteriormente** verso 50-60 strumenti per rendere le medie per categoria (specialmente Assistiva, n=3, e Prognostica, n=4) statisticamente più robuste — al momento sono indicative ma il campione è piccolo.
3. **Allineamento a ICF/SNOMED CT** per i tipi di afasia, per rispondere preventivamente all'obiezione "perché una tassonomia nuova".
4. **Una sezione di discussione clinica**, idealmente con un co-autore logopedista o neuropsicologo, che interpreti il vuoto sulla comprensione scritta e la scarsa specificità di sottotipo: sono limiti tecnici (i dataset di parlato sono più facili da raccogliere del testo scritto da persone con afasia) o scelte deliberate della comunità di ricerca?
5. **Rendere il grafo interrogabile pubblicamente** (endpoint SPARQL) così che il "paper risorsa" sia accompagnato da uno strumento riusabile da altri ricercatori, non solo da un PDF.

## 6. Fonti (per strumento, si veda `aiaphasia-ontology.ttl`)

**Classificazione clinica**: Goodglass & Kaplan (2001), *The Assessment of Aphasia and Related Disorders* (Boston classification); Gorno-Tempini et al. (2011), "Classification of primary progressive aphasia and its variants", *Neurology* 76:1006-1014; Botha/Utianski et al. (2024), "Primary Progressive Aphasia Lacking Core Features of Nonfluent and Semantic Variants", *Neurology* 103(9):e209924; Mazzeo et al. (2024) sui profili misti semantico-logopenici; Ardila (2010), "A proposed reinterpretation and reclassification of aphasic syndromes", *Aphasiology* 24(3):363-394; ICD-11 MA80.0 e ICD-10-CM R47.01 (WHO).

Le 33 fonti sugli strumenti IA sono documentate individualmente nel file OWL/Turtle (proprietà `aiaph:sourceURL` su ciascun `AITool`). Includono: Kiran & Smith (2025); Cherney et al. (2008); Furnas & Edmonds (2014); Palmer et al. (2019, Big CACTUS); Harrison et al. (2023); Barberis et al. (2024); UCSF Memory and Aging Center (2026); *Careful Whisper* (arXiv:2308.01327); rilevamento parafasie seq2seq (arXiv:2312.10518); City St George's University of London — progetto MARS (2026); Galindo-Cera et al. (2027, RehabilitIA); Tong et al. (2025, ChatPhasia); BrainWise Media (2025); Giachero et al. (2020); studio ECA+Furhat (2026); Moses et al. (2021, NEJM); Price et al./Seghier et al. (PLORAS); Marte et al. (2026); studio CNN 3D morfometria (Nature Communications Medicine, 2024); Herath et al. (2022, MFCC); Salem et al. (2023, JSLHR); Ballard et al. (2019); Smaili et al. (2022); Bu et al. (2022); Mao et al. (2025); Caria (2025); Musso et al. (2022); Lingraphica (materiale di prodotto); Niculescu et al. (2026, SpeakNow); studio su afasia bilingue (Stroke, 2025); studio SVR/RF multimodale (2025); stima AQ da discorso (2024); rassegna BCI P300 (BEFS 2025).
