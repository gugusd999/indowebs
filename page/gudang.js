globalThis.Gudang = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-gudang">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Gudang";
            table('gudang')
            .title('Gudang')
            .equals(['kode'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kode',
                    title: 'Kode'
                },
                keterangan: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan keterangan',
                    title: 'Keterangan'
                }
            })
            .row({
                kode: 'Kode',
                keterangan: 'Ketarangan'
            })
            .load()
        })
    }
}