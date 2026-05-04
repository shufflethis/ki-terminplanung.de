import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LASTMOD = '2026-05-04';

const SITE = {
  name: 'KI-Terminplanung',
  origin: 'https://www.ki-terminplanung.de',
  email: 'hi@ki-terminplanung.de',
  phone: '+49 30 403665430',
  company: 'track by track GmbH',
  address: {
    streetAddress: 'Schliemannstr. 23',
    postalCode: '10437',
    addressLocality: 'Berlin',
    addressCountry: 'DE',
  },
};

const img = (id, w = 1400, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const IMAGES = {
  home: img('photo-1557804506-669a67965ba0', 1800, 1100),
  office: img('photo-1497366811353-6870744d04b2'),
  health: img('photo-1551076805-e1869033e561'),
  dentist: img('photo-1606811971618-4486d14f3f99'),
  beauty: img('photo-1562322140-8baeececf3df'),
  restaurant: img('photo-1555396273-367ea4eb4db5'),
  hotel: img('photo-1566073771259-6a8506099945'),
  craft: img('photo-1503387762-592deb58ef4e'),
  legal: img('photo-1589829545856-d10d557cf95f'),
  finance: img('photo-1454165804606-c3d57bc86b40'),
  phone: img('photo-1556745757-8d76bdb6984b'),
  consulting: img('photo-1521737604893-d14cc237f11d'),
};

const industries = [
  {
    slug: 'arztpraxis',
    name: 'Arztpraxis',
    plural: 'Arztpraxen',
    keyword: 'KI-Terminplanung Arztpraxis',
    title: 'KI-Terminplanung für Arztpraxen',
    description: 'Telefonische Patiententermine, Rezeptwünsche und Rückrufe strukturiert annehmen, ohne dass MFA dauerhaft am Telefon gebunden sind.',
    audience: 'Praxisinhaber, MFA-Teams und MVZ',
    image: IMAGES.health,
    accent: 'Terminarten, Neupatienten, Recall und Rückrufregeln',
    pain: 'In vielen Praxen kollidieren Telefon, Anmeldung und Behandlung. Eine KI-Terminplanung nimmt Terminwünsche an, sortiert Anliegen und übergibt nur die Fälle, die wirklich menschliche Prüfung brauchen.',
    workflows: [
      ['Terminart erkennen', 'Kontrolle, Akuttermin, Vorsorge, Rezeptbesprechung und Rückruf werden getrennt abgefragt.'],
      ['Kalenderregeln beachten', 'Zeitfenster, Behandler, Standort und Pufferzeiten werden nach Praxisregeln berücksichtigt.'],
      ['Sensible Fälle übergeben', 'Bei definierten Warnhinweisen wird nicht improvisiert, sondern an das Praxisteam eskaliert.'],
    ],
    proof: ['Weniger Telefonunterbrechungen in der Sprechstunde', 'Bessere Rückruflisten statt Mailbox-Chaos', 'Klare DSGVO- und AVV-Prozesse'],
    terms: ['MFA-Entlastung', 'PVS', 'Recall', 'Akuttermin', 'Neupatient', 'Rufumleitung'],
  },
  {
    slug: 'zahnarzt',
    name: 'Zahnarztpraxis',
    plural: 'Zahnarztpraxen',
    keyword: 'KI-Terminplanung Zahnarzt',
    title: 'KI-Terminplanung für Zahnarztpraxen',
    description: 'Prophylaxe, Kontrolle, Schmerzfall und Recall automatisch vorqualifizieren und planbar in den Praxisalltag übergeben.',
    audience: 'Zahnärzte, Praxismanager und Prophylaxe-Teams',
    image: IMAGES.dentist,
    accent: 'Prophylaxe, Schmerzfall, Kontrolle und Recall',
    pain: 'Zahnarzttermine hängen stark an Dauer, Behandler und Dringlichkeit. Eine gute Telefon-KI fragt diese Punkte konsequent ab, bevor ein Slot angeboten oder ein Rückruf ausgelöst wird.',
    workflows: [
      ['Schmerzfälle markieren', 'Dringlichkeit, neue Beschwerden und Rückrufnummer werden sauber erfasst.'],
      ['Recall reaktivieren', 'Patienten können Kontroll- und Prophylaxetermine auch außerhalb der Öffnungszeiten buchen.'],
      ['Behandlungsdauer unterscheiden', 'PZR, Kontrolle, Beratung und Schmerzfall laufen mit unterschiedlichen Zeitlogiken.'],
    ],
    proof: ['Mehr verwertbare Terminanfragen', 'Bessere Auslastung von Prophylaxezeiten', 'Weniger manuelle Rückrufe nach Feierabend'],
    terms: ['PZR', 'Recall-System', 'Schmerzsprechstunde', 'Behandlerkalender', 'Patientenkommunikation'],
  },
  {
    slug: 'physiotherapie',
    name: 'Physiotherapie',
    plural: 'Physiotherapien',
    keyword: 'KI-Terminplanung Physiotherapie',
    title: 'KI-Terminplanung für Physiotherapie',
    description: 'Rezeptstatus, Serienbehandlungen, Warteliste und Ausfalltermine automatisch abfragen und Termine schneller füllen.',
    audience: 'Physiopraxen, Therapiezentren und Reha-Anbieter',
    image: IMAGES.health,
    accent: 'Rezeptdaten, Serien, Ausfalltermine und Wartelisten',
    pain: 'Therapiepläne brauchen Wiederholungstermine, Raumlogik und kurzfristige Nachbesetzung. KI-Terminplanung macht aus Absagen sofort strukturierte Chancen für die Warteliste.',
    workflows: [
      ['Rezeptstatus abfragen', 'Die KI fragt Verordnung, Behandlungsart, Frequenz und Startwunsch ab.'],
      ['Serientermine vorbereiten', 'Mehrere Folgetermine werden nach Verfügbarkeit und Therapeut sortiert.'],
      ['Lücken füllen', 'Kurzfristige Absagen können an Wartelistenkontakte weitergegeben werden.'],
    ],
    proof: ['Weniger Leerlauf durch Absagen', 'Schnellere Aufnahme neuer Patienten', 'Bessere Planbarkeit für Therapeuten'],
    terms: ['Heilmittelverordnung', 'KG', 'MT', 'Warteliste', 'Serientermin', 'Ausfallmanagement'],
  },
  {
    slug: 'psychotherapie',
    name: 'Psychotherapie',
    plural: 'Psychotherapiepraxen',
    keyword: 'KI-Terminplanung Psychotherapie',
    title: 'KI-Terminplanung für Psychotherapie',
    description: 'Erstkontakt, Warteliste, Rückrufbitte und Terminwünsche mit klaren Grenzen und sensibler Gesprächsführung strukturieren.',
    audience: 'Psychotherapeutische Praxen und Beratungsstellen',
    image: IMAGES.office,
    accent: 'Erstgespräch, Warteliste, Rückruf und klare Eskalationsgrenzen',
    pain: 'Psychotherapeutische Praxen haben häufig mehr Nachfrage als freie Slots. Eine KI kann den Erstkontakt dokumentieren, ohne therapeutische Entscheidungen zu treffen.',
    workflows: [
      ['Erstkontakt aufnehmen', 'Name, Erreichbarkeit, Anliegen, Verfügbarkeit und Versicherungsstatus werden strukturiert erfasst.'],
      ['Warteliste pflegen', 'Interessenten erhalten eine klare Rückmeldung und landen nicht in unklaren Mailboxnotizen.'],
      ['Grenzen beachten', 'Krisenbegriffe werden nach hinterlegtem Prozess behandelt und nicht durch die KI bewertet.'],
    ],
    proof: ['Mehr Ordnung in Erstkontakten', 'Keine therapeutische Beratung durch KI', 'Sichere Übergabe an die Praxis'],
    terms: ['Erstgespräch', 'Warteliste', 'Krisenhinweis', 'DSGVO', 'Rückrufprozess'],
  },
  {
    slug: 'friseur',
    name: 'Friseursalon',
    plural: 'Friseursalons',
    keyword: 'KI-Terminplanung Friseur',
    title: 'KI-Terminplanung für Friseursalons',
    description: 'Schnitt, Farbe, Beratung und Mitarbeiterwünsche automatisch abfragen und freie Salonzeiten besser auslasten.',
    audience: 'Friseursalons, Barber Shops und Beauty-Studios',
    image: IMAGES.beauty,
    accent: 'Dienstleistungsdauer, Stylist, Farbe und No-Show-Regeln',
    pain: 'Wenn beim Färben, Schneiden oder Kassieren das Telefon klingelt, gehen Termine verloren. Eine KI nimmt Buchungen an, fragt Details ab und schützt die Zeit im Salon.',
    workflows: [
      ['Dienstleistung bestimmen', 'Schnitt, Farbe, Balayage, Beratung und Kinderhaarschnitt erhalten passende Dauern.'],
      ['Stylistwunsch merken', 'Mitarbeiter, Skills und bevorzugte Zeiten werden abgefragt.'],
      ['Erinnerungen senden', 'SMS oder WhatsApp-Erinnerungen senken kurzfristige Ausfälle.'],
    ],
    proof: ['Mehr Buchungen außerhalb der Öffnungszeiten', 'Weniger Unterbrechungen am Stuhl', 'Bessere Auslastung von Farbterminen'],
    terms: ['Balayage', 'Barber', 'Stylist', 'Salonsoftware', 'No-Show', 'WhatsApp-Buchung'],
  },
  {
    slug: 'kosmetikstudio',
    name: 'Kosmetikstudio',
    plural: 'Kosmetikstudios',
    keyword: 'KI-Terminplanung Kosmetikstudio',
    title: 'KI-Terminplanung für Kosmetikstudios',
    description: 'Behandlung, Kabine, Mitarbeiter-Skill und Wiederholungstermine automatisch organisieren und Ausfälle reduzieren.',
    audience: 'Kosmetikstudios, Nail Studios, Spa- und Beauty-Anbieter',
    image: IMAGES.beauty,
    accent: 'Behandlungen, Kabinen, Pakettermine und Stammkundinnen',
    pain: 'Kosmetiktermine variieren stark nach Dauer, Kabine und Vorbereitung. KI-Terminplanung fragt die relevanten Details ab, bevor ein Termin im Kalender landet.',
    workflows: [
      ['Behandlung passend buchen', 'Facial, Nails, Waxing, Massage und Beratung werden getrennt geplant.'],
      ['Ressourcen beachten', 'Kabinen, Geräte und Mitarbeiter-Skills werden nicht doppelt gebucht.'],
      ['Folgetermine anbieten', 'Wiederkehrende Behandlungen lassen sich direkt vorbereiten.'],
    ],
    proof: ['Weniger No-Shows durch Erinnerungen', 'Bessere Kabinenauslastung', 'Mehr Ruhe während Behandlungen'],
    terms: ['Kabinenplanung', 'Beauty-Termin', 'Stammkundin', 'Behandlungsdauer', 'Reminder'],
  },
  {
    slug: 'handwerker',
    name: 'Handwerksbetrieb',
    plural: 'Handwerksbetriebe',
    keyword: 'KI-Terminplanung Handwerker',
    title: 'KI-Terminplanung für Handwerker',
    description: 'Vor-Ort-Termine, Notfälle, Angebote und Rückrufe automatisch erfassen, priorisieren und an Monteure übergeben.',
    audience: 'Handwerksbetriebe, Meisterbetriebe und Service-Teams',
    image: IMAGES.craft,
    accent: 'Adresse, Gewerk, Dringlichkeit, Fotos und Anfahrtslogik',
    pain: 'Handwerker verlieren Aufträge, wenn Anrufe auf Baustelle, Fahrt oder Kundentermin nicht angenommen werden. Die KI macht daraus eine strukturierte Auftragschance.',
    workflows: [
      ['Anliegen qualifizieren', 'Gewerk, Schaden, Adresse, Dringlichkeit und Wunschtermin werden abgefragt.'],
      ['Notdienst unterscheiden', 'Echte Notfälle werden nach Regel markiert oder weitergeleitet.'],
      ['Touren vorbereiten', 'Ort, Zeitfenster und Ansprechpartner stehen für die Disposition bereit.'],
    ],
    proof: ['Mehr verwertbare Anfragen aus verpassten Anrufen', 'Weniger Rückruf-Pingpong', 'Bessere Vorbereitung vor Ort'],
    terms: ['Vor-Ort-Termin', 'Notdienst', 'Disposition', 'Kostenvoranschlag', 'Rufumleitung'],
  },
  {
    slug: 'kfz-werkstatt',
    name: 'Kfz-Werkstatt',
    plural: 'Kfz-Werkstätten',
    keyword: 'KI-Terminplanung Kfz Werkstatt',
    title: 'KI-Terminplanung für Kfz-Werkstätten',
    description: 'HU, Reifenwechsel, Inspektion, Diagnose und Ersatzwagen automatisch abfragen und Werkstatttermine sauber planen.',
    audience: 'Kfz-Werkstätten, Autohäuser und Serviceannahmen',
    image: IMAGES.craft,
    accent: 'Fahrzeugdaten, Serviceart, Ersatzwagen und Saisonspitzen',
    pain: 'Reifenwechsel- und HU-Saisons erzeugen viele kurze, wiederkehrende Telefonate. KI-Terminplanung nimmt sie strukturiert auf und hält die Serviceannahme frei.',
    workflows: [
      ['Fahrzeugdaten aufnehmen', 'Kennzeichen, Modell, Serviceart und gewünschtes Zeitfenster werden abgefragt.'],
      ['Saisontermine sortieren', 'Reifenwechsel, HU und Inspektion laufen mit passenden Zeitfenstern.'],
      ['Zusatzbedarf klären', 'Ersatzwagen, Abgabezeit und Rückrufwunsch werden dokumentiert.'],
    ],
    proof: ['Weniger Anrufspitzen in Saisonphasen', 'Bessere Serviceannahme', 'Klare Daten vor dem Rückruf'],
    terms: ['HU', 'AU', 'Reifenwechsel', 'Inspektion', 'Ersatzwagen', 'Serviceannahme'],
  },
  {
    slug: 'anwaltskanzlei',
    name: 'Anwaltskanzlei',
    plural: 'Anwaltskanzleien',
    keyword: 'KI-Terminplanung Anwaltskanzlei',
    title: 'KI-Terminplanung für Anwaltskanzleien',
    description: 'Erstgespräche, Rückrufe und Mandatsanfragen strukturieren, ohne Rechtsberatung durch die KI zu geben.',
    audience: 'Kanzleien, Rechtsanwälte und Legal Operations',
    image: IMAGES.legal,
    accent: 'Rechtsgebiet, Fristen, Gegenseite und Erstgespräch',
    pain: 'Mandatsanfragen sind zeitkritisch und brauchen saubere Vorqualifizierung. Die KI fragt die Eckdaten ab, vermeidet Rechtsberatung und übergibt an die Kanzlei.',
    workflows: [
      ['Rechtsgebiet abfragen', 'Arbeitsrecht, Familienrecht, Verkehrsrecht oder anderes Gebiet werden markiert.'],
      ['Fristen erkennen', 'Fristdatum und Dringlichkeit werden als Rückrufpriorität übergeben.'],
      ['Erstgespräch vorbereiten', 'Kontaktdaten, Anliegen und mögliche Gegenseite werden strukturiert dokumentiert.'],
    ],
    proof: ['Mehr qualifizierte Erstkontakte', 'Weniger Unterbrechungen in Terminen', 'Klare Grenzen ohne Rechtsberatung'],
    terms: ['Mandatsannahme', 'Erstberatung', 'Frist', 'Gegenseite', 'Konfliktcheck'],
  },
  {
    slug: 'steuerberater',
    name: 'Steuerberater',
    plural: 'Steuerkanzleien',
    keyword: 'KI-Terminplanung Steuerberater',
    title: 'KI-Terminplanung für Steuerberater',
    description: 'Beratungstermine, Rückfragen, Unterlagen und saisonale Spitzen wie Jahresabschluss oder Einkommensteuer besser steuern.',
    audience: 'Steuerberater, Buchhaltungsbüros und Kanzleiteams',
    image: IMAGES.finance,
    accent: 'Fristen, Unterlagen, Mandantenstatus und Beratungsfenster',
    pain: 'Steuerkanzleien werden in Hochphasen von Rückfragen, Fristen und Terminwünschen überrollt. Eine KI nimmt Standarddaten auf und priorisiert den Rückruf.',
    workflows: [
      ['Anliegen sortieren', 'Neumandat, Unterlagenfrage, Lohn, Jahresabschluss oder Beratung werden getrennt.'],
      ['Fristen markieren', 'UStVA, Abschluss, Steuererklärung und Rückrufbedarf erhalten Priorität.'],
      ['Termine vorbereiten', 'Benötigte Unterlagen und Gesprächsziel werden vor dem Termin abgefragt.'],
    ],
    proof: ['Bessere Rückrufpriorisierung', 'Weniger Standardfragen am Telefon', 'Mehr Ruhe in Fristenphasen'],
    terms: ['Neumandat', 'Jahresabschluss', 'Lohnbuchhaltung', 'Frist', 'Unterlagencheck'],
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    plural: 'Restaurants',
    keyword: 'KI-Terminplanung Restaurant',
    title: 'KI-Terminplanung für Restaurants',
    description: 'Tischreservierungen, Personenanzahl, Anlass, Allergene und Stoßzeiten automatisch aufnehmen und übergeben.',
    audience: 'Restaurants, Cafés, Bars und Gastronomiebetriebe',
    image: IMAGES.restaurant,
    accent: 'Reservierung, Personenanzahl, Anlass und Tischlogik',
    pain: 'Während Servicezeiten ist Telefonannahme teuer: Sie unterbricht den Gast vor Ort und verliert trotzdem Reservierungen. Die KI nimmt Reservierungen sofort auf.',
    workflows: [
      ['Reservierung erfassen', 'Datum, Uhrzeit, Personenanzahl, Name und Telefonnummer werden abgefragt.'],
      ['Sonderwünsche aufnehmen', 'Allergene, Anlass, Kinderwagen oder Außenbereich werden dokumentiert.'],
      ['Stoßzeiten entlasten', 'Während Mittags- und Abendservice bleibt das Team beim Gast.'],
    ],
    proof: ['Mehr Reservierungen in Stoßzeiten', 'Weniger Telefonstress im Service', 'Bessere Daten für Tischplanung'],
    terms: ['Tischreservierung', 'No-Show', 'Allergene', 'Außenbereich', 'Gastronomie'],
  },
  {
    slug: 'hotel',
    name: 'Hotel',
    plural: 'Hotels',
    keyword: 'KI-Terminplanung Hotel',
    title: 'KI-Terminplanung für Hotels',
    description: 'Zimmeranfragen, Restaurantreservierungen, Spa-Termine und Veranstaltungsrückfragen rund um die Uhr strukturieren.',
    audience: 'Hotels, Pensionen und Serviced Apartments',
    image: IMAGES.hotel,
    accent: 'Zimmeranfrage, Check-in, Spa, Restaurant und Events',
    pain: 'Hotels haben viele wiederkehrende Anfragen außerhalb klassischer Bürozeiten. KI-Terminplanung trennt Buchungswunsch, Rückruf und interne Weiterleitung.',
    workflows: [
      ['Anfrageart erkennen', 'Zimmer, Restaurant, Spa, Event oder Rückruf werden getrennt.'],
      ['Daten vollständig aufnehmen', 'Datum, Personen, Kontaktdaten und besondere Wünsche werden dokumentiert.'],
      ['Teams entlasten', 'Rezeption, Reservierung und Restaurant erhalten die passenden Informationen.'],
    ],
    proof: ['24/7 Anfragen ohne zusätzliche Nachtschicht', 'Weniger verlorene Reservierungsanfragen', 'Bessere Übergabe zwischen Teams'],
    terms: ['Zimmeranfrage', 'Spa-Termin', 'Reservierung', 'Check-in', 'Veranstaltung'],
  },
  {
    slug: 'fahrschule',
    name: 'Fahrschule',
    plural: 'Fahrschulen',
    keyword: 'KI-Terminplanung Fahrschule',
    title: 'KI-Terminplanung für Fahrschulen',
    description: 'Fahrstunden, Theorie, Prüfungsvorbereitung und Neuanmeldungen automatisch aufnehmen und in passende Slots überführen.',
    audience: 'Fahrschulen und Fahrlehrer-Teams',
    image: IMAGES.phone,
    accent: 'Fahrlehrer, Fahrzeug, Theorie, Prüfung und Schülerstatus',
    pain: 'Fahrlehrer sind unterwegs und können nicht jeden Anruf annehmen. Die KI nimmt Neuanfragen und Terminwünsche auf, ohne laufende Fahrstunden zu stören.',
    workflows: [
      ['Schülerstatus erfassen', 'Neuinteressent, Theorie, Praxis oder Prüfungsvorbereitung werden getrennt.'],
      ['Ressourcen beachten', 'Fahrlehrer, Fahrzeugklasse und mögliche Zeitfenster werden abgefragt.'],
      ['Rückrufe bündeln', 'Anfragen landen gesammelt statt verstreut auf privaten Handys.'],
    ],
    proof: ['Mehr Neuanfragen trotz Fahrstunden', 'Weniger Rückrufchaos', 'Bessere Planung von Theorie und Praxis'],
    terms: ['Fahrstunde', 'Theorieunterricht', 'Fahrlehrer', 'Klasse B', 'Prüfung'],
  },
  {
    slug: 'immobilienmakler',
    name: 'Immobilienmakler',
    plural: 'Immobilienmakler',
    keyword: 'KI-Terminplanung Immobilienmakler',
    title: 'KI-Terminplanung für Immobilienmakler',
    description: 'Besichtigungstermine, Verkäuferanfragen und Rückrufe automatisch vorqualifizieren und sauber an Makler übergeben.',
    audience: 'Immobilienmakler, Hausverwaltungen und Property Teams',
    image: IMAGES.office,
    accent: 'Besichtigung, Objekt, Interessent, Finanzierung und Rückruf',
    pain: 'Immobilienanfragen verlieren schnell Wert, wenn kein Rückruf erfolgt. Die KI erfasst Objektbezug, Wunschzeit und Kontaktdaten sofort.',
    workflows: [
      ['Objektbezug klären', 'Adresse, Inserat, Kauf oder Miete werden abgefragt.'],
      ['Besichtigung vorbereiten', 'Verfügbarkeit, Teilnehmerzahl und Finanzierungsstatus können markiert werden.'],
      ['Eigentümeranfragen trennen', 'Verkäufer- und Vermieterkontakte werden gesondert priorisiert.'],
    ],
    proof: ['Schnellere Reaktion auf Portalanfragen', 'Bessere Besichtigungsvorbereitung', 'Mehr verwertbare Eigentümer-Leads'],
    terms: ['Besichtigung', 'Objektanfrage', 'Eigentümerlead', 'Finanzierungsstatus', 'Maklerbüro'],
  },
  {
    slug: 'versicherungsmakler',
    name: 'Versicherungsmakler',
    plural: 'Versicherungsmakler',
    keyword: 'KI-Terminplanung Versicherungsmakler',
    title: 'KI-Terminplanung für Versicherungsmakler',
    description: 'Beratungstermine, Schadenmeldungen, Vertragsfragen und Rückrufwünsche strukturiert aufnehmen und priorisieren.',
    audience: 'Versicherungsmakler, Agenturen und Finanzberater',
    image: IMAGES.finance,
    accent: 'Sparte, Schaden, Beratungstermin und Rückrufpriorität',
    pain: 'Maklertelefonate reichen von Schaden bis Neukundenberatung. KI-Terminplanung fragt die Sparte ab und schafft Ordnung vor dem Rückruf.',
    workflows: [
      ['Sparte erkennen', 'Kranken, Leben, Kfz, Gewerbe oder Sachversicherung werden markiert.'],
      ['Schaden priorisieren', 'Schadentyp, Datum und Rückrufnummer werden vollständig erfasst.'],
      ['Beratung vorbereiten', 'Neukunden erhalten passende Rückruffragen und Terminvorschläge.'],
    ],
    proof: ['Weniger verlorene Beratungschancen', 'Bessere Schaden-Erstaufnahme', 'Planbare Rückruflisten'],
    terms: ['Schadenmeldung', 'Beratungstermin', 'Maklerbestand', 'Sparte', 'Neukunde'],
  },
  {
    slug: 'beratung-coaching',
    name: 'Beratung und Coaching',
    plural: 'Beratungs- und Coachinganbieter',
    keyword: 'KI-Terminplanung Beratung',
    title: 'KI-Terminplanung für Beratung und Coaching',
    description: 'Erstgespräche, Qualifizierung, Kalenderbuchung und Follow-up für Beratungsangebote automatisiert vorbereiten.',
    audience: 'Berater, Coaches, Agenturen und B2B-Dienstleister',
    image: IMAGES.consulting,
    accent: 'Erstgespräch, Bedarf, Budget, Fit und Kalenderbuchung',
    pain: 'Beratungsleads brauchen schnelle Reaktion und klare Erwartung. Die KI fragt Ziel, Bedarf und Terminfenster ab, damit Erstgespräche besser vorbereitet sind.',
    workflows: [
      ['Lead-Fit prüfen', 'Ziel, Ausgangslage, Unternehmensgröße und Dringlichkeit werden abgefragt.'],
      ['Terminslots anbieten', 'Freigegebene Kalenderfenster werden für Erstgespräche genutzt.'],
      ['Follow-up anstoßen', 'Zusammenfassung und nächste Schritte landen direkt beim Team.'],
    ],
    proof: ['Mehr gebuchte Erstgespräche', 'Bessere Vorbereitung vor Calls', 'Weniger unpassende Termine'],
    terms: ['Erstgespräch', 'Lead-Qualifizierung', 'Discovery Call', 'CRM', 'Kalenderintegration'],
  },
];

const cities = [
  ['berlin', 'Berlin', 'Hauptstadtmarkt mit hoher Dienstleisterdichte', ['arztpraxis', 'friseur', 'anwaltskanzlei', 'beratung-coaching']],
  ['muenchen', 'München', 'Premium-Dienstleister, Praxen und beratungsnahe Unternehmen', ['zahnarzt', 'steuerberater', 'immobilienmakler', 'restaurant']],
  ['hamburg', 'Hamburg', 'Gesundheit, Gastronomie, Kanzleien und lokale Services', ['arztpraxis', 'hotel', 'handwerker', 'versicherungsmakler']],
  ['koeln', 'Köln', 'Gastronomie, Praxen, Handwerk und Agenturdienstleister', ['restaurant', 'physiotherapie', 'handwerker', 'beratung-coaching']],
  ['frankfurt-am-main', 'Frankfurt am Main', 'Finanzdienstleister, Kanzleien und anspruchsvolle B2B-Teams', ['steuerberater', 'anwaltskanzlei', 'versicherungsmakler', 'hotel']],
  ['stuttgart', 'Stuttgart', 'Werkstätten, Beratungen, Praxen und Handwerksbetriebe', ['kfz-werkstatt', 'handwerker', 'arztpraxis', 'beratung-coaching']],
  ['duesseldorf', 'Düsseldorf', 'Beauty, Medizin, Kanzlei und hochwertige Dienstleistung', ['kosmetikstudio', 'zahnarzt', 'anwaltskanzlei', 'immobilienmakler']],
  ['leipzig', 'Leipzig', 'wachsende Dienstleister, Praxen und lokale Betriebe', ['physiotherapie', 'friseur', 'restaurant', 'handwerker']],
  ['dortmund', 'Dortmund', 'Handwerk, Werkstatt, Gesundheit und Verwaltung', ['handwerker', 'kfz-werkstatt', 'arztpraxis', 'versicherungsmakler']],
  ['essen', 'Essen', 'Gesundheit, Kanzlei, Handwerk und Gastronomie', ['arztpraxis', 'anwaltskanzlei', 'handwerker', 'restaurant']],
  ['bremen', 'Bremen', 'Praxen, Restaurants, Handwerk und Versicherungen', ['zahnarzt', 'restaurant', 'handwerker', 'versicherungsmakler']],
  ['dresden', 'Dresden', 'Praxen, Beauty, Kanzlei und lokale Beratung', ['arztpraxis', 'kosmetikstudio', 'anwaltskanzlei', 'beratung-coaching']],
  ['hannover', 'Hannover', 'Gesundheitsbetriebe, Verwaltung und Mittelstand', ['physiotherapie', 'steuerberater', 'handwerker', 'hotel']],
  ['nuernberg', 'Nürnberg', 'Mittelstand, Werkstätten, Kanzleien und Gastronomie', ['kfz-werkstatt', 'steuerberater', 'restaurant', 'anwaltskanzlei']],
  ['duisburg', 'Duisburg', 'Handwerk, Gesundheit und telefonintensive Dienstleister', ['handwerker', 'arztpraxis', 'kfz-werkstatt', 'friseur']],
  ['bochum', 'Bochum', 'Praxen, Beratung, Gastronomie und Werkstätten', ['physiotherapie', 'beratung-coaching', 'restaurant', 'kfz-werkstatt']],
  ['wuppertal', 'Wuppertal', 'lokale Services, Handwerk und Gesundheitsangebote', ['handwerker', 'zahnarzt', 'friseur', 'versicherungsmakler']],
  ['bielefeld', 'Bielefeld', 'Mittelstand, Praxen und beratende Dienstleister', ['arztpraxis', 'steuerberater', 'beratung-coaching', 'restaurant']],
  ['bonn', 'Bonn', 'Beratung, Kanzlei, Gesundheit und Immobilien', ['beratung-coaching', 'anwaltskanzlei', 'psychotherapie', 'immobilienmakler']],
  ['mannheim', 'Mannheim', 'Dienstleister, Werkstätten, Gastronomie und Praxen', ['kfz-werkstatt', 'restaurant', 'physiotherapie', 'handwerker']],
].map(([slug, name, context, focus]) => ({ slug, name, context, focus }));

const useCases = [
  {
    slug: 'terminvereinbarung-per-telefon',
    keyword: 'Terminvereinbarung per Telefon automatisieren',
    title: 'Terminvereinbarung per Telefon automatisieren',
    description: 'Telefonische Terminwünsche automatisch annehmen, Pflichtfragen stellen und als Kalenderbuchung oder Rückrufliste übergeben.',
    image: IMAGES.phone,
    intent: 'Viele kauf- und buchungsbereite Kontakte greifen weiterhin zum Telefon. Die KI nimmt diese Nachfrage auf, statt sie in Mailboxen oder verpassten Anrufen zu verlieren.',
  },
  {
    slug: 'ki-online-terminbuchung',
    keyword: 'KI Online Terminbuchung',
    title: 'KI Online-Terminbuchung für Dienstleister',
    description: 'Online-Kalender, Telefon-KI und WhatsApp-Buchung zu einem Terminprozess verbinden.',
    image: IMAGES.office,
    intent: 'Online-Terminbuchung funktioniert am besten, wenn Telefon und Chat denselben Kalenderregeln folgen.',
  },
  {
    slug: 'whatsapp-terminbuchung',
    keyword: 'WhatsApp Terminbuchung KI',
    title: 'WhatsApp-Terminbuchung mit KI',
    description: 'Terminwünsche per WhatsApp aufnehmen, automatisch rückfragen und mit Kalenderregeln verbinden.',
    image: IMAGES.phone,
    intent: 'WhatsApp senkt die Hürde für Umbuchungen, Erinnerungen und schnelle Rückfragen.',
  },
  {
    slug: 'no-show-reduzieren',
    keyword: 'No Show reduzieren Termine',
    title: 'No-Shows bei Terminen reduzieren',
    description: 'Automatische Erinnerungen, Bestätigungen, Wartelisten und Umbuchungslogik gegen leere Slots einsetzen.',
    image: IMAGES.consulting,
    intent: 'No-Shows entstehen oft, weil Bestätigung und Umbuchung zu umständlich sind. KI macht den Prozess schneller.',
  },
  {
    slug: 'calendly-alternative-ki',
    keyword: 'Calendly Alternative KI',
    title: 'Calendly-Alternative mit Telefon-KI',
    description: 'Nicht nur Buchungslink: Telefon, WhatsApp, Web-Widget und Rückruflogik in einem Terminprozess.',
    image: IMAGES.office,
    intent: 'Viele Betriebe brauchen mehr als einen Link: Sie brauchen Nachfrageannahme, Rückfragen und Übergaben.',
  },
  {
    slug: 'automatische-terminerinnerung',
    keyword: 'Automatische Terminerinnerung',
    title: 'Automatische Terminerinnerung per SMS, WhatsApp und E-Mail',
    description: 'Erinnerungen, Bestätigungen und Umbuchungen automatisieren, ohne das Team mit Routinekommunikation zu belasten.',
    image: IMAGES.phone,
    intent: 'Erinnerungen sind kein Extra, sondern ein wirtschaftlicher Hebel für bessere Auslastung.',
  },
  {
    slug: 'kalenderintegration',
    keyword: 'Kalendersysteme KI-Terminplanung',
    subject: 'Kalenderintegration für KI-Terminplanung',
    title: 'Kalendersysteme mit KI-Terminplanung verbinden',
    description: 'Apple iCloud, Google Calendar, Microsoft 365, CalDAV, Calendly, Salesforce, SAP und Oracle in eine zentrale Terminlogik bringen.',
    image: IMAGES.office,
    intent: 'Das Thema ist nicht nur ein Chatbot. Entscheidend ist, ob aus jeder Anfrage ein echter Termin im richtigen Kalendersystem wird.',
  },
  {
    slug: 'google-business-profile-terminbuchung',
    keyword: 'Google Business Profile Terminbuchung',
    subject: 'Google Unternehmensprofil Terminbuchung',
    title: 'Google Business Profile für Terminbuchung nutzen',
    description: 'Google-Unternehmensprofil, Website-Klicks, Anrufe, Suchbegriffe und Buchungslinks mit KI-Terminplanung verbinden.',
    image: IMAGES.consulting,
    intent: 'Lokale Nachfrage entsteht oft direkt in Google Suche und Maps. Diese Kontakte müssen ohne Umweg in Telefon, WhatsApp oder Kalender landen.',
  },
  {
    slug: 'social-media-terminbuchung',
    keyword: 'Social Media Terminbuchung',
    subject: 'Social Media Terminbuchung',
    title: 'Social Media und Website-Anfragen in Termine verwandeln',
    description: 'Instagram, Facebook, LinkedIn, Website-Formulare und Booking-Links auf eine gemeinsame Terminlogik führen.',
    image: IMAGES.phone,
    intent: 'Social Media erzeugt Aufmerksamkeit, aber wirtschaftlich wird sie erst, wenn daraus ein gebuchter Beratungstermin, Praxisbesuch oder Reservierung entsteht.',
  },
];

const calendarSystems = [
  {
    short: 'IC',
    name: 'Apple iCloud Calendar',
    method: 'via iCal-URL, Freigabe-Link oder CalDAV-nahem Setup',
    use: 'Für kleine Teams, Praxen und Dienstleister, die bereits mit iPhone, iPad oder Mac planen.',
  },
  {
    short: 'G',
    name: 'Google Calendar',
    method: 'Terminformate via .ics oder Google Calendar API',
    use: 'Für Google Workspace, freigegebene Teamkalender und schnelle Online-Terminbuchung.',
  },
  {
    short: 'M365',
    name: 'Microsoft 365 & Exchange Online',
    method: 'über Microsoft Graph API mit OAuth 2.0',
    use: 'Für Outlook-Kalender, Ressourcen, Räume, Teamkalender und Enterprise-Rechte.',
  },
  {
    short: 'CD',
    name: 'CalDAV-Server',
    method: 'standardisierte CalDAV-Schnittstelle',
    use: 'Für Self-Hosting, datensparsame Setups und Organisationen mit eigener Infrastruktur.',
  },
  {
    short: 'API',
    name: 'Calendly, Doodle, Acuity, HubSpot',
    method: 'API-Integration und Webhooks für Buchungs-Events',
    use: 'Für bestehende Booking-Links, Marketing-Funnels, CRM-Übergaben und Event-Tracking.',
  },
  {
    short: 'SF',
    name: 'Salesforce Calendar',
    method: 'REST-API mit Kunden- und Termin-Daten',
    use: 'Für Sales-Teams, Beratung, Lead-Routing und Opportunity-nahe Terminprozesse.',
  },
  {
    short: 'SAP',
    name: 'SAP Schedule Manager',
    method: 'OData-Service für Termin-Objekte',
    use: 'Für Enterprise-Umgebungen mit Ressourcen, Standorten und internen Freigaben.',
  },
  {
    short: 'OR',
    name: 'Oracle Calendar / PeopleSoft',
    method: 'SOAP- und REST-Schnittstellen',
    use: 'Für umfassendes Termin- und Ressourcen-Management in größeren Organisationen.',
  },
];

const demandChannels = [
  {
    name: 'Telefon-KI',
    label: 'Anruf wird Termin',
    text: 'Der KI-Rezeptionist nimmt Anrufe an, fragt Anliegen und Zeitfenster ab und übergibt direkt an Kalender oder Rückrufliste.',
  },
  {
    name: 'WhatsApp',
    label: 'Chat wird Buchung',
    text: 'Terminwunsch, Umbuchung, Erinnerung und Bestätigung laufen über denselben Regeln wie Telefon und Website.',
  },
  {
    name: 'Website & Landingpages',
    label: 'Traffic wird Slot',
    text: 'Formulare, Widgets und Booking-CTAs führen nicht ins Nirgendwo, sondern in eine konkrete Terminlogik.',
  },
  {
    name: 'Google Unternehmensprofil',
    label: 'Maps wird Nachfrage',
    text: 'Buchungslink, Website-Klick, Anruf und Performance-Daten zeigen, welche lokalen Suchanfragen Termine auslösen.',
  },
  {
    name: 'Social Media',
    label: 'DM wird Ersttermin',
    text: 'Instagram, Facebook, LinkedIn und Kampagnenlinks bekommen UTM-Tracking und denselben Buchungsprozess.',
  },
  {
    name: 'CRM & Slack',
    label: 'Lead wird Auftrag',
    text: 'Jede Anfrage kommt strukturiert an: Kanal, Branche, Stadt, Kalenderwunsch, Paket und Notiz als JSON.',
  },
];

const pageRegistry = [];

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function strip(value) {
  return String(value ?? '').replace(/<[^>]*>/g, '');
}

function fileForUrl(urlPath) {
  if (urlPath === '/') return 'index.html';
  return `${urlPath.replace(/^\/|\/$/g, '')}/index.html`;
}

function canonical(urlPath) {
  return `${SITE.origin}${urlPath === '/' ? '/' : `${urlPath.replace(/\/$/, '')}/`}`;
}

function writeFile(file, content) {
  const target = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content.trimStart());
}

