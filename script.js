document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    function showSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
            
            // Aggiorna l'URL nella barra degli indirizzi
            const newUrl = `#${sectionId}`;
            history.pushState(null, '', newUrl);
        }
    }

    function setActiveLink(link) {
        navLinks.forEach(item => item.classList.remove('active'));
        if (link) {
            link.classList.add('active');
        }
    }

    navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            setActiveLink(this);
            if (navMenu.classList.contains('active')) navMenu.classList.remove('active');
        });
    });
    
    // Gestione iniziale dell'URL e del caricamento
    const initialSectionId = window.location.hash.substring(1) || 'home';
    showSection(initialSectionId);
    setActiveLink(document.querySelector(`[data-section="${initialSectionId}"]`));

    // Gestione del tasto "Indietro" del browser
    window.addEventListener('popstate', function(event) {
        const sectionIdFromUrl = window.location.hash.substring(1) || 'home';
        showSection(sectionIdFromUrl);
        setActiveLink(document.querySelector(`[data-section="${sectionIdFromUrl}"]`));
    });

    // --- Calcolo del Rischio ---
    const calculateBtn = document.getElementById('calcola-btn');
    const inputP = document.getElementById('inputP');
    const inputI = document.getElementById('inputI');
    const resultBox = document.getElementById('risultato-calcolo');
    const valoreR = document.getElementById('valoreR');

    function calcolaR() {
        const P = parseInt(inputP.value);
        const I = parseInt(inputI.value);
        if (!isNaN(P) && !isNaN(I) && P >= 1 && P <= 4 && I >= 1 && I <= 4) {
            const R = P * I;
            valoreR.textContent = R;

            let testo = '';
            let coloreSfondo = '';

            // Rischio Basso
            if ((P===1 && I===1) || (P===1 && I===2) || (P===2 && I===1)) {
                testo = "Il Fattore di Rischio calcolato è Basso: la tipologia di violazione e la natura dei dati coinvolti non determinano criticità rilevanti, in termini di perdita di integrità riservatezza o disponibilità delle informazioni. È consigliato comunque un monitoraggio continuo per mantenere il livello in maniera costante ed evitare alterazioni";
                coloreSfondo = '#00b050';
            }
            // Rischio Limitato
            else if ((P===1 && I===3) || (P===2 && I===2) || (P===3 && I===1)) {
                testo = "Il Fattore di Rischio calcolato è Limitato: la situazione attuale è ad un livello superiore rispetto al rischio minimo, pur rimanendo al di sotto del rischio medio. È consigliato un monitoraggio costante e l'adozione di misure preventive proporzionate, per evitare che possibili vulnerabilità evolvano in criticità significative";
                coloreSfondo = '#92d050';
            }
            // Rischio Medio
            else if ((P===1 && I===4) || (P===2 && I===3) || (P===3 && I===2) || (P===4 && I===1)) {
                testo = "Il Fattore di Rischio calcolato è Medio: le conseguenze a questo livello non possono più essere trascurabili e richiedono un attenzione significativa. È necessario adottare strategie preventive mirate pianificando interventi correttivi, in modo tale da evitare che le vulnerabilità individuate si trasformino in minacce concrete per l'integrità, la riservatezza e la disponibilità delle informazioni";
                coloreSfondo = '#ffff00';
            }
            // Rischio Medio-Alto
            else if ((P===2 && I===4) || (P===3 && I===3) || (P===4 && I===2)) {
                testo = "Il Fattore di Rischio calcolato è Medio Alto: i potenziali effetti pur non essendo ancora critici, richiedono un' attenzione prioritaria. Risulta essenziale implementare interventi correttivi strutturati e strategie preventive efficaci, al fine di ridurre le probabilità che le vulnerabilità identificate si trasformino in minacce significative per l'integrità e la disponibilità delle informazioni.";
                coloreSfondo = '#ff9900';
            }
            // Rischio Alto
            else if (R === 12 || R === 16) {
                testo = "Il Fattore di Rischio calcolato è Alto: le conseguenze attese sono e richiedono un'attenzione immediata. Occorre Implementare interventi correttivi prioritari e strategie preventive rigorose al fine di ridurre in maniera significativa le probabilità che le vulnerabilità identificate compromettano l'integrità, la riservatezza e la disponibilità delle Informazioni. In caso di violazione è prevista la notifica al Garante della Privacy da effettuare sul sito dell'Autorità entro 72 ore dalla conoscenza della violazione";
                coloreSfondo = '#ff3300';
            }

            // Testo giustificato e la parte iniziale in grassetto e sottolineato
            resultBox.innerHTML = `<span style="font-weight:900; text-decoration:underline;">${testo.split(':')[0]}</span>: ${testo.split(':')[1]}`;
            resultBox.style.backgroundColor = coloreSfondo;
            resultBox.style.color = '#000';
            resultBox.style.padding = '15px';
            resultBox.style.borderRadius = '5px';
            resultBox.style.textAlign = 'justify';
            resultBox.style.maxWidth = '600px';
            resultBox.style.margin = '10px auto';
            resultBox.style.lineHeight = '1.5';

            valoreR.style.backgroundColor = coloreSfondo;
            valoreR.style.color = '#000';
            valoreR.style.padding = '2px 6px';
            valoreR.style.borderRadius = '4px';
        } else {
            resultBox.textContent = 'Errore: Inserisci valori numerici tra 1 e 4.';
            valoreR.textContent = '?';
            valoreR.style.backgroundColor = '';
            valoreR.style.color = '';
        }
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calcolaR);
    }

    [inputP, inputI].forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                calcolaR();
            }
        });
    });

    // --- Lightbox per immagini tabelle ---
    const riskImages = document.querySelectorAll('.risk-images img');
    const overlay = document.createElement('div');
    overlay.classList.add('risk-overlay');
    const overlayImg = document.createElement('img');
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);

    riskImages.forEach(img => {
        img.addEventListener('click', () => {
            overlayImg.src = img.src;
            overlay.classList.add('active');
        });
    });

    overlay.addEventListener('click', () => overlay.classList.remove('active'));
});

// --- Valutazione Finale per mailto ---
const valutazioneForm = document.querySelector('#valutazione form');
if (valutazioneForm) {
    valutazioneForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const cognome = document.getElementById('cognome').value.trim();
        const email = document.getElementById('email').value.trim();
        const chiarezza = document.getElementById('chiarezza').value;
        const completezza = document.getElementById('completezza').value;
        const utilita = document.getElementById('utilità').value;
        const feedback = document.getElementById('feedback').value.trim();

        const subject = `Feedback lasciato da ${nome} ${cognome}`;
        const body =
            `Nome: ${nome}\n` +
            `Cognome: ${cognome}\n` +
            `Email: ${email}\n` +
            `Quanto è chiaro l'elaborato: ${chiarezza}\n` +
            `Quanto è completo il contenuto: ${completezza}\n` +
            `Quanto è utile per te: ${utilita}\n` +
            `Feedback aggiuntivo: ${feedback}`;

        const mailtoLink = `mailto:hdjweb@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    });
}
