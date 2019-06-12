export default function initInspectlet(inspectletId) {
  if (!inspectletId) {
    return;
  }

  window.__insp = window.__insp || [];
  window.__insp.push(['wid', inspectletId]);

  function ldinsp() {
    if (typeof window.__inspld !== 'undefined') return;
    window.__inspld = 1;
    const insp = document.createElement('script');
    insp.type = 'text/javascript';
    insp.async = true;
    insp.id = 'inspsync';
    const schema = document.location.protocol === 'https:' ? 'https' : 'http';
    const r = Math.floor(new Date().getTime() / 3600000);
    insp.src = `${schema}://cdn.inspectlet.com/inspectlet.js?wid=${inspectletId}&r=${r}`;
    const x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(insp, x);
  }
  setTimeout(ldinsp, 0);
}
