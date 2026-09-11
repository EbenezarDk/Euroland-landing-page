import { motion, type Variants } from 'motion/react'
import type { CSSProperties } from 'react'

const motionElements = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
} as const

type MotionElementType = keyof typeof motionElements

const slideLeftItemVariants: Variants = {
  hidden: { x: 18, opacity: 0, filter: 'blur(24px)' },
  show: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      x: { duration: 0.21, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.09, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
    },
  },
}

type KineticTextAnimateProps = {
  text: string
  as?: MotionElementType
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  startOnView?: boolean
  once?: boolean
  accessible?: boolean
  'data-hero'?: string
}

type KineticToken =
  | { type: 'word'; value: string }
  | { type: 'space' }
  | { type: 'break' }

function tokenize(text: string): KineticToken[] {
  const tokens: KineticToken[] = []
  const parts = text.split(/(\n| +)/)

  for (const part of parts) {
    if (!part) continue
    if (part === '\n') {
      tokens.push({ type: 'break' })
      continue
    }
    if (/^ +$/.test(part)) {
      tokens.push({ type: 'space' })
      continue
    }
    tokens.push({ type: 'word', value: part })
  }

  return tokens
}

export function KineticTextAnimate({
  text,
  as: Component = 'p',
  className,
  delay = 0,
  duration = 0.3,
  startOnView = false,
  once = true,
  accessible: _accessible = false,
  style,
  ...rest
}: KineticTextAnimateProps) {
  const tokens = tokenize(text)
  const letterCount = text.replace(/\n/g, '').length || 1
  const MotionComponent = motionElements[Component]

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: duration / letterCount,
      },
    },
  }

  const mergedStyle = {
    '--hover-padding': 'calc(1em / 12)',
    '--text-stroke-width': 'calc(1em * 125 / 6000)',
    ...style,
  } as CSSProperties

  let letterIndex = 0

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      animate={startOnView ? undefined : 'show'}
      whileInView={startOnView ? 'show' : undefined}
      viewport={{ once }}
      className={['kinetic-text', className].filter(Boolean).join(' ')}
      style={mergedStyle}
      aria-label={text.replace(/\n/g, ' ')}
      data-hero={rest['data-hero']}
    >
      <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
      {tokens.map((token, tokenIndex) => {
        if (token.type === 'break') {
          return <span key={`break-${tokenIndex}`} className="kinetic-break" aria-hidden />
        }

        if (token.type === 'space') {
          const index = letterIndex++
          return (
            <motion.span
              key={`space-${tokenIndex}-${index}`}
              variants={slideLeftItemVariants}
              aria-hidden
              className="kinetic-letter kinetic-space"
            >
              {'\u00A0'}
            </motion.span>
          )
        }

        return (
          <span key={`word-${tokenIndex}-${token.value}`} className="kinetic-word" aria-hidden>
            {token.value.split('').map((letter) => {
              const index = letterIndex++
              return (
                <motion.span
                  key={`${token.value}-${index}`}
                  variants={slideLeftItemVariants}
                  aria-hidden
                  className="kinetic-letter"
                >
                  {letter}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </MotionComponent>
  )
}
