/**
 * WTM Management Consulting - Seminar Data
 * Contains all content for the dynamic seminar system.
 */

const seminarsData = {
    // =========================================
    // FÜHRUNG (Leadership)
    // =========================================
    "leadership-basics": {
        id: "leadership-basics",
        title: "Leadership Basics",
        category: "leadership",
        badge: "Seminar",
        shortDescription: "Die Grundlagen wirksamer Führung: Führungsverständnis, Selbstmanagement, Kommunikation, Delegation und konstruktiver Umgang mit Konflikten.",
        details: ["3 Tage Präsenz", "Max. 12 Teilnehmer", "Zertifikat"],
        heroImage: "assets/hero-meeting.jpg", // Placeholder - needs actual mapping
        content: {
            intro: "Frisch gebackene Führungskräfte erfahren in diesem Seminar das Wichtigste zum Thema Führung mit den Kernfeldern Kommunikation, Selbstmanagement und Konfliktlösung. Unser Ziel ist es, gemeinsam ein Grundgerüst zu bauen, das auf kommende Führungsaufgaben vorbereitet.",
            ziele: [
                "Eigenes Führungsverständnis reflektieren und entwickeln",
                "Grundlagen der Kommunikation und Gesprächsführung",
                "Konflikte frühzeitig erkennen und konstruktiv lösen",
                "Selbstmanagement und Zeitmanagement für Führungskräfte",
                "Delegation als Führungsinstrument nutzen"
            ],
            inhalte: "Das Seminar gliedert sich in mehrere Module, die alle wesentlichen Aspekte moderner Führung abdecken. Von der Klärung der eigenen Rolle über wirksame Kommunikation bis hin zum Umgang mit schwierigen Situationen. Der Fokus liegt dabei auf Praxisnähe und direkter Anwendbarkeit.",
            nutzen: "Sie erhalten einen umfassenden Überblick über die Aufgaben einer Führungskraft und erlernen konkrete Werkzeuge für Ihren Führungsalltag. Sie gewinnen Sicherheit im Umgang mit Mitarbeitern und Teams.",
            zielgruppe: "Nachwuchsführungskräfte, Teamleiter und alle, die ihre Führungskompetenzen auf ein solides Fundament stellen möchten."
        }
    },
    "multiple-leadership": {
        id: "multiple-leadership",
        title: "Multiple Leadership",
        category: "leadership",
        badge: "Aufbau",
        shortDescription: "Agiles Führen, laterales Führen, Führen ohne Weisungsbefugnis – mehrdimensionale Führung in komplexen Organisationen verstehen und leben.",
        details: ["2 Tage Präsenz", "Vertiefungsmodul", "Follow-up Call"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Führung ist heute komplexer denn je. Neben der klassischen hierarchischen Führung gewinnen laterale Führung und Führung in agilen Kontexten immer mehr an Bedeutung.",
            ziele: [
                "Unterschiedliche Führungsrollen verstehen und flexibel einnehmen",
                "Laterales Führen: Wirksam sein ohne Weisungsbefugnis",
                "Agile Prinzipien in der Führung anwenden",
                "Umgang mit komplexen Entscheidungsstrukturen"
            ],
            inhalte: "Reflexion der eigenen Führungsrolle in unterschiedlichen Kontexten. Methoden der lateralen Führung. Agiles Mindset und Tools. Fallarbeit an eigenen Praxisbeispielen.",
            nutzen: "Sie erweitern Ihr Handlungsrepertoire und können auch in komplexen, nicht-hierarchischen Strukturen wirksam führen.",
            zielgruppe: "Erfahrene Führungskräfte, Projektleiter, Agile Coaches."
        }
    },
    "fuehren-in-beziehung": {
        id: "fuehren-in-beziehung",
        title: "Führen in Beziehung",
        category: "leadership",
        badge: "Intensiv",
        shortDescription: "Vertrauensvolle Führungsbeziehungen aufbauen und gestalten. Wirksame Kommunikation, Feedbackkultur und emotionale Intelligenz.",
        details: ["2 Tage Präsenz", "Praxistransfer", "Supervision"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Führung ist Beziehung. Die Qualität der Beziehung zwischen Führungskraft und Mitarbeiter entscheidet maßgeblich über Motivation, Bindung und Leistung.",
            ziele: [
                "Beziehungsqualität als Erfolgsfaktor erkennen",
                "Vertrauen aufbauen und erhalten",
                "Schwierige Beziehungsdynamiken verstehen und lösen",
                "Emotionale Intelligenz in der Führung nutzen"
            ],
            inhalte: "Grundlagen der Beziehungsgestaltung. Psychologische Aspekte von Vertrauen. Umgang mit Emotionen im Führungsalltag. Beziehungsstatus analysieren und verbessern.",
            nutzen: "Sie stärken die Bindung zu Ihren Mitarbeitern und schaffen eine Atmosphäre von Vertrauen und Offenheit.",
            zielgruppe: "Führungskräfte aller Ebenen, die ihre Beziehungskompetenz stärken wollen."
        }
    },

    // =========================================
    // KOMMUNIKATION (Communication)
    // =========================================
    "verhandlung-argumentation": {
        id: "verhandlung-argumentation",
        title: "Verhandlung & Argumentation",
        category: "communication",
        badge: "Klassiker",
        shortDescription: "Überzeugend argumentieren, fair verhandeln und in schwierigen Gesprächen souverän bleiben. Mit dem Harvard-Konzept und praktischen Übungen.",
        details: ["2 Tage Präsenz", "Videofeedback", "Praxisfälle"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Ob im Kundengespräch, bei Gehaltsverhandlungen oder in der Projektbesprechung: Verhandlungsgeschick und Argumentationsstärke sind Schlüsselfaktoren für beruflichen Erfolg.",
            ziele: [
                "Verhandlungsstrategien kennen und anwenden (Harvard-Konzept)",
                "Überzeugende Argumentationsketten aufbauen",
                "Umgang mit unfairen Taktiken und Einwänden",
                "Verhandlungsergebnisse sichern"
            ],
            inhalte: "Phasen einer Verhandlung. Das Harvard-Konzept. Fragetechniken und aktives Zuhören. Argumentationstraining. Umgang mit Stress und Emotionen in Verhandlungen.",
            nutzen: "Sie erreichen Ihre Ziele in Verhandlungen öfter und besser, ohne dabei die Beziehung zum Verhandlungspartner zu beschädigen.",
            zielgruppe: "Fach- und Führungskräfte, Vertriebsmitarbeiter, Projektleiter."
        }
    },
    "rhetorik": {
        id: "rhetorik",
        title: "Rhetorik",
        category: "communication",
        badge: "Praxis",
        shortDescription: "Seriös und verständlich informieren und dabei eine lebendige Wirkung erzielen. Zuhörer gewinnen und überzeugen.",
        details: ["2 Tage Präsenz", "Kameratraining", "Individuelles Feedback"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Seriös und verständlich informieren und dabei eine lebendige Wirkung erzielen: Wie können Sie Zuhörer mitnehmen und gewinnen? Was macht Ihre Sprache, Ihr Sprechen verständlich und klar?",
            ziele: [
                "Präsentationen mit geeignetem Medieneinsatz planen und durchführen",
                "Inhalte ziel- und zielgruppengerecht vermitteln",
                "Präsenz und Sicherheit durch Optimierung der eigenen Präsentationspersönlichkeit",
                "Souveräner Umgang mit Einwänden, Fragen und Störungen"
            ],
            inhalte: "Aufbau einer Rede/Präsentation. Körpersprache und Stimme. Medieneinsatz. Umgang mit Lampenfieber. Interaktion mit dem Publikum.",
            nutzen: "Ihre Vorträge und Präsentationen sind wirksam, verständlich und prägnant. Sie erreichen Ihre Zuhörer und können Sie überzeugen.",
            zielgruppe: "Alle Menschen, die vor anderen wirkungsvoll sprechen möchten."
        }
    },
    "konfliktmanagement": {
        id: "konfliktmanagement",
        title: "Konfliktmanagement",
        category: "communication",
        badge: "Grundlagen",
        shortDescription: "Konflikte erkennen, verstehen und konstruktiv lösen. Mediative Kompetenzen für Führungskräfte und Projektverantwortliche.",
        details: ["2 Tage Präsenz", "Fallarbeit", "Methodenkoffer"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Konflikte sind im Arbeitsalltag unvermeidbar. Entscheidend ist nicht, ob es Konflikte gibt, sondern wie professionell mit ihnen umgegangen wird.",
            ziele: [
                "Konfliktarten und Eskalationsstufen erkennen",
                "Konfliktursachen analysieren",
                "Lösungsstrategien entwickeln und umsetzen",
                "Gesprächsführung in Konfliktsituationen"
            ],
            inhalte: "Konflikttheorie (Glasl u.a.). Analyse eigener Konfliktmuster. Deeskalationstechniken. Moderation von Konfliktgesprächen.",
            nutzen: "Sie verlieren die Scheu vor Konflikten und lernen, sie als Chance für Klärung und Weiterentwicklung zu nutzen.",
            zielgruppe: "Führungskräfte, Teamleiter, HR-Verantwortliche."
        }
    },

    // =========================================
    // SELBSTKOMPETENZ (Self)
    // =========================================
    "selbstmanagement": {
        id: "selbstmanagement",
        title: "Selbstmanagement",
        category: "self",
        badge: "Intensiv",
        shortDescription: "Die eigene Energie managen, Grenzen setzen, in belastenden Situationen handlungsfähig bleiben.",
        details: ["2 Tage Präsenz", "Persönlicher Plan", "Check-in nach 4 Wochen"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "In einer Welt voller Ablenkungen und hoher Anforderungen ist die Fähigkeit, sich selbst zu steuern, zur Schlüsselkompetenz geworden.",
            ziele: [
                "Eigene Arbeitsweisen reflektieren und optimieren",
                "Prioritäten richtig setzen (Eisenhower, Pareto)",
                "Zeitdiebe erkennen und eliminieren",
                "Stressfaktoren identifizieren und bewältigen"
            ],
            inhalte: "Analyse des eigenen Zeit- und Selbstmanagements. Methoden der Priorisierung. Planungstechniken. Umgang mit E-Mail-Flut und Störungen. Energie-Management.",
            nutzen: "Sie gewinnen Zeit und Gelassenheit zurück. Sie arbeiten effektiver statt härter.",
            zielgruppe: "Alle, die ihren Arbeitsalltag strukturierter und stressfreier gestalten wollen."
        }
    },
    "gesundheit": {
        id: "gesundheit",
        title: "Gesundheit",
        category: "self",
        badge: "Vitalität",
        shortDescription: "Gesund bleiben im Berufsalltag. Strategien für körperliche und mentale Fitness.",
        details: ["1-2 Tage", "Praxisübungen", "Gesundheits-Check"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Gesundheit ist die Basis für Leistungsfähigkeit und Lebensfreude. Doch im stressigen Berufsalltag kommt sie oft zu kurz.",
            ziele: [
                "Zusammenhänge zwischen Stress und Gesundheit verstehen",
                "Eigene Ressourcen stärken",
                "Entspannungstechniken kennenlernen",
                "Gesunde Führung (sich selbst und andere)"
            ],
            inhalte: "Stressmodelle. Ernährung und Bewegung im Büroalltag. Achtsamkeit und Entspannung. Burnout-Prävention.",
            nutzen: "Sie entwickeln ein schärferes Bewusstsein für Ihre Gesundheit und erlernen Techniken, um langfristig leistungsfähig und gesund zu bleiben.",
            zielgruppe: "Alle Mitarbeiter und Führungskräfte."
        }
    },

    // =========================================
    // CHANGE (Change)
    // =========================================
    "change": {
        id: "change",
        title: "Change Management",
        category: "change",
        badge: "Strategie",
        shortDescription: "Veränderungsprozesse aktiv gestalten und begleiten. Psychologie der Veränderung verstehen.",
        details: ["2 Tage Präsenz", "Simulation", "Tools"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Nichts ist beständiger als der Wandel. Unternehmen müssen sich ständig anpassen – und die Mitarbeiter müssen diesen Weg mitgehen.",
            ziele: [
                "Phasen von Veränderungsprozessen verstehen",
                "Widerstände erkennen und konstruktiv nutzen",
                "Kommunikation in Change-Prozessen",
                "Die Rolle der Führungskraft im Wandel"
            ],
            inhalte: "Modelle des Change Managements (Kotter, Lewin). Die emotionale Kurve der Veränderung. Umgang mit Ängsten und Unsicherheiten. Erfolgsfaktoren für Change-Projekte.",
            nutzen: "Sie können Veränderungsprozesse professioneller planen und begleiten und erhöhen die Akzeptanz bei den Betroffenen.",
            zielgruppe: "Führungskräfte, Change Agents, Projektleiter."
        }
    },

    // =========================================
    // MANAGEMENT (New Category based on Sitemap)
    // =========================================
    "projektmanagement": {
        id: "projektmanagement",
        title: "Projektmanagement Grundlagen",
        category: "management",
        badge: "Methodik",
        shortDescription: "Projekte erfolgreich starten, planen, steuern und abschließen. Klassisches und agiles Handwerkszeug.",
        details: ["2 Tage Präsenz", "Projekt-Simulation", "Vorlagen"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Projekte sind heute die dominierende Arbeitsform. Solides Projektmanagement-Handwerk ist daher unverzichtbar.",
            ziele: [
                "Projektziele klar definieren (SMART)",
                "Projekte strukturieren und planen",
                "Risiken managen",
                "Projektteams führen"
            ],
            inhalte: "Projektphasen. Auftragsklärung. Projektstrukturplan. Termin- und Ressourcenplanung. Stakeholder-Analyse. Projektcontrolling.",
            nutzen: "Sie führen Ihre Projekte strukturierter und sicherer zum Erfolg.",
            zielgruppe: "Projektleiter, Teilprojektleiter und Projektmitarbeiter."
        }
    },

    // =========================================
    // QUALIFIZIERUNG (Qualification)
    // =========================================
    "trainerausbildung": {
        id: "trainerausbildung",
        title: "Trainerausbildung",
        category: "qualification",
        badge: "12 Monate",
        shortDescription: "Qualifizierung zum zertifizierten Trainer und Berater. Methodik, Didaktik, Rhetorik.",
        details: ["8 Module à 2-3 Tage", "Praxisprojekt", "Zertifizierung"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Werden Sie Profi in der Vermittlung von Wissen und der Begleitung von Lernprozessen.",
            ziele: [
                "Seminare professionell konzipieren und durchführen",
                "Gruppendynamik steuern",
                "Methodenvielfalt sicher einsetzen",
                "Als Trainerpersönlichkeit überzeugen"
            ],
            inhalte: "Auftragsklärung und Design. Methoden und Medien. Präsentation und Rhetorik. Umgang mit Störungen. Transferwirksamkeit.",
            nutzen: "Sie erwerben eine fundierte Qualifikation, die Sie befähigt, professionelle Trainings und Workshops durchzuführen.",
            zielgruppe: "Angehende Trainer, Fachreferenten, HR-Personalentwickler."
        }
    },
    "coaching-ausbildung": {
        id: "coaching-ausbildung",
        title: "Coaching-Ausbildung",
        category: "qualification",
        badge: "12 Monate",
        shortDescription: "Fundierte Ausbildung zum Business Coach. Systemisches Coaching, Gesprächsführung, Interventionen und Selbstreflexion.",
        details: ["8 Module", "Lehrcoaching", "Supervision"],
        heroImage: "assets/hero-meeting.jpg",
        content: {
            intro: "Coaching ist eine der wirksamsten Methoden zur individuellen Personalentwicklung. Unsere Ausbildung vermittelt Ihnen das nötige Handwerkszeug.",
            ziele: [
                "Coaching-Prozesse strukturieren und leiten",
                "Systemische Fragetechniken beherrschen",
                "Interventionen zielsicher auswählen",
                "Eigene Haltung als Coach entwickeln"
            ],
            inhalte: "Grundlagen des systemischen Coachings. Der Coaching-Prozess. Fragekompetenz. Arbeit mit Werten und Glaubenssätzen. Lösungsorientierung.",
            nutzen: "Sie können professionelle Coaching-Gespräche führen und Menschen wirksam in ihrer Entwicklung unterstützen.",
            zielgruppe: "Führungskräfte, HR-Profis, Berater."
        }
    }
};

// Make it available globally
if (typeof window !== 'undefined') {
    window.seminarsData = seminarsData;
}
