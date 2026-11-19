const navigation = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.content-panel');
const chambers = document.querySelectorAll('.chamber');
const cylinder = document.querySelector('.cylinder');
const centerContent = document.querySelector('.center-content');
let selectedSection = 'about';
let lastPointerPosition = null;

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

  cylinder.style.setProperty('--rotation', `${-360 * index / navigation.length}deg`);
  centerContent.scrollTop = 0;
}

navigation.forEach((button) => {
  button.addEventListener('click', () => selectSection(button.dataset.section));
});

chambers.forEach((button) => {
  button.addEventListener('click', () => selectSection(button.dataset.section));
});

document.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'touch') return;
  // Only pointer movement, not a chamber rotating underneath it, selects a section.
  if (lastPointerPosition && lastPointerPosition.x === event.clientX && lastPointerPosition.y === event.clientY) return;
  lastPointerPosition = { x: event.clientX, y: event.clientY };
  const chamber = event.target instanceof Element ? event.target.closest('.chamber') : null;
  if (chamber) selectSection(chamber.dataset.section);
});
