window.currentProfile = 'pldmgr';

function setProfile(profileName, autoRun = true) {
  window.currentProfile = profileName;

  // 1. Mise à jour de l'état des boutons de profil
  document.querySelectorAll('.btn-profile').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-profile') === profileName);
  });

  // 2. Filtrage des tuiles et configuration des règles d'auto-injection
  document.querySelectorAll('.payloadTile').forEach(tile => {
    const allowed = (tile.getAttribute('data-profiles') || '').split(' ');
    const href = tile.getAttribute('href') || '';

    if (allowed.includes(profileName)) {
      tile.style.display = '';

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

  // 3. Exécution de la chaîne d'injection si demandé
  if (autoRun) {
    runCurrentProfile();
  }
}

// Fonction déclenchée au clic sur l'image de profil ou lors du changement de profil
function runCurrentProfile() {
  if (typeof payloadSendBusy !== 'undefined' && payloadSendBusy) return;
  if (typeof autoInjectStarted !== 'undefined') autoInjectStarted = false;
  if (typeof autoInjectPayloads === 'function') autoInjectPayloads();
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
  setProfile('pldmgr', false);
});
