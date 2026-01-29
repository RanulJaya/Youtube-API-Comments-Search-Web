import '../css/styles.css'


async function testing() {
    const url = 'http://13.236.90.86:443/getURL'

    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json()

        console.log(JSON.stringify(result))
    } catch (error) {
        console.log(error.message);
    }
}   

testing()

function test() {
    console.log("work")
}

test()


// const button = document.getElementById("test")

// button.addEventListener("click", async function(){
//     var req = $.ajax({
//         url:"http://localhost:8000/execApi",
//         method:"POST",
//         data:{title: "test"},
//         dataType: "json"
//     })


//     req.done(function(msg){
//         console.log(msg)
//     })

//     req.fail(function( jqXHR, textStatus ) {
//         console.log( "Request failed: " + textStatus );
//     });
// })