function writePage(urlPath, options) {
  pageRegistry.push({
    loc: canonical(urlPath),
    lastmod: LASTMOD,
    priority: options.priority ?? 0.7,
    changefreq: options.changefreq ?? 'monthly',
  });
  writeFile(fileForUrl(urlPath), renderPage(urlPath, options));
}

function schemaBase(urlPath, title, description, image) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE.origin}/#organization`,
      name: SITE.company,
      url: SITE.origin,
      email: SITE.email,
      telephone: SITE.phone,
      address: { '@type': 'PostalAddress', ...SITE.address },
      brand: { '@type': 'Brand', name: SITE.name },
      sameAs: ['https://www.kirezeptionist.de'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical(urlPath)}#webpage`,
      url: canonical(urlPath),
      name: title,
      description,
      inLanguage: 'de-DE',
      isPartOf: { '@id': `${SITE.origin}/#website` },
      publisher: { '@id': `${SITE.origin}/#organization` },
      primaryImageOfPage: image ? { '@type': 'ImageObject', url: image } : undefined,
      dateModified: LASTMOD,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems(urlPath, title),
    },
  ];
}

function breadcrumbItems(urlPath, title) {
  const parts = urlPath.split('/').filter(Boolean);
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Startseite',
      item: `${SITE.origin}/`,
    },
  ];
  let current = '';
  parts.forEach((part, index) => {
    current += `/${part}`;
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: index === parts.length - 1 ? title : labelForPathPart(part),
      item: canonical(current),
    });
  });
  return items;
}

