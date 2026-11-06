import { motion } from 'framer-motion'

export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <motion.div
        className="about__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">Author</p>
        <h2 className="section-title" id="about-title">
          About Elena
        </h2>
        <p className="about__name">Elena</p>
        <div className="about__body">
          <p>
            Elena writes under the Velour imprint — dark literary fiction
            draped in velvet, bronze, and ruin. <em>Demise</em> is the first
            series: stories that measure what remains when the sand runs out.
          </p>
          <p>Author bio and press details are placeholder until provided.</p>
        </div>
      </motion.div>
    </section>
  )
}
