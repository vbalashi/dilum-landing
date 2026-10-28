// Product landing copy is kept separate from the archive/author projections.
export const productPages = {
 '2000nl': {
  headline:'Spend your time learning words.',
  intro:'A prepared dictionary, flexible vocabulary exercises, and spaced repetition — without making every flashcard yourself.',
  sections:[
   ['Start with useful vocabulary','The first learning dictionary is Dutch. Explore meanings and examples, then choose the vocabulary you want to practise.'],
   ['Choose your practice','Work with words, translations, and expressions through different exercises based on the same dictionary material.'],
   ['Return to what needs practice','Spaced repetition helps organise review, while your learning progress stays with your account.'],
  ],
  access:'Early access is currently by invitation. Opening the app takes you to sign-in; it does not guarantee immediate admission. You can register your interest through the existing waitlist.',
 },
 audiofilms:{
  headline:'Make a phrase worth repeating.',
  intro:'A connected project for language practice with video: work with a phrase, repeat it, and explore unfamiliar vocabulary.',
  sections:[
   ['Practise in context','Video gives words a voice and a situation. The project focuses on repeating phrases without constantly losing your place.'],
   ['Connect watching and vocabulary','The direction is shared dictionary lookup and learning progress with 2000 NL. Available client features and public access are announced separately.'],
  ],
  access:'AudioFilms is in development. Contact us if you would like to hear about access; no public installation link is offered here yet.',
 },
 pontix:{
  headline:'Keep the words you encounter.',
  intro:'An early browser-extension project for looking up words while reading and connecting useful discoveries to vocabulary practice.',
  sections:[
   ['Look up a word in context','The aim is to reduce the interruption between encountering a word and understanding it.'],
   ['A connected vocabulary','Pontix is a client of the shared dictionary platform. The extension is in alpha; public availability and exact supported workflows are still being prepared.'],
  ],
  access:'Pontix is in alpha. Contact us about the project; a public extension-store listing is not claimed here.',
 },
} as const;
