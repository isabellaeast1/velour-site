import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

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

const CENTER_FRAMES = [
  '/images/portal/center-orb.png',
  '/images/portal/center-wings-a.png',
  '/images/portal/center-wings-b.png',
]

/** Liquid warp through frames: blur dissolve + soft scale — not a hard cut. */
function WarpCenter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let dead = false
    const images: HTMLImageElement[] = []
    let loaded = 0

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const box = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(box.width * dpr))
      canvas.height = Math.max(1, Math.floor(box.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    size()
    const onResize = () => size()
    window.addEventListener('resize', onResize)

    CENTER_FRAMES.forEach((src, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        loaded += 1
        if (loaded === CENTER_FRAMES.length && !dead) raf = requestAnimationFrame(tick)
      }
      img.src = src
      images[i] = img
    })

    const HOLD = 5600
    const WARP = 2600
    const SEGMENT = HOLD + WARP
    const start = performance.now()

    const drawCover = (img: HTMLImageElement, w: number, h: number, scale = 1) => {
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      if (!iw || !ih) return
      const cover = Math.max(w / iw, h / ih) * scale
      const dw = iw * cover
      const dh = ih * cover
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    }

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    const tick = (now: number) => {
      if (dead) return
      const box = canvas.getBoundingClientRect()
      const w = box.width
      const h = box.height
      ctx.clearRect(0, 0, w, h)

      const elapsed = (now - start) % (SEGMENT * CENTER_FRAMES.length)
      const idx = Math.floor(elapsed / SEGMENT) % CENTER_FRAMES.length
      const next = (idx + 1) % CENTER_FRAMES.length
      const local = elapsed % SEGMENT

      const a = images[idx]
      const b = images[next]

      if (local < HOLD) {
        const breathe = 1 + Math.sin((local / HOLD) * Math.PI * 2) * 0.012
        drawCover(a, w, h, 1.08 * breathe)
      } else {
        const t = easeInOut((local - HOLD) / WARP)
        const blur = Math.sin(t * Math.PI) * 20
        const scaleA = 1.08 + t * 0.1
        const scaleB = 1.18 - t * 0.1

        ctx.filter = `blur(${blur * (1 - t)}px) brightness(${1 - t * 0.1})`
        ctx.globalAlpha = 1 - t
        drawCover(a, w, h, scaleA)

        ctx.filter = `blur(${blur * t}px) brightness(${0.9 + t * 0.1})`
        ctx.globalAlpha = t
        drawCover(b, w, h, scaleB)

        ctx.filter = 'none'
        ctx.globalAlpha = 1

        const wash = Math.sin(t * Math.PI) * 0.28
        if (wash > 0.01) {
          const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.48)
          g.addColorStop(0, `rgba(245,225,190,${wash})`)
          g.addColorStop(0.4, `rgba(180,140,90,${wash * 0.3})`)
          g.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = g
          ctx.fillRect(0, 0, w, h)
        }
      }

      const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.26, w / 2, h / 2, w * 0.52)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.6)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(tick)
    }

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas className="portal__warp" ref={canvasRef} aria-hidden />
}

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
        </p>
      </div>

      <div className="portal__stage" aria-label="Demise portal">
        {/* Unified drawn scene */}
        <svg
          className="portal__scene"
          viewBox="0 0 1000 1000"
          aria-hidden
        >
          <defs>
            <radialGradient id="portalGlow" cx="50%" cy="48%" r="48%">
              <stop offset="0%" stopColor="#16110e" />
              <stop offset="55%" stopColor="#080706" />
              <stop offset="100%" stopColor="#030303" />
            </radialGradient>
            <linearGradient id="bladeFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7a7a7a" />
              <stop offset="45%" stopColor="#e6e6e6" />
              <stop offset="100%" stopColor="#5a5a5a" />
            </linearGradient>
            <filter id="eyeGlow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="1000" height="1000" fill="url(#portalGlow)" />

          {/* Reaper */}
          <g opacity="0.95">
            <path
              fill="#0b0b0b"
              d="M105 740
                C95 650 115 560 155 495
                C180 445 205 405 230 360
                C248 320 265 285 285 255
                C300 230 320 215 345 220
                C365 224 378 245 382 270
                C388 305 380 345 390 385
                C405 440 430 485 450 540
                C468 590 478 655 480 720
                C482 770 470 830 450 885
                C420 940 370 975 320 990
                C280 945 220 880 165 815
                C135 780 112 760 105 740 Z"
            />
            <path
              fill="#050505"
              d="M250 370 C275 320 305 280 335 250
                C310 285 285 330 265 375 Z"
            />
            <ellipse cx="340" cy="262" rx="42" ry="48" fill="#000" />
            <g filter="url(#eyeGlow)">
              <ellipse className="portal__svg-eye" cx="326" cy="265" rx="5" ry="3.2" fill="#f0c040" />
              <ellipse
                className="portal__svg-eye portal__svg-eye--delay"
                cx="352"
                cy="265"
                rx="5"
                ry="3.2"
                fill="#f0c040"
              />
            </g>
            <path
              fill="none"
              stroke="#141414"
              strokeWidth="5"
              opacity="0.55"
              d="M190 560 C150 510 120 470 95 420"
            />
            <path
              fill="none"
              stroke="#101010"
              strokeWidth="4"
              opacity="0.4"
              d="M230 600 C185 555 145 520 110 475"
            />
          </g>

          {/* Crow */}
          <g className="portal__crow-drawn">
            <g className="portal__crow-wing portal__crow-wing--back">
              <path
                fill="#0a0a0a"
                d="M790 235
                  C835 195 900 170 960 168
                  C915 200 870 235 835 280
                  C815 255 795 240 790 235 Z"
              />
            </g>
            <g className="portal__crow-body">
              <path
                fill="#080808"
                d="M730 215
                  C775 195 825 192 865 210
                  C895 224 912 250 915 280
                  C890 262 855 252 820 262
                  C790 270 760 288 742 310
                  C728 280 720 245 730 215 Z"
              />
              <path
                fill="#050505"
                d="M755 268 C740 260 722 265 710 280
                  C728 274 748 272 762 280
                  C762 272 758 268 755 268 Z"
              />
              <path fill="#1c1c1c" d="M710 280 L686 292 L714 286 Z" />
              <circle
                className="portal__svg-eye"
                cx="735"
                cy="272"
                r="3.4"
                fill="#f0c040"
                filter="url(#eyeGlow)"
              />
            </g>
            <g className="portal__crow-wing portal__crow-wing--front">
              <path
                fill="#121212"
                d="M780 255
                  C830 215 895 198 950 208
                  C905 245 860 285 820 320
                  C800 290 785 265 780 255 Z"
              />
            </g>
            <g className="portal__feathers">
              <path className="portal__feather-svg f1" d="M870 320 l3 15 -7 1 z" fill="#1a1a1a" />
              <path className="portal__feather-svg f2" d="M900 350 l2 13 -6 0 z" fill="#141414" />
              <path className="portal__feather-svg f3" d="M840 360 l3 17 -8 0 z" fill="#101010" />
              <path className="portal__feather-svg f4" d="M920 310 l2 12 -5 0 z" fill="#181818" />
            </g>
          </g>

          {/* Scythe — slim, hugging the ring */}
          <g fill="none" strokeLinecap="round">
            <path
              d="M335 805 C300 715 295 625 325 545 C348 490 395 448 455 430"
              stroke="#3f3f3f"
              strokeWidth="6"
            />
            <path
              d="M335 805 C300 715 295 625 325 545 C348 490 395 448 455 430"
              stroke="#9a9a9a"
              strokeWidth="1.75"
              opacity="0.75"
            />
          </g>
          <path
            d="M455 430
              C530 395 615 380 695 392
              C755 402 805 428 842 468
              C805 435 745 405 675 396
              C595 385 520 402 470 435
              C460 442 455 438 455 430 Z"
            fill="url(#bladeFill)"
            opacity="0.9"
          />
          <path
            d="M445 448 C462 430 488 424 512 438 C490 442 468 452 448 460 Z"
            fill="#cfcfcf"
            opacity="0.7"
          />

          {/* Ring */}
          <circle cx="500" cy="500" r="286" fill="none" stroke="#b8955e" strokeWidth="1.1" opacity="0.28" />
          <circle cx="500" cy="500" r="276" fill="none" stroke="#c4a574" strokeWidth="2" opacity="0.75" />
          <circle cx="500" cy="500" r="268" fill="none" stroke="#7a5c32" strokeWidth="1" opacity="0.4" />
        </svg>

        <div className="portal__warp-clip">
          <WarpCenter />
        </div>

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
