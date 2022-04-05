globalThis.Rekmain = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-rekmain">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Induk Rekening";
            table('rekmain')
            .title('Data Induk Rekening (main account)')
            .equals(['kode'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kode',
                    title: 'Kode'
                },
                nama: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Nama',
                    title: 'Nama'
                }
                ,rekbi: {
                    title: 'BI',
                    form: 'input',
                    type: 'select',
                    view: ['kode', 'nama'],
                    value: ['kode'],
                    table: 'rekbi',
                }
            })
            .row({
                kode: 'Kode',
                nama: 'Nama',
                rekbi: 'BI'
            })
            .load()

        })
    }
    
}