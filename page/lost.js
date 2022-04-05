globalThis.lostData = {
    html: `
        <style>
            *{
                padding: 0;
                margin:0;
                font-family: arial;
            }
            .container-warning{
                border-radius: 4px;
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card-warning h1{
                margin-bottom: 10px;
            }
            .card-warning p{
                margin-bottom: 8px;
            }
            .card-warning{
                margin: auto;
                padding: 18px;
                box-shadow:  0 0 10px rgba(125,125,125, 0.3);  
                text-align: center;
            }

            #reconect{
                font-size: 14pt;
                font-weight: bold;
            }

        </style>
        <div class="container-warning">
            <div class="card-warning">
                <h1>500</h1>
                <p>
                    sorry you have lost connection !
                </p>
                <p>
                    try connect again on <span id="reconect">15</span>
                </p>
            <div>
        <div>
    
    `,
    script: function(){
        setTimeout(function() {
            var id = document.getElementById('reconect');  
            var nbr = Number(id.innerText)
            console.log(nbr);

            (function lisvetime(a) {
                if (a == 0) {
                    window.location.reload();
                }else{
                    id.innerText = a - 1;
                    setTimeout(function(){
                        lisvetime(a-1);
                    },1000)                    
                }
            })(nbr)

        })
    }
}