function labelForPathPart(part) {
  const labels = { branchen: 'Branchen', staedte: 'Städte', themen: 'Themen', impressum: 'Impressum', datenschutz: 'Datenschutz' };
  return labels[part] ?? part.replaceAll('-', ' ');
}

function faqSchema(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: strip(item.a) },
    })),
  };
}

function serviceSchema(page, urlPath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical(urlPath)}#service`,
    name: page.title,
    serviceType: page.keyword,
    provider: { '@id': `${SITE.origin}/#organization` },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    audience: { '@type': 'Audience', audienceType: page.audience },
    description: page.description,
    offers: {
      '@type': 'Offer',
      url: `${canonical(urlPath)}#angebot`,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Individuelle Konfiguration nach Anrufvolumen, Rufnummern, Minutenpaket und Integrationsbedarf.',
    },
  };
}

function renderPage(urlPath, { title, description, body, image = IMAGES.home, schema = [], priority, changefreq }) {
  const allSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE.origin}/#website`,
      name: SITE.name,
      url: SITE.origin,
      inLanguage: 'de-DE',
      publisher: { '@id': `${SITE.origin}/#organization` },
    },
    ...schemaBase(urlPath, title, description, image),
    ...schema,
  ];

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="${esc(SITE.company)}">
  <link rel="canonical" href="${canonical(urlPath)}">
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link rel="preconnect" href="https://analytics.polymarkt.de" crossorigin>
  <link rel="stylesheet" href="/assets/site.css">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:locale" content="de_DE">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical(urlPath)}">
  <meta property="og:image" content="${esc(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(image)}">
  <script async src="https://analytics.polymarkt.de/js/pa-VoTVzDLf8G6NJJH5AhZWL.js"></script>
  <script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()</script>
  <script type="application/ld+json">${JSON.stringify(allSchema.filter(Boolean))}</script>
