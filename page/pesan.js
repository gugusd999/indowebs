globalThis.Pesan = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-pesan">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Pesan";
            table('pesan')
            .title('Pesan')
            .equals(['id'])
            .createForm({
                email: {
                    form: 'input',
                    type: 'email',
                    placeholder: 'Inputkan kode',
                    title: 'email'
                },
                nama: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan nama kategori',
                    title: 'Nama Kategori'
                }
            })
            .order('id','DESC')
            .row({
                nama: 'Nama',
                email: 'Email',
                telp: 'Telp',
                transaksi: 'Transaksi',
                pesan: 'Pesan',
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
                v()
            })
            .oncreate(function(f){
              document.getElementById('kode').value = "B-"+f.data.formatId("00000", globalThis.newId);
            })
            .disCreate()
            .load()

        })
    }
}
