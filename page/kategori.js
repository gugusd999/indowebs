globalThis.kategori = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-kategori">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Kategori";
            table('kategori')
            .title('Kategori')
            .equals(['kode'])
            .modal('xl')
            .createForm({
                kode: {
                    form: 'input',
                    type: 'text',
                    placeholder: '',
                    title: 'Kode'
                },
                kategori: {
                    form: 'input',
                    type: 'text',
                    placeholder: '',
                    title: 'Kateegori'
                }
            })
            .row({
                kode: 'Kode',
                kategori: 'Kategori'
            })
            .load()

        })
    }
}