</head>
<body>
  <a class="skip-link" href="#main">Zum Inhalt springen</a>
  ${siteHeader()}
  <main id="main">${body}</main>
  ${siteFooter()}
  <script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

function siteHeader() {
  return `<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="KI-Terminplanung Startseite">
      <span class="brand-mark" aria-hidden="true">KT</span>
      <span>KI-Terminplanung</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav" data-nav-toggle>
      <span></span><span></span><span></span>
    </button>
    <nav class="main-nav" id="main-nav" data-nav>
      <a href="/branchen/">Branchen</a>
      <a href="/staedte/">Städte</a>
      <a href="/themen/kalenderintegration/">Kalendersysteme</a>
      <a href="/themen/terminvereinbarung-per-telefon/">Telefon-Termine</a>
      <a class="nav-cta" href="#angebot">Analyse anfordern</a>
    </nav>
  </div>
</header>`;
}

function siteFooter() {
  const topIndustries = industries.slice(0, 8).map((item) => `<li><a href="/branchen/${item.slug}/">${esc(item.name)}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true">KT</span><span>KI-Terminplanung</span></a>
      <p>Telefon, WhatsApp und Web-Terminbuchung für Unternehmen in Deutschland. Ein Produkt der ${esc(SITE.company)}.</p>
    </div>
    <div>
      <h2>Produkt</h2>
      <ul>
        <li><a href="/branchen/">Branchen</a></li>
        <li><a href="/staedte/">Städte</a></li>
        <li><a href="/themen/kalenderintegration/">Kalendersysteme</a></li>
        <li><a href="/themen/ki-online-terminbuchung/">Online-Terminbuchung</a></li>
        <li><a href="/themen/calendly-alternative-ki/">Calendly-Alternative</a></li>
        <li><a href="/llms.txt">llms.txt</a></li>
      </ul>
    </div>
    <div>
      <h2>Branchen</h2>
      <ul>${topIndustries}</ul>
    </div>
    <div>
      <h2>Kontakt</h2>
      <ul>
        <li><a href="tel:${SITE.phone.replaceAll(' ', '')}">${esc(SITE.phone)}</a></li>
        <li><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></li>
        <li><a href="/impressum/">Impressum</a></li>
        <li><a href="/datenschutz/">Datenschutz</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© 2026 ${esc(SITE.company)}</span>
    <span>Quellen: <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" rel="noopener noreferrer">Google Search Central</a>, <a href="https://schema.org/FAQPage" rel="noopener noreferrer">Schema.org FAQPage</a>, <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" rel="noopener noreferrer">DSGVO</a></span>
  </div>
</footer>`;
}

function hero({ eyebrow, h1, lead, image, primary = 'Analyse anfordern', secondaryHref = '/branchen/', secondary = 'Branchen ansehen', compact = false }) {
  return `<section class="${compact ? 'hero hero-compact' : 'hero'}">
  <img class="hero-image" src="${esc(image)}" alt="" ${compact ? 'loading="eager"' : 'fetchpriority="high"'} decoding="async">
  <div class="hero-shade"></div>
  <div class="container hero-content">
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h1>${esc(h1)}</h1>
    <p>${esc(lead)}</p>
    <div class="hero-actions">
      <a class="button button-primary" href="#angebot">${esc(primary)}</a>
      <a class="button button-secondary" href="${esc(secondaryHref)}">${esc(secondary)}</a>
    </div>
    <ul class="hero-signals">
      <li>Rufumleitung statt neuer Telefonanlage</li>
      <li>Slack-JSON für jeden Lead</li>
      <li>DSGVO-Setup mit AVV möglich</li>
    </ul>
  </div>
</section>`;
}

function sectionIntro(kicker, title, text) {
  return `<div class="section-intro">
    <p class="kicker">${esc(kicker)}</p>
    <h2>${esc(title)}</h2>
    <p>${esc(text)}</p>
  </div>`;
}

function conversionSection(sourceLabel = 'Website') {
  const industryOptions = industries.map((item) => `<option value="${esc(item.name)}">${esc(item.name)}</option>`).join('');
  return `<section class="section conversion" id="angebot" aria-labelledby="angebot-title">
  <div class="container conversion-grid">
    <div>
      <p class="kicker">Ein Ziel</p>
      <h2 id="angebot-title">Kostenlose KI-Terminplanung-Analyse anfordern</h2>
      <p class="lead">Konfigurieren Sie den Terminprozess grob vor. Die Anfrage landet als strukturiertes JSON in Slack, inklusive Branche, Anrufvolumen, Paket und Seite, von der die Anfrage kam.</p>
      <div class="quote-box">
        <strong>Was danach passiert:</strong>
        <span>Wir prüfen Anrufarten, Kalenderlogik, Datenschutz und Integrationen. Danach erhalten Sie eine konkrete Empfehlung statt eines generischen Demo-Termins.</span>
      </div>
    </div>
    <form class="lead-form" id="lead-form" data-source="${esc(sourceLabel)}">
      <input type="text" name="website" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="sourcePage" value="${esc(sourceLabel)}">
      <div class="form-row">
        <label>Branche
          <select name="branche" required>
            <option value="">Bitte wählen</option>
            ${industryOptions}
            <option value="Andere Branche">Andere Branche</option>
          </select>
        </label>
        <label>Anrufe pro Tag
          <input type="number" name="anrufeProTag" min="1" max="500" value="12" data-cost-input>
        </label>
      </div>
      <div class="package-grid" role="radiogroup" aria-label="Minutenpaket">
        <label class="package-card"><input type="radio" name="minutenPaket" value="250" data-price="40" checked><span>250 Min</span><small>40 €/Monat</small></label>
        <label class="package-card"><input type="radio" name="minutenPaket" value="500" data-price="80"><span>500 Min</span><small>80 €/Monat</small></label>
        <label class="package-card"><input type="radio" name="minutenPaket" value="1000" data-price="150"><span>1.000 Min</span><small>150 €/Monat</small></label>
      </div>
      <div class="form-row">
        <label>AI-Rufnummern
          <input type="number" name="aiRufnummern" min="1" max="20" value="1" data-cost-input>
        </label>
        <label>Support
          <select name="supportPaket" data-cost-input>
            <option value="none" data-price="0">Kein Support</option>
            <option value="standard" data-price="290">Standard: 290 €/Monat</option>
            <option value="pro" data-price="580">Pro: 580 €/Monat</option>
          </select>
        </label>
      </div>
      <label class="check-line"><input type="checkbox" name="setupPaketPro" value="true" data-cost-input> Setup-Paket Pro einplanen (990 € einmalig)</label>
      <div class="cost-summary" aria-live="polite">
        <span>Geschätzt monatlich</span>
        <strong data-monthly>49 €</strong>
        <small data-onetime>Einmalig: 0 €</small>
      </div>
      <div class="form-row">
        <label>Firma
          <input type="text" name="firma" autocomplete="organization" required>
        </label>
        <label>Name
          <input type="text" name="name" autocomplete="name" required>
        </label>
      </div>
      <div class="form-row">
        <label>E-Mail
          <input type="email" name="email" autocomplete="email" required>
        </label>
        <label>Telefon
          <input type="tel" name="telefon" autocomplete="tel" required>
        </label>
      </div>
      <div class="form-row">
        <label>Stadt
          <input type="text" name="stadt" autocomplete="address-level2">
        </label>
        <label>Kalender
          <select name="kalender">
            <option>Google Calendar</option>
            <option>Microsoft 365 / Exchange Online</option>
            <option>Apple iCloud Calendar</option>
            <option>CalDAV / Self-Hosted</option>
            <option>Calendly / Doodle / Acuity</option>
            <option>HubSpot</option>
            <option>Salesforce</option>
            <option>SAP Schedule Manager</option>
            <option>Oracle / PeopleSoft</option>
            <option>Branchensoftware</option>
            <option>Mehrere Systeme</option>
            <option>Noch offen</option>
          </select>
        </label>
      </div>
      <label>Was soll die KI zuerst übernehmen?
        <textarea name="notiz" rows="4" placeholder="z. B. Telefontermine außerhalb der Öffnungszeiten, No-Shows reduzieren, Warteliste füllen"></textarea>
      </label>
      <button class="button button-primary form-submit" type="submit">Analyse anfordern</button>
      <p class="form-note">Kein Newsletter. Die Daten werden nur zur Bearbeitung Ihrer Anfrage verwendet.</p>
      <div class="form-status" role="status" aria-live="polite" hidden></div>
    </form>
  </div>
</section>`;
}

function faqBlock(faq) {
  return `<section class="section faq-section">
    <div class="container narrow">
      ${sectionIntro('FAQ', 'Häufige Fragen', 'Direkte Antworten für schnelle Entscheidungen, Setup, Datenschutz und Kalenderlogik.')}
      <div class="faq-list">
        ${faq.map((item) => `<details class="faq-item"><summary>${esc(item.q)}</summary><div>${item.a}</div></details>`).join('')}
      </div>
    </div>
  </section>`;
}

function sourceBlock() {
  return `<aside class="source-strip">
    <div class="container">
      <span>Referenzpunkte für saubere Umsetzung:</span>
      <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" rel="noopener noreferrer">strukturierte Daten</a>
      <a href="https://schema.org/FAQPage" rel="noopener noreferrer">FAQPage</a>
      <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" rel="noopener noreferrer">DSGVO</a>
      <a href="https://developers.google.com/workspace/calendar/api/guides/create-events" rel="noopener noreferrer">Google Calendar API</a>
      <a href="https://learn.microsoft.com/en-us/graph/api/resources/calendar" rel="noopener noreferrer">Microsoft Graph Calendar</a>
    </div>
  </aside>`;
}

function integrationSection(sourceLabel = 'Terminprozess', muted = false) {
  const systemCards = calendarSystems.map((system) => `<article class="system-card">
    <span class="system-logo" aria-hidden="true">${esc(system.short)}</span>
    <div>
      <h3>${esc(system.name)}</h3>
      <p class="system-method">${esc(system.method)}</p>
      <p>${esc(system.use)}</p>
    </div>
  </article>`).join('');
  const channelCards = demandChannels.map((channel, index) => `<article class="channel-card">
    <span>${String(index + 1).padStart(2, '0')}</span>
    <h3>${esc(channel.name)}</h3>
    <strong>${esc(channel.label)}</strong>
    <p>${esc(channel.text)}</p>
  </article>`).join('');
  return `<section class="section integration-section${muted ? ' section-muted' : ''}" id="kalendersysteme">
    <div class="container">
      ${sectionIntro('Kalender, Kanäle, Übergabe', 'Ein Terminprozess für alle relevanten Systeme', `${sourceLabel}: Entscheidend ist nicht nur ein Bot, sondern eine saubere Strecke von Anfragekanal über Pflichtfragen bis zum richtigen Kalender, CRM oder Slack-JSON.`)}
      <div class="integration-grid">${systemCards}</div>
      <div class="channel-panel">
        <div>
          <p class="kicker">Nachfragekanäle</p>
          <h2>Telefon, WhatsApp, Website, Google und Social führen in dieselbe Terminlogik</h2>
          <p class="lead">Viele Betriebe haben schon Reichweite: Website, Google Unternehmensprofil, Social Media, Kampagnen und Stammkunden per Telefon. Die KI macht daraus eine messbare Anfrage mit Branche, Stadt, Anliegen, Kalenderwunsch und nächstem Schritt.</p>
        </div>
        <div class="channel-grid">${channelCards}</div>
      </div>
    </div>
  </section>`;
}

function linkCards(items, prefix = '') {
  return `<div class="card-grid">${items.map((item) => `<a class="card link-card" href="${prefix}${item.href ?? `/branchen/${item.slug}/`}">
    <span class="mini-label">${esc(item.keyword ?? item.name)}</span>
    <h3>${esc(item.title ?? item.name)}</h3>
    <p>${esc(item.description)}</p>
  </a>`).join('')}</div>`;
}

function defaultFaq(subject, context) {
  return [
    {
      q: `Was ist ${subject}?`,
      a: `${subject} ist ein KI-gestützter Terminprozess, der Anfragen per Telefon, WhatsApp oder Web annimmt, Pflichtfragen stellt und Termine oder Rückruflisten nach klaren Regeln vorbereitet. ${context}`,
    },
    {
      q: 'Kann die KI direkt in meinen Kalender buchen?',
      a: 'Ja, wenn Kalenderregeln, Terminarten, Verfügbarkeiten und Pufferzeiten sauber definiert sind. Alternativ kann die KI eine qualifizierte Rückrufliste erstellen, bevor direkte Kalenderbuchung aktiviert wird.',
    },
    {
      q: 'Ist das DSGVO-konform möglich?',
      a: 'Ja, wenn Datenminimierung, EU-Verarbeitung, AVV, Zugriffskontrollen und klare Löschfristen eingerichtet sind. Sensible Entscheidungen sollten immer an Menschen übergeben werden.',
    },
    {
      q: 'Brauche ich eine neue Telefonnummer?',
      a: 'Nein. In vielen Setups reicht eine Rufumleitung auf eine AI-Rufnummer. Die Umleitung kann dauerhaft, außerhalb der Öffnungszeiten, bei Besetzt oder nach einer Klingeldauer greifen.',
    },
  ];
}

function homePage() {
  const faq = defaultFaq('KI-Terminplanung', 'Sie eignet sich besonders für Betriebe mit vielen wiederkehrenden Terminwünschen.');
  const body = `${hero({
    eyebrow: 'KI-Terminplanung für Deutschland',
    h1: 'Termine automatisch annehmen, buchen und als Slack-Lead übergeben',
    lead: 'Eine fokussierte Terminmaschine für Branchen mit echter Nachfrage: Telefon-KI, WhatsApp-Buchung, Online-Kalender, Erinnerungen und ein einziges Conversion-Ziel.',
    image: IMAGES.home,
    secondaryHref: '/branchen/',
    secondary: 'Nischen ansehen',
  })}
  <section class="trust-band">
    <div class="container trust-grid">
      <div><strong>24/7</strong><span>Terminannahme</span></div>
      <div><strong>40+</strong><span>Branchen & Städte</span></div>
      <div><strong>1 Ziel</strong><span>Slack-JSON Anfrage</span></div>
      <div><strong>EU + AVV</strong><span>DSGVO-Prozess</span></div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      ${sectionIntro('Branchen mit Terminbedarf', 'Konkrete Terminlogik statt generischer Software', 'Jede wichtige Branche bekommt eigene Workflows: Terminarten, Pflichtfragen, Kalenderregeln, Eskalation und Übergabe an das Team.')}
      ${linkCards(industries.slice(0, 12))}
      <div class="center-action"><a class="button button-secondary-dark" href="/branchen/">Alle Branchenseiten ansehen</a></div>
    </div>
  </section>
  <section class="section section-muted" id="vergleich">
    <div class="container two-col">
      <div>
        <p class="kicker">Warum es wirtschaftlich ist</p>
        <h2>Vom verpassten Anruf zur strukturierten Anfrage</h2>
        <p class="lead">Die stärkste Conversion ist nicht ein weiteres Kontaktformular. Es ist ein vorkonfigurierter Prozess, der zeigt, wie die KI im Betrieb arbeiten wird.</p>
      </div>
      <div class="comparison-list">
        <div><span>Ohne KI</span><strong>Mailbox, Rückrufliste, Besetztzeichen</strong></div>
        <div><span>Mit KI-Terminplanung</span><strong>Anliegen, Branche, Kalender, Paket und Notiz als JSON</strong></div>
        <div><span>Ohne Terminregeln</span><strong>Jeder Anruf muss manuell nachgefragt werden</strong></div>
        <div><span>Mit Terminregeln</span><strong>Branche, Anlass, Kalender und Übergabe sind vorqualifiziert</strong></div>
      </div>
    </div>
  </section>
  ${integrationSection('Startseite')}
  <section class="section">
    <div class="container">
      ${sectionIntro('Deutschlandweit', 'Für Betriebe in Ihrer Stadt', 'Lokale Unternehmen brauchen schnelle Erreichbarkeit. Die Stadtansichten zeigen, welche Branchen besonders von automatischer Terminannahme profitieren.')}
      <div class="pill-cloud">${cities.map((city) => `<a href="/staedte/${city.slug}/">KI-Terminplanung ${esc(city.name)}</a>`).join('')}</div>
    </div>
  </section>
  ${conversionSection('Startseite')}
  ${faqBlock(faq)}
  ${sourceBlock()}`;

  writePage('/', {
    title: 'KI-Terminplanung für Deutschland | Telefon, WhatsApp und Kalender',
    description: 'KI-Terminplanung für Branchen in Deutschland: Telefon-KI, WhatsApp, Online-Kalender, No-Show-Reduktion, Branchen- und Stadtseiten mit Slack-Leadflow.',
    image: IMAGES.home,
    priority: 1,
    changefreq: 'weekly',
    body,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: SITE.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: SITE.origin,
        offers: { '@type': 'Offer', priceCurrency: 'EUR', description: 'Konfiguration nach Minuten, Rufnummern und Setup.' },
        provider: { '@id': `${SITE.origin}/#organization` },
      },
      faqSchema(faq),
    ],
  });
}

