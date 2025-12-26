/* script.js */

// --- 1. Product Catalog (Hard-Coded) ---
const products = [
    { id: 1, name: "The FLUX Essential", price: 3800, oldPrice: 4800, status: "sale", imgFront: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80" },
    { id: 2, name: "Echo Crewneck", price: 3500, oldPrice: 4500, status: "sale", imgFront: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800&q=80" },
    { id: 3, name: "1947 Quarter Zip", price: 3500, oldPrice: 4500, status: "sale", imgFront: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80" },
    { id: 4, name: "Galiyan Hoodie", price: 3800, oldPrice: 4800, status: "sold-out", imgFront: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80" },
    { id: 5, name: "Acid Wash Essential", price: 3800, oldPrice: 4800, status: "sold-out", imgFront: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80" },
    { id: 6, name: "Core Black Trousers", price: 2900, oldPrice: 3500, status: "sale", imgFront: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80" },
    { id: 7, name: "Sandline Trousers", price: 2900, oldPrice: 3500, status: "sale", imgFront: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80" },
    { id: 8, name: "FLUX Signature Cap", price: 1200, oldPrice: 1500, status: "in-stock", imgFront: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80" },
    { id: 9, name: "Oversized Puffer", price: 8500, oldPrice: 10500, status: "sale", imgFront: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80" },
    { id: 10, name: "Tactical Vest", price: 4200, oldPrice: 5500, status: "in-stock", imgFront: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=800&q=80" },
    { id: 11, name: "Raw Hem Denim", price: 3900, oldPrice: 4900, status: "sale", imgFront: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80" },
    { id: 12, name: "Concrete Tee", price: 2200, oldPrice: 2800, status: "in-stock", imgFront: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", imgBack: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" }
];

// --- 2. State Management ---
let cart = JSON.parse(localStorage.getItem('fluxCart')) || [];

// --- 3. DOM Elements ---
const cartDrawer = document.querySelector('.cart-drawer');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const subtotalEl = document.getElementById('subtotal');
const grandTotalEl = document.getElementById('grand-total');
const mobileMenu = document.querySelector('.nav-links');

// --- 4. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    initCursor();
    
    // Page Specific Logic
    if (document.getElementById('product-grid')) renderShop();
    if (document.getElementById('horizontal-grid')) renderFeatured();
    if (document.querySelector('.product-detail-container')) initProductPage();
    if (document.getElementById('checkout-form')) initCheckout();
    
    // Global Listeners
    const cartTrigger = document.querySelector('.cart-trigger');
    if (cartTrigger) cartTrigger.addEventListener('click', toggleCart);

    const closeCart = document.querySelector('.close-cart');
    if (closeCart) closeCart.addEventListener('click', toggleCart);

    const bunBtn = document.querySelector('.bun-button');
    if (bunBtn) bunBtn.addEventListener('click', toggleMobileMenu);
    
    // Search & Loader
    if(document.querySelector('.search-trigger')) {
        document.querySelector('.search-trigger').addEventListener('click', toggleSearch);
    }
    initLoader();
    initParallax();
    initHorizontalScroll();
    initSearchLogic();
    
    // Social Proof Popup
    setInterval(showSocialProof, 20000);
});

// --- 5. Core Functions ---

function toggleCart() {
    cartDrawer.classList.toggle('open');
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    const bunBtn = document.querySelector('.bun-button');
    if (bunBtn) bunBtn.classList.toggle('active');
}

function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    overlay.classList.toggle('active');
    if(overlay.classList.contains('active')) setTimeout(() => input.focus(), 100);
}

function initLoader() {
    const loader = document.getElementById('loader');
    if(loader) {
        setTimeout(() => {
            loader.style.transform = 'translateY(-100%)';
        }, 1500);
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product.status === 'sold-out') return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    if (!cartDrawer.classList.contains('open')) toggleCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('fluxCart', JSON.stringify(cart));
}

function updateCartUI() {
    if (cartCount) cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartItemsContainer) cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        if (cartItemsContainer) {
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <img src="${item.imgFront}" alt="${item.name}">
                <div>
                    <h4>${item.name} ${item.size ? `(${item.size})` : ''}</h4>
                    <p>Rs. ${item.price.toLocaleString()}</p>
                    <div style="margin-top:5px; font-size:0.8rem;">
                        Qty: ${item.quantity} 
                        <span onclick="removeFromCart(${index})" style="color:var(--accent-red); margin-left:10px; cursor:pointer;">Remove</span>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        }
    });

    if (subtotalEl) subtotalEl.innerText = `Rs. ${subtotal.toLocaleString()}`;
    if (grandTotalEl) grandTotalEl.innerText = `Rs. ${(subtotal + 250).toLocaleString()}`;
}

// --- 6. Rendering Logic ---

function createProductCard(p) {
    const badge = p.status === 'sold-out' ? '<div class="badge sold-out">Sold Out</div>' : 
                  p.status === 'sale' ? '<div class="badge">Sale</div>' : '';
    
    const scarcity = (p.status !== 'sold-out' && Math.random() > 0.7) 
        ? `<div style="color:var(--accent-red); font-size:0.7rem; margin-top:5px;">Only 3 left!</div>` : '';

    const btnAction = p.status === 'sold-out' ? 'disabled style="opacity:0.5; cursor:not-allowed"' : `onclick="addToCart(${p.id})"`;
    const btnText = p.status === 'sold-out' ? 'Sold Out' : 'Add to Cart';

    return `
        <article class="product-card">
            ${badge}
            <div class="img-wrapper" onclick="window.location.href='product.html?id=${p.id}'" style="cursor:pointer">
                <img src="${p.imgFront}" class="img-front" alt="${p.name}" loading="lazy">
                <img src="${p.imgBack}" class="img-back" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div>
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-price">
                        ${p.oldPrice ? `<span class="old-price">Rs. ${p.oldPrice}</span>` : ''}
                        <span class="sale-price">Rs. ${p.price}</span>
                    </p>
                    ${scarcity}
                </div>
                <button ${btnAction} style="background:transparent; border:1px solid white; color:white; padding:5px 10px; font-size:0.8rem;">
                    ${btnText}
                </button>
            </div>
        </article>
    `;
}

function renderShop() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => createProductCard(p)).join('');
}

function renderFeatured() {
    const grid = document.getElementById('horizontal-grid');
    if (!grid) return;
    // Render products for horizontal scroll
    grid.innerHTML = products.map(p => createProductCard(p)).join('');
}

// --- 7. Checkout Logic ---

function initCheckout() {
    const codBtn = document.getElementById('pay-cod');
    const bankBtn = document.getElementById('pay-bank');
    const bankDetails = document.querySelector('.bank-details');
    let paymentMethod = 'COD';

    codBtn.addEventListener('click', () => {
        paymentMethod = 'COD';
        codBtn.classList.add('active');
        bankBtn.classList.remove('active');
        bankDetails.style.display = 'none';
    });

    bankBtn.addEventListener('click', () => {
        paymentMethod = 'Bank Transfer';
        bankBtn.classList.add('active');
        codBtn.classList.remove('active');
        bankDetails.style.display = 'block';
    });

    // Modal Logic
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('close-modal');
    
    if(closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    document.getElementById('confirm-whatsapp').onclick = () => finalizeOrder('whatsapp', paymentMethod);
    document.getElementById('confirm-gmail').onclick = () => finalizeOrder('gmail', paymentMethod);
    document.getElementById('confirm-email').onclick = () => finalizeOrder('email', paymentMethod);
}

function finalizeOrder(method, paymentMethod) {
    const name = document.getElementById('c-name').value;
    const address = document.getElementById('c-address').value;
    const city = document.getElementById('c-city').value;
    const phone = document.getElementById('c-phone').value;
    
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal + 250;

    // Clear Cart
    localStorage.removeItem('fluxCart');

    if (method === 'whatsapp') {
        let itemsList = cart.map(i => `- ${i.name} (x${i.quantity})`).join('%0a');
        const message = `*NEW ORDER - ${name}*%0a%0a` +
                        `*Items:*%0a${itemsList}%0a%0a` +
                        `*Total:* Rs. ${total.toLocaleString()}%0a` +
                        `*Payment:* ${paymentMethod}%0a` +
                        `*Address:* ${address}, ${city}%0a` +
                        `*Phone:* ${phone}`;
        window.location.href = `https://wa.me/923101623415?text=${message}`;
    } else if (method === 'gmail') {
        let itemsList = cart.map(i => `- ${i.name} (x${i.quantity})`).join('\n');
        const subject = `New Order: ${name}`;
        const body = `Name: ${name}\nPhone: ${phone}\nAddress: ${address}, ${city}\nPayment: ${paymentMethod}\n\nItems:\n${itemsList}\n\nTotal: Rs. ${total.toLocaleString()}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=1zackysam@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
    } else {
        let itemsList = cart.map(i => `- ${i.name} (x${i.quantity})`).join('\r\n');
        const subject = `New Order: ${name}`;
        const body = `Name: ${name}\r\nPhone: ${phone}\r\nAddress: ${address}, ${city}\r\nPayment: ${paymentMethod}\r\n\r\nItems:\r\n${itemsList}\r\n\r\nTotal: Rs. ${total.toLocaleString()}`;
        window.location.href = `mailto:1zackysam@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
}

// --- 8. Visual Effects ---

function initCursor() {
    const dot = document.createElement('div');
    const outline = document.createElement('div');
    dot.className = 'cursor-dot';
    outline.className = 'cursor-outline';
    document.body.appendChild(dot);
    document.body.appendChild(outline);

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
    
    // Magnetic Effect for specific elements
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // Hover effects for cursor
    document.querySelectorAll('a, button, .product-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            outline.style.backgroundColor = 'rgba(255,255,255,0.1)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.backgroundColor = 'transparent';
        });
    });
}

function initParallax() {
    const bg = document.getElementById('parallaxBg');
    if(bg) {
        window.addEventListener('scroll', () => {
            const scrollVal = window.scrollY;
            bg.style.transform = `translateY(${scrollVal * 0.5}px)`;
        });
    }
    
    // Lenis Smooth Scroll (if available)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
    }
}

function initHorizontalScroll() {
    const section = document.querySelector('.horizontal-scroll-section');
    const wrapper = document.querySelector('.element-wrapper');
    if(!section || !wrapper) return;

    window.addEventListener('scroll', () => {
        const offsetTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Calculate progress based on how far we've scrolled into the section
        let progress = (scrollY - offsetTop) / (sectionHeight - windowHeight);
        
        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        // Calculate max scroll width (Total width - Viewport width)
        const maxScroll = wrapper.scrollWidth - window.innerWidth;
        
        // Apply transform
        wrapper.style.transform = `translateX(${-progress * maxScroll}px)`;
    });
}

function initSearchLogic() {
    const input = document.getElementById('search-input');
    const board = document.querySelector('.search-board');
    
    // Create Results Container
    let resultsContainer = document.querySelector('.search-results-container');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-container';
        board.appendChild(resultsContainer);
    }

    // Input Listener
    if(input) {
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            resultsContainer.innerHTML = '';
            
            if(term.length < 1) return;

            const filtered = products.filter(p => p.name.toLowerCase().includes(term));
            
            if(filtered.length === 0) {
                resultsContainer.innerHTML = '<p style="color:#666; padding:10px;">No products found.</p>';
            } else {
                filtered.forEach(p => {
                    const div = document.createElement('div');
                    div.className = 'search-result-item';
                    div.innerHTML = `
                        <img src="${p.imgFront}" alt="${p.name}">
                        <div>
                            <h4 style="font-size:0.9rem;">${p.name}</h4>
                            <span style="color:var(--accent-red); font-size:0.8rem;">Rs. ${p.price}</span>
                        </div>
                    `;
                    div.onclick = () => window.location.href = 'shop.html'; // Redirect to shop
                    resultsContainer.appendChild(div);
                });
            }
        });
    }

    // Tag Click Listener
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            if(input) {
                input.value = tag.innerText;
                input.dispatchEvent(new Event('input')); // Trigger input event manually
                input.focus();
            }
        });
    });
}

