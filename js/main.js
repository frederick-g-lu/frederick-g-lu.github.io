const currentYear = document.getElementById('current-year');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const PREVIEW_LIMIT = 3;

const fetchJson = async (path) => {
  const response = await fetch(`${path}?updated=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return response.json();
};

const renderBlog = (posts) => {
  const list = document.getElementById('blog-list');
  if (!list) return;

  list.innerHTML = posts.map((post) => `
    <details>
      <summary>
        <span>${escapeHtml(post.title)}</span>
        <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
      </summary>
      <div class="accordion-body">
        ${(post.content || [post.excerpt]).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      </div>
    </details>
  `).join('');
};

const renderEntry = (entry, type, index) => {
  const isPublication = type === 'publication';
  const linkLabel = isPublication ? 'Reference' : 'GitHub';
  const link = isPublication ? entry.url : entry.githubUrl;
  const secondary = isPublication ? entry.journal : '';
  const technologies = (entry.technologies || [])
    .map((technology) => `<span>${escapeHtml(technology)}</span>`)
    .join('');

  return `
    <article class="entry-row${index >= PREVIEW_LIMIT ? ' overflow-entry' : ''}"${index >= PREVIEW_LIMIT ? ' hidden' : ''}>
      <div class="entry-head">
        <h3>${escapeHtml(entry.title)}</h3>
        ${secondary ? `<p>${escapeHtml(secondary)}</p>` : ''}
        <span>${escapeHtml(entry.year)}</span>
      </div>
      <div class="entry-body">
        <p>${escapeHtml(entry.description)}</p>
        <div class="tech-row">${technologies}</div>
        ${link ? `<div class="entry-link-row"><a href="${escapeHtml(link)}" target="_blank" rel="noreferrer">${linkLabel}</a></div>` : ''}
      </div>
    </article>
  `;
};

const renderEntryList = (entries, type) => {
  const list = document.getElementById(`${type}s-list`);
  if (!list) return;

  const toggle = document.querySelector(`[data-list-toggle="${list.id}"]`);
  list.innerHTML = entries.map((entry, index) => renderEntry(entry, type, index)).join('');

  if (toggle && entries.length > PREVIEW_LIMIT) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      list.querySelectorAll('.overflow-entry').forEach((entry) => {
        entry.hidden = isExpanded;
      });
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      toggle.textContent = isExpanded ? 'See more' : 'Show less';
    });
  }
};

const loadContent = async () => {
  try {
    const [blog, publications, projects] = await Promise.all([
      fetchJson('data/blog.json'),
      fetchJson('data/publications.json'),
      fetchJson('data/projects.json')
    ]);

    renderBlog(blog);
    renderEntryList(publications, 'publication');
    renderEntryList(projects, 'project');
  } catch (error) {
    console.error(error);
  }
};

loadContent();
