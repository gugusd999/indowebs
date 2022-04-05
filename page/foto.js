globalThis.Foto = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-foto">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){


        globalThis.dataMaster['katfo'] = [
            {kode: 'foto', name: 'Foto'},
            {kode: 'banner', name: 'Banner'},
            {kode: 'pbb', name: 'PBB'},
            {kode: 'sertifikat', name: 'Sertifikat'},
            {kode: 'blueprint', name: 'Blueprint'}
        ];


        var fotoFilter = localStorage.getItem('fotoFilter');

        console.log(fotoFilter);

        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Foto";
            table('foto')
            .title('Foto')
            .createForm({
                idprop: {
                    form: 'input',
                    type: 'readonly',
                    placeholder: 'Inputkan properti id',
                    title: 'id properti',
                    default: fotoFilter
                },
                urut: {
                    form: 'input',
                    type: 'number',
                    placeholder: 'Inputkan urut',
                    title: 'Urut'
                },
                kategori: {
                    form: 'input',
                    type: 'select',
                    table: 'katfo',
                    view: ['name'],
                    value: 'kode',
                    placeholder: 'Inputkan kategori',
                    title: 'Kategori'
                }
            })
            .row({
                id: 'Id Foto',
            })
            .filter({
                idprop: fotoFilter
            })
            .back('properti')
            .displayNone([0])
            .addRow({
                details: {
                    key: ['id', 'urut', 'kategori'],
                    position: 'center',
                    title: 'Details',
                    id: 'action-{{id}}',
                    template: `
                        <style>
                        </style>
                        <div style="border: none;">
                            <div>id foto : {{id}}</div>
                            <div>Urutan : {{urut}}</div>
                            <div>Kategori : {{kategori}}</div>
                            <button {{updateid}} class="w-100 btn btn-sm btn-success mt-3">Ubah</button>
                        </div>
                    `
                },
                action: {
                    key: ['id'],
                    position: 'center',
                    title: 'Upload Image',
                    id: 'action-{{id}}',
                    template: `
                        <style>
                            #images-{{id}}{
                                height: 150px;
                                background-image: url('https://masuksini.com/sistem-api/androapi/upload/foto/{{id}}.jpg?v={{times}}');
                                background-size: contain;
                                background-position: center;
                                background-repeat: no-repeat;
                            }

                        </style>
                        <div id="images-{{id}}">
                        </div>
                        <input id="action-{{id}}" type="file" class="form-control" accept="image/png, image/jpeg" >
                        <div class="upload-loader" style="border: none;">
                            <div class="upload-text" style="border: none;">
                                <div id="upload-file-{{id}}" style="border: none; display: none;">0</div>
                                <p id="detail-{{id}}" style="border: none; display: none;">
                                </p>
                                <button id="upload-file-s-{{id}}" class="btn btn-sm btn-primary form-control">Upload</button>
                            </div>
                        </div>
                    `,
                    load: function(a, gs){
                            const file = document.querySelector('#action-'+a.id)
                            file.addEventListener('change', function(){
                              var file = this.files[0];
                              document.getElementById('detail-'+a.id).style.display = 'block';
                              document.getElementById('detail-'+a.id).innerHTML = `
                                nama file : ${file.name} <br>
                                ukuran : ${file.size / 1000}kb <br>
                                type file : ${file.type}kb
                              `;
                              const reader = new FileReader();
                              reader.addEventListener("load", function () {
                               var base64 = reader.result;
                               var rendr = base64.split("base64,");
                               rendr = rendr[1];
                               rendr = rendr.match(/.{1,150000}/g);
                               var length = rendr.length;
                               var start = 0;

                               document.getElementById('upload-file-s-'+a.id).addEventListener('click', function(){

                                    document.getElementById('detail-'+a.id).style.display = 'none';
                                    document.getElementById('upload-file-'+a.id).style.display = 'block';

                                    uploadProsses()

                               }, false)

                               function uploadProsses(){
                                    if (start < length) {
                                        document.getElementById('upload-file-'+a.id).innerText = Math.round(((start+1) / length) * 100)+'%';
                                        $.ajax({
                                            url: '/admin/upload',
                                            method: 'POST',
                                            dataType: 'text',
                                            data: {
                                                _token: $('meta[name=csrf-token]').attr('content'),
                                                ok: rendr[start],
                                                start: start,
                                                tipe: 'upload'
                                            },
                                            success: function(e){
                                                console.log(e.length)
                                                start += 1;
                                                uploadProsses();
                                            }
                                        })
                                    }else{
                                        $.ajax({
                                            url: '/admin/upload',
                                            method: 'POST',
                                            dataType: 'text',
                                            data: {
                                                _token: $('meta[name=csrf-token]').attr('content'),
                                                tipe: '../../sistem-api/androapi/upload/foto/'+a.id+'.jpg'
                                            },
                                            success: function(e){
                                               console.log('saved')
                                               document.getElementById('images-'+a.id).style.backgroundImage = 'url("https://masuksini.com/sistem-api/androapi/upload/foto/'+a.id+'.jpg?v='+Date.now()+'")';
                                               document.getElementById('detail-'+a.id).style.display = 'none';
                                               document.getElementById('upload-file-'+a.id).style.display = 'none';
                                            }
                                        })
                                    }
                               }
                               // uploadProsses()
                              }, false);
                              if (file) {
                                reader.readAsDataURL(file);
                              }
                          }, false)
                    }
                }
            })

            .load()

        })
    }
}
