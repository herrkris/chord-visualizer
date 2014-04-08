class Maj7 extends Chord
  pattern: [1, 5, 8, 12]
  scale: Scale.Chromatic

  toString: ->
    super() + "maj7"

window.Chord = window.Chord or {}
window.Chord.Maj7 = Maj7