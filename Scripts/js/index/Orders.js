$(document).ready(function () {
    $("#formOrder").submit(function(e){
        e.preventDefault();
        $.ajax({
            url: url,
            crossDomain: true,
            type:'POST',
            data: {
                "orderDescription": $('#txtOrder').val()
            },
            error: function (r) {
                if (r.status == 400)
                    ModalDialog("An error has ocurred", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("An error has ocurred", "Internal server error.");
            },
            success: function (r) {
                ModalDialog("Success!", "Order created successfully!");
                $("#grid").bootgrid('append', [{
                    id: r.id,
                    orderDescription: r.orderDescription,
                    orderDate: r.orderDate
                }]);
            }
        });
    });
});

function ModalDialog(title, text) {
    var random = Math.random().toString().replace('.', '');
    var text = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <h4 class="modal-title">' + title + '</h4>                                                    ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + text + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(text);
    $('#' + random).modal('show');
}