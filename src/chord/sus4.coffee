class Sus4 extends Chord
  pattern: [1, 6, 8]
  scale: Scale.Chromatic

  toString: ->
    super() + "sus4"

window.Chord = window.Chord or {}
window.Chord.Sus4 = Sus4