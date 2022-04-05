globalThis.Blog = {
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
                <div class="card-body" id="load-blog">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Blog";
            table('blog')
            .wrap('')
            .modal('xl')
            .title('Blog')
            .equals(['kode'])
            .select(['kode', 'judul', 'slug', 'kategori', 'sub','user', 'deskripsi'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan Nama',
                    title: 'Kode'
                },
                judul: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan judul',
                    title: 'Judul'
                },
                slug: {
                    form: 'input',
                    type: 'slug',
                    placeholder: 'Inputkan slug',
                    from: 'judul',
                    title: 'Slug'
                },
                kategori: {
                    form: 'input',
                    type: 'select',
                    table: 'kategori_blog',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    relation: 'sub',
                    relationId: 'kategori',
                    placeholder: 'Inputkan judul',
                    title: 'Kategori'
                },
                sub: {
                    form: 'input',
                    type: 'select',
                    table: 'subkategori',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    pin: 'kategori',
                    placeholder: 'Inputkan judul',
                    title: 'Sub Kategori'
                },
                deskripsi: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'deskripsi singkat artikel untuk seo',
                    title: 'Deskripsi Singkat'
                },
                artikel: {
                    form: 'input',
                    type: 'note',
                    placeholder: 'Inputkan hp',
                    title: 'Artikel'
                },
                user: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan hp',
                    title: 'Artikel',
                    default: user.username
                }
            })
            .displayNone([0])
            .row({
                kode: 'Kode',
            })
            .addRow({
                action: {
                    key: ['kode'],
                    position: 'center',
                    title: 'Upload Cover',
                    id: 'action-{{kode}}',
                    template: `
                        <style>
                            #images-{{kode}}{
                                height: 150px;
                                background-image: url('assets/upload/blog/{{kode}}.jpg?v={{times}}');
                                background-size: contain;
                                background-position: center;
                                background-repeat: no-repeat;
                            }

                        </style>
                        <div id="images-{{kode}}">
                        </div>
                        <input id="action-{{kode}}" type="file" class="form-control" accept="image/png, image/jpeg" >
                        <div class="upload-loader" style="border: none;">
                            <div class="upload-text" style="border: none;">
                                <div id="upload-file-{{kode}}" style="border: none; display: none;">0</div>
                                <p id="detail-{{kode}}" style="border: none; display: none;">
                                </p>
                                <button id="upload-file-s-{{kode}}" class="btn btn-sm btn-primary form-control">Upload</button>
                            </div>
                        </div>
                    `,
                    load: function(a, gs){
                            const file = document.querySelector('#action-'+a.kode)
                            file.addEventListener('change', function(){
                              var file = this.files[0];
                              document.getElementById('detail-'+a.kode).style.display = 'block';
                              document.getElementById('detail-'+a.kode).innerHTML = `
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
                               document.getElementById('upload-file-s-'+a.kode).addEventListener('click', function(){
                                    document.getElementById('detail-'+a.kode).style.display = 'none';
                                    document.getElementById('upload-file-'+a.kode).style.display = 'block';
                                    uploadProsses()
                               }, false)
                               function uploadProsses(){
                                    if (start < length) {
                                        document.getElementById('upload-file-'+a.kode).innerText = Math.round(((start+1) / length) * 100)+'%';
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
                                                tipe: 'assets/upload/blog/'+a.kode+'.jpg'
                                            },
                                            success: function(e){
                                               console.log('saved')
                                               document.getElementById('images-'+a.kode).style.backgroundImage = 'url("assets/upload/blog/'+a.kode+'.jpg?v='+Date.now()+'")';
                                               document.getElementById('detail-'+a.kode).style.display = 'none';
                                               document.getElementById('upload-file-'+a.kode).style.display = 'none';
                                            }
                                        })
                                    }
                               }
                              }, false);
                              if (file) {
                                reader.readAsDataURL(file);
                              }
                        }, false)
                    }
                },
                 one: {
                    key: ['kode', 'judul', 'slug', 'kategori', 'sub', 'user'],
                    position: 'center',
                    title: 'Detail Blog',
                    id: 'action-{{kode}}',
                    template: `
                        <div class="text-left">
                        <div class="text-right mb-3">
                            <button {{updateid}} class="btn btn-success"><i class="fas fa-edit"></i></button>
                        </div>
                         <table class="table">
                            <tr>
                                <td>Judul</td><td>:</td><td>{{judul}}</td>
                            </tr>
                            <tr>
                                <td>link share</td><td>:</td><td><a href="/blog/{{slug}}" target=”_blank”>blog/{{slug}}</a></td>
                            </tr>
                            <tr>
                                <td>Kategeori</td><td>:</td><td>{{kategori}}</td>
                            </tr>
                            <tr>
                                <td>Sub Kategori</td><td>:</td><td>{{sub}}</td>
                            </tr>
                            <tr>
                                <td>Pengunjung</td><td>:</td><td>0 people</td>
                            </tr>
                            <tr>
                                <td>User</td><td>:</td><td>{{user}}</td>
                            </tr>
                         </table>
                        </div>
                    `
                }
            })
            .onupdate(function(a, b, c){

                globalThis.kodeFile = b.kode;

                document.getElementById('judul').addEventListener('keyup',function(){
                    var s = this;
                    setTimeout(function(){
                         document.getElementById('slug').value = s.value.replace(/ /g, '-').replace(/\?/g, '-').replace(/\//g, '-').replace(/\'/g, '-').replace(/\"/g, '-').toLowerCase();
                    },10)
                })

                document.getElementById('slug').addEventListener('focus',function(){
                    var s = this;
                    setTimeout(function(){
                        s.value = s.value.replace(/ /g, '-').replace(/\?/g, '-').replace(/\//g, '-').replace(/\'/g, '-').replace(/\"/g, '-').toLowerCase();
                    },10)
                })

                var form = document.getElementById(a.data.formId+a.data.id)

                var node1 = form.children[0];

                if(document.getElementById('images-load') == null){

                    var formImage = div().id('images-load').class('col-12')

                    formImage.child(
                        div().id('detail-er').html(`
                            <img width="350px" src="assets/upload/blog/${b.kode}.jpg?v='${Date.now()}" />
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
                                    var kode = document.getElementById('kode').value;
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
                                                        tipe: 'assets/upload/blog/'+kode+'.jpg'
                                                    },
                                                    success: function(e){

                                                        var imgUrl = 'assets/upload/blog/'+kode+'.jpg?v='+Date.now();

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

                function decodeHtml(text) {
                    return text
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g , '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g,"'");
                }
                c.table('blog')
                .condition([
                    {opsi: '', data: ['kode', '=', `'${b.kode}'`]}
                ])
                .get(function(a){
                    var s = binary2text(JSON.parse(decodeHtml(a[0].artikel)).kontent);
                    $('#artikel').summernote('code', s);
                    $('#artikel').summernote({
                       height: 200,
                       toolbar: [
                        ['style', ['style']],
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['insert', [ 'ajaximageupload', 'link', 'video', 'table']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['view', ['fullscreen', 'codeview', 'help']],
                        ['height', ['height']]
                       ]
                    });
                })
                setTimeout(function(){
                },1000)
            })
            .oncreate(function(news){

                var form = document.getElementById(news.data.formId+news.data.id)

                var node1 = form.children[0];

                document.getElementById('judul').addEventListener('keyup',function(){
                    var s = this;
                    setTimeout(function(){
                         document.getElementById('slug').value = s.value.replace(/ /g, '-').replace(/\?/g, '-').replace(/\//g, '-').replace(/\'/g, '-').replace(/\"/g, '-').toLowerCase();
                    },10)
                })

                document.getElementById('slug').addEventListener('focus',function(){
                    var s = this;
                    setTimeout(function(){
                        s.value = s.value.replace(/ /g, '-').replace(/\?/g, '-').replace(/\//g, '-').replace(/\'/g, '-').replace(/\"/g, '-').toLowerCase();
                    },10)
                })

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
                                    var kode = document.getElementById('kode').value;
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
                                                        tipe: 'assets/upload/blog/'+kode+'.jpg'
                                                    },
                                                    success: function(e){

                                                        var imgUrl = 'assets/upload/blog/'+kode+'.jpg?v='+Date.now();

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

                var autocode = 'blog-'+user.id+'-'+tanggal().normal;
                var s = new db;
                s.table('blog')
                .condition([
                    {opsi: '', data: ['kode', 'LIKE', `"${autocode}%"`]}
                ])
                .select(" count(*) as num ")
                .get(function(r){
                    document.getElementById('kode').value = autocode+'-'+(Number(r[0].num) + 1);
                    globalThis.kodeFile = autocode+'-'+(Number(r[0].num) + 1);
                })

            })
            .onsave(function(tab){
                tab.load();
            })
            .afterload(function(w,t,k){
                console.log('getit')
                $.ajax({
                    url: '/get-file',
                    method: 'POST',
                    dataType: 'text',
                    data: {
                        _token: $('meta[name=csrf-token]').attr('content'),
                        dir: 'assets/upload/blog/',
                    },
                    success: function(e){
                      k()

                        e = JSON.parse(e);
                        var d = Object.keys(e);


                        var imagechoice = div();

                        console.log(d)
                        for(const y of d){

                            if (e[y] != undefined) {
                                imagechoice.child(
                                    el('img').src('/assets/upload/blog/'+e[y])
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
                                                                tipe: 'assets/upload/blog/'+kode+'.jpg'
                                                            },
                                                            success: function(e){

                                                                var imgUrl = 'assets/upload/blog/'+kode+'.jpg?v='+Date.now();

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
            .order('dibuat', 'DESC')
            .load()

        })
    }
}
