globalThis.Laman = {
    content: `
    <style>

        #editor{
          position: fixed;
          display: none;
          width: 100vw;
          height: 100vh;
          background: #333;
          z-index: 999;
          top:0;
          left: 0;
        }

        .head{
            display: none;
        }

        .span-grid{
          display: grid;
          grid-template-columns: 120px auto 350px;
        }

        .span-grid span{
          border-right: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
        }
    </style>

    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-laman">

                </div>
            </div>
        </div>
    </div>


    <div class="modal" tabindex="-1" id="pesan" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Pesan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Data Di Set Sebagai Laman About, hanya diperbolehkan untuk mengedit bagian editor.</p>
            <a class="btn btn-primary" href="/about" target="_blank">Buka Laman</a>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>



    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Laman";
            table('laman')
            .title('Laman')
            .equals(['kode'])
            .createForm({
                kode:{
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan kode',
                    title: 'Kode'
                },
                judul:{
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan password',
                    title: 'Judul'
                }
            })
            .row({
                kode: 'Kode',
            })
            .displayNone([0])
            .addRow({
                a: {
                    key: ['kode', 'judul'],
                    position: 'center',
                    title: 'Upload Cover',
                    id: 'action-{{kode}}',
                    template: `
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="span-grid">
                                        <span>{{kode}}</span>
                                        <span>{{judul}}</span>
                                        <div>
                                            <button class="btn mt-2 mb-2 btn-sm btn-primary mr-2" view-{{kode}} onclick="window.open('/id/{{judul}}'.replace(/ /g, '-', '_blank'))">lihat laman</button>
                                            <button {{updateid}} class="btn mt-2 mb-2 btn-sm btn-success mr-2">ubah judul</button>
                                            <button editor-open data-id="{{kode}}" class="btn mt-2 mb-2 btn-sm btn-primary">Open Editor</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }
            })
            .afterload(function(a, b , s){
                var id = '[data-update'+a.data.id+']';
                var gid = 'data-update'+a.data.id;

                var d = new db;

                d.table('setting')
                .condition([
                    {opsi: '', data: ['kode', '=', '"about-set"']}
                ])
                .get(function(t){
                  s()
                    t = binary2text(t[0].setting);
                    t = JSON.parse(t);
                    t = t.kontent;

                    console.log('s')
                    
                    
                    var editorOpen = Array.from(document.querySelectorAll('[editor-open]'));
                    editorOpen.forEach(function(el){
                        console.log(el);
                        el.addEventListener('click', function(){
                            var code = this.getAttribute('data-id');
                            globalThis.idlaman = code;
                            location.href = "#/build";
                        }, false)
                    })

                    Array.from(document.querySelectorAll(id)).forEach(function(y){
                        var getData = y.getAttribute(gid);
                        getData = binary2text(getData);
                        if (getData.judul == t) {

                            document.querySelector('[view-'+getData.kode+']').removeAttribute('onclick');

                            document.querySelector('[view-'+getData.kode+']')
                            .addEventListener('click',function(){
                                window.open('/about', '_blank');
                            },false)

                            y.removeAttribute(gid);
                            y.addEventListener('click', function(){
                                $('#pesan').modal('show')
                            },false)

                        }

                    })


                })

                
            })
            .load()
        })
    }
}
