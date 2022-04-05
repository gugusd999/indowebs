globalThis.supplier = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-supplier">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Supplier";
            table('supplier')
            .title('Supplier')
            .equals(['kode'])
            .modal('xl')
            .createForm({
                kode: {
                    form: 'input',
                    type: 'text',
                    placeholder: '',
                    title: 'Kode'
                },
                nama: {
                    form: 'input',
                    type: 'text',
                    placeholder: '',
                    title: 'Nama'
                },
                telp: {
                    form: 'input',
                    type: 'text',
                    placeholder: '',
                    title: 'Telp'
                },
                alamat: {
                    form: 'input',
                    type: 'text',
                    placeholder: '',
                    title: 'Alamat'
                },
                deskripsi: {
                    form: 'input',
                    type: 'text',
                    placeholder: '',
                    title: 'Deskripsi'
                }
            })
            .row({
                kode: 'Kode',
                nama: 'Nama',
                telp: 'Telp',
                alamat: 'Alamat',
                deskripsi: 'Deskripsi',
            })
            .load()

        })
    }
}