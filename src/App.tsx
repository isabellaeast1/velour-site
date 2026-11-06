import './App.css'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Poem } from './components/Poem'
import { Series } from './components/Series'
import { Shop } from './components/Shop'

export default function App() {
  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Series />
        <Poem />
        <Shop />
        <About />
      </main>
      <Footer />
    </div>
  )
}
