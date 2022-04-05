globalThis.Regencies = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-regencies">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Kota/Kabupaten";
            table('regencies')
            .title('Regencies Kota/Kabupaten')
            .equals(['id'])
            .order('id', 'DESC')
            .createForm({
                id: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan kode',
                    title: 'id'
                },
                province_id: {
                    form: 'input',
                    type: 'select',
                    table: 'provinces',
                    view: ['name'],
                    value: 'id',
                    placeholder: 'Inputkan Provinsi',
                    title: 'Provinsi'
                },
                name: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan nama kota/kabupaten',
                    title: 'Kota/ Kabupaten'
                }
            })
            .row({
                id: 'Kode',
                name: 'Regencies',
            })
            .onsave(function(e, s, m){

                var datalama = globalThis.dataMaster['regencies'].filter(function(b){
                    if(b.id != s.id){
                        return b;
                    }
                })

                if(m != 1){
                  datalama.push(s);
                }

                globalThis.dataMaster['regencies'] = datalama;

                e.load()
            })
            .afterload(function(s, k, v){
                db()
                .table(s.data.table)
                .select('id')
                .limit(0,1)
                .order('id', 'DESC')
                .get(function(p){
                  if(a.length > 0){
                    globalThis.newId = Number(p[0].id) + 1;
                    v()
                  }
                })
            })
            .oncreate(function(){
              document.getElementById('id').value = globalThis.newId;
            })
            .load()
        })
    }
}
