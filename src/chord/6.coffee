class Major6 extends Chord
  pattern: [1, 5, 8, 10]
  scale: Scale.Chromatic

  toString: ->
    super() + "6"

window.Chord = window.Chord or {}
window.Chord.Major6 = Major6