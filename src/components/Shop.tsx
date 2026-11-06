import { motion } from 'framer-motion'

export function Shop() {
  return (
    <section className="shop" id="shop" aria-labelledby="shop-title">
      <div className="shop__inner">
        <div>
          <p className="eyebrow">Shop</p>
          <h2 className="section-title" id="shop-title">
            Book I
          </h2>
        </div>

        <motion.div
          className="shop__panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="shop__cover"
            src="/images/demise-cover.png"
            alt="Demise Book I cover"
            width={320}
            height={480}
          />
          <h3 className="shop__product">Demise</h3>
          <p className="shop__detail">
            Ebook · Book I of the Demise series. Checkout is not open yet —
            sales will launch here when the file is ready.
          </p>
          <p className="shop__price">Price TBA</p>
          <button type="button" className="shop__cta" disabled aria-disabled="true">
            Coming soon
          </button>
          <p className="shop__note">No payment link yet — placeholder only.</p>
        </motion.div>
      </div>
    </section>
  )
}
