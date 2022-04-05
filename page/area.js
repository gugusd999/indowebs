globalThis.Area = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-area">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Area";
            table('area')
            .title('Area')
            .equals(['kode'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan kode',
                    title: 'id'
                },
                regencies: {
                    form: 'input',
                    type: 'select',
                    table: 'regencies',
                    view: ['name'],
                    value: 'id',
                    relation: 'kecamatan',
                    relationId: 'regencies',
                    placeholder: 'Inputkan Regencies',
                    title: 'Kab/Kota'
                },
                kecamatan: {
                    form: 'input',
                    type: 'select',
                    table: 'kecamatan',
                    view: ['name'],
                    value: 'kode',
                    pin: 'regencies',
                    placeholder: 'Inputkan Kecamatan',
                    title: 'Kecamatan'
                },
                name: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Area',
                    title: 'Area'
                }
            })
            .row({
                url: 'Url',
                name: 'Page Name',
                created_at: 'Created At',
                updated_at: 'Updated At'
            })
            .onsave(function(e, s, m){

                var datalama = globalThis.dataMaster['area'].filter(function(b){
                    if(b.kode != s.kode){
                        return b;
                    }
                })

                if(m != 1){
                  datalama.push(s);
                }

                globalThis.dataMaster['area'] = datalama;

                e.load()
            })
            .selectAction(function(s, v, r){
              console.log(v);
                if(v == 'kecamatan'){

                    var name = globalThis.dataMaster['regencies'].filter(function(t){
                        if(t.id == s.data.regencies){
                            return t
                        }
                    });
                    if(name.length > 0){
                        name = name[0];
                        var op = `<option value="${s.data.regencies}">${name.name}</option>`;
                        document.getElementById('regencies').innerHTML = op;
                    }
                }
            })
            .afterload(function(s, k, v){
                db()
                .table(s.data.table)
                .select('kode')
                .limit(0,1)
                .order('kode * 1', 'DESC')
                .get(function(p){
                  if(p.length > 0){
                    globalThis.newId = Number(p[0].kode) + 1;
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
