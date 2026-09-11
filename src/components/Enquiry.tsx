import { useState, type FormEvent, type RefObject } from 'react'

type EnquiryProps = {
  sectionRef: RefObject<HTMLElement | null>
  formRef: RefObject<HTMLFormElement | null>
  waveRef: RefObject<HTMLImageElement | null>
}

export function Enquiry({ sectionRef, formRef, waveRef }: EnquiryProps) {
  const [submitted, setSubmitted] = useState(false)
  const [intent, setIntent] = useState<'callback' | 'email'>('email')

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
            Your trusted partner for seamless bookings.
          </h2>
        </div>

        <form className="enquiry__form" ref={formRef} onSubmit={handleSubmit}>
          <input type="hidden" name="intent" value={intent} />
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
                  <div className="field__dial">
                    <select
                      name="countryCode"
                      defaultValue="+91"
                      aria-label="Country code"
                    >
                      <option value="+91">+91</option>
                      <option value="+44">+44</option>
                      <option value="+1">+1</option>
                      <option value="+971">+971</option>
                      <option value="+81">+81</option>
                      <option value="+32">+32</option>
                    </select>
                    <img src="/assets/caret-down.svg" alt="" aria-hidden />
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
              <span className="field__label">
                Leave Message <span className="field__req">*</span>
              </span>
              <textarea
                className="field__textarea"
                name="message"
                required
                placeholder="Leave a message"
              />
            </label>
          </div>

          <div className="enquiry__actions">
            <button
              className="btn btn--primary"
              type="submit"
              onClick={() => setIntent('callback')}
            >
              Get a call back
              <img src="/assets/arrow-white.svg" alt="" aria-hidden />
            </button>
            <button
              className="btn btn--outline"
              type="submit"
              onClick={() => setIntent('email')}
            >
              Get an email
              <img src="/assets/arrow-blue.svg" alt="" aria-hidden />
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
