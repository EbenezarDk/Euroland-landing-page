import { useEffect, useId, useRef, useState, type FormEvent, type RefObject } from 'react'
import { COUNTRY_DIAL_CODES } from '../data/countryDialCodes'

type EnquiryProps = {
  sectionRef: RefObject<HTMLElement | null>
  formRef: RefObject<HTMLFormElement | null>
  waveRef: RefObject<HTMLImageElement | null>
}

export function Enquiry({ sectionRef, formRef, waveRef }: EnquiryProps) {
  const [submitted, setSubmitted] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [dialOpen, setDialOpen] = useState(false)
  const dialRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selected =
    COUNTRY_DIAL_CODES.find((country) => country.name === selectedCountry) ??
    COUNTRY_DIAL_CODES.find((country) => country.name === 'India') ??
    COUNTRY_DIAL_CODES[0]

  useEffect(() => {
    if (!dialOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!dialRef.current?.contains(event.target as Node)) {
        setDialOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDialOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [dialOpen])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      className="enquiry"
      id="enquiry"
      ref={sectionRef}
      aria-labelledby="enquiry-heading"
    >
      <img
        className="enquiry__wave"
        ref={waveRef}
        src="/assets/wave-pattern.svg"
        alt=""
        aria-hidden
      />

      <div className="enquiry__inner">
        <div className="enquiry__header" data-animate="enquiry-header">
          <p className="enquiry__eyebrow">Book a Service</p>
          <h2 className="enquiry__heading" id="enquiry-heading">
            Let us know how we can help. We will reach out to you.
          </h2>
        </div>

        <form className="enquiry__form" ref={formRef} onSubmit={handleSubmit}>
          <input type="hidden" name="countryCode" value={selected.code} />
          <input type="hidden" name="countryName" value={selected.name} />
          <div className="enquiry__fields">
            <div className="enquiry__row">
              <label className="field">
                <span className="field__label">
                  Name <span className="field__req">*</span>
                </span>
                <input
                  className="field__input"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Dineshkumar"
                />
              </label>
              <label className="field">
                <span className="field__label">
                  Email <span className="field__req">*</span>
                </span>
                <input
                  className="field__input"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="xyz@euroland.com"
                />
              </label>
            </div>

            <div className="enquiry__row">
              <label className="field">
                <span className="field__label">
                  Company Name <span className="field__req">*</span>
                </span>
                <input
                  className="field__input"
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="Euroland IR India"
                />
              </label>
              <fieldset className="field field--phone">
                <legend className="field__label">
                  Phone Number <span className="field__req">*</span>
                </legend>
                <div className="field__phone">
                  <div
                    className={`field__dial${dialOpen ? ' field__dial--open' : ''}`}
                    ref={dialRef}
                  >
                    <button
                      type="button"
                      className="field__dial-trigger"
                      aria-label="Country code"
                      aria-haspopup="listbox"
                      aria-expanded={dialOpen}
                      aria-controls={listId}
                      onClick={() => setDialOpen((open) => !open)}
                    >
                      <span className="field__dial-code">{selected.code}</span>
                      <img src="/assets/caret-down.svg" alt="" aria-hidden />
                    </button>

                    {dialOpen ? (
                      <ul
                        className="field__dial-menu"
                        id={listId}
                        role="listbox"
                        aria-label="Country codes"
                      >
                        {COUNTRY_DIAL_CODES.map((country) => {
                          const active = country.name === selected.name
                          return (
                            <li key={`${country.code}-${country.name}`} role="option">
                              <button
                                type="button"
                                className={`field__dial-option${active ? ' field__dial-option--active' : ''}`}
                                aria-selected={active}
                                onClick={() => {
                                  setSelectedCountry(country.name)
                                  setDialOpen(false)
                                }}
                              >
                                <span className="field__dial-option-code">{country.code}</span>
                                <span className="field__dial-option-name">{country.name}</span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null}
                  </div>
                  <input
                    className="field__phone-input"
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel-national"
                    placeholder="1234 567 890"
                    aria-label="Phone number"
                  />
                </div>
              </fieldset>
            </div>

            <label className="field">
              <span className="field__label">Your role</span>
              <input
                className="field__input"
                name="role"
                type="text"
                autoComplete="organization-title"
                placeholder="Investor Relations Manager"
              />
            </label>

            <label className="field">
              <span className="field__label">Anything specific you&apos;d like to cover?</span>
              <textarea
                className="field__textarea"
                name="message"
                placeholder="Leave a message"
              />
            </label>
          </div>

          <div className="enquiry__actions">
            <button className="btn btn--primary" type="submit">
              Submit
              <img src="/assets/arrow-white.svg" alt="" aria-hidden />
            </button>
          </div>

          {submitted ? (
            <p className="enquiry__status" role="status">
              Thank you — we will be in touch shortly.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
