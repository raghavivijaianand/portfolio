const list = document.getElementById('project-list');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

async function loadProjects() {
  try {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error();
    const projects = await res.json();
    if (!projects.length) { list.innerHTML = '<p class="muted">No projects yet. Run <code>npm run seed</code> to add samples.</p>'; return; }
    list.innerHTML = projects.map(p => `
      <article class="card">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="tags">${(p.tech || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
        ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Live demo</a>` : ''}
        ${p.repoUrl ? `<a href="${esc(p.repoUrl)}" target="_blank" rel="noopener">Source code</a>` : ''}
      </article>`).join('');
  } catch { list.innerHTML = '<p class="muted">Could not load projects. Check that the server and database are running.</p>'; }
}

document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error((await res.json()).error);
    status.textContent = 'Message sent. Thanks for reaching out!';
    e.target.reset();
  } catch (err) { status.textContent = err.message || 'Message not sent. Try again.'; }
});

document.getElementById('year').textContent = new Date().getFullYear();
loadProjects();
