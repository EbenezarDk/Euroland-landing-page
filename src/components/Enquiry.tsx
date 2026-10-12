import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type RefObject } from 'react'
import { COUNTRY_DIAL_CODES } from '../data/countryDialCodes'

type EnquiryProps = {
  sectionRef: RefObject<HTMLElement | null>
  formRef: RefObject<HTMLFormElement | null>
  waveRef: RefObject<HTMLImageElement | null>
}

const LOOKING_FOR_OPTIONS = [
  { id: 'ir-tools', label: 'IR tools / IR website / Corporate website' },
  { id: 'ir-website', label: 'Book a 120 days trials' },
  { id: 'services', label: 'Need to talk about the services' },
] as const

const LOOKING_FOR_ALL = 'all' as const

const COUNTRY_NAMES = Array.from(
  new Set(COUNTRY_DIAL_CODES.map((country) => country.name)),
)

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
  const [lookingFor, setLookingFor] = useState<string[]>([])
  const [locationCountry, setLocationCountry] = useState('')
  const [locationOpen, setLocationOpen] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const dialRef = useRef<HTMLDivElement>(null)
  const dialSearchRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const locationSearchRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const searchId = useId()
  const locationListId = useId()
  const locationSearchId = useId()
  const lookingForId = useId()

  const allLookingForIds = LOOKING_FOR_OPTIONS.map((option) => option.id)
  const allLookingForSelected = allLookingForIds.every((id) => lookingFor.includes(id))

  function toggleLookingFor(optionId: string) {
    if (optionId === LOOKING_FOR_ALL) {
      setLookingFor(allLookingForSelected ? [] : [...allLookingForIds])
      return
    }

    setLookingFor((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId],
    )
  }

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

  const orderedLocationCountries = useMemo(() => {
    const query = locationSearch.trim().toLowerCase()
    const matches = (name: string) => !query || name.toLowerCase().includes(query)

    const selectedFirst = locationCountry && matches(locationCountry) ? [locationCountry] : []
    const rest = COUNTRY_NAMES.filter(
      (name) => name !== locationCountry && matches(name),
    )

    return [...selectedFirst, ...rest]
  }, [locationCountry, locationSearch])

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

  useEffect(() => {
    if (!locationOpen) {
      setLocationSearch('')
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!locationRef.current?.contains(event.target as Node)) {
        setLocationOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLocationOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [locationOpen])

  function syncPhoneFromCountry(countryName: string) {
    const match = COUNTRY_DIAL_CODES.find((country) => country.name === countryName)
    if (!match) return
    setDialCode(match.code)
    setSelectedCountry(match.name)
  }

  function syncLocationFromCountry(countryName: string) {
    setLocationCountry(countryName)
  }

  function handleDialChange(value: string) {
    setDialCode(value)
    setDialOpen(true)

    const normalized = normalizeDialCode(value)
    const match = COUNTRY_DIAL_CODES.find((country) => country.code === normalized)
    if (match) {
      setSelectedCountry(match.name)
      syncLocationFromCountry(match.name)
    }
  }

  function openDialMenu(focusSearch = false) {
    setDialOpen(true)
    setLocationOpen(false)
    if (focusSearch) {
      requestAnimationFrame(() => {
        dialSearchRef.current?.focus()
      })
    }
  }

  function openLocationMenu() {
    setLocationOpen(true)
    setDialOpen(false)
    requestAnimationFrame(() => {
      locationSearchRef.current?.focus()
    })
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
              <div className="field">
                <span className="field__label" id={`${locationListId}-label`}>
                  Your Location
                </span>
                <div
                  className={`field__location${locationOpen ? ' field__location--open' : ''}`}
                  ref={locationRef}
                >
                  <input type="hidden" name="location" value={locationCountry} />
                  <button
                    type="button"
                    className="field__location-trigger"
                    aria-labelledby={`${locationListId}-label`}
                    aria-haspopup="listbox"
                    aria-expanded={locationOpen}
                    aria-controls={locationListId}
                    onClick={() => {
                      if (locationOpen) {
                        setLocationOpen(false)
                      } else {
                        openLocationMenu()
                      }
                    }}
                  >
                    <span
                      className={`field__location-value${locationCountry ? '' : ' field__location-value--placeholder'}`}
                    >
                      {locationCountry || 'Select country'}
                    </span>
                    <span className="field__location-caret" aria-hidden>
                      <img src="/assets/caret-down.svg" alt="" />
                    </span>
                  </button>

                  {locationOpen ? (
                    <div className="field__location-menu" id={locationListId}>
                      <div className="field__dial-search">
                        <label className="visually-hidden" htmlFor={locationSearchId}>
                          Search country
                        </label>
                        <input
                          ref={locationSearchRef}
                          id={locationSearchId}
                          className="field__dial-search-input"
                          type="search"
                          value={locationSearch}
                          onChange={(event) => setLocationSearch(event.target.value)}
                          onMouseDown={(event) => event.stopPropagation()}
                          placeholder="Search country"
                          autoComplete="off"
                        />
                      </div>
                      <ul
                        className="field__dial-list"
                        role="listbox"
                        aria-label="Countries"
                      >
                        {orderedLocationCountries.length > 0 ? (
                          orderedLocationCountries.map((name) => {
                            const active = name === locationCountry
                            return (
                              <li key={name} role="option">
                                <button
                                  type="button"
                                  className={`field__dial-option field__location-option${active ? ' field__dial-option--active' : ''}`}
                                  aria-selected={active}
                                  onMouseDown={(event) => event.preventDefault()}
                                  onClick={() => {
                                    setLocationCountry(name)
                                    syncPhoneFromCountry(name)
                                    setLocationOpen(false)
                                  }}
                                >
                                  <span className="field__dial-option-code">{name}</span>
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
              </div>
            </div>

            <div className="enquiry__row">
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
                                      syncLocationFromCountry(country.name)
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

            <fieldset className="field field--checkboxes">
              <legend className="field__label" id={lookingForId}>
                What are you looking for
              </legend>
              <div className="field__checkbox-list" role="group" aria-labelledby={lookingForId}>
                {LOOKING_FOR_OPTIONS.map((option) => {
                  const checked = lookingFor.includes(option.id)
                  return (
                    <label key={option.id} className="field__checkbox">
                      <input
                        className="field__checkbox-input"
                        type="checkbox"
                        name="lookingFor"
                        value={option.id}
                        checked={checked}
                        onChange={() => toggleLookingFor(option.id)}
                      />
                      <span className="field__checkbox-box" aria-hidden />
                      <span className="field__checkbox-label">{option.label}</span>
                    </label>
                  )
                })}
                <label className="field__checkbox">
                  <input
                    className="field__checkbox-input"
                    type="checkbox"
                    checked={allLookingForSelected}
                    onChange={() => toggleLookingFor(LOOKING_FOR_ALL)}
                  />
                  <span className="field__checkbox-box" aria-hidden />
                  <span className="field__checkbox-label">All the above</span>
                </label>
              </div>
            </fieldset>

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
