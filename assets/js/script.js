// I Changed the grid from HTML to JS to simplify the work. 
// Each zone has an id, name, icon, description, assignment rule, required flag, and max capacity.
const zonesDef = [{
    id: 'reception',
    name: 'Réception',
    icon: 'fa-users',
    desc: 'Zone d\'accueil - Réservée aux réceptionnistes',
    rule: emp => emp.role === 'receptionniste',
    required: true,
    max: 6
  },
  {
    id: 'conference',
    name: 'Salle de conférence',
    icon: 'fa-tv',
    desc: 'Espace de réunion - Accessible à tous',
    rule: () => true,
    required: false,
    max: 6
  },
  {
    id: 'servers',
    name: 'Salle des serveurs',
    icon: 'fa-server',
    desc: 'Zone technique - Réservée aux techniciens IT',
    rule: emp => emp.role === 'it',
    required: true,
    max: 6
  },
  {
    id: 'security',
    name: 'Salle de sécurité',
    icon: 'fa-user-shield',
    desc: 'Centre de sécurité - Réservée aux agents de sécurité',
    rule: emp => emp.role === 'securite',
    required: true,
    max: 6
  },
  {
    id: 'staffroom',
    name: 'Salle du personnel',
    icon: 'fa-mug-hot',
    desc: 'Espace de repos - Accessible à tous',
    rule: () => true,
    required: false,
    max: 6
  },
  {
    id: 'archives',
    name: 'Salle d\'archives',
    icon: 'fa-boxes-packing',
    desc: 'Zone de stockage - Interdit au personnel de nettoyage',
    rule: emp => emp.role !== 'nettoyage',
    required: true,
    max: 6
  }
]


let staff = JSON.parse(localStorage.getItem('ws_staff') || '[]')
let assignments = JSON.parse(localStorage.getItem('ws_assign') || '{}')

function save() {
  localStorage.setItem('ws_staff', JSON.stringify(staff));
  localStorage.setItem('ws_assign', JSON.stringify(assignments))
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function renderZones() {
  const container = document.getElementById('zonesContainer');
  container.innerHTML = '';
  zonesDef.forEach(z => {
    const count = (assignments[z.id] || []).length;
    const el = document.createElement('div');
    el.className = 'room-card';
    if (z.required && count === 0) el.classList.add('zone-required');
    el.innerHTML = `<div class="room-header"><div class="title-card-room"><i class="fa ${z.icon}"></i><div><p style="font-weight:700">${z.name}</p><p style="font-size:13px;color:var(--muted)"><small>${count}/${z.max} employés</small></p></div></div><button class="card-add-emp" data-zone="${z.id}">+</button></div><div class="room-desc"><p>${z.desc}</p></div><div class="zone-list" data-zone-list="${z.id}"></div>`;
    container.appendChild(el);
    const list = el.querySelector('[data-zone-list]');
    (assignments[z.id] || []).forEach(id => {
      const s = staff.find(x => x.id === id);
      if (!s) return;
      const item = document.createElement('div');
      item.className = 'zone-emp';
      item.innerHTML = `<img src="${s.photo||'assets/img/avatar_h2.jpg'}"><div class="meta"><div style="font-weight:700">${s.name}</div><div style="font-size:13px;color:var(--muted)">${s.role}</div></div><button class="remove-from-zone" data-id="${s.id}" data-zone="${z.id}">X</button>`;
      item.querySelector('.meta').addEventListener('click', () => openProfile(s.id));
      list.appendChild(item)
    })
  })
}
