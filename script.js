const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
const cart=JSON.parse(localStorage.getItem('naz_cart')||'[]');
function saveCart(){localStorage.setItem('naz_cart',JSON.stringify(cart));updateCount();}
function updateCount(){const el=$('#cartCount');if(el)el.textContent=cart.reduce((a,b)=>a+b.qty,0)}
function addToCart(id){const ex=cart.find(i=>i.id===id);if(ex)ex.qty++;else cart.push({id,qty:1});saveCart();alert('Added to cart');}
function removeFromCart(id){const i=cart.findIndex(x=>x.id===id);if(i>-1){cart.splice(i,1);saveCart();renderCart();}}
function card(p){return `<article class='card'><img src='${p.img}' alt='${p.name}'><h3>${p.name}</h3><p>${p.desc}</p><p class='price'>$${p.price}</p><a class='btn' href='product.html?id=${p.id}'>View</a> <button class='btn' onclick='addToCart(${p.id})'>Add to Cart</button></article>`}
function initHome(){const fg=$('#featuredGrid');if(fg)fg.innerHTML=PRODUCTS.slice(0,6).map(card).join('');const cg=$('#categoryGrid');if(cg){cg.innerHTML=[...new Set(PRODUCTS.map(p=>p.category))].map(c=>`<div class='cat'>${c}</div>`).join('')}}
function initShop(){const grid=$('#shopGrid');if(!grid)return;const filter=$('#categoryFilter');const cats=[...new Set(PRODUCTS.map(p=>p.category))];cats.forEach(c=>filter.innerHTML+=`<option value='${c}'>${c}</option>`);
const render=()=>{const q=$('#searchInput').value.toLowerCase();const c=filter.value;grid.innerHTML=PRODUCTS.filter(p=>(c==='all'||p.category===c)&&p.name.toLowerCase().includes(q)).map(card).join('')};$('#searchInput').oninput=render;filter.onchange=render;render();}
function initProduct(){const box=$('#productDetails');if(!box)return;const id=Number(new URLSearchParams(location.search).get('id'));const p=PRODUCTS.find(x=>x.id===id);if(!p)return;box.innerHTML=`<div class='product-grid'><img src='${p.img}' alt='${p.name}' style='width:100%;max-width:500px;border-radius:12px'><div><h1>${p.name}</h1><p>${p.desc}</p><p class='price'>$${p.price}</p><button class='btn' onclick='addToCart(${p.id})'>Add to Cart</button></div></div>`}
function renderCart(){const box=$('#cartItems');if(!box)return;let total=0;box.innerHTML=cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);const sub=p.price*i.qty;total+=sub;return `<div class='card'><h3>${p.name}</h3><p>Qty: ${i.qty}</p><p class='price'>$${sub}</p><button class='btn' onclick='removeFromCart(${p.id})'>Remove</button></div>`}).join('')||'<p>Your cart is empty.</p>';const t=$('#cartTotal');if(t)t.textContent=`Total: $${total}`;}
function initCheckout(){const f=$('#checkoutForm');if(!f)return;f.onsubmit=e=>{e.preventDefault();$('#checkoutMsg').textContent='Order placed successfully!';cart.length=0;saveCart();renderCart();f.reset();}}
function initNav(){const m=$('#menuToggle'),n=$('#navLinks');if(m&&n)m.onclick=()=>n.classList.toggle('show')}
updateCount();initNav();initHome();initShop();initProduct();renderCart();initCheckout();
