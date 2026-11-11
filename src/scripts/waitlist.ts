function mountWaitlist() {
  document.querySelectorAll<HTMLFormElement>('form[data-waitlist]').forEach(form => {
    if(form.dataset.mounted) return;
    form.dataset.mounted='true';
    const messages=JSON.parse(form.dataset.messages || '{}') as Record<string,string>;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const button=form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
      const message=form.querySelector<HTMLElement>('.waitlist-message')!;
      const submitLabel=button.textContent;
      if(button.disabled) return;
      if(form.dataset.preview==='true' || location.hostname!=='dilum.io') {
        message.textContent=messages.preview || 'Preview only: no signup was saved or sent.';
        return;
      }
      const data=new FormData(form);
      button.disabled=true;button.textContent=messages.sending || 'Sending…';message.textContent='';
      try {
        const response=await fetch('/api/waitlist', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({email:data.get('email'),language:data.get('language'),
            interests:data.getAll('interests'),earlyTester:data.has('earlyTester'),website:data.get('website')}),
        });
        const result=await response.json();
        if(!response.ok) throw new Error(result.error||"We couldn't save your request. Please try again.");
        (window as Window & { umami?: { track: (event: string) => void } }).umami?.track('waitlist_signup_success');
        message.textContent=form.dataset.locale==='en'?result.message:messages.success;
        form.reset();
      } catch(error) {
        message.textContent=form.dataset.locale==='ru'?(messages.error||messages.offline):(error instanceof Error?error.message:'Please try again later.');
      } finally {button.disabled=false;button.textContent=submitLabel;}
    });
  });
}
document.addEventListener('astro:page-load',mountWaitlist);
mountWaitlist();
