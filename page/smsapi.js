globalThis.Smsapi = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-6 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    
                    <h1>Api menggunakan Twillio</h1>
                    <p>
                        untuk mendaftar Twillio silahakan klik link berikut <a target="__blank" href="https://www.twilio.com/">Twillio</a>
                    </p>

                </div>
            </div>
        </div>
        <div class="col-xl-6 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    
                   <form>
                   <h3>Setting</h3>
                    <div class="form-group">
                        <input type="text" id="number" class="form-control" placeholder="twillio number" />
                    </div>
                    <div class="form-group">
                        <input type="text" id="sid" class="form-control" placeholder="twillio Sid" />
                    </div>
                    <div class="form-group">
                        <input type="text" id="token" class="form-control" placeholder="twillio Token" />
                    </div>
                    <div>
                        <button type="button" id="simpan-setting" class="btn btn-primary w-100">Simpan</button>
                    </div>
                   </form>

                </div>
            </div>
        </div>
    </div>
    
    `,
    action: function(){


        setTimeout(function(){

            function __id(a){
                return document.getElementById(a);
            }

            $.ajax({
                url: '/json-setting-get',
                success: function(response){
                    response = JSON.parse(response);

                    Object.keys(response).forEach(function(elm){

                        __id(elm).value = response[elm];

                    })


                } 
            })

            document.getElementById('simpan-setting').addEventListener('click', function(){

                var data = {
                    number: __id('number').value,
                    sid: __id('sid').value,
                    token: __id('token').value
                }

                $.ajax({
		            url: '/json-setting',
                    method: "post",
                    dataType: "text",
                    data: {
                        _token: $('meta[name=csrf-token]').attr('content'),
                        data: JSON.stringify(data)
                    },
                    success: function(response){
                        alert('api token disimpan')
                    }
                })

            }, false)

            
        })
    }
}