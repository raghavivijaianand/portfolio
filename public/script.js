document.getElementById('year').textContent = new Date().getFullYear();

async function loadProjects() {
  const box = document.getElementById('projectList');
  try {
    const res = await fetch('/api/projects');
    const projects = await res.json();
    if (!projects.length) { box.innerHTML = '<p>No projects yet.</p>'; return; }
    box.innerHTML = '';
    projects.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      const h = document.createElement('h3'); h.textContent = p.title;
      const d = document.createElement('p'); d.textContent = p.description;
      const t = document.createElement('div'); t.className = 'tags'; t.textContent = (p.tech || []).join(', ');
      card.append(h, d, t);
      box.appendChild(card);
    });
  } catch { box.innerHTML = '<p>Could not load projects. Check that the server is running.</p>'; }
}

document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const status = document.getElementById('status');
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const res = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error();
    status.textContent = 'Message sent. Thank you!';
    e.target.reset();
  } catch { status.textContent = 'Could not send the message. Please try again.'; }
});

loadProjects();
