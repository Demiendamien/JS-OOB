





// Classe pour représenter un produit
class Product {
    constructor(id, name, price) {  
      this.id = id;                
      this.name = name;            
      this.price = price;         
    }
  }
  
  // Classe pour représenter un élément du panier d'achat
  class ShoppingCartItem {
    constructor(product, quantity) {  
      this.product = product;         
      this.quantity = quantity;       
    }
  
    // Méthode pour calculer le prix total de l'élément du panier
    getTotalPrice() {
      return this.product.price * this.quantity;  
    }
  }
  
  // Classe pour représenter le panier d'achat
  class ShoppingCart {
    constructor() {
      this.items = [];  
    }
  
    // Méthode pour ajouter un élément au panier
    addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;  
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));  
      }
      this.updateTotalPrice();  
    }
  
    // Méthode pour supprimer un élément du panier
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateTotalPrice();  
    }
  
    // Méthode pour mettre à jour le prix total du panier
    updateTotalPrice() {
      const total = this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
      document.querySelector('.total').textContent = `${total} $`;  
    }
  
    // Méthode pour afficher les éléments du panier
    displayItems() {
      const listProducts = document.querySelector('.list-products');
      listProducts.innerHTML = '';  
  
      this.items.forEach(item => {  
        const card = document.createElement('div');
        card.classList.add('card-body');
        card.innerHTML = `
          <div class="card" style="width: 18rem">
            <img src="/assets/${item.product.name.toLowerCase()}.png" class="card-img-top" alt="${item.product.name}" />
            <div class="card-body">
              <h5 class="card-title">${item.product.name}</h5>
              <p class="card-text">Ceci est un(e) ${item.product.name}</p>
              <h4 class="unit-price">${item.product.price} $</h4>
              <div>
                <i class="fas fa-plus-circle" onclick="cart.addItem(new Product(${item.product.id}, '${item.product.name}', ${item.product.price}), 1)"></i>
                <span class="quantity">${item.quantity}</span>
                <i class="fas fa-minus-circle" onclick="cart.removeItem(${item.product.id})"></i>
              </div>
              <div>
                <i class="fas fa-trash-alt" onclick="cart.removeItem(${item.product.id})"></i>
                <i class="fas fa-heart"></i>
              </div>
            </div>
          </div>
        `;
        listProducts.appendChild(card);  
      });
    }
  }
  
  // Création des produits
  const product1 = new Product(1, 'Baskets', 100);
  const product2 = new Product(2, 'Socks', 20);
  const product3 = new Product(3, 'Bag', 50);
  
  // Création du panier d'achat
  const cart = new ShoppingCart();
  
  // Ajouter des éléments au panier (pour l'affichage initial)
  cart.addItem(product1, 0);
  cart.addItem(product2, 0);
  cart.addItem(product3, 0);
  cart.displayItems();
  
  // Mettre à jour le prix total du panier
  cart.updateTotalPrice();
  