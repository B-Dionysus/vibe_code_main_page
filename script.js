const navigation = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.content-panel');
const chambers = document.querySelectorAll('.chamber');
const cylinder = document.querySelector('.cylinder');

navigation.forEach((button, index) => {
  button.addEventListener('click', () => {
    navigation.forEach((item, itemIndex) => {
      const selected = itemIndex === index;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
      chambers[itemIndex].classList.toggle('is-active', selected);
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== button.dataset.section;
    });

    cylinder.style.transform = `rotate(${-90 * index}deg)`;
    document.querySelector('.center-content').scrollTop = 0;
  });
});
