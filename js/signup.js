$(function() {
    var groupInfoArray = [
        { groupCode: 4381, lastItemNum: 7 },
        { groupCode: 4385, lastItemNum: 4 },
        { groupCode: 4389, lastItemNum: 5 }
    ];

    function getFormField(group,item) {
        var formFieldID = 'mce-group[' + group + "]-" + group + "-" + item;
        var formField = document.getElementById(formFieldID);

        return formField;
    }

    $("#ima-1").on('click', function() {
        $("#list-1").slideToggle('fast');
    });
    $("#ima-2").on('click', function() {
        $("#list-2").slideToggle('fast');
    });
    $("#ima-3").on('click', function() {
        $("#list-3").slideToggle('fast');
    });

    /*
        A choice was clicked. Set corresponding form field, and invert last (default) form field
     */
    $('.multiSelect div').on('click', function(e) {
        var itemNum = e.target.dataset.choice;
        var groupNum = e.target.parentNode.id.split('-')[1];
        var groupInfo = groupInfoArray[groupNum - 1];  // id's are 1-based
        var chosenFormField = getFormField(groupInfo.groupCode,itemNum);
        var lastFormField   = getFormField(groupInfo.groupCode,groupInfo.lastItemNum);

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            chosenFormField.checked = false;
            lastFormField  .checked = true;
        }
        else {
            $(this).addClass('active');
            chosenFormField.checked = true;
            lastFormField  .checked = false;
        }
        e.preventDefault();
    });

    /*
         A group was clicked. If turning on, turn on last (default) form field; if off, turn off all
     */
    $('.select').on('click', function(e) {
        var groupNum = e.target.parentNode.id.split('-')[1];
        var groupInfo = groupInfoArray[groupNum - 1]; // id's are 1-based
        var formField = getFormField(groupInfo.groupCode,groupInfo.lastItemNum);

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            formField.checked = false;

            var list = $('#list-' + groupNum);

            list.children().each(function() {
                $(this).removeClass('active');
            });

            for (var i = 0; i < groupInfo.lastItemNum; i++) {
                formField = getFormField(groupInfo.groupCode,i);
                formField.checked = false;
            }
        }
        else {
            $(this).addClass('active');
            formField.checked = true;
        }
        e.preventDefault();
    });
});



