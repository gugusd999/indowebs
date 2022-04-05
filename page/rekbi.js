globalThis.Rekbi = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-rekbi">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){

            globalThis.dataMaster['dbk'] = [
                {kode: 'D', nama: 'Debet'},
                {kode: 'C', nama: 'Kredit'}
            ];

            globalThis.dataMaster['bi'] = [
                {kode: 'B', nama: 'Balance'},
                {kode: 'I', nama: 'Income'}
            ];

            document.getElementById('app-content-title').innerText = "Data Rek BI";
            table('rekbi')
            .title('Rek BI')
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
                ,dk: {
                    title: 'Debet/ Kredit',
                    form: 'input',
                    type: 'select',
                    view: ['kode', 'nama'],
                    value: ['kode'],
                    table: 'dbk',
                },
                balinc: {
                    title: 'Balance/ Income',
                    form: 'input',
                    type: 'select',
                    view: ['kode', 'nama'],
                    value: ['kode'],
                    table: 'bi',
                },
                urutfbi: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kelas',
                    title: 'Urutan'
                },
                klpbi: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kelas',
                    title: 'Kelompok'
                }
            })
            .row({
                kode: 'Kode',
                nama: 'Nama',
                dk: 'Debet / Kredit',
                balinc: 'Balance / Income',
                urutfbi: 'Urutan',
                klpbi: 'Kelompok'
            })
            .load()
        })
    }    
}