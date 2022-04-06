globalThis.asisten = {
    content: `

    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-blog">
                    welcome to asisten
                </div>
            </div>
        </div>
    </div>
    `,
    action: function () {
        setTimeout(function () {
            var y = new ControlTable('customer');
            y.char('kode', 255, '');
            y.char('nama_pt', 255, '');
            y.char('nama', 255, '');
            y.char('telp', 255, '');
            y.char('alamat', 255, '');
            y.text('keterangan');
            y.timecreate('created_at');
            y.timeupdate('updated_at');
            y.createTable(()=>{
                console.log('load table')
            });
        })
    }
}
