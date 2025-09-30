import { ProductManager } from '../src/js/crud.js';

describe('ProductManager', () => {
  let productManager;

  beforeEach(() => {
    productManager = new ProductManager();
  });

  test('should add product', () => {
    const product = productManager.addProduct('Test Product', 100);
    
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(100);
    expect(productManager.getAllProducts()).toHaveLength(1);
  });

  test('should update product', () => {
    const product = productManager.addProduct('Test Product', 100);
    const updated = productManager.updateProduct(product.id, 'Updated Product', 200);
    
    expect(updated.name).toBe('Updated Product');
    expect(updated.price).toBe(200);
  });

  test('should delete product', () => {
    const product = productManager.addProduct('Test Product', 100);
    const result = productManager.deleteProduct(product.id);
    
    expect(result).toBe(true);
    expect(productManager.getAllProducts()).toHaveLength(0);
  });

  test('should get all products', () => {
    productManager.addProduct('Product 1', 100);
    productManager.addProduct('Product 2', 200);
    
    const products = productManager.getAllProducts();
    expect(products).toHaveLength(2);
  });
});
