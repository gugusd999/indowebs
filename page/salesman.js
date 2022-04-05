globalThis.Salesman = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-salesman">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){

            document.getElementById('app-content-title').innerText = "Data Karyawan";
            table('salesman')
            .title('Salesman')
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
                    placeholder: 'Inputkan nama',
                    title: 'Nama'
                },
                alamat: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Alamat',
                    title: 'Alamat'
                },
                kota: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kota',
                    title: 'Kota'
                },
                telepon: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan no hp',
                    title: 'No. Hp'
                },
                khusus: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan no KTP',
                    title: 'No. KTP'
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
                nama: 'Nama',
                alamat: 'Alamat',
                kota: 'Kota',
                telepon: 'No. HP',
                khusus: 'No KTP',
                keterangan: 'Keterangan',
            })
            .load()
        })
    }
}