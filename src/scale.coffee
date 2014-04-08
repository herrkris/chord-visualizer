chromaticScale = ["C", "C#", "D", "D#", "E", "F",
                  "F#", "G", "G#", "A", "A#", "B"]

class Scale
  constructor: (@root) ->
    @root = new Note(@root) unless @root instanceof Note
    @notes = []

    index = chromaticScale.indexOf(@root.toString())
    num = 0
    while num < 12
      noteString = chromaticScale[(index + num) % 12]
      @append new Note(noteString, (num + 1))
      num++

    @apply() if @pattern and @scale

  get: (index) ->
    @notes[index]

  set: (index, note) ->
    @notes[index] = note

  append: (note, position) ->
    note.position = position or 0
    @notes.push(note)

  index: (_note) ->
    _index = -1
    for note, index in @notes
      _index = index if note.toString() is _note.toString()

    _index

  contains: (chord) ->
    matches = []
    for note in chord.notes
      matches.push(yes) if @index(note) isnt -1

    matches.length is chord.notes.length

  apply: ->
    scale = new @scale(@root)
    @notes = []
    for index in @pattern
      @append scale.get((index - 1) % scale.notes.length), index

    @modify() if @modify

  toString: ->
    notes = []
    notes = (note.toString() for note in @notes)
    notes.join(" ")

window.Scale = Scale
