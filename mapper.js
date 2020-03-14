function getMapperTasks(url,method,data){ 
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

function checkForNewTask(url,method,data){ 
    var request = $.ajax({
                        url: url,
                        method: method,
                        success:function(msg){  
                            console.log(msg);
                            
                            $('#new-task').show();
                            Object.keys(msg.tasks).forEach(function(key) { 
                                let templete = setTempleteForNewTask(msg.tasks[key]);
                                $('#new-task').append(templete);
                            });
                        }
                        });
                        
                        request.fail(function( jqXHR, textStatus ) {
                            alert( "Request failed: " + textStatus );
                    });
}

function getTaskDetails(url,method,data){ 
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

function hideProperties()
{
    $('#task-details').hide();
    // $('#map').hide();
    $('#map-title').hide();
    $('#task-detail-title').hide();
}
function showProperties()
{
    $('#task-details').show();
    // $('#map').show();
    $('#map-title').show();
    $('#task-detail-title').show();
    
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

function setTempleteForNewTask(task)
{
    return  `<div class="row" style="">
                <div class="col-md-3"></div>
                <div class="col-md-7 bg-warning border d-flex align-items-center" style="padding: 20px;">
                    <div>
                        <div> Task Name: ${task.name}</div>
                        <div> Task Address: ${task.address}</div>
                    </div>
                </div>
                <div class="col-md-2 bg-warning border  d-flex justify-content-center align-items-center">
                    <button class="btn btn-success" data-id=${task.id} id="accept" style="padding: 10px 25px 10px 25px;"> Accept</button>
                </div>
            </div>`;
}