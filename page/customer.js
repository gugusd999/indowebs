globalThis.customer = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-customer">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function () {
        setTimeout(function () {
            document.getElementById('app-content-title').innerText = "Customer";
            table('customer')
                .title('customer')
                .createForm({
                    kode: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Isikan kode',
                        title: 'code'
                    },
                    nama_pt: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Isikan nama pt',
                        title: 'Nama Pt'
                    },
                    nama: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Isikan nama client',
                        title: 'Nama Client'
                    },
                    telp: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Isikan no telp',
                        title: 'No Telp'
                    },
                    alamat: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Isikan alamat',
                        title: 'Alamat'
                    }
                })
                .oncreate(function () {
                    
                })
                .onupdate(function (a) {

                })
                .row({
                    kode: 'Kode',
                    nama_pt: 'Page Name',
                    nama: 'Nama',
                    telp: 'Telp',
                    alamat: 'Alamat',
                    created_at: 'Created At',
                    updated_at: 'Updated At'
                })
                .order('kode', 'DESC')
                .load()
        })
    }
}
