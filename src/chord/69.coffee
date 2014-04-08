class Major69 extends Chord
  pattern: [1, 5, 8, 10, 3]
  scale: Scale.Chromatic

  toString: ->
    super() + "6/9"

window.Chord = window.Chord or {}
window.Chord.Major69 = Major69