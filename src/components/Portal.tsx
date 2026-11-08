import { motion } from 'framer-motion'
import { useState } from 'react'

const sections = [
  {
    id: 'characters',
    num: '01',
    title: 'Characters',
    blurb:
      'An archive of the characters — their backgrounds, identities, relationships, and eventual fates.',
  },
  {
    id: 'poetry',
    num: '02',
    title: 'Poetry',
    blurb: 'A collection of poems featured throughout the books.',
  },
  {
    id: 'lexicon',
    num: '03',
    title: 'Lexicon',
    blurb:
      'Invented words, ancient terminology, expressions, and definitions from the Demise universe.',
  },
  {
    id: 'atlas',
    num: '04',
    title: 'Atlas',
    blurb: 'Maps, kingdoms, territories, landmarks, and important locations.',
  },
] as const

type SectionId = (typeof sections)[number]['id']

export function Portal() {
  const [active, setActive] = useState<SectionId>('poetry')
  const current = sections.find((s) => s.id === active)!

  return (
    <section className="portal" id="portal" aria-labelledby="portal-title">
      <div className="portal__intro">
        <p className="eyebrow">The Riven</p>
        <h2 className="section-title" id="portal-title">
          Enter
        </h2>
        <p className="lede">
          Four paths around the circle — characters, poetry, lexicon, atlas.
          The center never stills.
        </p>
      </div>

      <div className="portal__stage" aria-label="Demise portal">
        {/* Outer gloom */}
        <div className="portal__gloom" aria-hidden />

        {/* Reaper — left */}
        <div className="portal__reaper" aria-hidden>
          <img
            src="/images/portal/reaper-smoke.png"
            alt=""
            className="portal__reaper-img"
          />
          <img
            src="/images/portal/reaper-silhouette.png"
            alt=""
            className="portal__reaper-under"
          />
          <span className="portal__eye portal__eye--l" />
          <span className="portal__eye portal__eye--r" />
        </div>

        {/* Crow — upper right */}
        <div className="portal__crow" aria-hidden>
          <img
            src="/images/portal/crow-ink.png"
            alt=""
            className="portal__crow-img portal__crow-img--ink"
          />
          <img
            src="/images/portal/crow-flight.png"
            alt=""
            className="portal__crow-img portal__crow-img--flight"
          />
          <span className="portal__crow-eye" />
          <span className="portal__feather portal__feather--1" />
          <span className="portal__feather portal__feather--2" />
          <span className="portal__feather portal__feather--3" />
          <span className="portal__feather portal__feather--4" />
        </div>

        {/* Scythe wrapping the ring */}
        <div className="portal__scythe" aria-hidden>
          <img src="/images/portal/scythe.png" alt="" />
        </div>

        {/* The ring + center */}
        <div className="portal__ring">
          <div className="portal__ring-metal" aria-hidden />
          <div className="portal__center" aria-hidden>
            <img
              className="portal__center-frame portal__center-frame--a"
              src="/images/portal/center-orb.png"
              alt=""
            />
            <img
              className="portal__center-frame portal__center-frame--b"
              src="/images/portal/center-wings-a.png"
              alt=""
            />
            <img
              className="portal__center-frame portal__center-frame--c"
              src="/images/portal/center-wings-b.png"
              alt=""
            />
            <div className="portal__center-veil" />
          </div>

          {/* Four nodes */}
          {sections.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`portal__node portal__node--${i + 1}${active === s.id ? ' is-active' : ''}`}
              onClick={() => setActive(s.id)}
              aria-pressed={active === s.id}
            >
              <span className="portal__node-num">{s.num}</span>
              <span className="portal__node-title">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={active}
        className="portal__panel"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="portal__panel-num">{current.num}</p>
        <h3 className="portal__panel-title">{current.title}</h3>
        <p className="portal__panel-blurb">{current.blurb}</p>
        <p className="portal__panel-note">Archive pages coming — this portal is the door.</p>
      </motion.div>
    </section>
  )
}
