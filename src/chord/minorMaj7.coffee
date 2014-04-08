class MinorMaj7 extends Chord
  pattern: [1, 4, 8, 12]
  scale: Scale.Chromatic

  toString: ->
    super() + "m maj7"

window.Chord = window.Chord or {}
window.Chord.MinorMaj7 = MinorMaj7