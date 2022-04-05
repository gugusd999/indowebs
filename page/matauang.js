globalThis.Matauang = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-uang">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){

            var data = {
                kode: "IDR",
                tgl: tanggal().normal,
                nilai_kurs: "1",
                created_at: tanggal().normal,
                updated_at: tanggal().normal
            }
            document.getElementById('app-content-title').innerText = "Mata Uang"
            
            table('uang')
            .title('Mata Uang')
            .equals(['kode', 'tgl'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kode',
                    title: 'Kode'
                },
                tgl: {
                    form: 'input',
                    type: 'date',
                    placeholder: 'Inputkan Kode',
                    title: 'Tanggal'
                },
                kurs: {
                    form: 'input',
                    type: 'number',
                    placeholder: 'Inputkan Kode',
                    title: 'Nilai Kurs'
                },
                keterangan: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Keterangan',
                    title: 'Keterangan'
                }
            })
            .row({
                kode: 'Kode',
                tgl: 'Tgl',
                kurs: 'Nilai Kurs',
                keterangan: 'Keterangan'
            })
            .load()

        })
    }
}