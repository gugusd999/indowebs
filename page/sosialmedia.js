globalThis.Sosialmedia = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-sosialmedia">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){

            globalThis.dataMaster['sosialmedia'] = [
                {kode: 'facebook', nama: '<i class="fab fa-facebook"></i> facebook'},
                {kode: 'linkedin', nama: '<i class="fab fa-linkedin"></i> linkedin'},
                {kode: 'twitter', nama: '<i class="fab fa-twitter"></i> twitter'},
                {kode: 'youtube', nama: '<i class="fab fa-youtube"></i> youtube'},
                {kode: 'whatsapp', nama: '<i class="fab fa-whatsapp"></i> whatsapp'},
                {kode: 'telegram', nama: '<i class="fab fa-telegram"></i> telegram'},
                {kode: 'instagram', nama: '<i class="fab fa-instagram"></i> instagram'},
                {kode: 'youtube', nama: '<i class="fab fa-youtube"></i> youtube'},
                {kode: 'tiktok', nama: '<i class="fab fa-tiktok"></i> Tik Tok'},
            ];

            document.getElementById('app-content-title').innerText = "Data Sosial Media";
            table('sosialmedia')
            .title('Sosial Media')
            .equals(['kode'])
            .createForm({
                kode: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kode',
                    title: 'Kode'
                },
                sosialmedia: {
                    form: 'input',
                    type: 'select',
                    table: 'sosialmedia',
                    view: ['nama'],
                    value: 'kode',
                    placeholder: 'Inputkan sosial media',
                    title: 'Sosial Media'
                }
                ,link: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan sosial media',
                    title: 'Link'
                }
            })
            .row({
                kode: 'Kode',
                sosialmedia: 'Sosial Media',
                link: 'Link'
            })
            .load()
        })
    }    
}