import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35])

  return (
    <section className="hero" id="top" ref={ref} aria-label="Velour by Elena">
      <motion.div className="hero__atmosphere" style={{ y }} aria-hidden>
        <img
          className="hero__cover-bg"
          src="/images/demise-cover.png"
          alt=""
          width={1200}
          height={1800}
        />
      </motion.div>
      <div className="hero__veil" aria-hidden />

      <motion.div className="hero__content" style={{ opacity }}>
        <motion.div
          className="hero__brand"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="hero__mark">Velour</h1>
          <p className="hero__by">By Elena</p>
        </motion.div>

        <motion.div
          className="hero__rule"
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.7 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="hero__line"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Demise — a dark literary series where time runs out in gold and shadow.
        </motion.p>

        <motion.a
          className="hero__cta"
          href="#shop"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__cta-dot" aria-hidden />
          Shop Book I — Coming soon
        </motion.a>
      </motion.div>

      <p className="hero__scroll" aria-hidden>
        Scroll
      </p>
    </section>
  )
}
