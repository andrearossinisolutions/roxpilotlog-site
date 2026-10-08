import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/config";
import { getPlaylistVideos } from "@/lib/youtube";
import SiteBrand from "@/components/SiteBrand";
import SideProgress, { type ProgressSection } from "@/components/SideProgress";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Chiacchiere Sottovento Ep. 1 – Miami | RoxPilotLog",
  alternates: { canonical: "/podcast/ep-1" },
  description: "Dal caso Amazon Prime Air alle nostre decisioni in cabina: cosa possiamo portarci a casa, noi piloti di aerei leggeri.",
};

const sections: ProgressSection[] = [
  { id: "top", label: "Episodio 1" },
  { id: "video", label: "Guarda l'episodio" },
  { id: "iniziamo", label: "Iniziamo" },
  { id: "cosa-sappiamo", label: "Cosa sappiamo" },
  { id: "go-around", label: "Il go-around" },
  { id: "noi", label: "Ok, ma… noi?" },
  { id: "casa", label: "Da portarci a casa" },
];

export default async function Episode1() {
  const videos = await getPlaylistVideos(site.podcastPlaylistId, 50);
  const video = videos.find((v) => /Ep\.?\s*1\b/i.test(v.title)) ?? videos.find((v) => /miami/i.test(v.title));
  const playlistUrl = `https://www.youtube.com/playlist?list=${site.podcastPlaylistId}`;

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <SiteBrand />
          <nav>
            <Link href="/">← Torna al sito</Link>
            <a href={playlistUrl} target="_blank" rel="noopener noreferrer">Guarda su YouTube</a>
            <a href={site.spotifyUrl} target="_blank" rel="noopener noreferrer">Ascolta su Spotify</a>
          </nav>
        </div>
      </header>

      <SideProgress sections={sections} autoAdvance={false} />

      <main id="top" className="article">
        <section className="ep-hero">
          <p className="eyebrow">Chiacchiere Sottovento · Episodio 1</p>
          <h1>Dal caso Amazon Prime Air alle nostre decisioni in cabina</h1>
          <p className="lead">
            Ciao a tutti, mi chiamo Andrea, sono un pilota VDS, e volo un Savannah basato ad est di Milano. L'estate è ormai alle spalle, e quindi con il video di oggi voglio provare a fare quattro chiacchiere con voi riguardo un avvenimento che mi ha fatto pensare. Fatemi sapere poi se vi piace!
          </p>

          {video ? (
            <div className="live" id="video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <Image className="ep-cover" src="/podcast/ep1-cover.webp" alt="Chiacchiere Sottovento – Episodio 1: Miami" width={1280} height={720} priority />
          )}
          <div className="actions">
            {video && <a className="btn primary" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">Guarda su YouTube</a>}
            <a className="btn" href={site.spotifyUrl} target="_blank" rel="noopener noreferrer">Ascolta su Spotify</a>
            <a className="btn" href={playlistUrl} target="_blank" rel="noopener noreferrer">Guarda su YouTube</a>
          </div>
          <p className="lead">
            L'idea è quella di <b>parlare di attualità aeronautica direttamente dal campo volo</b> mentre ci teniamo allenati con l'aereo, così da non sembrare un professorino dietro a una scrivania, anche perché, soprattutto in aviazione, sono solamente un pivello! Il mio obiettivo è cercare di <b>capire insieme cosa possiamo portarci a casa da quello che succede nel mondo del volo</b>, e che possa essere utile anche a noi piloti di piccoli aerei leggeri, o come nel mio caso addirittura ultraleggeri.
          </p>
          <p className="lead">
            Oggi partiamo, non a caso, dall'evento più discusso degli ultimi giorni: l'incidente del <b>Boeing 767 cargo Amazon Prime Air a Miami</b>. Vi anticipo subito che i dettagli che sentirete sono ancora preliminari, ma secondo me raccontano già qualcosa di molto interessante anche per noi.
          </p>
        </section>

        <section id="iniziamo">
          <h2>Iniziamo</h2>
          <p>
            Il 6 settembre scorso, all'aeroporto di Miami, un Boeing 767 cargo della Prime Air, operato dalla compagnia 21 Air per conto di Amazon, è <b>uscito di pista durante la fase di atterraggio</b>. L'equipaggio non ha riportato particolari lesioni, ma purtroppo l'aereo ha travolto alcuni veicoli parcheggiati oltre la testata pista, e <b>cinque persone hanno tragicamente perso la vita</b>.
          </p>
          <figure className="ep-figure">
            <Image src="/podcast/ep1-miami.webp" alt="Il Boeing 767 Prime Air fuori pista a Miami, davanti ai veicoli parcheggiati" width={1536} height={864} />
          </figure>
          <p>
            Quello di cui parleremo oggi si basa sui dati preliminari diffusi dal NTSB, in base a quanto riscontrato dai registratori, sia quello vocale sia quello dei dati di volo. Non c'è ancora un rapporto finale, e le cause ufficiali arriveranno tra diversi mesi, se non tra più di un anno. Ma <b>i dati confermati ad oggi ci dicono già abbastanza</b> da poterne parlare, e soprattutto <b>da cui possiamo imparare qualcosa anche noi</b>, che voliamo su aerei molto più piccoli e semplici!
          </p>
        </section>

        <section id="cosa-sappiamo">
          <h2>Cosa sappiamo, ad oggi</h2>
          <p>
            Il volo Prime Air 7598 partiva da San Juan, Portorico, diretto a Miami. Ai comandi c'era un capitano di 55 anni, ex pilota di elicotteri Black Hawk dell'esercito, con <b>oltre 7.000 ore di volo</b>, ma abilitato sul 767 solo da maggio di quest'anno. Il primo ufficiale aveva invece 37 anni e circa <b>2.600 ore alle spalle</b>.
          </p>
          <p>
            Negli ultimi sei minuti di registrazione in cabina si concentra il racconto di <b>una discesa problematica fin dall'inizio</b>: richieste di flap ritardate, l'ultima a pochi piedi da terra. Un pilota segnala più volte velocità troppo alte, ma <b>nessuna risposta verbale chiara</b>. E una volta a terra, nessuna estensione degli spoiler e nessuna inversione di spinta.
          </p>
          <p>
            <b>L'aereo tocca la pista lungo, veloce, e con due carrelli su tre</b>. E pensate che solo circa 15 secondi dopo il contatto con la pista viene chiamato, "diciamo finalmente", un go-around, ma talmente tardivo che viene subito interrotto per riprendere la frenata.
          </p>
          <p>Per sintetizzare quello che i dati suggeriscono, senza accusare nessuno di colpe non ufficializzate, le cause che sembrano essere state attribuite all'incidente sono:</p>
          <ol className="ep-causes">
            <li><b>Un approccio non stabilizzato</b>, riconosciuto dall'equipaggio stesso, che però ha continuato pensando di correggerlo invece di interromperlo.</li>
            <li><b>Una comunicazione in cabina inefficace</b>: un pilota segnala il problema, ma non ottiene un'azione correttiva chiara e immediata dall'altro.</li>
            <li>La mancata attivazione dei dispositivi di decelerazione, spoiler e reverse, probabilmente perché non tutti i carrelli avevano ancora toccato la pista, ma che in un atterraggio lungo e veloce sono essenziali per fermare l'aereo.</li>
            <li>Ed infine, <b>una decisione di riattaccata presa troppo tardi</b>, quando forse non si sarebbe più potuta fare in sicurezza, ed infatti poi abbandonata, e che quindi ha peggiorato ulteriormente una situazione già difficile.</li>
          </ol>
          <p className="ep-quote">
            Quattro problemi che in realtà sembrano coincidere in un unico grande problema, ripetuto quattro volte in questo elenco, e più e più volte in questo incidente: <b>la difficoltà umana nel dire "basta, riproviamoci" quando qualcosa non sta andando come dovrebbe</b>.
          </p>
        </section>

        <section id="go-around">
          <h2>Il go-around che non arriva mai in tempo</h2>
          <figure className="ep-figure">
            <Image src="/podcast/ep1-go-around.jpeg" alt="Un mio approccio non stabilizzato" width={1536} height={864} />
          </figure>
          <p>
            C'è una statistica che vale la pena ricordare: <b>la riattaccata è la manovra meno praticata nella carriera di un pilota</b> di linea, in media una o due volte l'anno per chi vola corto raggio, una ogni due o tre anni per chi vola lungo raggio. Eppure è anche <b>la contromisura più efficace che esista contro gli incidenti in atterraggio</b>.
          </p>
          <p>
            Le statistiche internazionali dicono che <b>la mancata decisione di riattaccare è il principale fattore di rischio negli incidenti in fase di avvicinamento e atterraggio</b>, ed è la causa primaria delle uscite di pista. E la cosa più paradossale è questa: <b>solo il 3-5% degli avvicinamenti non stabilizzati si conclude effettivamente con una riattaccata</b>. Pensate che il 95% delle volte i piloti, professionisti, addestrati, con simulatori e checklist, decidono comunque di continuare. Secondo me le statistiche per l'aviazione generale non sono molto lontane da queste: ovviamente non nei numeri assoluti, con cui ci differenziamo molto dai piloti professionisti, ma in termini percentuali.
          </p>
          <p>
            <b>Perché succede però?</b> Non è incompetenza: un comandante con più di 7.000 ore di volo può essere tutt'altro che incompetente. <b>È invece psicologia.</b> Non sono un esperto di questa scienza, ma viene definito <b>"Plan Continuation Bias"</b>: una volta che la mente si è impostata su una decisione, più andiamo avanti in quello che stiamo facendo e più diventa difficile cambiarla, anche quando arrivano segnali chiarissimi che qualcosa non sta andando. Forse sembra più sicuro, in quel momento, finirla in fretta invece che ricominciare da capo? Sicuramente a tutto ciò si aggiunge la pressione dell'essere in orario, di non voler fare una brutta figura, di non voler ammettere all'altro pilota, o a se stessi, che l'approccio è da buttare via. E più si scende, più ci avviciniamo alla pista, più questo bias si rafforza, proprio perché <b>"ormai ci siamo quasi"</b>.
          </p>
        </section>

        <section id="noi">
          <h2>Ok, ma… noi?</h2>
          <p>Ora, potremmo pensare: "Ok, ma io volo un Savannah, o un qualsiasi aereo leggero, che c'entro con un 767?"</p>
          <p>Eh beh, qui secondo me entra in gioco la stessa identica dinamica psicologica che ha probabilmente contribuito a questo disastro, e anzi forse è addirittura amplificata nel volo da diporto sportivo come nell'aviazione generale.</p>
          <p>Pensateci: quante volte abbiamo fatto un atterraggio con vento al traverso che ci sembrava oltre i nostri limiti personali? Quante volte ci siamo trovati alti e veloci su una pista corta e, invece di riattaccare a prescindere, abbiamo tirato giù il muso ed "aggiustato" negli ultimi secondi, contando sul fatto che la pista rimanente bastasse?</p>
          <p>
            <b>Nella nostra aviazione</b>, senza torre e senza un secondo pilota che ci aiuti nelle decisioni, <b>questo bias è ancora più pericoloso</b>. Nel 767 di Miami c'erano almeno due persone, e una delle due ha effettivamente segnalato il problema, anche se poi la reazione non è arrivata in tempo. Noi, come unici piloti in cabina, non abbiamo nessuno che ci dica "stai andando troppo veloce, riattacchiamo". <b>L'unica voce che può fermarci è la nostra</b>, ed è proprio quella voce che questo fenomeno psicologico rende più debole.
          </p>
        </section>

        <section id="casa">
          <h2>Cosa possiamo portarci a casa</h2>
          <p>Non voglio chiudere con un elenco di regole che in realtà conosciamo già tutti. Voglio chiudere la riflessione con tre idee semplici, dal mio piccolo, che nascono direttamente da questo caso.</p>
          <div className="ep-takeaways">
            <div>
              <span>1</span>
              <p>In primo luogo, <b>la riattaccata non è un fallimento, ma una competenza</b>. Dobbiamo allenarci a pensarla così, non come l'ammissione di aver sbagliato, ma come l'altro ramo del piano che avevamo già previsto prima di iniziare l'avvicinamento. Un pilota che fa dieci riattaccate in un anno di attività non è un pilota scarso: è un pilota che ha deciso, dieci volte, di non scommettere sulla fortuna.</p>
            </div>
            <div>
              <span>2</span>
              <p>Per secondo, <b>stabiliamo i nostri "gate" prima del volo</b>, e non durante. Velocità massima in finale, altezza entro cui dobbiamo essere completamente stabilizzati, punto della pista oltre il quale non si atterra più. Il tutto deciso a terra, con la mente lucida, e non a 200 piedi con l'adrenalina che ci dice "tanto ce la faccio lo stesso".</p>
            </div>
            <div>
              <span>3</span>
              <p>Terzo, e questo racchiude un po' tutto: <b>il momento in cui pensiamo "forse dovrei riattaccare" è già il momento in cui dovremmo farlo</b>, invece di cercare soluzioni correttive. Il dubbio non è un rumore di fondo da ignorare: è il segnale più affidabile che abbiamo, il nostro istinto. A Miami il dubbio c'era, era stato persino verbalizzato, e non è bastato. <b>A noi, nel nostro VDS o aviazione generale che sia, deve bastare</b>, perché non abbiamo un secondo in equipaggio, né un inversione di spinta se arriviamo lunghi. <b>Abbiamo solo noi stessi</b>, e la necessità di ammettere in tempo che questa manovra non è come era stata prevista, e che va semplicemente rifatta in sicurezza, come l'abbiamo sempre fatto.</p>
            </div>
          </div>
          <p>Grazie a tutti per essere arrivati fin qui, e <b>un grande grazie per le recenti ormai 160 iscrizioni</b>. A presto!</p>
          <Image className="ep-logo" src="/logo.png" alt="Logo RoxPilotLog" width={900} height={900} sizes="(max-width: 440px) 90vw, 400px" />
          <div className="actions">
            <a className="btn primary" href={site.youtube} target="_blank" rel="noopener noreferrer">Iscriviti su YouTube</a>
            <a className="btn" href={site.instagram} target="_blank" rel="noopener noreferrer">Seguimi su Instagram</a>
            <a className="btn" href={site.tiktok} target="_blank" rel="noopener noreferrer">Guardami su TikTok</a>
            <Link className="btn" href="/">Torna al sito</Link>
          </div>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} RoxPilotLog</footer>
    </>
  );
}
