function mountWaitlist() {
  document.querySelectorAll<HTMLFormElement>('form[data-waitlist]').forEach(form => {
    if(form.dataset.mounted) return;
    form.dataset.mounted='true';
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const button=form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
      const message=form.querySelector<HTMLElement>('.waitlist-message')!;
      if(button.disabled) return;
      if(form.dataset.preview==='true' || location.hostname!=='dilum.io') {
        message.textContent='Preview only: no signup was saved or sent.';
        return;
      }
      const data=new FormData(form);
      button.disabled=true;button.textContent='Sending…';message.textContent='';
      try {
        const response=await fetch('/api/waitlist', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({email:data.get('email'),language:data.get('language'),
            interests:data.getAll('interests'),earlyTester:data.has('earlyTester'),website:data.get('website')}),
        });
        const result=await response.json();
        if(!response.ok) throw new Error(result.error||"We couldn't save your request. Please try again.");
        message.textContent=result.message;
        form.reset();
      } catch(error) {
        message.textContent=error instanceof Error?error.message:'Please try again later.';
      } finally {button.disabled=false;button.textContent='Request access';}
    });
  });
}
document.addEventListener('astro:page-load',mountWaitlist);
mountWaitlist();
