globalThis.user = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-user">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        globalThis.dataMaster['status'] = [
            {id:'1', name: 'active'},
            {id:'2', name: 'non active'}
        ];
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data User";
            table('user')
            .title('User')
            .equals(['username'])
            .createForm({
                username: {
                    form: 'input',
                    type: 'username',
                    placeholder: 'Inputkan Nama Kategori',
                    title: 'Username'
                },
                password: {
                    form: 'input',
                    type: 'password',
                    placeholder: 'Inputkan Password',
                    title: 'Password'
                },
                nama_lengkap: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Nama Kategori',
                    title: 'Nama Lengkap'
                },
                level: {
                    form: 'input',
                    type: 'select',
                    table: 'level',
                    view: ['name'],
                    value: 'id',
                    placeholder: 'Inputkan level',
                    title: 'Level'
                },
                email: {
                    form: 'input',
                    type: 'email',
                    placeholder: 'Inputkan Email',
                    title: 'Email'
                },
                notelp: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan No Telp',
                    title: 'No Telp'
                },
                nowa: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Whatsapp',
                    title: 'No Whatsapp'
                },
                status: {
                    form: 'input',
                    type: 'select',
                    table: 'status',
                    view: ['name'],
                    value: 'id',
                    placeholder: 'Inputkan level',
                    title: 'Status'
                },
            })
            .row({
                nama_lengkap: 'Nama Lengkap',
                level: 'Level'
            })
            .load()

        })
    }
}
