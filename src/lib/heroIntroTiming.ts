/** Shared hero intro timing — keep overlay fade aligned with text stack. */
export const HERO_VIDEO_REVEAL_TIME = 2
export const HERO_OVERLAY_LEAD = 0.5

/** Kinetic letter filter settle (matches KineticTextAnimate slideLeftItemVariants). */
export const HERO_LETTER_SETTLE = 0.36

/**
 * Longest text line: second desc (delay 0.06 + duration 1.05) + letter settle.
 * Overlay hits 50% when this completes.
 */
export const HERO_TEXT_STACK_DURATION = 0.06 + 1.05 + HERO_LETTER_SETTLE

export const HERO_OVERLAY_FADE_DURATION = HERO_OVERLAY_LEAD + HERO_TEXT_STACK_DURATION
export const HERO_OVERLAY_TARGET_OPACITY = 0.5
