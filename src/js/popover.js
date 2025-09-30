export class Popover {
    constructor() {
      this.popover = null;
    }
  
    showPopover(title, message, element) {
      this.hidePopover();

      this.popover = document.createElement('div');
      this.popover.className = 'popover';
      this.popover.innerHTML = `
        <div class="popover-title">${title}</div>
        <div class="popover-content">${message}</div>
        <div class="popover-arrow"></div>
      `;
  
      document.body.appendChild(this.popover);

      this.positionPopover(element);
    }
  
    positionPopover(element) {
      const rect = element.getBoundingClientRect();
      const popoverRect = this.popover.getBoundingClientRect();

      const top = rect.top - popoverRect.height - 10;
      const left = rect.left + (rect.width - popoverRect.width) / 2;
  
      this.popover.style.top = `${top}px`;
      this.popover.style.left = `${left}px`;
    }
  
    hidePopover() {
      if (this.popover) {
        this.popover.remove();
        this.popover = null;
      }
    }
  
    togglePopover(title, message, element) {
      if (this.popover && this.popover.isConnected) {
        this.hidePopover();
      } else {
        this.showPopover(title, message, element);
      }
    }
  }
