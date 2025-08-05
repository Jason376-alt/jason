// Produktliste
const products = [
    {
        id: 1,
        name: "SkyBlock Pro",
        description: "Erstelle deine eigene SkyBlock-Welt mit erweiterten Funktionen.",
        price: 19.99,
        image: "images/skyblock-plugin.jpg"
    },
    {
        id: 2,
        name: "PvP Arena",
        description: "Erstelle spannende PvP-Arenen mit verschiedenen Spielmodi.",
        price: 14.99,
        image: "images/pvp-arena.jpg"
    },
    {
        id: 3,
        name: "Economy+ ",
        description: "Erweitertes Wirtschaftssystem mit Shops und Märkten.",
        price: 12.99,
        image: "images/economy.jpg"
    },
    {
        id: 4,
        name: "Survival+ ",
        description: "Erweiterte Überlebensmechaniken für deinen Server.",
        price: 9.99,
        image: "images/survival.jpg"
    },
    {
        id: 5,
        name: "Minigames Collection",
        description: "Sammlung von 10 verschiedenen Minispielen.",
        price: 24.99,
        image: "images/minigames.jpg"
    },
    {
        id: 6,
        name: "Anti-Cheat Pro",
        description: "Schütze deinen Server vor Cheatern und Hacks.",
        price: 29.99,
        image: "images/anticheat.jpg"
    }
];

// Warenkorb
let cart = [];

// DOM-Elemente
const productContainer = document.getElementById('product-container');
const cartCount = document.getElementById('cart-count');

// Produkte anzeigen
function displayProducts() {
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/placeholder.png'">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${product.price.toFixed(2)} €</div>
                <button class="add-to-cart" data-id="${product.id}">In den Warenkorb</button>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
    
    // Event-Listener für die Buttons hinzufügen
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Produkt zum Warenkorb hinzufügen
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        updateCartCount();
        showNotification(`${product.name} wurde zum Warenkorb hinzugefügt!`);
    }
}

// Warenkorb-Zähler aktualisieren
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Benachrichtigung anzeigen
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Navigation glatt scrollen
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    
    // Füge Stil für Benachrichtigungen hinzu
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
