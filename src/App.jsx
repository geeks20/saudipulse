import { useState } from 'react'
import { useGeo } from './useGeo.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Traits from './components/Traits.jsx'
import Regions from './components/Regions.jsx'
import Moments from './components/Moments.jsx'
import NowStats from './components/NowStats.jsx'
import Pulse from './components/Pulse.jsx'
import Heritage from './components/Heritage.jsx'
import StoryBuilder from './components/StoryBuilder.jsx'
import Stories from './components/Stories.jsx'
import AskSaudi from './components/AskSaudi.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [lang, setLang] = useState('ar')
  const geo = useGeo()

  return (
    <div dir="rtl">
      <Nav lang={lang} onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')} />
      <Hero geo={geo} />
      <Traits lang={lang} />
      <Regions geo={geo} lang={lang} />
      <Moments lang={lang} />
      <NowStats />
      <Pulse geo={geo} />
      <Heritage />
      <StoryBuilder />
      <Stories />
      <AskSaudi />
      <Footer />
    </div>
  )
}
