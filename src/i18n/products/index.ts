import type {Locale} from '../locales';
import nl_en from './2000nl.en.json';
import nl_ru from './2000nl.ru.json';
import nl_nl from './2000nl.nl.json';
import nl_de from './2000nl.de.json';
import nl_fr from './2000nl.fr.json';
import nl_es from './2000nl.es.json';
import nl_pl from './2000nl.pl.json';
import nl_uk from './2000nl.uk.json';
import nl_it from './2000nl.it.json';
import nl_pt from './2000nl.pt.json';
import audiofilms_en from './audiofilms.en.json';
import audiofilms_ru from './audiofilms.ru.json';
import audiofilms_nl from './audiofilms.nl.json';
import audiofilms_de from './audiofilms.de.json';
import audiofilms_fr from './audiofilms.fr.json';
import audiofilms_es from './audiofilms.es.json';
import audiofilms_pl from './audiofilms.pl.json';
import audiofilms_uk from './audiofilms.uk.json';
import audiofilms_it from './audiofilms.it.json';
import audiofilms_pt from './audiofilms.pt.json';
import pontix_en from './pontix.en.json';
import pontix_ru from './pontix.ru.json';
import pontix_nl from './pontix.nl.json';
import pontix_de from './pontix.de.json';
import pontix_fr from './pontix.fr.json';
import pontix_es from './pontix.es.json';
import pontix_pl from './pontix.pl.json';
import pontix_uk from './pontix.uk.json';
import pontix_it from './pontix.it.json';
import pontix_pt from './pontix.pt.json';
export const productCopy={
 '2000nl':{en:nl_en,ru:nl_ru,nl:nl_nl,de:nl_de,fr:nl_fr,es:nl_es,pl:nl_pl,uk:nl_uk,it:nl_it,pt:nl_pt} satisfies Record<Locale,typeof nl_en>,
 'audiofilms':{en:audiofilms_en,ru:audiofilms_ru,nl:audiofilms_nl,de:audiofilms_de,fr:audiofilms_fr,es:audiofilms_es,pl:audiofilms_pl,uk:audiofilms_uk,it:audiofilms_it,pt:audiofilms_pt} satisfies Record<Locale,typeof audiofilms_en>,
 'pontix':{en:pontix_en,ru:pontix_ru,nl:pontix_nl,de:pontix_de,fr:pontix_fr,es:pontix_es,pl:pontix_pl,uk:pontix_uk,it:pontix_it,pt:pontix_pt} satisfies Record<Locale,typeof pontix_en>,
};
