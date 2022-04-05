globalThis.Reksub = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-reksub">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Sub Rekening";
            table('reksub')
            .title('Data Sub Rekening')
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
                },
                mainkode: {
                    form: 'input',
                    type: 'select',
                    title: 'Main',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    table: 'rekmain',
                },
                rekbi: {
                    form: 'input',
                    type: 'select',
                    title: 'BI',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    table: 'rekbi',
                    relationChange: 'mainkode',
                    relationId: 'rekbi',
                }
            })
            .row({
                kode: 'Kode',
                nama: 'Nama',
                mainkode: 'Main',
                rekbi: 'BI'
            })
            .load()

        })
    }
    
}