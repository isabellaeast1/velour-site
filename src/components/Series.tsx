import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
}

export function Series() {
  return (
    <section className="series" id="series" aria-labelledby="series-title">
      <div className="series__header">
        <p className="eyebrow">The series</p>
        <h2 className="section-title" id="series-title">
          Demise
        </h2>
        <p className="lede">
          An ebook series of ruin, reckoning, and the quiet violence of time.
          Book I opens the hourglass.
        </p>
      </div>

      <div className="series__feature">
        <motion.figure className="cover" {...fadeUp}>
          <img
            className="cover__image"
            src="/images/demise-cover.png"
            alt="Demise Book I cover — an ornate bronze hourglass holding a face in falling sand above a dark voyage"
            width={720}
            height={1080}
          />
        </motion.figure>

        <motion.div
          className="series__copy"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.12 }}
        >
          <p className="series__book-label">Book I · Ebook</p>
          <h3 className="series__book-title">Demise</h3>
          <p className="series__meta">By Elena · Velour</p>
          <p className="lede">
            Cover art locked. Interior manuscript and final ebook production
            follow. Until then, this is the face of Book I — dark gothic
            hourglass, antique gold, and the long fall of sand.
          </p>
          <a className="hero__cta" href="#shop">
            <span className="hero__cta-dot" aria-hidden />
            Coming soon
          </a>
        </motion.div>
      </div>

      <div className="series__teases" aria-label="Later books">
        <div className="tease">
          <span className="tease__num">II</span>
          <span className="tease__title">Untitled</span>
          <span className="tease__status">Coming</span>
        </div>
        <div className="tease">
          <span className="tease__num">III</span>
          <span className="tease__title">Untitled</span>
          <span className="tease__status">Coming</span>
        </div>
      </div>
    </section>
  )
}
