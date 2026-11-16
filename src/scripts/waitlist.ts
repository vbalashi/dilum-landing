import fallback from '../i18n/ui/waitlist.en.json';
function mountWaitlist() {
  document.querySelectorAll<HTMLFormElement>('form[data-waitlist]').forEach(form => {
    if(form.dataset.mounted) return;
    form.dataset.mounted='true';
    const messages={...fallback,...JSON.parse(form.dataset.messages || '{}')} as typeof fallback;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const button=form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
      const message=form.querySelector<HTMLElement>('.waitlist-message')!;
      const submitLabel=button.textContent;
      if(button.disabled) return;
      if(form.dataset.preview==='true' || location.hostname!=='dilum.io') {
        message.textContent=messages.preview;
        return;
      }
      const data=new FormData(form);
      button.disabled=true;button.textContent=messages.sending;message.textContent='';
      try {
        const response=await fetch('/api/waitlist', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({email:data.get('email'),language:data.get('language'),
            interests:data.getAll('interests'),earlyTester:data.has('earlyTester'),website:data.get('website')}),
        });
        const result=await response.json();
        if(!response.ok) throw new Error(result.error||messages.error);
        (window as Window & { umami?: { track: (event: string) => void } }).umami?.track('waitlist_signup_success');
        message.textContent=form.dataset.locale==='en'?(result.message||messages.success):messages.success;
        form.reset();
      } catch(error) {
        message.textContent=form.dataset.locale!=='en'?messages.error:(error instanceof Error?error.message:messages.offline);
      } finally {button.disabled=false;button.textContent=submitLabel;}
    });
  });
}
document.addEventListener('astro:page-load',mountWaitlist);
mountWaitlist();