function industryHub() {
  const faq = defaultFaq('KI-Terminplanung für Branchen', 'Wichtig ist, dass jede Branche eigene Terminarten, Pflichtfragen und Eskalationsregeln erhält.');
  const body = `${hero({
    eyebrow: 'Branchen-Hub',
    h1: 'KI-Terminplanung für Branchen mit echter Nachfrage',
    lead: 'Von Arztpraxis bis Kfz-Werkstatt: Jede Unterseite beantwortet eine konkrete Suchintention und führt zum gleichen Analyseformular.',
    image: IMAGES.consulting,
    compact: true,
    secondaryHref: '/staedte/',
    secondary: 'Stadtseiten ansehen',
  })}
  <section class="section"><div class="container">${linkCards(industries)}</div></section>
  ${conversionSection('Branchenseiten Hub')}
  ${faqBlock(faq)}`;
  writePage('/branchen', {
    title: 'KI-Terminplanung Branchen | Nischen für Deutschland',
    description: 'Alle Branchenseiten für KI-Terminplanung: Arztpraxis, Zahnarzt, Physiotherapie, Friseur, Handwerk, Kanzlei, Steuerberater, Restaurant, Hotel und mehr.',
    image: IMAGES.consulting,
    priority: 0.95,
    body,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: industries.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, url: canonical(`/branchen/${item.slug}`) })),
      },
      faqSchema(faq),
    ],
  });
}

