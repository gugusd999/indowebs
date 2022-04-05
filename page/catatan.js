globalThis.catatan = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-catatan">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Page data";
            table('catatan')
            .title('Catatan')
            .createForm({
                kode: {
                  form: 'input',
                  type: 'text',
                  placeholder: 'Write page kode',
                  title: 'Kode'
                }
                ,catatan: {
                  form: 'input',
                  type: 'note',
                  placeholder: 'write note',
                  title: 'Note'
                }
            })
            .oncreate(function(){
              $('#catatan').summernote({
                placeholder: 'Catatan',
                tabsize: 2,
                height: 400
              });
            })
            .onupdate(function(a){
              document.getElementById('kode').setAttribute('readonly', true);
              $('#catatan').summernote({
                placeholder: 'Catatan',
                tabsize: 2,
                height: 400
              });
            })
            .row({
                kode: 'Note Code'
            })
            .order('kode', 'DESC')
            .load()
        })
    }
}
