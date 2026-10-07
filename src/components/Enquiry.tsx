import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type RefObject } from 'react'
import { COUNTRY_DIAL_CODES } from '../data/countryDialCodes'

type EnquiryProps = {
  sectionRef: RefObject<HTMLElement | null>
  formRef: RefObject<HTMLFormElement | null>
  waveRef: RefObject<HTMLImageElement | null>
}

function normalizeDialCode(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  const digits = trimmed.replace(/[^\d+]/g, '')
  if (!digits) return ''
  return digits.startsWith('+') ? digits : `+${digits.replace(/^\+*/, '')}`
}

export function Enquiry({ sectionRef, formRef, waveRef }: EnquiryProps) {
  const [submitted, setSubmitted] = useState(false)
  const [dialCode, setDialCode] = useState('+91')
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [dialOpen, setDialOpen] = useState(false)
  const [dialSearch, setDialSearch] = useState('')
  const dialRef = useRef<HTMLDivElement>(null)
  const dialSearchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const searchId = useId()

  const selected =
    COUNTRY_DIAL_CODES.find((country) => country.name === selectedCountry) ??
    COUNTRY_DIAL_CODES.find((country) => country.code === normalizeDialCode(dialCode)) ??
    COUNTRY_DIAL_CODES.find((country) => country.name === 'India') ??
    COUNTRY_DIAL_CODES[0]

  const orderedCountries = useMemo(() => {
    const query = dialSearch.trim().toLowerCase()
    const matches = (country: (typeof COUNTRY_DIAL_CODES)[number]) => {
      if (!query) return true
      const code = country.code.toLowerCase()
      const name = country.name.toLowerCase()
      return code.includes(query) || name.includes(query)
    }

    const selectedFirst = COUNTRY_DIAL_CODES.filter(
      (country) => country.name === selected.name && matches(country),
    )
    const rest = COUNTRY_DIAL_CODES.filter(
      (country) => country.name !== selected.name && matches(country),
    )

    return [...selectedFirst, ...rest]
  }, [dialSearch, selected.name])

  useEffect(() => {
    if (!dialOpen) {
      setDialSearch('')
      return
    }

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

  function handleDialChange(value: string) {
    setDialCode(value)
    setDialOpen(true)

    const normalized = normalizeDialCode(value)
    const match = COUNTRY_DIAL_CODES.find((country) => country.code === normalized)
    if (match) setSelectedCountry(match.name)
  }

  function openDialMenu(focusSearch = false) {
    setDialOpen(true)
    if (focusSearch) {
      requestAnimationFrame(() => {
        dialSearchRef.current?.focus()
      })
    }
  }

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
          <p className="enquiry__eyebrow">Contact Us</p>
          <h2 className="enquiry__heading" id="enquiry-heading">
            Let us know how we can help. We will reach out to you.
          </h2>
        </div>

        <form className="enquiry__form" ref={formRef} onSubmit={handleSubmit}>
          <input type="hidden" name="countryCode" value={normalizeDialCode(dialCode) || selected.code} />
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
                  placeholder="Ex. Ebenezar"
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
                  placeholder="Ex. xyz@company.com"
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
                  placeholder="Ex. Euroland IR India"
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
                    <div className="field__dial-trigger">
                      <input
                        className="field__dial-input"
                        type="text"
                        inputMode="tel"
                        autoComplete="tel-country-code"
                        aria-label="Country code"
                        aria-haspopup="listbox"
                        aria-expanded={dialOpen}
                        aria-controls={listId}
                        value={dialCode}
                        onChange={(event) => handleDialChange(event.target.value)}
                        onFocus={() => openDialMenu(false)}
                        onBlur={() => {
                          const normalized = normalizeDialCode(dialCode)
                          if (normalized) setDialCode(normalized)
                        }}
                        placeholder="+91"
                      />
                      <button
                        type="button"
                        className="field__dial-caret"
                        aria-label={dialOpen ? 'Hide country codes' : 'Show country codes'}
                        tabIndex={-1}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          if (dialOpen) {
                            setDialOpen(false)
                          } else {
                            openDialMenu(true)
                          }
                        }}
                      >
                        <img src="/assets/caret-down.svg" alt="" aria-hidden />
                      </button>
                    </div>

                    {dialOpen ? (
                      <div className="field__dial-menu" id={listId}>
                        <div className="field__dial-search">
                          <label className="visually-hidden" htmlFor={searchId}>
                            Search country or code
                          </label>
                          <input
                            ref={dialSearchRef}
                            id={searchId}
                            className="field__dial-search-input"
                            type="search"
                            value={dialSearch}
                            onChange={(event) => setDialSearch(event.target.value)}
                            onMouseDown={(event) => event.stopPropagation()}
                            placeholder="Search country or code"
                            autoComplete="off"
                          />
                        </div>
                        <ul
                          className="field__dial-list"
                          role="listbox"
                          aria-label="Country codes"
                        >
                          {orderedCountries.length > 0 ? (
                            orderedCountries.map((country) => {
                              const active = country.name === selected.name
                              return (
                                <li key={`${country.code}-${country.name}`} role="option">
                                  <button
                                    type="button"
                                    className={`field__dial-option${active ? ' field__dial-option--active' : ''}`}
                                    aria-selected={active}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => {
                                      setDialCode(country.code)
                                      setSelectedCountry(country.name)
                                      setDialOpen(false)
                                    }}
                                  >
                                    <span className="field__dial-option-code">{country.code}</span>
                                    <span className="field__dial-option-name">{country.name}</span>
                                  </button>
                                </li>
                              )
                            })
                          ) : (
                            <li className="field__dial-empty" role="presentation">
                              No matching country
                            </li>
                          )}
                        </ul>
                      </div>
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
                placeholder="Ex. Investor Relations Manager"
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
