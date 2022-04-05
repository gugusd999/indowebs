globalThis.Rekening = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-rekening">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Rekening Akuntansi";
            table('rekening')
            .title('Rekening Akuntansi')
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
                ,mainkode: {
                    title: 'Main Account',
                    form: 'input',
                    type: 'select',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    table: 'rekmain',
                }
                ,subkode: {
                    title: 'Sub Account',
                    form: 'input',
                    type: 'select',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    table: 'reksub',
                    relation: 'mainkode',
                    relationId: 'mainkode'
                }
                ,rekbi: {
                    title: 'BI Account',
                    form: 'input',
                    type: 'select',
                    view: ['kode', 'nama'],
                    value: 'kode',
                    table: 'rekbi',
                    relationChange: 'subkode',
                    relationId: 'rekbi',
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