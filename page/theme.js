globalThis.theme = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-theme">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Page data";
            table('theme')
            .title('Theme')
            .disableback()
            .createForm({
                kode: {
                  form: 'input',
                  type: 'text',
                  placeholder: 'Write kode',
                  title: 'Kode'
                }
                ,name: {
                  form: 'input',
                  type: 'text',
                  placeholder: 'write theme name',
                  title: 'Theme Name'
                }
                ,status: {
                  form: 'input',
                  type: 'text',
                  placeholder: 'type 1 to active and 0 to deactive',
                  title: 'Status'
                }
                ,kontent_code: {
                  form: 'input',
                  type: 'note',
                  placeholder: 'write content',
                  title: 'Content'
                }
            })
            .oncreate(function(){
              globalThis.codePlay('kontent_code')
            })
            .onupdate(function(a){
              globalThis.codePlay('kontent_code')
            })
            .row({
                kode: 'Kode',
                name: 'Theme Name',
                status: 'Status'
            })
            .order('kode', 'DESC')
            .load()
        })
    }
}
