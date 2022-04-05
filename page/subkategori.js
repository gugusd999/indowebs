globalThis.Subkategori = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-subkategori">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Sub Kategori";
            table('subkategori')
            .title('Sub Kategori')
            .equals(['kode'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan Kode',
                    title: 'Kode'
                },
                kategori: {
                    form: 'input',
                    type: 'select',
                    table: 'kategori_blog',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    placeholder: 'Inputkan Kategori',
                    title: 'Kategori'
                },
                nama: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Nama',
                    title: 'Nama Sub Kategori'
                }
            })
            .row({
                kode: 'Kode',
                kategori: 'Kategori',
                nama: 'Nama',
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
                    globalThis.newId = Number(p[0].kode.replace('S-', '')) + 1;
                    v()
                  }
                })
            })
            .order('kode', 'DESC')
            .oncreate(function(f){
              document.getElementById('kode').value = "S-"+f.data.formatId("00000", globalThis.newId);
            })
            .load()
        })
    }
}