function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput ? emailInput.value : '';
    
    if(!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Construct email to the CUSTOMER
    const subject = "FLUX | Collection Overview & New Arrivals";
    const body = `Welcome to FLUX.\n\nHere is the overview of our latest collection:\n\n` +
                 products.slice(0, 5).map(p => `- ${p.name}: Rs. ${p.price}`).join('\n') +
                 `\n\nShop now at: https://flux-streetwear.com\n\nStay Unknown.`;

    // Open mail client addressed to the customer
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function showSocialProof() {
    const names = ["Ali", "Omar", "Zara", "Bilal", "Sana"];
    const cities = ["Lahore", "Karachi", "Islamabad"];
    const items = ["Echo Crewneck", "FLUX Essential", "Signature Cap"];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    const toaster = document.createElement('div');
    toaster.className = 'toaster';
    toaster.innerHTML = `<span style="color:var(--accent-red)">Just Bought:</span> ${randomName} from ${randomCity} bought ${randomItem}`;
    document.body.appendChild(toaster);

    setTimeout(() => toaster.classList.add('show'), 100);
    setTimeout(() => {
        toaster.classList.remove('show');
        setTimeout(() => toaster.remove(), 500);
    }, 4000);
}

function initProductPage() {
    // 1. Get Product ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    
    // 2. Find Product (Default to first if not found/testing)
    let product = products.find(p => p.id === id);
    if (!product && products.length > 0) product = products[0]; // Fallback

    if (!product) return;

    // 3. Populate Data
    document.getElementById('product-title').innerText = product.name;
    document.getElementById('product-price').innerText = `Rs. ${product.price.toLocaleString()}`;
    
    const oldPriceEl = document.getElementById('product-old-price');
    if (product.oldPrice) {
        oldPriceEl.innerText = `Rs. ${product.oldPrice.toLocaleString()}`;
        oldPriceEl.style.display = 'inline';
    } else {
        oldPriceEl.style.display = 'none';
    }

    document.getElementById('product-description').innerText = 
        `${product.name} - Crafted for the modern silhouette. Heavyweight cotton blend with a premium finish. Designed in Lahore.`;

    // Thumbnails
    const mainImg = document.getElementById('main-product-img');
    const thumbsContainer = document.getElementById('product-thumbnails');

    // Create Scrollable Gallery Container
    const images = [product.imgFront, product.imgBack];
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'main-image-container';
    scrollContainer.id = 'gallery-scroll';

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'main-image-slide';
        scrollContainer.appendChild(img);
    });

    // Replace static image with scroll container
    if (mainImg) mainImg.replaceWith(scrollContainer);

    // Render Thumbnails
    thumbsContainer.innerHTML = images.map((src, index) => `
        <img src="${src}" class="thumb ${index === 0 ? 'active' : ''}" onclick="scrollToImage(${index})">
    `).join('');

    // Sync Scroll with Thumbnails
    scrollContainer.addEventListener('scroll', () => {
        const index = Math.round(scrollContainer.scrollLeft / scrollContainer.clientWidth);
        document.querySelectorAll('.thumb').forEach((t, i) => {
            if (i === index) t.classList.add('active');
            else t.classList.remove('active');
        });
    });

    // Size Selector
    const sizes = document.querySelectorAll('.size-circle');
    let selectedSize = null;
    sizes.forEach(s => {
        s.addEventListener('click', () => {
            sizes.forEach(sz => sz.classList.remove('active'));
            s.classList.add('active');
            selectedSize = s.dataset.size;
        });
    });

    // Quantity
    const qtyInput = document.getElementById('qty-input');
    document.getElementById('qty-minus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if(val > 1) qtyInput.value = val - 1;
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        qtyInput.value = val + 1;
    });

    // Accordions
    const accHeaders = document.querySelectorAll('.accordion-header');
    accHeaders.forEach(h => {
        h.addEventListener('click', () => {
            const content = h.nextElementSibling;
            const icon = h.querySelector('span');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.innerText = '+';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.innerText = '-';
            }
        });
    });

    // Add to Cart
    const addToCartHandler = (isBuyNow) => {
        if(!selectedSize) { alert('Please select a size.'); return; }
        const qty = parseInt(qtyInput.value);
        const cartItem = {
            ...product,
            size: selectedSize, quantity: qty
        };
        
        const existingItem = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
        if (existingItem) existingItem.quantity += qty;
        else cart.push(cartItem);
        
        saveCart();
        updateCartUI();
        if(isBuyNow) window.location.href = 'checkout.html';
        else toggleCart();
    };

    document.querySelector('.add-cart-btn').addEventListener('click', () => addToCartHandler(false));
    document.querySelector('.buy-now-btn').addEventListener('click', () => addToCartHandler(true));

    // Related Products (Dynamic)
    const relatedGrid = document.getElementById('related-products-grid');
    if (relatedGrid) {
        // Get 3 random products excluding current
        const related = products.filter(p => p.id !== product.id)
                                .sort(() => 0.5 - Math.random())
                                .slice(0, 3);
        
        relatedGrid.innerHTML = related.map(p => `
             <article class="product-card">
                <div class="img-wrapper" style="aspect-ratio: 3/4; cursor:pointer;" onclick="window.location.href='product.html?id=${p.id}'">
                    <img src="${p.imgFront}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="margin-top: 10px;">
                    <h4 style="font-size: 0.9rem;">${p.name}</h4>
                    <span style="color: var(--accent-gold); font-size: 0.8rem;">Rs. ${p.price.toLocaleString()}</span>
                </div>
            </article>
        `).join('');
    }
}

function scrollToImage(index) {
    const container = document.getElementById('gallery-scroll');
    if (container) {
        container.scrollTo({
            left: container.clientWidth * index,
            behavior: 'smooth'
        });
    }
}
