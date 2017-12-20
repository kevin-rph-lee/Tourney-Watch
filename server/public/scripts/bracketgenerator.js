$(function () {
    var demos = ['save',]
    $.each(demos, function (i, d) {
        var demo = $('div#' + d)
        $('<div class="demo"></div>').appendTo(demo)
    })
})

var saveData = {
    "teams": [
        [
            { name: "Team 1", flag: 'in' },
            { name: "Team 2", flag: 'in' },
        ],
        [
            { name: "Team 3", flag: 'in' },
            { name: "Team 4", flag: 'in' },
        ],
        [
            { name: "Team 5", flag: 'in' },
            { name: "Team 6", flag: 'in' }
        ],
        [
            { name: "Team 7", flag: 'in' },
            { name: "Team 8", flag: 'in' },
        ],
    ],

    results: [[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]],
};
/* Called whenever bracket is modified
 *
 * data:     changed bracket object in format given to init
 * userData: optional data given when bracket is created.
 */
function saveFn(data) {
    var bracketData = JSON.stringify(data)
    console.log("bracketData", bracketData)
    $.ajax({
        type: "POST",
        url: "/tournaments/update/",
        data: {bracketData: bracketData, tournamentID:1},
        success: function () {
            alert("Tournament Changes Saved!");
        }
    })
}



$(function () {
    var container = $('div#save .demo')
    container.bracket({
        init: saveData,
        save: saveFn,
        userData: "http://myapi"
    })

    /* You can also inquiry the current data */

    //   $('#dataOutput').text(JSON.parse(data))


    $("#target").click(function () {
        var data = container.bracket('data')
        console.log("data", data)
        saveFn(data);
    });


})

/*for flag*/
/* Edit function is called when team label is clicked */
function edit_fn(container, data, doneCb) {
    var input = $('<input type="text">')
    input.val(data ? data.flag + ':' + data.name : '')
    container.html(input)
    input.focus()
    input.blur(function () {
        var inputValue = input.val()
        if (inputValue.length === 0) {
            doneCb(null); // Drop the team and replace with BYE
        }
    })
}

/* Render function is called for each team label when data is changed, data
 * contains the data object given in init and belonging to this slot.
 *
 * 'state' is one of the following strings:
 * - empty-tbd: No data or score yet. A team will advance here later
 * - entry-no-score: Data available, but no score given yet
 * - entry-default-win: Data available, score will never be given as opponent is BYE
 * - entry-complete: Data and score available
 */
function render_fn(container, data, score, state) {
    switch (state) {

        case "empty-tbd":
            container.append("Upcoming")
            return;
        case "entry-no-score":
        case "entry-default-win":
        case "entry-complete":
            container.append(data.name)
            return;
    }
}

$(function () {
    $('div#save .demo').bracket({
        teamWidth: 80,
        scoreWidth: 20,
        matchMargin: 10,
        roundMargin: 30,
        centerConnectors: true,
        init: saveData,
        disableToolbar: true,
        disableTeamEdit: true,
        save: function () { },
        decorator: {
            edit: edit_fn,
            render: render_fn
        }
    })
})






