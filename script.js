// Funzione per mostrare la sezione corretta
function carica(idSezione) {
    // Nascondi tutte le sezioni
    const sezioni = document.querySelectorAll('.sezione-contenuto');
    sezioni.forEach(sezione => {
        sezione.classList.remove('active');
    });

    // Mostra la sezione desiderata
    const sezioneAttiva = document.getElementById(idSezione);
    if (sezioneAttiva) {
        sezioneAttiva.classList.add('active');
    }
    
    // Chiudi la sidebar dopo aver cliccato su un link
    toggleSidebar();
}

// Funzione per la sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto'; // Ripristina lo scroll del body
    } else {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden'; // Blocca lo scroll del body
    }
}

// Funzione per il calcolo del rischio
function calcolaR() {
    const inputI = document.getElementById('inputI').value;
    const inputP = document.getElementById('inputP').value;
    const risultato = document.getElementById('risultato-calcolo');
    const valoreR = document.getElementById('valoreR');

    // Assicurati che i valori siano validi e compresi tra 1 e 4
    const i = parseInt(inputI);
    const p = parseInt(inputP);

    if (isNaN(i) || isNaN(p) || i < 1 || i > 4 || p < 1 || p > 4) {
        risultato.innerHTML = "Errore: Inserisci valori numerici tra 1 e 4.";
        risultato.style.backgroundColor = '#f44336';
        risultato.style.color = 'white';
        risultato.classList.add('visibile');
        valoreR.textContent = "?";
        return;
    }

    const R = i * p;
    valoreR.textContent = R;

    let colore;
    let testo;

    if (R >= 1 && R <= 2) {
        colore = '#00b050'; // Verde
        testo = `Il fattore di rischio calcolato è ${R}. Il rischio associato è considerato **BASSO**. Violazioni non critiche per integrità, riservatezza o disponibilità.`;
    } else if (R >= 3 && R <= 4) {
        colore = '#92d050'; // Giallo
        testo = `Il fattore di rischio calcolato è ${R}. Il rischio associato è considerato **LIMITATO**. Richiede monitoraggio e azioni correttive programmate.`;
    } else if (R > 4 && R <= 6) {
        colore = '#ffff00'; // Arancione
        testo = `Il fattore di rischio calcolato è ${R}. Il rischio associato è considerato **MEDIO**. Conseguenze non trascurabili. Necessario ripristino della sicurezza.`;
    } else if (R > 6 && R <= 8) {
        colore = '#ff9900'; // Rosso
        testo = `Il fattore di rischio calcolato è ${R}. Il rischio associato è considerato **MEDIO-ALTO**. Minacce significative. Intervento urgente richiesto.`;
    } else {
        colore = '#ff3300'; // Rosso scuro
        testo = `Il fattore di rischio calcolato è ${R}. Il rischio associato è considerato **ALTO**. Impatti gravi. Azioni correttive rigorose e immediate con notifica all’Autorità.`;
    }
    
    // Aggiorna lo stile del risultato
    risultato.innerHTML = testo;
    risultato.style.backgroundColor = colore;
    risultato.style.color = (colore === '#ffff00' || colore === '#92d050') ? 'black' : 'white';
    risultato.classList.add('visibile');
}

// Gestione del caricamento iniziale della pagina
window.onload = function() {
    // La riga `carica('home');` è stata rimossa per evitare che il menu si apra automaticamente.
    // L'impostazione della sezione "home" come attiva è già gestita dal tuo HTML.
};
