class Add9 extends Chord
  pattern: [1, 5, 8, 3]
  scale: Scale.Chromatic

  toString: ->
    super() + "add9"

window.Chord = window.Chord or {}
window.Chord.Add9 = Add9