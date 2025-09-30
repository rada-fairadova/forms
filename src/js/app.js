import { Popover } from './popover.js';
import { ProductManager, ProductForm } from './crud.js';

class App {
  constructor() {
    this.popover = new Popover();
    this.productManager = new ProductManager();
    this.init();
  }

  init() {
    this.bindPopoverEvents();
    this.bindCrudEvents();
    this.renderProducts();
  }

  bindPopoverEvents() {
    const popoverBtn = document.getElementById('popoverBtn');
    if (popoverBtn) {
      popoverBtn.addEventListener('click', (e) => {
        this.popover.togglePopover(
          'Popover title',
          'And here\'s some amazing content. It\'s very engaging. Right?',
          e.target
        );
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.popover') && !e.target.closest('#popoverBtn')) {
        this.popover.hidePopover();
      }
    });
  }

  bindCrudEvents() {
    const modal = document.getElementById('productModal');
    this.productForm = new ProductForm(
      modal,
      this.productManager,
      () => this.renderProducts()
    );

    const addBtn = document.getElementById('addProduct');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.productForm.show();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.productForm.hide();
      }
    });
  }

  renderProducts() {
    const tbody = document.querySelector('#productsTable tbody');
    const products = this.productManager.getAllProducts();

    tbody.innerHTML = '';

    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>
          <button class="btn-edit" data-id="${product.id}">✎</button>
          <button class="btn-delete" data-id="${product.id}">✕</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    this.bindTableEvents();
  }

  bindTableEvents() {
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        this.productForm.show(productId);
      });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        if (confirm('Вы уверены, что хотите удалить этот товар?')) {
          this.productManager.deleteProduct(productId);
          this.renderProducts();
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
