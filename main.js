function getData()
{
    let name = $('#name').val();
    let description = $('#description').val();
    let email = $('#email').val();
    return {
        'name' : name,
        'description' : description,
        'address' : selectedPlace.address,
        'area' : selectedPlace.area,
        'city' : selectedPlace.city,
        'latitude': selectedPlace.latitude,
        'longitude': selectedPlace.longitude,
        'email' : email,
        'assigned_by' : '57fbf6ca-868e-414a-8947-b069e3fc7dc9',
        'status' : 1
    }   
    
}



function requiredFieldVerification()
{
    let name = $('#name').val();
    let description = $('#description').val();
    let address = $('#address').val();
    let email = $('#email').val();

    if(email.length <= 0 || name.length <= 0 || description.length <= 0 || address.length <= 0) return true;
    else return false;
    
}

function makeToast(status,title,message = '')
{
    Command: toastr[status](message, title)
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}
function setResponse(res)
{
    response = JSON.stringify(res);
    console.log(response);
    
    //showTaskList(res);
}



function ajax(url,method,data){
    var request = $.ajax({
                        url: url,
                        method: method,
                        data: data,
                        success:function(msg,textStatus, xhr){
                            response = msg;
                        }
                        });
                        
                        request.fail(function( jqXHR, textStatus ) {
                            alert( "Request failed: " + textStatus );
                    });
}
function ajax_first(url,method,data){
    var request = $.ajax({
                        url: url,
                        method: method,
                        data: data,
                        success:function(msg){
                            Object.keys(msg.tasks).forEach(function(key) {
                                let templete = setTampleteForNotificationContainer(msg.tasks[key]);
                                $('#notification-container').append(templete);
                            });
                        }
                        });
                        
                        request.fail(function( jqXHR, textStatus ) {
                            alert( "Request failed: " + textStatus );
                    });
}

function urlList(url_name)
{
    let base_url = 'https://admin.barikoi.xyz:8090';
    let url = {
        'start_task' : base_url+'/bank/assign/task',
        'get_all' : base_url+'/bank/task/all',
        'get_all_by_bank' : base_url+'/bank/task/by/bank',
        'get_task_detail' : base_url+'/bank/get/task/detail',
        'get_mapper_task' : base_url+'/bank/task/by/mapper',
        'mapper_end_task' : base_url+'/bank/notify/ending',
        'check_new_task' : base_url+'/bank/check/for/task',
        'start_verification' : base_url+'/bank/task/start',
    }
    
    return url[url_name];
}

function setTampleteForNotificationContainer(value)
{
    return `<div class="notification" data-id="${value.id}">`+
                `<div class="row">`+
                    `<a data-toggle="modal" data-target="#myModal">`+
                        `<h5 >${value.name}</h3>`+
                    `</a>`+
                `</div>`+
                `<div class="row" style="line-height: 1px;">`+
                    `<small>Created at: <span>${value.created_at}</span></small>`+
                `</div>`+
                `<div class="row" style="line-height: 5px;">`+
                    `<small>
                        Status: 
                        <span style="color:${value.status == 0 ? 'red' : 'green'}">
                             ${value.status == 0 ? 'Finished' : 'Active'}
                        </span>
                    </small>`+
                `</div>`+
            `</div>`;
}