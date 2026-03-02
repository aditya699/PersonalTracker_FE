import { useEffect, useRef, useState } from 'react'
import './HomePage.css'

function HomePage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [ordered, setOrdered] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let loopTimer: ReturnType<typeof setTimeout>

    function runCycle() {
      // Chaos → order
      timer = setTimeout(() => {
        setOrdered(true)

        // Hold ordered state, then reset to chaos
        loopTimer = setTimeout(() => {
          setOrdered(false)

          // Wait in chaos, then repeat
          loopTimer = setTimeout(runCycle, 3000)
        }, 4000)
      }, 2000)
    }

    runCycle()

    return () => {
      clearTimeout(timer)
      clearTimeout(loopTimer)
    }
  }, [])

  return (
    <main className="home">
      {/* ── Left: Text Content ── */}
      <section className="home__left">
        <div className="home__badge">
          <span className="home__badge-dot" />
          Coming Soon
        </div>

        <h1 className="home__title">
          Modern<span className="home__title-accent">Life</span>Tracker
        </h1>

        <p className="home__tagline">
          Sort your life with the minimal tracker you ever need.
        </p>

        <div className="home__cta">
          <span className="home__cta-line" />
          <span className="home__cta-text">Something beautiful is brewing</span>
        </div>
      </section>

      {/* ── Right: Chaos → Order Animation ── */}
      <section className="home__right">
        <div
          ref={stageRef}
          className={`stage${ordered ? ' is-ordered' : ''}`}
        >
          {/* Card 1 — Todo */}
          <div className="card card--todo card--c1">
            <div className="card__label">Todo</div>
            <div className="card__title">Book flights</div>
            <div className="card__desc">Tokyo trip in March</div>
            <div className="card__status">Planned</div>
          </div>

          {/* Card 2 — Doing */}
          <div className="card card--doing card--c2">
            <div className="card__label">Doing</div>
            <div className="card__title">Morning run</div>
            <div className="card__desc">Week 3 of training</div>
            <div className="card__status">In progress</div>
          </div>

          {/* Card 3 — Testing */}
          <div className="card card--testing card--c3">
            <div className="card__label">Testing</div>
            <div className="card__title">Meal prep</div>
            <div className="card__desc">Try the new recipe</div>
            <div className="card__status">Review</div>
          </div>

          {/* Card 4 — Done */}
          <div className="card card--done card--c4">
            <div className="card__label">Done</div>
            <div className="card__title">Read book</div>
            <div className="card__desc">Atomic Habits ch. 4</div>
            <div className="card__status">Complete</div>
          </div>

          {/* Decorative fragments — visible in chaos, hidden in order */}
          <div className="fragment fragment--line frag--1" />
          <div className="fragment fragment--dot frag--2" />
          <div className="fragment fragment--square frag--3" />
          <div className="fragment fragment--check frag--4" />
          <div className="fragment fragment--line frag--5" />
          <div className="fragment fragment--dot frag--6" />

          {/* Status legend — visible in order */}
          <div className="stage__header">
            <div className="stage__header-item">
              <span className="stage__header-dot stage__header-dot--todo" />
              Planned
            </div>
            <div className="stage__header-item">
              <span className="stage__header-dot stage__header-dot--doing" />
              In progress
            </div>
            <div className="stage__header-item">
              <span className="stage__header-dot stage__header-dot--testing" />
              Review
            </div>
            <div className="stage__header-item">
              <span className="stage__header-dot stage__header-dot--done" />
              Complete
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
