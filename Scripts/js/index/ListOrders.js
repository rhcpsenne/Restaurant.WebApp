$(document).ready(function () {
    GridSetup();
    let data;
    $.ajax({
        url: url,
        crossDomain: true,
        type:'GET',
        success: function(response){
            data = response;
            FillGrid(data);
        },
        error: function(response){
            ModalDialog("Failed to load order history", "Internal server error.");
        } 
    });
});

function FillGrid(data) {
    $.each(data, function(index, item){
        $("#grid").bootgrid('append', [{
            id: item.id,
            orderDescription: item.orderDescription,
            orderDate: item.orderDate
        }]);
    })
}

function GridSetup(){
    $("#grid").bootgrid({
        rowCount: -1,
        navigation: 0,
        templates: {
            header: "",
            search: "",
        }
    });
}