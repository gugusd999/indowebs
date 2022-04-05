globalThis.Kecamatan = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-kecamatan">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Kecamatan";
            table('kecamatan')
            .title('Kecamatan')
            //.equals(['kode'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan Kode',
                    title: 'Kode'
                },
                regencies: {
                    form: 'input',
                    type: 'select',
                    table: 'regencies',
                    view: ['name'],
                    value: 'id',
                    placeholder: 'Inputkan Regencies',
                    title: 'Kab/Kota'
                },
                name: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kecamatan',
                    title: 'Kecamatan'
                }
            })
            .row({
                kode: 'Kode',
                regencies: 'ID Kab/Kota',
                name: 'Kecamatan',
            })
            .onsave(function(e, s, m){

                var datalama = globalThis.dataMaster['kecamatan'].filter(function(b){
                    if(b.kode != s.kode){
                        return b;
                    }
                })

                if(m != 1){
                  datalama.push(s);
                }

                globalThis.dataMaster['kecamatan'] = datalama;

                e.load()
            })
            .afterload(function(s, k, v){
                db()
                .table(s.data.table)
                .select('kode')
                .limit(0,1)
                .order('kode * 1', 'DESC')
                .get(function(p){
                    console.log(p)
                  if(p.length > 0){
                    globalThis.newId = Number(p[0].kode) + 1;
                    v()
                  }else{
                    globalThis.newId = 1;
                    v()
                  }
                })
            })
            .oncreate(function(){
              document.getElementById('kode').value = globalThis.newId;
            })
            .order('created_at', 'DESC')
            .load()
        })
    }
}
