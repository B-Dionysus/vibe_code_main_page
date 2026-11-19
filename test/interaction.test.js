const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const sections = ['about', 'coding', 'music', 'leatherworking', 'lighting'];

function setup() {
  class Element {
    constructor(id, chamber = false) {
      this.id = id;
      this.dataset = { section: id };
      this.chamber = chamber;
      this.hidden = id !== 'about';
      this.style = { setProperty(name, value) { this[name] = value; } };
      this.attributes = {};
      this.listeners = {};
      this.classList = { toggle() {} };
    }

    addEventListener(type, handler) { this.listeners[type] = handler; }
    setAttribute(name, value) { this.attributes[name] = value; }
    closest(selector) { return selector === '.chamber' && this.chamber ? this : null; }
  }

  const navigation = sections.map((id) => new Element(id));
  const chambers = sections.map((id) => new Element(id, true));
  const panels = sections.map((id) => new Element(id));
  const cylinder = new Element('cylinder');
  const centerContent = new Element('center');
  const listeners = {};
  const timers = new Map();
  let nextTimer = 0;
  const document = {
    querySelectorAll(selector) {
      return { '.nav-item': navigation, '.chamber': chambers, '.content-panel': panels }[selector];
    },
    querySelector(selector) {
      return { '.cylinder': cylinder, '.center-content': centerContent }[selector];
    },
    addEventListener(type, handler) { listeners[type] = handler; }
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8'), {
    document, Element, getComputedStyle: () => ({ transitionDuration: '1.6s' }),
    setTimeout: (callback) => { const id = ++nextTimer; timers.set(id, callback); return id; },
    clearTimeout: (id) => timers.delete(id)
  });

  function move(target, x, y, pointerType = 'mouse') {
    listeners.pointermove({ target, clientX: x, clientY: y, pointerType });
  }
  function selected() { return panels.find((panel) => !panel.hidden).id; }
  function finishRotation() {
    for (const [id, callback] of timers) { timers.delete(id); callback(); }
  }
  return { navigation, chambers, cylinder, move, selected, finishRotation };
}

test('a chamber moving under a stationary pointer does not change the selection', () => {
  const { chambers, move, selected, finishRotation } = setup();
  move(chambers[1], 100, 100);
  assert.equal(selected(), 'coding');
  move(chambers[2], 100, 100);
  move(chambers[3], 101, 100);
  assert.equal(selected(), 'coding');
  finishRotation();
  move(chambers[3], 101, 100);
  assert.equal(selected(), 'coding');
  move(chambers[2], 102, 100);
  assert.equal(selected(), 'music');
});

test('sidebar selection does not cause a stationary pointer to select a passing chamber', () => {
  const { navigation, chambers, move, selected, finishRotation } = setup();
  move(navigation[0], 50, 50);
  navigation[4].listeners.click();
  move(chambers[1], 50, 50);
  assert.equal(selected(), 'lighting');
  finishRotation();
  move(chambers[1], 51, 50);
  assert.equal(selected(), 'coding');
});

test('chamber clicks work and touch movement does not trigger hover', () => {
  const { chambers, move, selected } = setup();
  move(chambers[1], 100, 100, 'touch');
  assert.equal(selected(), 'about');
  chambers[4].listeners.click();
  assert.equal(selected(), 'lighting');
});

test('each selection updates the shared rotation angle', () => {
  const { navigation, cylinder } = setup();
  for (let index = 1; index < sections.length; index++) {
    navigation[index].listeners.click();
    assert.equal(cylinder.style['--rotation'], `${-360 * index / sections.length}deg`);
  }
  navigation[0].listeners.click();
  assert.equal(cylinder.style['--rotation'], '0deg');
});
