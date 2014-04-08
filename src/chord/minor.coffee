class Minor extends Chord
  pattern: [1, 4, 8]
  scale: Scale.Chromatic

  toString: ->
    super() + "m"

window.Chord = window.Chord or {}
window.Chord.Minor = Minor