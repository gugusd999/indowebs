globalThis.Config_auto_jurnal = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-config_auto_jurnal">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            // var newTable = {
            //     kode: char(),
            //     keterangan: char(),
            //     ppn: char(),
            //     created_at: timestamp(),
            //     updated_at: timeupdate()
            // }

            // db()
            // .table('subgolongan')
            // .createTable(newTable)
            // .get(function(){});

            document.getElementById('app-content-title').innerText = "Konfigurasi Transaksi ke GL";
            table('config_auto_jurnal')
            .title('Konfigurasi Transaksi ke GL')
            .disCreate()
            .createForm({
                nama: {
                    form: 'input',
                    type: 'readonly',
                    placeholder: 'Inputkan Nama',
                    title: 'Nama'
                }
                ,kode: {
                    form: 'input',
                    type: 'select',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    table: 'rekening',
                    title: 'Kode',
                    change: function(a){
                        var lpo = dataMaster['rekening'];
                        var getVal = this.value;
                        document.getElementById('keterangan').value = lpo.filter(function(x,i) {
                            if (x.kode == getVal) {
                                return x
                            }
                        })[0].nama
                    }
                },
                keterangan: {
                    form: 'input',
                    type: 'readonly',
                    placeholder: 'Inputkan keterangan',
                    title: 'Keterangan'
                }
            })
            .row({
                nama: 'Nama',
                kode: 'Kode',
                keterangan: 'Keterangan'
            })
            .load()

        })
    }
    
}