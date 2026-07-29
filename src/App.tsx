import { useState } from 'react'
import {
  ArrowRight, Building2, Check, ChevronDown, Leaf, Menu, Minus,
  PackageCheck, Plus, Search, ShoppingBag, Sparkles, Sprout, Truck,
  UserRound, X,
} from 'lucide-react'
import './App.css'

type Product = {
  id: number
  name: string
  category: string
  unit: string
  price: number
  image: string
  badge?: string
}

const products: Product[] = [
  { id: 1, name: 'Tomate pera', category: 'Verduras', unit: '1 kilo', price: 2790, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85', badge: 'De temporada' },
  { id: 2, name: 'Paltas Hass', category: 'Frutas', unit: '1 kilo', price: 4990, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=85', badge: 'Favorito' },
  { id: 3, name: 'Mix verde', category: 'Listos para ti', unit: '100 gramos', price: 900, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85', badge: 'Práctico' },
  { id: 4, name: 'Limón sutil', category: 'Frutas', unit: '500 gramos', price: 1790, image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=700&q=85' },
  { id: 5, name: 'Papas chilotas', category: 'Verduras', unit: '500 gramos', price: 2450, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=85' },
  { id: 6, name: 'Manzana Fuji', category: 'Frutas', unit: '1 kilo', price: 2490, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=700&q=85', badge: 'Crujiente' },
]

const categories = ['Todo', 'Frutas', 'Verduras', 'Listos para ti']
const currency = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })

function App() {
  const [category, setCategory] = useState('Todo')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [businessOpen, setBusinessOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const filteredProducts = category === 'Todo' ? products : products.filter((product) => product.category === category)
  const cartItems = products.filter((product) => cart[product.id])
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  const total = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)

  const updateCart = (id: number, difference: number) => {
    setCart((current) => {
      const quantity = Math.max(0, (current[id] ?? 0) + difference)
      const next = { ...current }
      if (quantity === 0) delete next[id]
      else next[id] = quantity
      return next
    })
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span><Truck size={15} /> Despacho gratis en compras desde $35.000</span>
        <button onClick={() => setBusinessOpen(true)}>¿Compras para tu negocio? <ArrowRight size={14} /></button>
      </div>

      <header className="header">
        <button className="menu-button icon-button" aria-label="Abrir menú" onClick={() => setMenuOpen(true)}><Menu /></button>
        <button className="brand" onClick={() => scrollTo('inicio')} aria-label="Ir al inicio">
          <span className="brand-mark"><Leaf /></span><span>raco<span>frut</span></span>
        </button>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <button onClick={() => scrollTo('catalogo')}>Productos</button>
          <button onClick={() => scrollTo('temporada')}>Temporada</button>
          <button onClick={() => scrollTo('como-funciona')}>Cómo funciona</button>
          <button className="business-link" onClick={() => setBusinessOpen(true)}>Empresas <Building2 size={16} /></button>
        </nav>
        <div className="header-actions">
          <button className="icon-button desktop-only" aria-label="Buscar"><Search /></button>
          <button className="icon-button desktop-only" aria-label="Mi cuenta"><UserRound /></button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Carrito, ${itemCount} productos`}><ShoppingBag /><span>Carrito</span><b>{itemCount}</b></button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow"><span /> Del campo a tu mesa</div>
            <h1>Frescura que<br />se nota.</h1>
            <p>Frutas y verduras seleccionadas cada mañana. Recíbelas frescas, sin filas y en el momento que te acomode.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollTo('catalogo')}>Comprar ahora <ArrowRight /></button>
              <button className="secondary-button" onClick={() => setBusinessOpen(true)}><Building2 /> Soluciones para empresas</button>
            </div>
            <div className="hero-proof"><div className="avatars"><span>MF</span><span>JC</span><span>+2k</span></div><p><strong>4.9/5</strong> por hogares y cocinas de Santiago</p></div>
          </div>
          <div className="season-note"><Sparkles /><div><small>RECIÉN LLEGADO</small><strong>Cosecha de invierno</strong></div><button onClick={() => scrollTo('catalogo')} aria-label="Ver cosecha"><ArrowRight /></button></div>
        </section>

        <section className="trust-strip" aria-label="Beneficios">
          <div><Sprout /><span><strong>Selección diaria</strong>Calidad que puedes ver</span></div>
          <div><Truck /><span><strong>Entrega 24/48 h</strong>En todo Santiago</span></div>
          <div><PackageCheck /><span><strong>Compra segura</strong>Pago protegido</span></div>
        </section>

        <section className="catalog-section" id="catalogo">
          <div className="section-heading"><div><span className="kicker">ELIGE LO MEJOR</span><h2>Favoritos de la semana</h2></div><a href="https://racofrut.cl/" target="_blank" rel="noreferrer">Ver catálogo completo <ArrowRight /></a></div>
          <div className="filter-row" role="tablist" aria-label="Filtrar productos">
            {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap"><img src={product.image} alt={product.name} />{product.badge && <span className="product-badge">{product.badge}</span>}<button className="quick-add" onClick={() => updateCart(product.id, 1)} aria-label={`Agregar ${product.name}`}><Plus /></button></div>
                <div className="product-meta"><span>{product.category}</span><span>Origen nacional</span></div>
                <h3>{product.name}</h3>
                <div className="product-footer"><p><strong>{currency.format(product.price)}</strong><small> / {product.unit}</small></p>
                  {cart[product.id] ? <div className="quantity-control"><button onClick={() => updateCart(product.id, -1)}><Minus /></button><span>{cart[product.id]}</span><button onClick={() => updateCart(product.id, 1)}><Plus /></button></div> : <button onClick={() => updateCart(product.id, 1)}>Agregar</button>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="season-section" id="temporada">
          <div className="season-image" />
          <div className="season-copy"><span className="kicker light">COSECHA CONSCIENTE</span><h2>Comer mejor empieza por elegir mejor.</h2><p>Trabajamos con productores y proveedores locales para que recibas alimentos frescos, trazables y con menos vueltas en el camino.</p><div className="impact-grid"><div><strong>+120</strong><span>productos frescos</span></div><div><strong>24/48 h</strong><span>del pedido a tu mesa</span></div><div><strong>100%</strong><span>calidad garantizada</span></div></div><button className="text-button" onClick={() => scrollTo('catalogo')}>Conoce nuestra selección <ArrowRight /></button></div>
        </section>

        <section className="steps-section" id="como-funciona">
          <div className="section-heading centered"><div><span className="kicker">SIMPLE Y FRESCO</span><h2>Tu mercado, sin complicaciones</h2></div></div>
          <div className="steps-grid"><article><span>01</span><ShoppingBag /><h3>Elige tus favoritos</h3><p>Compra por unidad, kilo o arma tu pedido semanal.</p></article><article><span>02</span><Leaf /><h3>Nosotros seleccionamos</h3><p>Revisamos cada producto antes de preparar tu caja.</p></article><article><span>03</span><Truck /><h3>Recibe y disfruta</h3><p>Elige tu franja de entrega y recibe todo fresco.</p></article></div>
        </section>

        <section className="business-banner"><div><span className="kicker light">RACOFRUT EMPRESAS</span><h2>Tu cocina no puede esperar.</h2><p>Abastecimiento confiable para restaurantes, hoteles, oficinas y comercios. Precios por volumen, facturación y atención dedicada.</p></div><button onClick={() => setBusinessOpen(true)}>Solicitar cotización <ArrowRight /></button></section>
      </main>

      <footer>
        <div className="footer-main"><div className="footer-brand"><div className="brand"><span className="brand-mark"><Leaf /></span><span>raco<span>frut</span></span></div><p>Lo fresco nos mueve.<br />Santiago, Chile.</p></div><div><strong>Comprar</strong><button onClick={() => scrollTo('catalogo')}>Frutas</button><button onClick={() => scrollTo('catalogo')}>Verduras</button><button onClick={() => scrollTo('catalogo')}>Ofertas</button></div><div><strong>Ayuda</strong><a href="mailto:pedidos@racofrut.cl">Contacto</a><a href="tel:+56961137832">+56 9 6113 7832</a><span>Preguntas frecuentes</span></div><div className="newsletter"><strong>Una dosis de frescura</strong><p>Ofertas de temporada y novedades directo a tu correo.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="tu@email.cl" aria-label="Correo electrónico" /><button aria-label="Suscribirme"><ArrowRight /></button></form></div></div>
        <div className="footer-bottom"><span>© 2026 Racofrut</span><span>Privacidad · Términos</span></div>
      </footer>

      {menuOpen && <div className="mobile-panel overlay-panel"><button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X /></button><div className="brand"><span className="brand-mark"><Leaf /></span><span>raco<span>frut</span></span></div><nav><button onClick={() => scrollTo('catalogo')}>Productos</button><button onClick={() => scrollTo('temporada')}>Temporada</button><button onClick={() => scrollTo('como-funciona')}>Cómo funciona</button><button onClick={() => { setMenuOpen(false); setBusinessOpen(true) }}>Empresas</button></nav></div>}

      {cartOpen && <><button className="modal-backdrop" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito" /><aside className="cart-drawer"><div className="drawer-header"><div><span>Tu compra</span><h2>Carrito <small>{itemCount} productos</small></h2></div><button className="close-button" onClick={() => setCartOpen(false)}><X /></button></div><div className="cart-content">{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag /><h3>Tu bolsa está vacía</h3><p>Agrega productos frescos y vuelve por aquí.</p><button className="primary-button" onClick={() => { setCartOpen(false); scrollTo('catalogo') }}>Explorar productos</button></div> : cartItems.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div><h3>{product.name}</h3><span>{product.unit}</span><strong>{currency.format(product.price * cart[product.id])}</strong></div><div className="quantity-control"><button onClick={() => updateCart(product.id, -1)}><Minus /></button><span>{cart[product.id]}</span><button onClick={() => updateCart(product.id, 1)}><Plus /></button></div></div>)}</div>{cartItems.length > 0 && <div className="cart-summary"><div><span>Subtotal</span><strong>{currency.format(total)}</strong></div><small>Despacho calculado al finalizar la compra</small><button className="primary-button">Continuar compra <ArrowRight /></button></div>}</aside></>}

      {businessOpen && <><button className="modal-backdrop" onClick={() => setBusinessOpen(false)} aria-label="Cerrar formulario" /><div className="business-modal" role="dialog" aria-modal="true" aria-labelledby="business-title"><button className="close-button" onClick={() => setBusinessOpen(false)}><X /></button>{submitted ? <div className="success-state"><span><Check /></span><h2>Recibimos tu solicitud</h2><p>Un ejecutivo se pondrá en contacto contigo durante el próximo día hábil.</p><button className="primary-button" onClick={() => { setSubmitted(false); setBusinessOpen(false) }}>Listo</button></div> : <><span className="kicker">RACOFRUT EMPRESAS</span><h2 id="business-title">Hablemos de tu abastecimiento.</h2><p>Cuéntanos lo esencial. Prepararemos una propuesta a la medida de tu operación.</p><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label>Nombre y empresa<input required placeholder="Ej. Daniela · Café Central" /></label><label>Correo corporativo<input required type="email" placeholder="nombre@empresa.cl" /></label><label>Tipo de negocio<select defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Restaurant o cafetería</option><option>Hotel</option><option>Oficina</option><option>Comercio</option><option>Otro</option></select><ChevronDown /></label><label>¿Qué necesitas?<textarea required placeholder="Volumen aproximado, frecuencia y productos clave" /></label><button className="primary-button" type="submit">Solicitar contacto <ArrowRight /></button></form></>}</div></>}
    </div>
  )
}

export default App