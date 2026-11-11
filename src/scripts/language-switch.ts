const preferenceKey='dilum-language';
document.addEventListener('click',event=>{
 const target=event.target instanceof Element?event.target:null;
 const link=target?.closest<HTMLAnchorElement>('[data-language-link]');
 if(link){try{localStorage.setItem(preferenceKey,link.dataset.languageLink!);}catch{}}
 document.querySelectorAll<HTMLDetailsElement>('[data-language-switch][open]').forEach(control=>{
  if(link||!target||!control.contains(target))control.open=false;
 });
});
document.addEventListener('keydown',event=>{
 if(event.key!=='Escape')return;
 document.querySelectorAll<HTMLDetailsElement>('[data-language-switch][open]').forEach(control=>{
  control.open=false;control.querySelector('summary')?.focus();
 });
});
