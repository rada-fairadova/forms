import { Popover } from '../src/js/popover.js';

describe('Popover', () => {
  let popover;

  beforeEach(() => {
    popover = new Popover();
    document.body.innerHTML = '<button id="testBtn">Test</button>';
  });

  afterEach(() => {
    popover.hidePopover();
  });

  test('should create and show popover', () => {
    const button = document.getElementById('testBtn');
    popover.showPopover('Test Title', 'Test Message', button);

    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).not.toBeNull();
    expect(popoverElement.querySelector('.popover-title').textContent).toBe('Test Title');
    expect(popoverElement.querySelector('.popover-content').textContent).toBe('Test Message');
  });

  test('should hide popover', () => {
    const button = document.getElementById('testBtn');
    popover.showPopover('Test Title', 'Test Message', button);
    
    popover.hidePopover();
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).toBeNull();
  });

  test('should toggle popover', () => {
    const button = document.getElementById('testBtn');
    
    popover.togglePopover('Test Title', 'Test Message', button);
    expect(document.querySelector('.popover')).not.toBeNull();

    popover.togglePopover('Test Title', 'Test Message', button);
    expect(document.querySelector('.popover')).toBeNull();
  });
});
