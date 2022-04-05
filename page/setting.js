globalThis.Setting = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-setting">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Setting";
            table('setting')
            .title('Setting')
            .createForm({
                kode: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan judul',
                    title: 'Judul'
                },
                tipe: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Deskripsi',
                    title: 'Tipe'
                },
                setting: {
                    form: 'input',
                    type: 'area',
                    placeholder: 'Inputkan setting',
                    title: 'Setting'
                }
            })
            .row({
                kode: 'Kode',
                tipe: 'Tipe',
            })
            .onupdate(function(a, b){
                
                // console.log(a)s
                
                var dangerButton = document.querySelector('.btn-danger');
                dangerButton.style.display = 'none';

                document.getElementById('kode').setAttribute('readonly', true);
                document.getElementById('kode').style.background = '#dff';

                if (b.setting != "") {
                        document.getElementById('setting').value = JSON.parse(binary2text(b.setting)).kontent;
                }
                
                var editor = CodeMirror.fromTextArea(document.getElementById('setting'), {
                    lineNumbers: true
                });

                document.getElementById('setting').value = b.setting;

                editor.on("change", function(){
                    var val = text2Binary(JSON.stringify({
                        kontent: editor.getValue()
                    }));

                    document.getElementById('setting').value = val;
                })
                editor.on("keyup", function(){

                    var val = text2Binary(JSON.stringify({
                        kontent: editor.getValue()
                    }));

                    document.getElementById('setting').value = val;

                })

                    document.getElementById('tipe').setAttribute('disabled', true);
                    document.getElementById('setting').placeholder = 'example : ca-pub-2077209355173659'
            })
            .disCreate()
            .load()

        })
    }
}