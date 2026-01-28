/**
 * WTM Online Coaching Data
 * Contains all coach profiles for the online coaching section
 */

const coachingData = {
    // Available filter themes
    themes: [
        { id: 'all', label: 'Alle', icon: '✨' },
        { id: 'fuehrung', label: 'Führung', icon: '👔' },
        { id: 'kommunikation', label: 'Kommunikation', icon: '💬' },
        { id: 'konflikt', label: 'Konfliktbewältigung', icon: '🤝' },
        { id: 'stress', label: 'Stressbewältigung / Resilienz', icon: '🧘' },
        { id: 'persoenlich', label: 'Persönliche Entwicklung', icon: '🌱' },
        { id: 'karriere', label: 'Karriereentwicklung', icon: '📈' },
        { id: 'team', label: 'Teamdynamiken', icon: '👥' },
        { id: 'worklife', label: 'Work-Life-Balance', icon: '⚖️' },
        { id: 'krise', label: 'Krisenbewältigung', icon: '🛡️' },
        { id: 'entscheidung', label: 'Entscheidungsfindung', icon: '🎯' },
        { id: 'agil', label: 'Agiles Arbeiten', icon: '🔄' },
        { id: 'zeit', label: 'Zeitmanagement', icon: '⏰' },
        { id: 'rolle', label: 'Professionalität & Rollenbewusstsein', icon: '🎭' }
    ],

    // Coach profiles
    coaches: [
        {
            id: 'frank-titzer',
            name: 'Frank Titzer',
            photo: 'assets/team/frank_titzer.jpg',
            role: 'Coach & Supervisor',
            motto: 'Klarheit und Wahrheit vor Schönheit',
            description: 'Brückenbauend, bodenständig, zugewandt konfrontierend, klar in Benennung und Hinweisen. Dies geerdet im Respekt für die Einzigartigkeit individuellen Erlebens und individueller Rollenentwürfe. Im Beratungsprozess achtsam für die Balance von Geschwindigkeit und notwendiger Verlangsamung.',
            approach: 'Ich nutze die systemische Sicht und individualpsychologische Zugänge, ergänzt um erklärungsrelevante Modelle der Personaldiagnostik und der Kommunikationspsychologie.',
            themes: ['kommunikation', 'konflikt', 'rolle', 'fuehrung'],
            profileUrl: 'https://www.wtm-consulting.de/team/frank-titzer/'
        },
        {
            id: 'heike-stalling',
            name: 'Heike Stalling',
            photo: 'assets/team/Stalling-Heike-Team-Portrait-500x500-6-23.jpg',
            role: 'Trainerin & Coach',
            motto: 'Sich selbst auf die Spur kommen',
            description: 'Ressourcenorientierte Arbeitsweise, auf Augenhöhe, mit Humor, achtsam, klar und zielorientiert.',
            approach: '„Du kannst einen Menschen nichts lehren, du kannst ihm nur helfen, es in sich selbst zu finden." – Galileo Galilei',
            themes: ['persoenlich', 'kommunikation', 'fuehrung', 'stress'],
            profileUrl: 'https://www.wtm-consulting.de/team/heike-stalling/'
        },
        {
            id: 'dr-bettina-hailer',
            name: 'Dr. Bettina Hailer',
            photo: 'assets/team/Team-Dr.-Bettina-Hailer-500x500-1.jpg',
            role: 'Trainerin & Coach',
            motto: 'Leichtigkeit und Erfolg durch Selbsterkenntnis, Haltung und Technik',
            description: 'Lösungen für berufliche Themen sind oft schon unbewusst vorhanden. Ich sehe meine Aufgabe darin, die Tür hierzu zu öffnen. Zudem unterstütze ich meine Coachees darin, das Veränderbare vom Unveränderbaren zu unterscheiden.',
            approach: 'Wir entwickeln Strategien für das Veränderbare und für den Umgang mit dem Unveränderbaren. Dabei nutze ich meine 20-jährige Führungserfahrung und mein Wissen als zertifizierte Coach, Trainerin und Mediatorin.',
            themes: ['fuehrung', 'persoenlich', 'entscheidung', 'karriere'],
            profileUrl: 'https://www.wtm-consulting.de/team/dr-bettina-hailer/'
        },
        {
            id: 'hermann-josef-leiders',
            name: 'Hermann Josef Leiders',
            photo: 'assets/team/Harry_Leiders_team_500x500.jpg',
            role: 'Trainer & Coach',
            motto: 'Coaching in der Führungs-Rolle',
            description: 'Coachees sind grundsätzlich ideenreich, kreativ und in der Lage im Gespräch eigene Ideen zum Umgang mit ihren Problemstellungen zu entwickeln.',
            approach: 'Ich begleite Führungskräfte dabei, ihre eigenen Lösungen zu finden und umzusetzen.',
            themes: ['fuehrung', 'rolle', 'entscheidung', 'team'],
            profileUrl: 'https://www.wtm-consulting.de/team/hermann-josef-leiders/'
        },
        {
            id: 'uta-barbara-vogel',
            name: 'Uta-Barbara Vogel',
            photo: 'assets/team/Team-Vogel-Barbara-500x500-1.jpg',
            role: 'Trainerin & Coach',
            motto: 'Potenziale entfalten und Lösungen kreieren',
            description: 'Menschen und Organisationen verfügen über zahlreiche Potenziale. Die Kunst besteht darin, verborgene Ressourcen zugänglich zu machen, Handlungsspielräume zu nutzen und Fähigkeiten zu erweitern.',
            approach: 'Ich unterstütze die Beteiligten darin, unterschiedliche Sichtweisen zu erlauben, einen offenen Austausch zwischen den Betroffenen zu ermöglichen und so Chancen zur Weiterentwicklung zu nutzen.',
            themes: ['persoenlich', 'team', 'kommunikation', 'konflikt'],
            profileUrl: 'https://www.wtm-consulting.de/team/uta-barbara-vogel/'
        },
        {
            id: 'andreas-cludius',
            name: 'Andreas Cludius',
            photo: 'assets/team/Cludius-Andreas-Team-500x500-1.jpg',
            role: 'Trainer & Berater',
            motto: 'Begleitung - auch längerfristig',
            description: 'Im Fokus meiner Arbeit stehen Geschäftsführer mittelständischer Unternehmen, die ich z.T. seit über 10 Jahren u.a. in Fragen der Unternehmensführung, der strategischen Ausrichtung, der Zusammenarbeit mit MitarbeiterInnen und Aufsichtsgremien begleite.',
            approach: 'Langfristige Begleitung auf Augenhöhe mit Fokus auf nachhaltige Entwicklung.',
            themes: ['fuehrung', 'entscheidung', 'karriere', 'team'],
            profileUrl: 'https://www.wtm-consulting.de/team/andreas-cludius/'
        },
        {
            id: 'carmen-werner',
            name: 'Carmen Werner',
            photo: 'assets/team/Carmen-Werner-Team_500x500.jpg',
            role: 'Trainerin & Coach',
            motto: 'Schwierige Situationen meistern',
            description: 'Mit systemischem und wertschätzenden Blick schaue ich auf schwierige Situationen im Leben und unterstütze bei der Aktivierung der eigenen Ressourcen zur Veränderung.',
            approach: 'Systemischer Ansatz mit Fokus auf Ressourcenaktivierung und Veränderungsbegleitung.',
            themes: ['krise', 'stress', 'persoenlich', 'konflikt'],
            profileUrl: 'https://www.wtm-consulting.de/team/carmen-werner/'
        },
        {
            id: 'dr-till-reichert',
            name: 'Dr. Till Reichert',
            photo: 'assets/team/till-reichert.jpg',
            role: 'Geschäftsführer',
            motto: 'Ich coache (Führungs-) Persönlichkeiten.',
            description: 'Als erfahrener Executive Coach (Unternehmensberater, Hochschuldozent, Coach-Ausbilder) unterstütze ich (Führungs-) Persönlichkeiten in ihren Wachstumsprozessen.',
            approach: 'Dabei nutze ich humorvolle Begegnung auf Augenhöhe, passgenaues Feedback und spannende Impulse. Ein Coaching mit mir setzt Energie frei.',
            themes: ['fuehrung', 'persoenlich', 'karriere', 'rolle'],
            profileUrl: 'https://www.wtm-consulting.de/team/dr-till-reichert/'
        },
        {
            id: 'melanie-kubala',
            name: 'Melanie Kubala',
            photo: 'assets/team/Team-Melanie-Kubala-500x500-1.jpg',
            role: 'Trainerin & Coach',
            motto: 'Leading with Trust*Ship: Entfalte dein Führungspotenzial durch Selbstvertrauen und Kommunikation',
            description: 'Als ehemalige HR-Managerin kenne ich die Herausforderungen der Fach- und Führungskräfte und weiß genau wo der Schuh drückt. Sich selbst zu vertrauen und zu erkennen, was wirklich in mir steckt sind der Schlüssel für eine gute Führungskraft.',
            approach: 'Ich habe bereits mehr als 500 Menschen darin trainiert und ihre Teams und Abteilungen aufs nächste Level einer vertrauensvollen Zusammenarbeit gebracht.',
            themes: ['fuehrung', 'kommunikation', 'team', 'persoenlich'],
            profileUrl: 'https://www.wtm-consulting.de/team/andrea-hohlweck-2/'
        },
        {
            id: 'maik-riess',
            name: 'Maik Rieß',
            photo: 'assets/team/Team-Maik-Riess-500x500-1.jpg',
            role: 'Trainer & Coach',
            motto: 'Damit Führung (wieder) Spaß macht!',
            description: 'Als Coach bin ich ideal für dich wenn du als Experte in fachlicher Führung oder als Team- / Abteilungsleiter tätig bist, konkrete Handlungsentscheidungen treffen möchtest und Tools suchst.',
            approach: 'Dich bringt ein Sparringspartner mit Struktur, persönlicher Nähe und kreativen Ideen am Weitesten.',
            themes: ['fuehrung', 'entscheidung', 'team', 'rolle'],
            profileUrl: 'https://www.wtm-consulting.de/team/maik-riess/'
        },
        {
            id: 'wolfgang-hoffmann',
            name: 'Wolfgang Hoffmann',
            photo: 'assets/team/Team-Foto-Wolfgang-Hoffmann.jpg',
            role: 'Trainer & Coach',
            motto: 'GEMEINSAM STARK... Selbst stärken stärkt Mitarbeiter',
            description: 'Mit langjähriger Erfahrung im Management von Logistikunternehmen verstehe ich die Herausforderungen von Organisationen und Führungskräften. Entdecken Sie mit mir IHREN Weg als Führungskraft, Ihre Einzigartigkeit, Ihre Stärken.',
            approach: 'Die Vielfalt der Menschen ist ein Schatz, der unsere Weiterentwicklung und unser Leben bereichert. Offene Kommunikation ist unser Fundament.',
            themes: ['fuehrung', 'persoenlich', 'team', 'kommunikation'],
            profileUrl: 'https://www.wtm-consulting.de/team/wolfgang-hoffmann/'
        },
        {
            id: 'heike-neidhart',
            name: 'Heike Neidhart',
            photo: 'assets/team/Profilbild_Heike_Neidhart_Team_500x500.jpg',
            role: 'Trainerin & Coach',
            motto: 'Gemeinsam finden wir den Weg zu Ihrem Ziel!',
            description: 'Durch empathisches Zuhören, gezielte Fragen und kreative Ansätze ermutige ich, die eigene Persönlichkeit zu erkunden und zu verstehen. Vertrauen Sie ihrem eigenen Potenzial.',
            approach: 'Wir etablieren gemeinsam ein starkes Mindset – eine positive Perspektive und innere Stärke. In einer gehobenen Gestimmtheit können Sie Ihre gewünschten Entscheidungen klar treffen.',
            themes: ['persoenlich', 'entscheidung', 'karriere', 'stress'],
            profileUrl: 'https://www.wtm-consulting.de/team/heike-neidhart/'
        },
        {
            id: 'gerold-pohl',
            name: 'Gerold Pohl',
            photo: 'assets/team/Gerold-Pohl-Team-500-x-500.jpg',
            role: 'Trainer & Coach',
            motto: '"Das Leben heißt: Verwandle Dich" (Hermann Hesse)',
            description: 'Gerold ist Experte für Veränderung, Agiles Arbeiten, Visionsarbeit und New Leadership. Mit mehr als 25 Jahren als Führungskraft, zuletzt als Bereichsleiter in der Software-Entwicklung.',
            approach: 'Sein Führungsverständnis hat sich vom traditionell-hierarchischen Ansatz hin zum agilen Führungsprinzip der Selbstorganisation und Eigenverantwortung entwickelt. In seinen Coachings verwendet Gerold das Conceptboard zur Visualisierung.',
            themes: ['agil', 'fuehrung', 'persoenlich', 'team'],
            profileUrl: 'https://www.wtm-consulting.de/team/gerold-pohl/'
        },
        {
            id: 'malte-werner',
            name: 'Malte Werner',
            photo: 'assets/team/malte-werner.jpg',
            role: 'Geschäftsführer',
            motto: 'Zeitmanagement und Stressreduktion als Basis',
            description: 'Um die eigene Leistungsfähigkeit zu erhalten, müssen wir klare Prioritäten setzen. Dabei ist der eigene Anspruch oft Fluch und Segen zugleich: eine gute Balance zu finden ist zentral!',
            approach: 'Zudem hilft es, wenn wir Techniken einsetzen, um unseren Arbeitsalltag zu strukturieren und Aufgaben effizienter zu erledigen.',
            themes: ['zeit', 'stress', 'worklife', 'fuehrung'],
            profileUrl: 'https://www.wtm-consulting.de/team/malte-werner-2/'
        },
        {
            id: 'kirsten-schmiegelt',
            name: 'Kirsten Schmiegelt',
            photo: 'assets/team/Kirsten_Schmiegelt_3-1.jpg',
            role: 'Trainerin & Coach',
            motto: 'Offenheit zur Veränderung auf respektvoller Augenhöhe schaffen',
            description: 'In meiner langjährigen Tätigkeit als Coach, Beraterin und Trainerin verbinde ich meine Fähigkeit des klaren analytischen Denkens mit meiner ausgeprägten Empathie und einer kreativen sinnvollen Lösungsfindung.',
            approach: 'Mein interdisziplinärer Lebenslauf ist dabei von unschätzbarem Wert, schnell in einen konstruktiven Rapport zu kommen. Ein respektvoller zugewandter Umgang auf Augenhöhe sowie die Entwicklung individuell passender Lösungen stehen für mich im Vordergrund.',
            themes: ['persoenlich', 'kommunikation', 'entscheidung', 'karriere'],
            profileUrl: 'https://www.wtm-consulting.de/team/kirsten-schmiegelt/'
        }
    ]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = coachingData;
}
