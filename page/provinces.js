globalThis.Provinces = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-provinces">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Provinsi";
            table('provinces')
            .title('Provinsi')
            .equals(['id'])
            .createForm({
                id: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan kode',
                    title: 'id'
                },
                name: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Provinsi',
                    title: 'Provinsi'
                }
            })
            .row({
                id: 'Kode',
                name: 'Provinsi',
            })
            .order('id', 'desc')
            .onsave(function(e, s, m){


                var datalama = globalThis.dataMaster['provinces'].filter(function(b){
                    if(b.id != s.id){
                        return b;
                    }
                })

                if(m != 1){
                  datalama.push(s);
                }

                globalThis.dataMaster['provinces'] = datalama;

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
