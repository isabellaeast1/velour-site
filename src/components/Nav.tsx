import { useEffect, useState } from 'react'

const links = [
  { href: '#top', label: 'Home' },
  { href: '#series', label: 'Series' },
  { href: '#poem', label: 'Poem' },
  { href: '#shop', label: 'Shop' },
  { href: '#about', label: 'About' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="#top" onClick={close}>
            <span className="nav__mark">Velour</span>
            <span className="nav__by">By Elena</span>
          </a>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="nav__cta" href="#shop">
            Coming soon
          </a>

          <button
            type="button"
            className={`nav__menu-btn${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`nav__drawer${open ? ' is-open' : ''}`}
        hidden={!open}
      >
        <ul className="nav__drawer-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#shop" onClick={close}>
              Coming soon
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
