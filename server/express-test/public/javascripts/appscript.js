
let createNewNamespace = document.querySelector('#createNewNamespace')

createNewNamespace.onclick = function(){

    let data = {};
    data.username = $('#username').val();
    data.password = $('#password').val();

    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/createNewNamespace',						
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
            $('#createNewNamespace').remove();
            $('#username').remove();
            $('#password').remove();
        }
    });
    
}

