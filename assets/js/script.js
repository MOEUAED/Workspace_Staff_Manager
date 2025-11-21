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

