globalThis.Kategori_properti = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-kategori_properti">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Kategori Properti";
            table('kategori_properti')
            .title('Kategori Properti')
            .equals(['kategori_id'])
            .primarykey('kategori_id')
            .createForm({
                kategori_id: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan Nama Kategori',
                    title: 'Nama Kategori'
                }
                ,kategori_nama: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Nama Kategori',
                    title: 'Nama Kategori'
                },
                urut: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan urutan',
                    title: 'Urut'
                }
            })
            .row({
                kategori_nama: 'Kategori Nama',
                urut: 'Urut'
            })
            .afterload(function(s, k, v){
                db()
                .table(s.data.table)
                .select('urut')
                .limit(0,1)
                .order('urut', 'DESC')
                .get(function(p){
                    console.log(p)
                  if(p.length > 0){
                    globalThis.newId = Number(p[0].urut) + 1;
                    v()
                  }else{
                    globalThis.newId = 1;
                    v()
                  }
                })
            })
            .oncreate(function(){
              document.getElementById('urut').value = globalThis.newId;
            })
            .load()

        })
    }
}