function industryPage(item) {
  const related = industries.filter((other) => other.slug !== item.slug).slice(0, 6);
  const cityLinks = cities.slice(0, 10).map((city) => ({ href: `/staedte/${city.slug}/`, name: `${item.keyword} ${city.name}`, title: `${item.name} in ${city.name}`, description: `${item.context}: lokale Terminannahme für ${item.plural}.` }));
  const faq = [
    ...defaultFaq(item.keyword, `Für ${item.audience} zählt vor allem: ${item.accent}.`),
    {
      q: `Welche Daten sollte die KI für ${item.plural} abfragen?`,
      a: `Typisch sind Name, Rückrufnummer, Wunschtermin, Anliegen, Dringlichkeit und die branchenspezifischen Pflichtfelder: ${item.terms.join(', ')}.`,
    },
    {
      q: `Kann ${item.keyword} mit bestehenden Tools starten?`,
      a: 'Ja. Ein pragmatischer Start läuft oft über Rufumleitung, Kalenderfreigabe und Slack- oder E-Mail-Übergabe. Direkte Integrationen können danach ergänzt werden.',
    },
  ];
  const workflowRows = item.workflows.map(([title, text]) => `<tr><td>${esc(title)}</td><td>${esc(text)}</td><td>Strukturierte Übergabe an Team, Kalender oder Slack</td></tr>`).join('');
  const body = `${hero({
    eyebrow: item.keyword,
    h1: item.title,
    lead: item.description,
    image: item.image,
    compact: true,
    secondaryHref: '/branchen/',
    secondary: 'Alle Branchen',
  })}
  <section class="section answer-section">
    <div class="container two-col">
      <div>
        <p class="kicker">Kurzantwort</p>
        <h2>Was bringt ${esc(item.keyword)}?</h2>
        <p class="lead">${esc(item.pain)}</p>
        <ul class="check-list">${item.proof.map((point) => `<li>${esc(point)}</li>`).join('')}</ul>
      </div>
      <figure class="media-panel">
        <img src="${esc(item.image)}" alt="${esc(item.title)} im Arbeitsalltag" loading="lazy" decoding="async">
        <figcaption>${esc(item.accent)}</figcaption>
      </figure>
    </div>
  </section>
  <section class="section section-muted">
    <div class="container">
      ${sectionIntro('Workflows', `So arbeitet die KI für ${item.plural}`, 'Gute Termin-KI besteht nicht aus einem generischen Bot, sondern aus klaren Regeln, Pflichtfragen und Übergaben.')}
      <div class="table-wrap"><table><thead><tr><th>Situation</th><th>KI-Aktion</th><th>Ergebnis</th></tr></thead><tbody>${workflowRows}</tbody></table></div>
    </div>
  </section>
  ${integrationSection(item.keyword)}
  <section class="section">
    <div class="container">
      ${sectionIntro('Interne Verlinkung', 'Passende Seiten im Cluster', 'Branchen, Städte und Themen sind gegenseitig verlinkt, damit Nutzer und Crawler den Zusammenhang verstehen.')}
      ${linkCards([
        { href: '/themen/kalenderintegration/', name: 'Kalendersysteme', title: 'Kalendersysteme verbinden', description: 'Apple iCloud, Google Calendar, Microsoft 365, CalDAV, Calendly, Salesforce, SAP und Oracle.' },
        { href: '/themen/terminvereinbarung-per-telefon/', name: 'Telefon-Termine', title: 'Terminvereinbarung per Telefon', description: 'Anrufe automatisch annehmen und als Termin oder Rückruf übergeben.' },
        { href: '/themen/no-show-reduzieren/', name: 'No-Shows', title: 'No-Shows reduzieren', description: 'Erinnerungen, Bestätigungen und Wartelisten gegen leere Slots.' },
        { href: '/themen/ki-online-terminbuchung/', name: 'Online-Buchung', title: 'KI Online-Terminbuchung', description: 'Telefon, WhatsApp und Web-Kalender zusammenführen.' },
        { href: '/themen/google-business-profile-terminbuchung/', name: 'Google Business Profile', title: 'Google Unternehmensprofil nutzen', description: 'Lokale Suche, Maps, Anrufe und Buchungslinks in einen messbaren Terminprozess führen.' },
        { href: '/themen/social-media-terminbuchung/', name: 'Social Media', title: 'Social Media in Termine verwandeln', description: 'Instagram, Facebook, LinkedIn und Kampagnenlinks mit Terminlogik verbinden.' },
        ...related.map((r) => ({ href: `/branchen/${r.slug}/`, name: r.name, title: r.title, description: r.description })),
      ])}
    </div>
  </section>
  <section class="section section-muted">
    <div class="container">
      ${sectionIntro('Städte', `${item.keyword} lokal suchen`, `Diese Stadtseiten verbinden ${item.name}-Nachfrage mit regionalen Suchanfragen.`)}
      ${linkCards(cityLinks)}
    </div>
  </section>
  ${conversionSection(item.title)}
  ${faqBlock(faq)}
  ${sourceBlock()}`;

  writePage(`/branchen/${item.slug}`, {
    title: `${item.title} | Telefon, WhatsApp und Kalender`,
    description: item.description,
    image: item.image,
    priority: 0.9,
    body,
    schema: [serviceSchema(item, `/branchen/${item.slug}`), faqSchema(faq)],
  });
}

