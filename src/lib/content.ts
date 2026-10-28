import { getCollection } from 'astro:content';
export const preview = process.env.SITE_PREVIEW === 'true';
export const privatePreview = process.env.INCLUDE_DRAFTS === 'true' && !!process.env.EDITORIAL_CONTENT_DIR && !process.env.CI;
if ((process.env.INCLUDE_DRAFTS === 'true' || process.env.EDITORIAL_CONTENT_DIR) && process.env.CI) throw new Error('Private editorial content must never be loaded in CI/public builds.');
export const topics = [
  {slug:'our-products',name:'Our products',description:'What we are building, why it exists, and what we learn along the way.'},
  {slug:'professional-practice',name:'Professional practice',description:'Software, AI, information, requirements, and the work of making things useful.'},
  {slug:'studio-notes',name:'Studio notes',description:'Notes on independent work, a family business, and finding our way.'},
  {slug:'learning',name:'Learning',description:'Language learning, useful vocabulary, and practice that fits everyday life.'},
];
export const authors = [
  {slug:'nikolai-khrustalev',name:'Nikolai Khrustalev',role:'Product builder · solutions engineering',bio:'I build digital products and work with AI, data, and enterprise solutions. Here I write about the products we make and the decisions behind them.',link:'https://www.linkedin.com/in/khrustalev/'},
  {slug:'olesia-khrustaleva',name:'Olesia Khrustaleva',role:'Business analysis · requirements and quality',bio:'My work connects business needs, requirements, testing, and the people building software. This is a place for that experience and our shared projects.',link:null},
];
export const products = [
  {slug:'2000nl',name:'2000 NL',kind:'Vocabulary practice',status:'Early access · Dutch first',description:'Prepared dictionary content, flexible exercises, and spaced repetition. A focused way to practise vocabulary without making every card yourself.',detail:'Access is currently by invitation. The first learning dictionary is Dutch; other languages and connected workflows are being developed separately.',url:'https://2000.dilum.io/',cta:'Open 2000 NL'},
  {slug:'audiofilms',name:'AudioFilms',kind:'Practice with video',status:'In development',description:'Work with phrases in video, repeat them, and look up unfamiliar words without losing your place.',detail:'A connected video-practice project. Public access and the exact available features will be announced separately.',url:null,cta:null},
  {slug:'pontix',name:'Pontix',kind:'Translation in context',status:'Alpha',description:'A browser extension for looking up words where you encounter them, connected to the vocabulary you practise.',detail:'An early-stage connected client. It is not presented here as a finished public release.',url:null,cta:null},
];
export async function visibleArticles() {
  const entries = await getCollection('articles');
  const slugs = new Set<string>();
  for (const entry of entries) {
    if(slugs.has(entry.data.slug)) throw new Error(`Duplicate article slug: ${entry.data.slug}`);
    slugs.add(entry.data.slug);
  }
  return entries.filter(a => privatePreview || !a.data.draft).sort((a,b)=>b.data.date.getTime()-a.data.date.getTime());
}
export const dateLabel = (date:Date, lang='en') => new Intl.DateTimeFormat(lang,{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(date);
