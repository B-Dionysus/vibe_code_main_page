const navigation = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.content-panel');
const chambers = document.querySelectorAll('.chamber');
const cylinder = document.querySelector('.cylinder');
const barrel = document.querySelector('.barrel');
const centerContent = document.querySelector('.center-content');
let selectedSection = 'about';
let lastHoverPosition = null;

function selectSection(section) {
  const index = Array.from(navigation).findIndex((item) => item.dataset.section === section);
  if (index === -1 || section === selectedSection) return;

  selectedSection = section;
  [...navigation, ...chambers].forEach((item) => {
    const selected = item.dataset.section === section;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== section;
  });

  cylinder.style.transform = `rotate(${-360 * index / navigation.length}deg)`;
  centerContent.scrollTop = 0;
}

navigation.forEach((button) => {
  button.addEventListener('click', () => selectSection(button.dataset.section));
});

chambers.forEach((button) => {
  button.addEventListener('click', () => selectSection(button.dataset.section));
  button.addEventListener('pointerover', (event) => {
    if (event.pointerType === 'touch') return;
    // Rotation can move another chamber under a stationary pointer.
    if (lastHoverPosition && lastHoverPosition.x === event.clientX && lastHoverPosition.y === event.clientY) return;
    lastHoverPosition = { x: event.clientX, y: event.clientY };
    selectSection(button.dataset.section);
  });
});

barrel.addEventListener('pointerleave', () => {
  lastHoverPosition = null;
});