function cityHub() {
  const faq = defaultFaq('KI-Terminplanung in deutschen Städten', 'Die Stadtseiten sind für lokale Suchintentionen gedacht und verweisen auf passende Branchencluster.');
  const cards = cities.map((city) => ({ href: `/staedte/${city.slug}/`, name: `KI-Terminplanung ${city.name}`, title: city.name, description: city.context }));
  const body = `${hero({
    eyebrow: 'Stadtseiten',
    h1: 'KI-Terminplanung in deutschen Städten',
    lead: 'Lokale Landingpages für Berlin, München, Hamburg, Köln und weitere Städte. Jede Seite verlinkt zurück in passende Branchencluster.',
    image: IMAGES.office,
    compact: true,
    secondaryHref: '/branchen/',
    secondary: 'Branchen ansehen',
  })}
  <section class="section"><div class="container">${linkCards(cards)}</div></section>
  ${conversionSection('Stadtseiten Hub')}
  ${faqBlock(faq)}`;
  writePage('/staedte', {
    title: 'KI-Terminplanung Städte | Lokale Terminannahme in Deutschland',
    description: 'Stadtseiten für KI-Terminplanung in Deutschland: Berlin, München, Hamburg, Köln, Frankfurt, Stuttgart, Düsseldorf und weitere lokale Märkte.',
    image: IMAGES.office,
    priority: 0.9,
    body,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: cities.map((city, index) => ({ '@type': 'ListItem', position: index + 1, name: `KI-Terminplanung ${city.name}`, url: canonical(`/staedte/${city.slug}`) })),
      },
      faqSchema(faq),
    ],
  });
}

function cityPage(city) {
  const focusIndustries = city.focus.map((slug) => industries.find((item) => item.slug === slug)).filter(Boolean);
  const faq = [
    {
      q: `Für wen lohnt sich KI-Terminplanung in ${city.name}?`,
      a: `Besonders sinnvoll ist sie für Betriebe, die viele wiederkehrende Terminwünsche erhalten: ${focusIndustries.map((item) => item.plural).join(', ')} und andere lokale Dienstleister.`,
    },
    ...defaultFaq(`KI-Terminplanung ${city.name}`, `Für ${city.name} wird die Terminlogik nicht lokal erfunden, sondern an Branche, Öffnungszeiten und Rückrufregeln angepasst.`).slice(1),
  ];
  const body = `${hero({
    eyebrow: `KI-Terminplanung ${city.name}`,
    h1: `KI-Terminplanung in ${city.name}`,
    lead: `${city.context}: automatische Terminannahme per Telefon, WhatsApp und Web-Kalender für lokale Unternehmen.`,
    image: IMAGES.office,
    compact: true,
    secondaryHref: '/staedte/',
    secondary: 'Alle Städte',
  })}
  <section class="section answer-section">
    <div class="container two-col">
      <div>
        <p class="kicker">Lokale Kurzantwort</p>
        <h2>Wie hilft KI-Terminplanung in ${esc(city.name)}?</h2>
        <p class="lead">Die KI nimmt Terminwünsche entgegen, wenn Teams im Kundengespräch, in Behandlung, im Service oder unterwegs sind. Für ${esc(city.name)} ist der Hebel besonders stark bei ${focusIndustries.map((item) => item.plural).join(', ')}.</p>
        <ul class="check-list">
          <li>Telefonische Anfragen werden nicht mehr durch Besetztzeichen oder Mailbox verloren.</li>
          <li>WhatsApp- und Web-Anfragen können denselben Terminregeln folgen.</li>
          <li>Jede Anfrage landet mit Stadt, Branche und Paketdaten strukturiert in Slack.</li>
        </ul>
      </div>
      <div class="stat-stack">
        <div><strong>24/7</strong><span>Terminannahme</span></div>
        <div><strong>${focusIndustries.length}</strong><span>Branchenschwerpunkte</span></div>
        <div><strong>1</strong><span>Conversion-Ziel</span></div>
      </div>
    </div>
  </section>
  <section class="section section-muted">
    <div class="container">
      ${sectionIntro('Schwerpunkte', `Branchen in ${city.name}`, 'Diese Branchen haben wiederkehrende Terminlogik und passen besonders gut zu automatisierter Annahme.')}
      ${linkCards(focusIndustries)}
    </div>
  </section>
  <section class="section">
    <div class="container process-grid">
      <div><span>01</span><h3>Anrufarten sammeln</h3><p>Termin, Rückruf, Absage, Notfall, Beratung oder Reservierung werden getrennt.</p></div>
      <div><span>02</span><h3>Regeln definieren</h3><p>Öffnungszeiten, Dauer, Mitarbeiter, Standorte und Pufferzeiten werden festgelegt.</p></div>
      <div><span>03</span><h3>Rufumleitung starten</h3><p>Die bestehende Nummer bleibt. Die KI greift dauerhaft oder nach Regel.</p></div>
      <div><span>04</span><h3>Slack-JSON prüfen</h3><p>Jede Anfrage kommt strukturiert an und kann später in CRM oder Kalender erweitert werden.</p></div>
    </div>
  </section>
  ${integrationSection(`KI-Terminplanung ${city.name}`, true)}
  ${conversionSection(`KI-Terminplanung ${city.name}`)}
  ${faqBlock(faq)}`;

  writePage(`/staedte/${city.slug}`, {
    title: `KI-Terminplanung ${city.name} | Telefon-KI für lokale Termine`,
    description: `KI-Terminplanung in ${city.name}: Telefon, WhatsApp und Online-Kalender für lokale Dienstleister, Praxen, Kanzleien, Handwerk und Gastronomie.`,
    image: IMAGES.office,
    priority: 0.72,
    body,
    schema: [faqSchema(faq)],
  });
}

function useCaseHub() {
  const faq = defaultFaq('KI-Terminplanung Themen', 'Die Themenseiten erklären einzelne Hebel wie Telefonannahme, WhatsApp, Kalenderintegration, No-Show-Reduktion und lokale Nachfragekanäle.');
  const cards = useCases.map((item) => ({
    href: `/themen/${item.slug}/`,
    name: item.keyword,
    title: item.title,
    description: item.description,
  }));
  const body = `${hero({
    eyebrow: 'Themen-Hub',
    h1: 'Terminannahme über Telefon, WhatsApp, Kalender, Google und Social',
    lead: 'Die Themenseiten bündeln die wichtigsten Suchintentionen rund um KI-Terminplanung: von Anrufannahme über Kalenderintegration bis zur strukturierten Slack-Übergabe.',
    image: IMAGES.phone,
    compact: true,
    secondaryHref: '/branchen/',
    secondary: 'Branchen ansehen',
  })}
  <section class="section">
    <div class="container">
      ${sectionIntro('Use Cases', 'Was rund um Termine wirklich gesucht wird', 'Diese Seiten verbinden einzelne Kanäle und Integrationen mit konkreter Terminlogik, damit Nutzer und Crawler den Produktnutzen schnell verstehen.')}
      ${linkCards(cards)}
    </div>
  </section>
  ${integrationSection('Themen-Hub', true)}
  ${conversionSection('Themen Hub')}
  ${faqBlock(faq)}`;
  writePage('/themen', {
    title: 'KI-Terminplanung Themen | Telefon, WhatsApp, Kalender und Google',
    description: 'Themenseiten für KI-Terminplanung: Telefontermine, WhatsApp, Kalenderintegration, Google Unternehmensprofil, Social Media, No-Shows und Slack-Leadflow.',
    image: IMAGES.phone,
    priority: 0.88,
    body,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: useCases.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, url: canonical(`/themen/${item.slug}`) })),
      },
      faqSchema(faq),
    ],
  });
}

