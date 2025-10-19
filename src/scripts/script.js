const button = document.getElementById("test")

button.addEventListener("click", async function(){
    var req = $.ajax({
        url:"/api",
        method:"POST",
        data:{title: "test"},
        dataType: "json"
    })


    req.done(function(msg){
        console.log(msg)
    })

    req.fail(function( jqXHR, textStatus ) {
        console.log( "Request failed: " + textStatus );
    });
})

