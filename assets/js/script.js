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

// locale storage + render zone and staff assignments

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

//  display and manage unassigned staff

function renderUnassigned() {
  const ul = document.getElementById('unassignedList');
  ul.innerHTML = '';
  const assignedIds = new Set(Object.values(assignments).flat());
  const un = staff.filter(s => ![...assignedIds].includes(s.id));
  document.getElementById('unassignedCount').textContent = un.length;
  if (un.length === 0) {
    ul.innerHTML = '<div class="empty-note">Aucun employé non assigné</div>';
    return
  }
  un.forEach(s => {
    const card = document.createElement('div');
    card.className = 'staff-card';
    card.innerHTML = `<img src="${s.photo||'assets/img/avatar_h2.jpg'}"><div class="staff-meta"><div class="staff-name">${s.name}</div><div class="staff-role">${s.role}</div></div><div><button class="btn btn-ghost" data-id="${s.id}">+</button></div>`;
    card.querySelector('.staff-meta').addEventListener('click', () => openProfile(s.id));
    card.querySelector('button').addEventListener('click', () => openChooseModalForAssign(s.id));
    ul.appendChild(card)
  })
}

// Implemented zone/employee selection modals with assignment logic 

function openChooseModalForAssign(empIdOrZone) {
  const modal = document.getElementById('chooseEmpModal');
  const list = document.getElementById('empListForRoom');
  list.innerHTML = '';
  let zoneId = '',
    mode = 'zone';
  if (empIdOrZone.startsWith('z:')) {
    zoneId = empIdOrZone.slice(2)
  }
  if (zoneId) {
    const z = zonesDef.find(z => z.id === zoneId);
    document.getElementById('chooseZoneName').textContent = z.name;
    const candidates = staff.filter(s => !(Object.values(assignments).flat()).includes(s.id) && (z.rule(s) || s.role === 'manager'));
    if (candidates.length === 0) {
      list.innerHTML = '<div class="empty-note">Aucun employé éligible</div>'
    } else {
      candidates.forEach(s => {
        const item = document.createElement('div');
        item.className = 'staff-card';
        item.innerHTML = `<img src="${s.photo||'assets/img/avatar_h2.jpg'}"><div class="staff-meta"><div class="staff-name">${s.name}</div><div class="staff-role">${s.role}</div></div><div><button class="btn btn-primary" data-assign="${s.id}" data-zone="${z.id}">Assigner</button></div>`;
        item.querySelector('[data-assign]').addEventListener('click', e => {
          assignToZone(s.id, z.id);
          closeChooseModal()
        });
        list.appendChild(item)
      })
    }
  } else {
    document.getElementById('chooseZoneName').textContent = '';
    list.innerHTML = '<div class="empty-note">Erreur</div>'
  }
  modal.classList.add('active')
}

function openChooseModalForAssign_empId(empId) {
  const modal = document.getElementById('chooseEmpModal');
  const list = document.getElementById('empListForRoom');
  list.innerHTML = '';
  document.getElementById('chooseZoneName').textContent = 'Sélectionnez une zone';
  zonesDef.forEach(z => {
    const btnAllowed = (z.rule(staff.find(s => s.id === empId)) || staff.find(s => s.id === empId).role === 'manager');
    const count = (assignments[z.id] || []).length;
    const disabled = count >= z.max || !btnAllowed;
    const el = document.createElement('div');
    el.className = 'staff-card';
    el.innerHTML = `<div style="flex:1"><div style="font-weight:700">${z.name}</div><div style="font-size:13px;color:var(--muted)">${z.desc}</div></div><div><button class="btn ${disabled?'btn-ghost':'btn-primary'}" data-zoneassign="${z.id}" ${disabled?'disabled':''}>${disabled?'Non disponible':'Assigner'}</button></div>`;
    el.querySelector('[data-zoneassign]').addEventListener('click', () => {
      assignToZone(empId, z.id);
      closeChooseModal()
    });
    list.appendChild(el)
  })
  modal.classList.add('active')
}

function closeChooseModal() {
  document.getElementById('chooseEmpModal').classList.remove('active')
}


function openProfile(id) {
  const s = staff.find(x => x.id === id);
  if (!s) return;
  document.getElementById('profilePic').src = s.photo || 'assets/img/avatar_h2.jpg';
  document.getElementById('profileName').textContent = s.name;
  document.getElementById('profileRole').textContent = s.role;
  document.getElementById('profileEmail').textContent = s.email || '';
  document.getElementById('profilePhone').textContent = s.phone || '';
  const expC = document.getElementById('profileExperiences');
  expC.innerHTML = '';
  (s.experiences || []).forEach(ex => {
    const d = document.createElement('div');
    d.style.padding = '8px';
    d.style.borderRadius = '8px';
    d.style.border = '1px solid #eef4ff';
    d.style.marginBottom = '8px';
    d.innerHTML = `<strong>${ex.company} — ${ex.position}</strong><div style="color:var(--muted)">${ex.start} → ${ex.end||'Présent'}</div>`;
    expC.appendChild(d)
  });
  const loc = Object.entries(assignments).find(([k, v]) => v.includes(id));
  document.getElementById('profileLocation').textContent = loc ? zonesDef.find(z => z.id === loc[0]).name : 'Non assigné';
  document.getElementById('profileModal').classList.add('active')
}

function closeProfile() {
  document.getElementById('profileModal').classList.remove('active')
}
