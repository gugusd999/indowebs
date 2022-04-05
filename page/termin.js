globalThis.Termin = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-termin">

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

            document.getElementById('app-content-title').innerText = "Data Termin";
            table('termin')
            .title('Termin')
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
                },
                lama: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan lama',
                    title: 'Lama'
                }
            })
            .row({
                kode: 'Kode',
                keterangan: 'Ketarangan',
                lama: 'Lama',
            })
            .load()

        })
    }
}