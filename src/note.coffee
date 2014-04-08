class Note
  constructor: (name, position = 0) ->
    @name = name
    @position = position

  scale: (name = "chromatic") ->
    switch name
      when "chromatic" then new Scale.Chromatic(@)
      when "major" then new Scale.Major(@)
      when "minor", "m" then new Scale.Minor(@)
      when "blues" then new Scale.Blues(@)
      when "gypsy" then new Scale.Gypsy(@)
      when "harmonic m" then new Scale.HarmonicMinor(@)
      when "pentatonic" then new Scale.Pentatonic(@)

  chord: (name = "major") ->
    switch name
      when "major" then new Chord.Major(@)
      when "minor", "m" then new Chord.Minor(@)
      when "sus4" then new Chord.Sus4(@)
      when "maj7" then new Chord.Maj7(@)
      when "minor maj7", "m maj7" then new Chord.MinorMaj7(@)
      when "6" then new Chord.Major6(@)
      when "add9" then new Chord.Add9(@)
      when "6/9" then new Chord.Major69(@)
      when "7" then new Chord.Septime(@)

  transpose: (level) ->
    if level < 0
      level = 12 + level
    scale = @scale()
    scale.get(level % 12)

  up: (steps = 1) ->
    @transpose(steps)

  down: (steps = 1) ->
    @transpose(12 - (steps % 12))

  toString: ->
    @name

window.Note = Note