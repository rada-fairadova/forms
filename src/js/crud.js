export class ProductManager {
    constructor() {
      this.products = [];
      this.currentEditId = null;
    }
  
    addProduct(name, price) {
      const product = {
        id: Date.now().toString(),
        name: name.trim(),
        price: parseFloat(price)
      };
      this.products.push(product);
      return product;
    }
  
    updateProduct(id, name, price) {
      const product = this.products.find(p => p.id === id);
      if (product) {
        product.name = name.trim();
        product.price = parseFloat(price);
        return product;
      }
      return null;
    }
  
    deleteProduct(id) {
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
        return true;
      }
      return false;
    }
  
    getProduct(id) {
      return this.products.find(p => p.id === id);
    }
  
    getAllProducts() {
      return [...this.products];
    }
  }
  
  export class ProductForm {
    constructor(modalElement, productManager, onSave) {
      this.modal = modalElement;
      this.productManager = productManager;
      this.onSave = onSave;
      this.currentProductId = null;
  
      this.initializeForm();
    }
  
    initializeForm() {
      this.nameInput = this.modal.querySelector('#productName');
      this.priceInput = this.modal.querySelector('#productPrice');
      this.nameError = this.modal.querySelector('#nameError');
      this.priceError = this.modal.querySelector('#priceError');
      this.saveBtn = this.modal.querySelector('#saveProduct');
      this.cancelBtn = this.modal.querySelector('#cancelProduct');
  
      this.saveBtn.addEventListener('click', () => this.handleSave());
      this.cancelBtn.addEventListener('click', () => this.hide());

      this.nameInput.addEventListener('input', () => this.validateName());
      this.priceInput.addEventListener('input', () => this.validatePrice());
    }
  
    show(productId = null) {
      this.currentProductId = productId;
      this.clearErrors();
      this.clearForm();
  
      if (productId) {
        const product = this.productManager.getProduct(productId);
        if (product) {
          this.nameInput.value = product.name;
          this.priceInput.value = product.price;
        }
      }
  
      this.modal.style.display = 'block';
    }
  
    hide() {
      this.modal.style.display = 'none';
      this.clearErrors();
      this.clearForm();
      this.currentProductId = null;
    }
  
    clearForm() {
      this.nameInput.value = '';
      this.priceInput.value = '';
    }
  
    clearErrors() {
      this.nameError.textContent = '';
      this.priceError.textContent = '';
      this.nameInput.classList.remove('error');
      this.priceInput.classList.remove('error');
    }
  
    validateName() {
      const name = this.nameInput.value.trim();
      if (!name) {
        this.nameError.textContent = 'Название товара обязательно';
        this.nameInput.classList.add('error');
        return false;
      }
      this.nameError.textContent = '';
      this.nameInput.classList.remove('error');
      return true;
    }
  
    validatePrice() {
      const price = this.priceInput.value;
      const numPrice = parseFloat(price);
      
      if (!price) {
        this.priceError.textContent = 'Стоимость товара обязательна';
        this.priceInput.classList.add('error');
        return false;
      }
      
      if (isNaN(numPrice) || numPrice <= 0) {
        this.priceError.textContent = 'Стоимость должна быть числом больше 0';
        this.priceInput.classList.add('error');
        return false;
      }
  
      this.priceError.textContent = '';
      this.priceInput.classList.remove('error');
      return true;
    }
  
    validateForm() {
      const isNameValid = this.validateName();
      const isPriceValid = this.validatePrice();
      return isNameValid && isPriceValid;
    }
  
    handleSave() {
      if (!this.validateForm()) {
        return;
      }
  
      const name = this.nameInput.value;
      const price = this.priceInput.value;
  
      if (this.currentProductId) {
        this.productManager.updateProduct(this.currentProductId, name, price);
      } else {
        this.productManager.addProduct(name, price);
      }
  
      this.hide();
      this.onSave();
    }
  }
