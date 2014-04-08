document.addEventListener("DOMContentLoaded", function () {
    var size = {
            width: window.innerWidth < 600 ? window.innerWidth : 600,
            height: window.innerWidth < 600 ? window.innerWidth : 600
        },
        paper = Raphael("output", size.width, size.height),
        R = size.width / 2 - 100,
        init = true,
        param = {stroke: "#fff", "stroke-width": 1},
        marksAttr = {fill: "#444", stroke: "none"},
        lastNote = new Note("C"),
        lastChord = "major"
        chord = lastNote.chord(lastChord),
        chordScale = new Scale.Chromatic(lastNote),
        related = document.getElementById("related");

    window.addEventListener("resize", function() {
        size = {
            width: window.innerWidth < 600 ? window.innerWidth : 600,
            height: window.innerWidth < 600 ? window.innerWidth : 600
        }
        paper.setSize(size.width, size.height);
        drawChord()
    });

    // Custom Attribute

    paper.customAttributes.arc = function (value, total, R, offset) {
        if (value === 0) value = 12

        var alphaStart = 360 / total * offset,
            alphaEnd = 360 / total * (value);

        if (alphaEnd < alphaStart) {
            alphaEnd += 360
        }

        var aStart = (90 - alphaStart) * Math.PI / 180,
            xStart = size.width / 2 + R * Math.cos(aStart),
            yStart = size.height / 2 - R * Math.sin(aStart),
            aEnd = (90 - alphaEnd) * Math.PI / 180,
            xEnd = size.width / 2 + R * Math.cos(aEnd),
            yEnd = size.height / 2 - R * Math.sin(aEnd),
            color = Raphael.getColor(),
            path;

        path = [["M", xStart, yStart], ["A", R, R, 0, +(alphaEnd - alphaStart > 180), 1, xEnd, yEnd]];

        return {path: path, stroke: color};
    };


    function drawChord() {
        paper.clear()
        R = size.width / 2 - 70;
        var offset = chordScale.index(chord.get(0));
        for (var j = 0, len2 = chord.notes.length ; j < len2; j++) {

            for (var i = 0, len = chordScale.notes.length; i < len; i++) {
                if (j === 0) continue;
                if (chord.get(j).toString() ===  chordScale.get(i).toString()) {
                    paper.path().attr({stroke: "#fff", "stroke-width": 15}).attr({arc: [chordScale.get(i).position - 1, 12, R, offset]});
                    R -= 20
                }
            }
        }

        Raphael.getColor.reset();

        R = size.width / 2 - 100;
        drawMarks(R, chordScale.notes.length);
        paper.text(size.width / 2, size.width / 2, chord).attr({"font-size": 20})
    }

    function findScales() {
        var chromatic = new Scale.Chromatic("C"),
            possibleScales = ["major", "m", "blues", "gypsy", "harmonic m", "pentatonic"],
            text = "<h1>Tonleitern für " + chord + "</h1>"
        for (var i = 0, len = chromatic.notes.length; i < len; i++) {
            var note = chromatic.get(i);
            for (var j = 0, len2 = possibleScales.length; j < len2; j++) {
                var findInScale = note.scale(possibleScales[j]);
                if (findInScale.contains(chord)) {
                    text += "<h2>" + findInScale.root + " " + possibleScales[j] + "</h2>";
                    text += "<p>" + findInScale + "</p>";
                }
            }
        }

        related.innerHTML = text;
    }

    function drawMarks(R, total) {
        var out = paper.set(),
            noteIndex = 0;
        for (var value = 0; value < total; value++) {
            var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x, y;

            x = size.width / 2 + (R + 57) * Math.cos(a);
            y = size.height / 2 - (R + 57) * Math.sin(a);
            out.push(paper.text(x, y, chordScale.get(value)).attr({"font-size": 10}));

            x = size.width / 2 + (R + 75) * Math.cos(a);
            y = size.height / 2 - (R + 75) * Math.sin(a);
            for (var i = 0, len = chord.notes.length; i < len; i++) {
                if (chord.get(i).toString() ===  chordScale.get(value).toString()) {
                    out.push(paper.text(x, y, chord.get(i)).attr({"font-size": 20}));
                }
            }

        }
        return out;
    }

    drawChord();
    findScales();

    var chromaticScale = new Scale.Chromatic("C"),
        chromaticNotes = chromaticScale.notes,
        text = "",
        handleClick = function(ev) {
            if ('ontouchstart' in window && ev.type === "click")
                return false;

            if (ev.target.nodeName === "A") {
                var parent = ev.target.parentNode;
                if (parent.id === "scale") {
                    lastNote = new Note(ev.target.innerText);
                    chord = lastNote.chord(lastChord);
                    drawChord()
                } else {
                    lastChord = ev.target.innerText
                    chord = lastNote.chord(lastChord);
                    drawChord()
                }

                findScales();
            }


            ev.preventDefault();
            ev.stopPropagation()
        },
        chordVariations = ["major", "minor", "sus4", "maj7", "minor maj7", "6", "add9", "6/9", "7"]
        scaleOutput = document.getElementById("scale"),
        chordOutput = document.getElementById("chord");

    for (var j = 0, len2 = chromaticNotes.length; j < len2; j++) {
        var note = chromaticNotes[j];
        text += "<a href=\"#" + note + "\">" + note + "</a> "
    }

    scaleOutput.innerHTML = text;

    text = ""
    for (var j = 0, len2 = chordVariations.length; j < len2; j++) {
        var variation = chordVariations[j];
        text += "<a href=\"#" + variation + "\">" + variation + "</a> "
    }

    chordOutput.innerHTML = text;

    document.addEventListener("touchend", handleClick, true);
    document.addEventListener("click", handleClick, true);
});