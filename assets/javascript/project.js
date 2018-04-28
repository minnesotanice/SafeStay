function loadData(){
    var $address = $('#address');
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ',' + city;

    $address.text("Address: " + address + "");

    var streetViewURL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + '';
    
    $('#photo').attr("src" , streetViewURL);

    return false;
}

$('#form-container').submit(loadData);