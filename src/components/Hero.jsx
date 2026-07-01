import { useRef, useState, useEffect, useCallback } from 'react'

const VIDEOS = [
  '/assets/1st.mp4',
  '/assets/2nd.mp4',
  '/assets/3rd.mp4',
  '/assets/4th.mp4',
  '/assets/5th.mp4',
  '/assets/6th.mp4',
]

const MOBILE_VIDEOS = [
  '/assets/mobile-hero-vids/grok-video-091cadd7-f84e-4c7a-b3cf-89df685e4016.mp4',
  '/assets/mobile-hero-vids/grok-video-38e99800-6d8f-4a63-bd3d-55703ae5722d.mp4',
  '/assets/mobile-hero-vids/grok-video-38e99800-6d8f-4a63-bd3d-55703ae5722d (3).mp4',
  '/assets/mobile-hero-vids/grok-video-38e99800-6d8f-4a63-bd3d-55703ae5722d (1).mp4',
]

export default function Hero() {
  const [activeSlot, setActiveSlot] = useState(0)
  const [vidIdx, setVidIdx] = useState(0)
  const videoRefs = [useRef(null), useRef(null)]
  const [ready, setReady] = useState([false, false])

  const slotSrc = (slot) =>
    slot === activeSlot
      ? VIDEOS[vidIdx]
      : VIDEOS[(vidIdx + 1) % VIDEOS.length]

  const slotMobileSrc = (slot) =>
    slot === activeSlot
      ? MOBILE_VIDEOS[vidIdx % MOBILE_VIDEOS.length]
      : MOBILE_VIDEOS[(vidIdx + 1) % MOBILE_VIDEOS.length]

  const playVideo = useCallback((slot) => {
    videoRefs[slot]?.current?.play().catch(() => {})
  }, [])

  useEffect(() => {
    if (ready[0]) playVideo(0)
  }, [ready[0], playVideo])

  const handleEnded = useCallback(() => {
    const nextVid = (vidIdx + 1) % VIDEOS.length
    const nextSlot = activeSlot === 0 ? 1 : 0
    playVideo(nextSlot)
    setActiveSlot(nextSlot)
    setVidIdx(nextVid)
  }, [activeSlot, vidIdx, playVideo])

  useEffect(() => {
    const v = videoRefs[activeSlot]?.current
    if (v) {
      v.addEventListener('ended', handleEnded)
      return () => v.removeEventListener('ended', handleEnded)
    }
  }, [activeSlot, handleEnded])

  const handleCanPlay = (slot) => {
    setReady((prev) => {
      if (prev[slot]) return prev
      const next = [...prev]
      next[slot] = true
      return next
    })
  }

  return (
    <section className="hero" id="home">
      <div className="hero-videos">
        {[0, 1].map((slot) => (
          <video
            key={slotSrc(slot)}
            ref={videoRefs[slot]}
            className={`hero-video-bg${slot === activeSlot ? ' active' : ''}`}
            muted
            loop={false}
            playsInline
            preload="auto"
            onCanPlay={() => handleCanPlay(slot)}
          >
            <source media="(max-width: 768px)" src={slotMobileSrc(slot)} type="video/mp4" />
            <source src={slotSrc(slot)} type="video/mp4" />
          </video>
        ))}
      </div>
      <div className="hero-overlay" />
    </section>
  )
}
