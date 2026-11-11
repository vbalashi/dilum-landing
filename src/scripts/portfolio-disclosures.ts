// Keep native details semantics; animate the whole height so closing is smooth too.
const bound = new WeakSet<HTMLDetailsElement>();
const active = new Map<HTMLDetailsElement, { animation: Animation; open: boolean }>();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function settle(detail: HTMLDetailsElement, open: boolean) {
  const current = active.get(detail);
  active.delete(detail);
  if (current) {
    current.animation.onfinish = null;
    current.animation.cancel();
  }
  detail.open = open;
  detail.style.removeProperty('height');
  detail.style.removeProperty('overflow');
  delete detail.dataset.expanding;
}

function setupDisclosures() {
  document.querySelectorAll<HTMLDetailsElement>('.portfolio details').forEach(detail => {
    if (bound.has(detail)) return;
    const summary = detail.querySelector('summary');
    if (!summary) return;
    bound.add(detail);
    summary.addEventListener('click', event => {
      event.preventDefault();
      const open = !(active.get(detail)?.open ?? detail.open);
      if (reducedMotion.matches) { settle(detail, open); return; }
      const start = detail.getBoundingClientRect().height;
      settle(detail, true);
      // Measure the natural end height before fixing the height for animation.
      const end = open ? detail.getBoundingClientRect().height : summary.getBoundingClientRect().height;
      detail.dataset.expanding = String(open);
      detail.style.height = `${start}px`;
      detail.style.overflow = 'hidden';
      const animation = detail.animate(
        { height: [`${start}px`, `${end}px`] },
        { duration: 280, easing: 'cubic-bezier(.2, 0, .2, 1)' },
      );
      active.set(detail, { animation, open });
      animation.onfinish = () => settle(detail, open);
    });
  });
}

// Finish in-flight animations before printing, changing routes or motion settings.
export function finishPortfolioDisclosures() {
  for (const [detail, state] of active) settle(detail, state.open);
}
window.addEventListener('beforeprint', finishPortfolioDisclosures);
document.addEventListener('astro:before-swap', finishPortfolioDisclosures);
reducedMotion.addEventListener('change', finishPortfolioDisclosures);
setupDisclosures();
document.addEventListener('astro:page-load', setupDisclosures);
