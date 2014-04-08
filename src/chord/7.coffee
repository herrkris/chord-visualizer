class Septime extends Chord.Maj7
  modify: ->
    @set(3, @get(3).down(1))

  toString: ->
    @root.toString() + "7"

window.Chord = window.Chord or {}
window.Chord.Septime = Septime