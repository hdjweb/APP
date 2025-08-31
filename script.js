document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const contenuti = document.querySelectorAll('.sezione-contenuto');
    const links = document.querySelectorAll('.sidebar a');
    const calcolaBtn = document.getElementById('calcola-btn');
    const homeLink = document.querySelector('.sidebar a[href="#home"]');

    // Funzione per mostrare la pagina corretta e nascondere le altre
    function carica(pagina) {
        contenuti.forEach(div => div.classList.remove('active'));
        const sezione = document.getElementById(pagina);
        if (sezione) {
            sezione.classList.add('active');
        }
        // Nasconde la sidebar sui dispositivi mobili dopo la selezione
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    // Gestisce il click del pulsante del menu per mostrare/nascondere la sidebar
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (window.innerWidth <= 768) {
                document.body.classList.toggle('no-scroll');
            }
        });
    }

    // Gestisce i click sui link della sidebar
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impedisce il comportamento predefinito del link
            const paginaId = this.getAttribute('href').substring(1);
            carica(paginaId);
        });
    });

    // Funzione per il calcolo del rischio, gestita da un listener
    if (calcolaBtn) {
        calcolaBtn.addEventListener('click', function() {
            const I = parseFloat(document.getElementById('inputI').value);
            const P = parseFloat(document.getElementById('inputP').value);
            const spanValoreR = document.getElementById('valoreR');
            const divRisultato = document.getElementById('risultato-calcolo');

            if (isNaN(I) || isNaN(P) || I < 1 || I > 4 || P < 1 || P > 4) {
                alert('Inserire valori validi tra 1 e 4 per I e P.');
                return;
            }

            const R = I * P;
            let messaggio = '';
            let coloreSfondo = '';
            let coloreTesto = '';

            if (R <= 2) {
                messaggio = `Il Fattore di Rischio Calcolato è <span style="text-decoration: underline; font-weight:bold;">BASSO</span>: la tipologia di violazione e la natura dei dati coinvolti non determinano criticità rilevanti in termini di perdita di integrità, riservatezza o disponibilità delle informazioni.`;
                coloreSfondo = '#00b050';
                coloreTesto = '#ffffff';
            } else if (R <= 3) {
                messaggio = `Il Fattore di Rischio Calcolato è <span style="text-decoration: underline; font-weight:bold;">LIMITATO</span>: si colloca ad un livello superiore rispetto al rischio minimo, pur rimanendo al di sotto della soglia del rischio medio. È consigliabile un monitoraggio costante e l’adozione di misure preventive proporzionate, per evitare che possibili vulnerabilità evolvano in criticità significative.`;
                coloreSfondo = '#92d050';
                coloreTesto = '#000000';
            } else if (R <= 6) {
                messaggio = `Il Fattore di Rischio Calcolato è <span style="text-decoration: underline; font-weight:bold;">MEDIO</span>: a questo livello le conseguenze non possono più essere considerate trascurabili e richiedono un’attenzione significativa. È necessario adottare strategie preventive mirate pianificando interventi correttivi, in modo tale da evitare che le vulnerabilità individuate si trasformino in minacce concrete per l’integrità, la riservatezza e la disponibilità delle informazioni.`;
                coloreSfondo = '#ffff00';
                coloreTesto = '#333300';
            } else if (R <= 9) {
                messaggio = `Il Fattore di Rischio Calcolato è <span style="text-decoration: underline; font-weight:bold;">MEDIO-ALTO</span>: i potenziali effetti, pur non essendo ancora critici, richiedono un’attenzione prioritaria. Risulta essenziale implementare interventi correttivi strutturati e strategie preventive efficaci, al fine di ridurre la probabilità che le vulnerabilità identificate si trasformino in minacce significative per l’integrità, la riservatezza e la disponibilità delle informazioni.`;
                coloreSfondo = '#ff9900';
                coloreTesto = '#333300';
            } else {
                messaggio = `Il Fattore di Rischio Calcolato è <span style="text-decoration: underline; font-weight:bold;">ALTO</span>: le conseguenze attese sono gravi e richiedono un’attenzione immediata. Occorre implementare interventi correttivi prioritari e strategie preventive rigorose, al fine di ridurre in maniera significativa la probabilità che le vulnerabilità individuate compromettano l’integrità, la riservatezza e la disponibilità delle informazioni. In caso di violazione è prevista la notifica al Grante della Privacy da effettuare sul sito dell'Autorità e entro 72 ore dalla conoscenza della violazione`;
                coloreSfondo = '#ff3300';
                coloreTesto = '#ffffff';
            }

            // Applica i colori e il messaggio
            divRisultato.style.backgroundColor = coloreSfondo;
            divRisultato.style.color = coloreTesto;
            spanValoreR.textContent = R;
            spanValoreR.style.backgroundColor = coloreSfondo;
            spanValoreR.style.color = coloreTesto;
            divRisultato.innerHTML = messaggio;
            divRisultato.classList.add('visibile');
        });
    }

    // Mostra la pagina "home" all'avvio del sito
    if (homeLink) {
        carica('home');
    }
});
