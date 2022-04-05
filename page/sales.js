globalThis.Sales = {
    content: `

    <style>

    .container-image{
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(125,125,125,0.5);
  overflow-y: auto;
  padding: 20px;
}

.container-image > div img{
  display: inline-block;
  width: 100%;
  padding: 10px;
}

.container-image > div{
  display: inline-block;
  line-height: 0;
  width: 80vw;
  height: auto;
  overflow-y: auto;
  column-count: 3;
  column-gap: 10px;
  background-color: white;
  padding: 10px;
  margin-left: 10vw;
}

    </style>
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div id="image-choice">
                </div>
                <div class="card-body" id="load-sales">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){

        dataMaster['jk'] = [
            {kode: 'L', nama: 'Laki - laki'},
            {kode: 'P', nama: 'Perempuan'}
        ];

        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Agen";
            table('sales')
            .title('Agen')
            .createForm({
                id: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan Nama',
                    title: 'Nama'
                },
                nama: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Nama',
                    title: 'Nama'
                },
                hp: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan hp',
                    title: 'Hp'
                },
                jk: {
                    form: 'input',
                    type: 'select',
                    placeholder: 'Inputkan jenis kelamin',
                    title: 'Jenis Kelamin',
                    table: 'jk',
                    view: ['nama'],
                    value: 'kode'
                },
                alamat: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan alamat',
                    title: 'Alamat'
                },
                email: {
                    form: 'input',
                    type: 'email',
                    placeholder: 'Inputkan email',
                    title: 'e-mail'
                },
                pass: {
                    form: 'input',
                    type: 'password',
                    placeholder: 'Inputkan password',
                    title: 'Password'
                },
                jabatan: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan jabatan',
                    title: 'Jabatan'
                },
                caption: {
                    form: 'input',
                    type: 'textarea',
                    placeholder: 'Inputkan caption',
                    title: 'Caption'
                }
            })
            .displayNone([0])
            .edt(['id'])
            .row({
                id: 'id',
            })
            .addRow({
                action: {
                    key: ['id'],
                    position: 'center',
                    title: 'Foto',
                    id: 'action-{{id}}',
                    template: `
                        <style>
                            #images-{{id}}{
                                height: 150px;
                                background-image: url('assets/upload/agen/{{id}}.jpg?v={{times}}');
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
                                                tipe: 'assets/upload/agen/'+a.id+'.jpg'
                                            },
                                            success: function(e){
                                               console.log('saved')
                                               document.getElementById('images-'+a.id).style.backgroundImage = 'url("assets/upload/agen/'+a.id+'.jpg?v='+Date.now()+'")';
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
                },
                 one: {
                    key: ['nama', 'hp', 'jk', 'alamat', 'email', 'jabatan', 'caption'],
                    position: 'center',
                    title: 'Profile',
                    id: 'action-{{id}}',
                    template: `
                        <div class="text-left">
                        <div class="text-right mb-3">
                            <button {{updateid}} class="btn btn-sm btn-success"><i class="fas fa-edit"></i></button>
                        </div>
                         <table class="table">
                            <tr>
                                <td>Nama</td><td>:</td><td>{{nama}}</td>
                            </tr>
                            <tr>
                                <td>HP</td><td>:</td><td>{{hp}}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td><td>:</td><td>{{jk}}</td>
                            </tr>
                            <tr>
                                <td>Alamat</td><td>:</td><td>{{alamat}}</td>
                            </tr>
                            <tr>
                                <td>Email</td><td>:</td><td>{{email}}</td>
                            </tr>
                            <tr>
                                <td>Jabatan</td><td>:</td><td>{{jabatan}}</td>
                            </tr>
                            <tr>
                                <td>Caption</td><td>:</td><td>{{caption}}</td>
                            </tr>
                         </table>
                        </div>
                    `
                }
            })

            .onupdate(function(a, b, c){

                globalThis.kodeFile = b.id;

                var form = document.getElementById(a.data.formId+a.data.id)

                var node1 = form.children[0];

                if(document.getElementById('images-load') == null){

                    var formImage = div().id('images-load').class('col-12')

                    formImage.child(
                        div().id('detail-er').html(`

                            <img height="350px" src="assets/upload/agen/${b.id}.jpg?v='${Date.now()}" />
                            <br>
                        `)
                    )

                    formImage.child(
                        div().id('upload-file-er')
                    )

                    formImage.child(
                        div().class('form-group').css('margin-bottom', '10px')
                        .child(
                            el('label').text('gambar').css('display', 'block')
                        )
                        .child(
                            el('button').text('chose file from history').css('margin-right', '10px').class('btn btn-sm btn-primary').click(function(){
                                globalThis['container-image'].parent.style.display = "block";
                            })
                        )
                        .child(
                            el('input').type('file').hold('gambar').id('load-images')
                            .change(function(){
                                    var kode = b.id;
                                    var file = this.files[0];
                                      document.getElementById('detail-er').innerHTML = `
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
                                        uploadProsses()
                                       function uploadProsses(){
                                            if (start < length) {
                                                document.getElementById('upload-file-er').innerText = Math.round(((start+1) / length) * 100)+'%';
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
                                                        tipe: 'assets/upload/agen/'+kode+'.jpg'
                                                    },
                                                    success: function(e){

                                                        var imgUrl = 'assets/upload/agen/'+kode+'.jpg?v='+Date.now();

                                                        document.getElementById('detail-er').innerHTML = `

                                                            <img width="350px" src="${imgUrl}" />

                                                        `;

                                                    }
                                                })
                                            }
                                       }
                                    }, false);
                                    if (file) {
                                        reader.readAsDataURL(file);
                                    }


                            })
                        )
                    )
                    form.insertBefore(formImage.get(), node1);
                }


            })

            .oncreate(function(a,b){

                var blog = new db;
                blog.table(a.data.table)
                blog.nextIncrement()
                blog.get(function(v){

                    var newIncrement = v[0].increment;

                    globalThis.kodeFile = newIncrement;

                    var news = a;

                    var form = document.getElementById(news.data.formId+news.data.id)

                    var node1 = form.children[0];

                    if(document.getElementById('images-load') == null){

                        var formImage = div().id('images-load').class('col-12')

                        formImage.child(
                            div().id('detail-er')
                        )

                        formImage.child(
                            div().id('upload-file-er')
                        )

                        formImage.child(
                            div().class('form-group').css('margin-bottom', '10px')
                            .child(
                                el('label').text('gambar').css('display', 'block')
                            )
                            .child(
                                el('button').text('chose file from history').css('margin-right', '10px').class('btn btn-sm btn-primary').click(function(){
                                    globalThis['container-image'].parent.style.display = "block";
                                })
                            )
                            .child(
                                el('input').type('file').hold('gambar').id('load-images')
                                .change(function(){
                                        var kode = newIncrement;
                                        var file = this.files[0];
                                          document.getElementById('detail-er').innerHTML = `
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
                                            uploadProsses()
                                           function uploadProsses(){
                                                if (start < length) {
                                                    document.getElementById('upload-file-er').innerText = Math.round(((start+1) / length) * 100)+'%';
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
                                                            tipe: 'assets/upload/agen/'+kode+'.jpg'
                                                        },
                                                        success: function(e){

                                                            var imgUrl = 'assets/upload/agen/'+kode+'.jpg?v='+Date.now();

                                                            document.getElementById('detail-er').innerHTML = `

                                                                <img width="350px" src="${imgUrl}" />

                                                            `;

                                                        }
                                                    })
                                                }
                                           }
                                        }, false);
                                        if (file) {
                                            reader.readAsDataURL(file);
                                        }


                                })
                            )
                        )

                        form.insertBefore(formImage.get(), node1);
                    }

                })
            })
            .afterload(function(y,q,s){

                fetch('https://masuksini.com/cek/rates')
                .then(response => response.json())
                .then(res => {
                    console.log(res)
                })

                fetch('/cek/sales2')
                .then(response => response.json())
                .then(res => {
                })

                $.ajax({
                    url: '/get-file',
                    method: 'POST',
                    dataType: 'text',
                    data: {
                        _token: $('meta[name=csrf-token]').attr('content'),
                        dir: 'assets/upload/agen/',
                    },
                    success: function(e){

                        s()

                        e = JSON.parse(e);
                        var d = Object.keys(e);


                        var imagechoice = div();

                        console.log(d)
                        for(const y of d){

                            if (e[y] != undefined) {
                                imagechoice.child(
                                    el('img').src('/assets/upload/agen/'+e[y])
                                    .click(function(){
                                        globalThis['container-image'].parent.style.display = "none";
                                        fetch(this.src)
                                        .then(res => res.blob())
                                        .then(blob => {
                                            console.log(blob)
                                            var file = new File([blob], 'file.jpg');

                                            var kode = globalThis.kodeFile;

                                            document.getElementById('detail-er').innerHTML = `
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
                                                uploadProsses()
                                               function uploadProsses(){
                                                    if (start < length) {
                                                        document.getElementById('upload-file-er').innerText = Math.round(((start+1) / length) * 100)+'%';
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
                                                                tipe: 'assets/upload/agen/'+kode+'.jpg'
                                                            },
                                                            success: function(e){

                                                                var imgUrl = 'assets/upload/agen/'+kode+'.jpg?v='+Date.now();

                                                                document.getElementById('detail-er').innerHTML = `

                                                                    <img width="350px" src="${imgUrl}" />

                                                                `;


                                                            }
                                                        })
                                                    }
                                               }
                                            }, false);
                                            if (file) {
                                                reader.readAsDataURL(file);
                                            }

                                        })
                                    })
                                )
                            }


                        }

                        var l = div()
                        .class("container-image").id('container-image')
                        .child(imagechoice)


                        domp('image-choice', l)


                    }
                })

            })
            .order('id', 'DESC')
            .load()
        })
    }
}
