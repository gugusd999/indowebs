globalThis.Kategori_blog = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-kategori_blog">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){

        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Kategori Blog";
            table('kategori_blog')
            .title('Kategori Blog')
            .equals(['kode'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan kode',
                    title: 'Kode'
                },
                nama: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan nama kategori',
                    title: 'Nama Kategori'
                }
            })
            .order('kode','DESC')
            .row({
                kode: 'Kode',
                nama: 'Nama Kategori',
            })
            .onsave(function(e, s, m){

                var datalama = globalThis.dataMaster[e.data.table].filter(function(b){
                    if(b.kode != s.kode){
                        return b;
                    }
                })

                if(m != 1){
                  datalama.push(s);
                }

                globalThis.dataMaster[e.data.table] = datalama;

                e.load()
            })
            .afterload(function(s, k, v){
                db()
                .table(s.data.table)
                .select('kode')
                .limit(0,1)
                .order('kode', 'DESC')
                .get(function(p){
                  if(a.length > 0){
                    globalThis.newId = Number(p[0].kode.replace('B-', '')) + 1;
                    v()
                  }
                })
            })
            .oncreate(function(f){
              document.getElementById('kode').value = "B-"+f.data.formatId("00000", globalThis.newId);
            })
            .load()

        })
    }
}