function useCasePage(item) {
  const subject = item.subject ?? item.keyword;
  const faq = defaultFaq(subject, item.intent);
  const relatedIndustries = industries.slice(0, 8);
  const body = `${hero({
    eyebrow: item.keyword,
    h1: item.title,
    lead: item.description,
    image: item.image,
    compact: true,
    secondaryHref: '/branchen/',
    secondary: 'Branchen ansehen',
  })}
  <section class="section answer-section">
    <div class="container two-col">
      <div>
        <p class="kicker">Kurzantwort</p>
        <h2>${esc(subject)} sinnvoll einsetzen</h2>
        <p class="lead">${esc(item.intent)}</p>
        <ul class="check-list">
          <li>Einheitliche Terminregeln für Telefon, WhatsApp und Web.</li>
          <li>Pflichtfragen vor dem Rückruf statt unvollständiger Notizen.</li>
          <li>Slack-Übergabe mit JSON für schnelle Weiterverarbeitung.</li>
        </ul>
      </div>
      <figure class="media-panel">
        <img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy" decoding="async">
        <figcaption>${esc(item.description)}</figcaption>
      </figure>
    </div>
  </section>
  ${integrationSection(subject, true)}
  <section class="section section-muted"><div class="container">
    ${sectionIntro('Passende Branchen', 'Wo dieser Use Case besonders stark ist', 'Die folgenden Branchen haben viele wiederkehrende Terminwünsche und profitieren von sauberer Vorqualifizierung.')}
    ${linkCards(relatedIndustries)}
  </div></section>
  ${conversionSection(item.title)}
  ${faqBlock(faq)}
  ${sourceBlock()}`;
  writePage(`/themen/${item.slug}`, {
    title: `${item.title} | KI-Terminplanung`,
    description: item.description,
    image: item.image,
    priority: 0.78,
    body,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: item.title,
        serviceType: item.keyword,
        provider: { '@id': `${SITE.origin}/#organization` },
        areaServed: { '@type': 'Country', name: 'Deutschland' },
        description: item.description,
      },
      faqSchema(faq),
    ],
  });
}

function legalPages() {
  writePage('/impressum', {
    title: 'Impressum | KI-Terminplanung',
    description: 'Impressum der KI-Terminplanung von track by track GmbH in Berlin.',
    image: IMAGES.office,
    priority: 0.2,
    body: `<section class="legal-page"><div class="container narrow">
      <h1>Impressum</h1>
      <p><strong>${esc(SITE.company)}</strong><br>${esc(SITE.address.streetAddress)}<br>${esc(SITE.address.postalCode)} ${esc(SITE.address.addressLocality)}<br>Deutschland</p>
      <h2>Kontakt</h2>
      <p>E-Mail: <a href="mailto:${SITE.email}">${SITE.email}</a><br>Telefon: <a href="tel:${SITE.phone.replaceAll(' ', '')}">${SITE.phone}</a></p>
      <h2>Registereintrag</h2>
      <p>Handelsregister: Amtsgericht Charlottenburg<br>HRB 265042 B<br>USt-IdNr.: DE364151626</p>
      <h2>Geschäftsführer</h2>
      <p>Dominik Eber</p>
    </div></section>`,
  });

  writePage('/datenschutz', {
    title: 'Datenschutz | KI-Terminplanung',
    description: 'Datenschutzhinweise für KI-Terminplanung, Kontaktformular, Slack-Leadflow und Plausible Analytics.',
    image: IMAGES.office,
    priority: 0.2,
    body: `<section class="legal-page"><div class="container narrow">
      <h1>Datenschutz</h1>
      <p>Diese Seite verarbeitet Kontakt- und Konfigurationsdaten, wenn Sie das Analyseformular absenden. Die Angaben werden zur Bearbeitung Ihrer Anfrage verwendet und können als strukturierte Nachricht an interne Systeme wie Slack übertragen werden.</p>
      <h2>Verantwortlicher</h2>
      <p>${esc(SITE.company)}, ${esc(SITE.address.streetAddress)}, ${esc(SITE.address.postalCode)} ${esc(SITE.address.addressLocality)}, E-Mail: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
      <h2>Kontaktformular</h2>
      <p>Erfasst werden Firma, Name, E-Mail, Telefon, Branche, Stadt, Kalender- und Paketangaben sowie Ihre Notiz. Rechtsgrundlage ist die Bearbeitung vorvertraglicher Anfragen.</p>
      <h2>Analytics</h2>
      <p>Diese Website nutzt datenschutzfreundliche Reichweitenmessung über Plausible beziehungsweise die konfigurierte Plausible-Instanz. Es werden keine personenbezogenen Werbeprofile erstellt.</p>
      <h2>Ihre Rechte</h2>
      <p>Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit nach DSGVO. Schreiben Sie dazu an <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    </div></section>`,
  });

  writeFile('404.html', `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Seite nicht gefunden | KI-Terminplanung</title><link rel="stylesheet" href="/assets/site.css"></head><body>${siteHeader()}<main class="legal-page"><div class="container narrow"><h1>Seite nicht gefunden</h1><p>Die gesuchte Seite existiert nicht oder wurde verschoben.</p><a class="button button-primary" href="/">Zur Startseite</a></div></main>${siteFooter()}<script src="/assets/site.js" defer></script></body></html>`);
}

function staticFiles() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageRegistry.map((page) => `  <url><loc>${page.loc}</loc><lastmod>${page.lastmod}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority.toFixed(2)}</priority></url>`).join('\n')}
</urlset>
`;
  writeFile('sitemap.xml', sitemap);

  writeFile('robots.txt', `# KI-Terminplanung robots.txt
# Zuletzt aktualisiert: 2026-05-04

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: GPTBot
Allow: /
Crawl-delay: 2

User-agent: OAI-SearchBot
Allow: /
Crawl-delay: 2

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 2

User-agent: ClaudeBot
Allow: /
Crawl-delay: 2

User-agent: Claude-Web
Allow: /
Crawl-delay: 2

User-agent: anthropic-ai
Allow: /
Crawl-delay: 2

User-agent: PerplexityBot
Allow: /
Crawl-delay: 2

User-agent: Google-Extended
Allow: /
Crawl-delay: 2

User-agent: cohere-ai
Allow: /
Crawl-delay: 2

User-agent: CCBot
Allow: /
Crawl-delay: 2

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: *
Allow: /
Disallow: /api/
Crawl-delay: 10

Sitemap: ${SITE.origin}/sitemap.xml
`);

  writeFile('llms.txt', `${SITE.name} - KI-Terminplanung für Deutschland

Canonical: ${SITE.origin}/
Robots: ${SITE.origin}/robots.txt
Sitemap: ${SITE.origin}/sitemap.xml
Language: de-DE
Last-Modified: ${LASTMOD}

Kurzantwort:
KI-Terminplanung ist eine Website und Leadstrecke für automatische Terminannahme per Telefon, WhatsApp und Online-Kalender. Zielgruppen sind deutsche Branchen mit wiederkehrenden Terminwünschen: Arztpraxen, Zahnarztpraxen, Physiotherapie, Friseursalons, Kosmetikstudios, Handwerksbetriebe, Kfz-Werkstätten, Kanzleien, Steuerberater, Restaurants, Hotels und beratende Dienstleister.

Conversion:
Alle relevanten Seiten führen zu einem Analyseformular. Das Formular sendet eine strukturierte JSON-Anfrage an /api/configurator und von dort an Slack, sofern SLACK_WEBHOOK_URL oder KI_TERMINPLANUNG_SLACK_WEBHOOK_URL in Vercel gesetzt ist.

Wichtige Seiten:
Homepage: ${SITE.origin}/
Branchen: ${SITE.origin}/branchen/
Städte: ${SITE.origin}/staedte/
Themen: ${SITE.origin}/themen/
Telefonische Terminvereinbarung: ${SITE.origin}/themen/terminvereinbarung-per-telefon/
No-Shows reduzieren: ${SITE.origin}/themen/no-show-reduzieren/
Online-Terminbuchung: ${SITE.origin}/themen/ki-online-terminbuchung/
Kalendersysteme: ${SITE.origin}/themen/kalenderintegration/
Google Business Profile Terminbuchung: ${SITE.origin}/themen/google-business-profile-terminbuchung/
Social Media Terminbuchung: ${SITE.origin}/themen/social-media-terminbuchung/

Kalender- und Integrationssysteme:
${calendarSystems.map((system) => `- ${system.name}: ${system.method}`).join('\n')}

Nachfragekanäle:
${demandChannels.map((channel) => `- ${channel.name}: ${channel.label}`).join('\n')}

Branchen:
${industries.map((item) => `- ${item.title}: ${SITE.origin}/branchen/${item.slug}/`).join('\n')}

Städte:
${cities.map((city) => `- KI-Terminplanung ${city.name}: ${SITE.origin}/staedte/${city.slug}/`).join('\n')}

Betreiber:
${SITE.company}, ${SITE.address.streetAddress}, ${SITE.address.postalCode} ${SITE.address.addressLocality}, Deutschland.
Kontakt: ${SITE.email}, ${SITE.phone}
`);

  writeFile('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0f513f"/><path d="M17 18h30v28H17z" fill="#fff"/><path d="M22 25h20M22 32h20M22 39h12" stroke="#0f513f" stroke-width="4" stroke-linecap="round"/><path d="M20 14v8M44 14v8" stroke="#f2b84b" stroke-width="5" stroke-linecap="round"/></svg>`);
}

function run() {
  homePage();
  industryHub();
  industries.forEach(industryPage);
  cityHub();
  cities.forEach(cityPage);
  useCaseHub();
  useCases.forEach(useCasePage);
  legalPages();
  staticFiles();
  console.log(`Generated ${pageRegistry.length} pages.`);
}

run();
