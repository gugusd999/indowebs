globalThis.Slider = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-slider">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){

        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Slider";
            table('slider')
            .title('Slider')
            .createForm({
                judul: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan judul',
                    title: 'Judul'
                },
                deskripsi: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Deskripsi',
                    title: 'Deskripsi'
                }
            })
            .row({
                judul: 'Kode',
                deskripsi: 'Deskripsi',
            })
            .load()

        })
    }
}