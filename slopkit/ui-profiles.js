window.currentProfile = 'pldmgr';

function setProfile(profileName) {
  window.currentProfile = profileName;

  // 1. Boutons UI
  document.querySelectorAll('.btn-profile').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-profile') === profileName);
  });

  // 2. Gestion des tuiles et des attributs d'auto-load pour Slopkit
  document.querySelectorAll('.payloadTile').forEach(tile => {
    const allowed = (tile.getAttribute('data-profiles') || '').split(' ');
    const href = tile.getAttribute('href') || '';

    if (allowed.includes(profileName)) {
      tile.style.display = 'flex';

      if (profileName === 'pldmgr') {
        if (href.includes('payload_manager.elf')) tile.setAttribute('data-auto', 'first');
        if (href.includes('kstuff.elf')) tile.setAttribute('data-auto', 'latest');
      } else if (profileName === 'evox') {
        if (href.includes('evox.elf')) tile.setAttribute('data-auto', 'first');
        if (href.includes('kstuff.elf')) tile.removeAttribute('data-auto');
      } else if (profileName === 'unified') {
        if (href.includes('ps5-unified.elf')) tile.setAttribute('data-auto', 'first');
        if (href.includes('kstuff.elf')) tile.removeAttribute('data-auto');
      }
    } else {
      tile.style.display = 'none';
      tile.removeAttribute('data-auto');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setProfile('pldmgr');
});