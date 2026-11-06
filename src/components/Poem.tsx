import { motion } from 'framer-motion'

const stanzas = [
  [
    'My Moonflower,',
    'Though I am reticent,',
    'Fearful of breaking your prosperous spirit,',
    'The divinities and sluaghs linger nearby,',
    'Invisible to the unaided eye,',
    'They persist, derned in the realm between the departed and the living.',
    'Between Akasha and Tenebris abides the Riven.',
    'Here, Odiths flourish, guiding passing spirits,',
    'Leading them from obscurity to rest.',
    'Though your swevens may seem misplaced, do not falter,',
    'For hesitation shall only estrange you further from this abditory and the truth.',
    'A truth you cannot evade, and one that will not deign to confer nepenthe upon you.',
    'I was bidden to your cessation to procure your soul,',
    'Your spirit was ordained to pass,',
    'Yet it refused its egress.',
  ],
  [
    'Though I represent the dispiteous nature of spirits,',
    'My fealty remains bound to the ordainments of these souls.',
    'While your wraith may be more arduous to abate,',
    'It is still feasible.',
    'So, do not become lost in your pernocations,',
    'For wandering too far could lead you to stumble upon bitter, invidious entities.',
    'As your parastin, I shall keep vigil over you,',
    'But remain chary…',
    'For not all luster is virtuous,',
    'And not all umbrage breeds nefariousness.',
  ],
]

export function Poem() {
  return (
    <section className="poem" id="poem" aria-labelledby="poem-title">
      <div className="poem__layout">
        <motion.figure
          className="poem__art"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/demise-back-art.png"
            alt="Demise back cover art — a crimson orb held by dark, gnarled roots"
            width={588}
            height={585}
          />
        </motion.figure>

        <motion.div
          className="poem__copy"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">From the book</p>
          <h2 className="section-title" id="poem-title">
            My Moonflower
          </h2>
          <p className="poem__credit">Back cover · Demise · Book I</p>

          <div className="poem__body">
            {stanzas.map((stanza, i) => (
              <p
                key={i}
                className={`poem__stanza${i === 0 ? ' poem__stanza--open' : ''}`}
              >
                {stanza.map((line) => (
                  <span key={line} className="poem__line">
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
