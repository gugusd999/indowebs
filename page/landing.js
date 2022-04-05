globalThis.Landing = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-landing">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Landing";
            table('landing')
            .title('Landing')
            .equals(['id'])
            .primarykey('id')
            .createForm({
                id: {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan Judul',
                    title: 'Id'
                },
                judul: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Judul',
                    title: 'Judul'
                }
            })
            .row({
                judul: 'Judul'
            })
            .load()

        })
    }
}
