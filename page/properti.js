globalThis.Properti = {
    content: `
    <style>

        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }

        #info {
            display: table;
            position: relative;
            margin: 0px auto;
            word-wrap: anywhere;
            white-space: pre-wrap;
            padding: 10px;
            border: none;
            border-radius: 3px;
            font-size: 12px;
            text-align: center;
            color: #222;
            background: #fff;
        }

        @media screen and (max-width: 1024px){
          .po-side{
              grid-template-columns: auto !important;
           }
        }

    </style>

    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-properti">

                </div>
            </div>
        </div>
    </div>


    `,
    action: function(){

        var sale = globalThis.dataMaster["sales"].filter(function(u,i){
            if(u.usernama == user.username){
                return u
            }
        })

        // function cek rating

        const capitalize = (str, lower = false) =>
          (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
        ;

        if (dataMaster['provinces'] != undefined && dataMaster['regencies'] != undefined) {
            dataMaster['provinces'] = dataMaster['provinces'].map(function(xz, i) {
                var x = xz;
                x.name = capitalize(xz.name.toLowerCase());
                return x;
            })

            dataMaster['regencies'] = dataMaster['regencies'].map(function(xz, i) {
                var x = xz;

                var y = dataMaster['provinces'].filter(function(k,l){
                    if(x.province_id == k.id){
                        return k
                    }
                })
                if (y.length > 0) {
                    y = y[0].name;
                    x.province_id = y;
                    x.name = capitalize(xz.name.toLowerCase());
                    return x;
                }else{
                    return x;
                }
            })
        }else{
            var prov = new db;
            prov.table('province').get(function(pr){
                dataMaster['provinces'] = pr;
                var reg = new db;
                reg.table('regencies').get(function(re){
                    dataMaster['regencies'] = re;

                    dataMaster['provinces'] = dataMaster['provinces'].map(function(xz, i) {
                        var x = xz;
                        x.name = capitalize(xz.name.toLowerCase());
                        return x;
                    })

                    dataMaster['regencies'] = dataMaster['regencies'].map(function(xz, i) {
                        var x = xz;

                        var y = dataMaster['provinces'].filter(function(k,l){
                            if(x.province_id == k.id){
                                return k
                            }
                        })[0].name;
                        x.province_id = y;
                        x.name = capitalize(xz.name.toLowerCase());
                        return x;
                    })


                })

            })

        }

        console.log(
            globalThis.dataMaster['kategori']
        )

        globalThis.dataMaster['transaksi'] = [
            {kode: 'JUAL', name: 'JUAL'},
            {kode: 'SEWA', name: 'SEWA'}
        ];

        if(user.level == 'admin'){
            globalThis.dataMaster['transaksi'] = [
                {kode: 'JUAL', name: 'JUAL'},
                {kode: 'SEWA', name: 'SEWA'},
                {kode: 'PROYEK BARU', name: 'PROYEK BARU'}
            ];
        }


        globalThis.dataMaster['laku'] = [
            {kode: '0', name: 'Belum Laku'},
            {kode: '1', name: 'Laku'}
        ];

        globalThis.dataMaster['yorn'] = [
            {kode: '0', name: 'Tidak'},
            {kode: '1', name: 'Ya'}
        ];

        globalThis.dataMaster['aorn'] = [
            {kode: '0', name: 'Tidak Ada'},
            {kode: '1', name: 'Ada'}
        ];

        globalThis.dataMaster['aprove'] = [
            {kode: '0', name: 'Disapprove'},
            {kode: '1', name: 'Approved'}
        ];

        globalThis.dataMaster['sertifikat'] = [
            {kode: 'Tidak Ditampilkan', name: 'Tidak Ditampilkan'},
            {kode: 'SHM', name: 'SHM'},
            {kode: 'HGB', name: 'HGB'},
            {kode: 'SHGB', name: 'SHSRS'},
            {kode: 'PPJB', name: 'PPJB'},
            {kode: 'PPJB', name: 'Tanah Girik'},
            {kode: 'Petok D', name: 'Petok D'},
            {kode: 'Petok D', name: 'Hak Pakai '}
        ];

        globalThis.dataMaster['hadap'] = [
            {name: 'Utara'},
            {name: 'Selatan'},
            {name: 'Barat'},
            {name: 'Timur'},
            {name: 'Barat Laut'},
            {name: 'Timur Laut'},
            {name: 'Tenggara'},
            {name: 'Barat daya'},
            {name: 'Utara & Barat'},
            {name: 'Utara & Timur'},
            {name: 'Selatan & Barat'},
            {name: 'Selatan & Timur'}
        ];

        globalThis.dynamicSort = function(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                /* next line works with strings and numbers,
                 * and you may want to customize it to your needs
                 */
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        globalThis.dataMaster["kecamatan"] = globalThis.dataMaster["kecamatan"].sort(dynamicSort("name"));

        globalThis.dataMaster["area"] = globalThis.dataMaster["area"].sort(dynamicSort("name"));

        globalThis.dataMaster['hadap'] = globalThis.dataMaster['hadap'].map(function(r){

            var x = {
                name: r.name,
                kode: r.name.replace(/\&/g, '-')
            }

            return x;

        })

        globalThis.dataMaster['air'] = [
            {name: 'PDAM'},
            {name: 'Sumur'},
            {name: 'WTP'},
            {name: 'Artesis'}
        ];

        var formSet = {
                idprop : {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan idprop',
                    title: 'idprop'
                },
                judulproperti: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Judul Properti',
                    title: 'Judul Properti'
                },
                kategori: {
                    form: 'input',
                    type: 'select',
                    table: 'kategori_properti',
                    view: ['kategori_nama'],
                    value: 'kategori_nama',
                    placeholder: 'Inputkan keterangan',
                    title: 'Kategori'
                },
                deskripsi: {
                    form: 'input',
                    type: 'textarea',
                    placeholder: 'Inputkan deskripsi',
                    title: 'Deskripsi'
                },
                harga: {
                    form: 'input',
                    type: 'number',
                    placeholder: 'Inputkan harga',
                    title: 'Harga'
                },
                transaksi: {
                    form: 'input',
                    type: 'select',
                    table: 'transaksi',
                    view: ['name'],
                    value: 'kode',
                    placeholder: 'Inputkan transaksi',
                    title: 'Transaksi'
                },
                sertifikat: {
                    form: 'input',
                    type: 'select',
                    table: 'sertifikat',
                    view: ['name'],
                    value: 'kode',
                    placeholder: 'Inputkan sertifikat',
                    title: 'Sertifikat'
                },
                province: {
                    form: 'input',
                    type: 'select',
                    table: 'provinces',
                    view: ['name'],
                    value: 'name',
                    relation: 'city_name',
                    relationId: 'province_id',
                    key: 'name',
                    placeholder: 'Inputkan provinsi',
                    title: 'Provinsi'
                },
                city_name: {
                    form: 'input',
                    type: 'select',
                    table: 'regencies',
                    view: ['name'],
                    value: 'name',
                    key: 'id',
                    pin: 'province',
                    relation: 'kecamatan',
                    relationId: 'regencies',
                    placeholder: 'Inputkan kota',
                    title: 'Kota'
                },
                kecamatan: {
                    form: 'input',
                    type: 'select',
                    table: 'kecamatan',
                    view: ['name'],
                    value: 'name',
                    pin: 'city_name',
                    key: 'kode',
                    relation: 'subdistrict_name',
                    relationId: 'kecamatan',
                    placeholder: 'Inputkan kecamatan',
                    title: 'Kecamatan'
                },
                subdistrict_name: {
                    form: 'input',
                    type: 'select',
                    table: 'area',
                    view: ['name'],
                    value: 'name',
                    pin: 'kecamatan',
                    placeholder: 'Inputkan Area',
                    title: 'Area'
                },
                alamat: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan alamat (tanpa blok dan nomer properti)',
                    title: 'Alamat'
                },
                norumah: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan no rumah',
                    columns: 12,
                    typeColumns: 'lg',
                    title: 'No Rumah'
                },
                lat: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan latitude ',
                    title: 'Latitude',
                    columns: 6,
                    typeColumns: 'lg',
                },
                lng: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan longitude ',
                    title: 'Longitude',
                    typeColumns: 'lg',
                    columns: 6
                },
                hadap: {
                    form: 'input',
                    type: 'select',
                    view: ['name'],
                    table: 'hadap',
                    value: 'kode',
                    placeholder: 'Inputkan orientasi',
                    title: 'Orientasi'
                },
                jum_kt: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kamar Tidur',
                    columns: 6,
                    typeColumns: 'lg',
                    title: 'KT'
                },
                jum_km: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Kamar Mandi',
                    columns: 6,
                    typeColumns: 'lg',
                    title: 'KM'
                },
                lt: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Luas Tanah',
                    columns: 6,
                    typeColumns: 'lg',
                    title: 'LT'
                },
                lb: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Luas Bangunan',
                    columns: 6,
                    typeColumns: 'lg',
                    title: 'LB'
                },
                ltanah: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan dimensi tanah',
                    columns: 12,
                    typeColumns: 'lg',
                    title: 'Dimensi Tanah'
                },
                listrik: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Listrik',
                    title: 'Listrik (WATT)'
                },
                air: {
                    form: 'input',
                    type: 'select',
                    table: 'air',
                    view: ['name'],
                    value: 'name',
                    placeholder: 'Inputkan count air / PDAM',
                    title: 'Air'
                },
                laku: {
                    form: 'input',
                    type: 'select',
                    table: 'laku',
                    view: ['name'],
                    value: 'kode',
                    placeholder: 'Inputkan',
                    title: 'Status Properti'
                },
                tgllaku: {
                    form: 'input',
                    type: 'date',
                    placeholder: 'Inputkan tanggal laku',
                    title: 'Tanggal Laku'
                },
                bisakpr: {
                    form: 'input',
                    type: 'select',
                    table: 'yorn',
                    view: ['name'],
                    value: 'kode',
                    placeholder: 'Inputkan kpr',
                    title: 'Bisa KPR'
                },
                komisi: {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan komisi',
                    title: 'Komisi (%)'
                }
            }

            if(user.level != 'member'){

                formSet.idsales = {
                        form: 'input',
                        type: 'select',
                        table: 'sales',
                        view: ['nama'],
                        value: 'id',
                        placeholder: 'Inputkan sales',
                        title: 'Sales'
                    }

            }else{

                formSet.userapp = {
                    form: 'input',
                    type: 'hidden',
                    placeholder: 'Inputkan komisi',
                    title: 'Komisi (%)',
                    default: user.id
                }

            }

            formSet.nama_vendor = {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan vendor',
                    title: 'Vendor'
                }

            formSet.kontak_vendor = {
                    form: 'input',
                    type: 'text',
                    placeholder: 'Inputkan Telp. Vendor',
                    title: 'No. Telp. Vendor'
                }

            formSet.share = {
                    form: 'input',
                    type: 'slug',
                    from: 'judulproperti',
                    placeholder: 'Inputkan buat share link',
                    title: 'Share'
                }

            if(user.level == 'admin'){

                formSet.approve = {
                    form: 'input',
                    type: 'select',
                    table: 'aprove',
                    view: ['name'],
                    value: 'kode',
                    placeholder: 'Inputkan sertifikat',
                    title: 'Aprove'
                }
            }else{
                formSet.approve = {
                    form: 'input',
                    type: 'hidden',
                    table: 'aprove',
                    view: ['name'],
                    value: 'kode',
                    placeholder: 'Inputkan sertifikat',
                    title: 'Aprove'
                }
            }



        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Data Properti";
            var theone = table('properti')
            .title('Properti')
            .grouping({
                "col-lg-6": [
                    {
                        start: 'judulproperti',
                        end: 'norumah'
                    },
                    {
                        start: 'lat',
                        end: 'approve'
                    }
                ]
            })
            .equals(['idprop'])
            .selectAction(function(s, v, r){

                if(v == 'city_name'){
                    document.getElementById('province').innerHTML = `<option value="${s.data.province_id}">${s.data.province_id}</option>`;
                }else if(v == 'kategori'){
                    if(s.key == 'Tanah'){
                        document.getElementById('f-jum_kt').style.display = 'none';
                        document.getElementById('f-jum_km').style.display = 'none';
                        document.getElementById('f-lb').style.display = 'none';
                        document.getElementById('f-lb').style.display = 'none';
                        document.getElementById('f-listrik').style.display = 'none';
                        document.getElementById('f-listrik').style.display = 'none';
                        document.getElementById('f-air').style.display = 'none';
                    }else{
                        document.getElementById('f-jum_kt').style.display = 'grid';
                        document.getElementById('f-jum_km').style.display = 'grid';
                        document.getElementById('f-lb').style.display = 'grid';
                        document.getElementById('f-lb').style.display = 'grid';
                        document.getElementById('f-listrik').style.display = 'grid';
                        document.getElementById('f-listrik').style.display = 'grid';
                        document.getElementById('f-air').style.display = 'grid';
                    }
                }else if(v == 'kecamatan'){
                    var name = globalThis.dataMaster['regencies'].filter(function(t){
                        if(t.id == s.data.regencies){
                            return t
                        }
                    });
                    if(name.length > 0){
                        name = name[0];
                        var op = `<option value="${name.name}">${name.name}</option>`;
                        document.getElementById('city_name').innerHTML = op;

                        var namep = globalThis.dataMaster['regencies'].filter(function(t){
                            if(t.name == name.name){
                                return t
                            }
                        });

                        if(namep.length > 0){
                            namep = namep[0];
                            var op = `<option value="${namep.province_id}">${namep.province_id}</option>`;
                            document.getElementById('province').innerHTML = op;
                        }

                    }
                }else if(v == 'subdistrict_name'){
                    console.log(s);

                    var kec = globalThis.dataMaster['kecamatan'].filter(function(t){
                        if(t.kode == s.data.kecamatan){
                            return t
                        }
                    });

                    if(kec.length > 0){
                        kec = kec[0];
                        var op = `<option value="${kec.name}">${kec.name}</option>`;
                        document.getElementById('kecamatan').innerHTML = op;
                    }

                    var name = globalThis.dataMaster['regencies'].filter(function(t){
                        if(t.id == s.data.regencies){
                            return t
                        }
                    });

                    if(name.length > 0){
                        name = name[0];
                        var op = `<option value="${name.name}">${name.name}</option>`;
                        document.getElementById('city_name').innerHTML = op;

                        var namep = globalThis.dataMaster['regencies'].filter(function(t){
                            if(t.name == name.name){
                                return t
                            }
                        });

                        if(namep.length > 0){
                            namep = namep[0];
                            var op = `<option value="${namep.province_id}">${namep.province_id}</option>`;
                            document.getElementById('province').innerHTML = op;
                        }

                    }
                }
            })
            .createForm(formSet)
            .row({
                idprop: 'Id Properti',
                judulproperti: 'Judul Properti',
                kategori: 'Kategori',
                transaksi: 'Transaksi',
                sertifikat: 'Sertifikat',
                approve: 'Publish',
                subdistrict_name: 'Area',
                idsales: 'Sales',
            })
            .addRow({
                viewer: {
                    key: ['idprop'],
                    position: 'center',
                    title: 'Viewer',
                    id: 'action-{{idprop}}',
                    template: `
                      <div view-{{idprop}}>0</div>
                    `,
                }
            })
            .onsave(function(f){
              f.load();
              globalThis.propertiNewId = undefined;
            })
            .onback(function(a){
                if (globalThis.nextIncrement != undefined) {
                    db().table(a.data.table).condition([
                        {opsi: '', data: ['idProp', '=',  globalThis.nextIncrement]}
                    ])
                    .delete()
                    .get(function(){
                        delete globalThis.nextIncrement;
                        a.load();
                    })
                } else {
                    a.load();
                }
            })
            .oncreate(function(a){

                globalThis.coverid = 0;

                if(globalThis.sales.length != 0){
                    var datsales = globalThis.sales[0];
                    if(document.getElementById('idsales') != undefined){
                        if(datsales != undefined){
                            document.getElementById('idsales').innerHTML = `<option value="${datsales.id}">${datsales.nama}</option>`;
                        }
                    }
                    document.getElementById("idsales").parentNode.appendChild(div().class('disabled-form').get());

                }

                document.getElementById('judulproperti').addEventListener('keyup', function(){
                    document.getElementById('share').value = this.value.replace(/ /g, '-').replace(/\?/g, '-').replace(/\//g, '-').replace(/\'/g, '-').replace(/\"/g, '-').toLowerCase();;
                },false)

                document.getElementById('simpan'+a.data.id).innerText = 'Simpan';
                // $('#deskripsi').summernote('focus');
                $('#deskripsi').summernote({
                       height: 200,
                       toolbar: [
                        ['style', ['style']],
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['insert', [ 'ajaximageupload', 'link', 'video', 'table']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['view', ['fullscreen', 'codeview', 'help']],
                        ['height', ['height']]
                       ]
                    });
                $('#laku').html(`<option value='0'>Belum Laku</option>`);
                $('#tgllaku').val('');
                var blog = new db;
                blog.table(a.data.table)
                blog.nextIncrement()
                blog.get(function(v){

                    globalThis.nextIncrement = v[0].increment;
                    globalThis.uploadImage = v[0].increment;

                    loadImageUpdateCreate(v[0].increment);

                    document.getElementById('idprop').value = v[0].increment;

                    a.data.idUpdate = true;

                    a.data.loadDataEdit = {
                        idProp: v[0].increment
                    };

                    globalThis.propertiNewId = v[0].increment;

                    var newX = {
                        idprop : nextIncrement
                    }

                    if(user.level == 'member'){
                        newX = {
                            userapp : user.id
                        }
                    }

                    if(user.level != 'admin'){
                        if(sale.length > 0){
                            newX.idsales = sale[0].id;
                            document.getElementById('idsales').innerHTML = `<option value="${sale[0].id}">${sale[0].nama}</option>`
                        }
                    }

                    db().table(a.data.table).save(newX)
                    .get(function(){
                        console.log('saved')
                    })


                })

                document.querySelector('label[for=idprop]').style.display = 'none';

            })
            .validate({
                judulproperti: "",
                kategori: "",
                deskripsi: "",
                harga: "",
                transaksi: "",
                sertifikat: "",
                province: "",
                city_name: "",
                kecamatan: "",
                alamat: "",
                lt:""
            })
            .onupdate(function(a, b){
                console.log(a.data.loadDataEdit.kategori);

                if(a.data.loadDataEdit.kategori == 'Tanah'){
                    document.getElementById('f-jum_kt').style.display = 'none';
                    document.getElementById('f-jum_km').style.display = 'none';
                    document.getElementById('f-lb').style.display = 'none';
                    document.getElementById('f-lb').style.display = 'none';
                    document.getElementById('f-listrik').style.display = 'none';
                    document.getElementById('f-listrik').style.display = 'none';
                    document.getElementById('f-air').style.display = 'none';
                }else{
                    document.getElementById('f-jum_kt').style.display = 'grid';
                    document.getElementById('f-jum_km').style.display = 'grid';
                    document.getElementById('f-lb').style.display = 'grid';
                    document.getElementById('f-lb').style.display = 'grid';
                    document.getElementById('f-listrik').style.display = 'grid';
                    document.getElementById('f-listrik').style.display = 'grid';
                    document.getElementById('f-air').style.display = 'grid';
                }

                if(globalThis.sales.length != 0){
                    var datsales = globalThis.sales[0];
                    if(document.getElementById('idsales').value == ''){
                        //console.log(datsales);
                        if(datsales != undefined){
                            document.getElementById('idsales').innerHTML = `<option value="${datsales.id}">${datsales.nama}</option>`;
                        }
                        //alert('po')
                    }
                    console.log('hero');
                    document.getElementById('approve').value = 0;
                    document.getElementById("idsales").parentNode.appendChild(div().class('disabled-form').get());
                }

                document.getElementById('judulproperti').addEventListener('keyup', function(){
                    document.getElementById('share').value = this.value.replace(/ /g, '-').replace(/\?/g, '-').replace(/\//g, '-').replace(/\'/g, '-').replace(/\"/g, '-').toLowerCase();
                },false)

                if (globalThis.nextIncrement != undefined) {
                    delete globalThis.nextIncrement;
                }

                globalThis.uploadImage = b.idprop;

                loadImageUpdateCreate(b.idprop);

                document.querySelector('label[for=idprop]').style.display = 'none';

                var cekLaku = document.getElementById('laku').value;

                setTimeout(()=>{
                    console.log('ok')
                    Array.from(document.querySelectorAll('.single')).forEach((s)=>{ s.style.display = 'block' })
                    Array.from(document.querySelectorAll('.multi')).forEach((s)=>{ s.style.display = 'none' })
                },1000)


            })
            .order('idprop', 'DESC')
            .customeH(`
                <select id="approve-n" class='btn btn-sm btn-primary mb-3'>
                    <option value="1">Publish</option>
                    <option value="0">Unpublish</option>
                </select>
            `)
            .afterload(function(x,y,v, m){


                // fetch('/inf')
                // .then(response => response.json())
                // .then(res => {
                // })

                var data = globalThis.dataLoadtable;
                var idp = dataLoadtable.map((t)=>{
                    return t.idprop;
                });
                data = data.map(function(a){
                    return a.idprop;
                }).join('-')

                if(data != ""){
                    fetch('/cek/properti/bintang/'+data)
                    .then(response => response.json())
                    .then(res => {
                        idp = idp.map((o,i)=>{
                            return ` slug = '${o}' `
                        }).join(" OR ");
                        db().table('properti').get((a)=>{


                            v();


                            setTimeout(()=>{
                                // console.log(document.getElementById("approve-n"));


                                Array.from(document.querySelectorAll('[data-row-5]')).forEach((element, num)=>{
                                    var dataText = element.innerText;
                                    console.log(element.innerText)
                                    if(dataText != 1){
                                        element.innerText = 'Unpulish';
                                    }else{
                                        element.innerText = 'Publish';
                                    }
                                })

                                var y = x.data.filter.approve;

                                if(y != undefined){
                                    if(y.toString().indexOf('||') != -1){
                                        y = 0;
                                    }
                                }else{
                                    y = 1
                                }


                                console.log('ay')
                                console.log(y)
                                console.log(document.getElementById("approve-n"))
                                document.getElementById("approve-n").value = y;
                                // console.log(Array.from(document.querySelector('[data-row-7]')))

                                document.getElementById("approve-n").addEventListener('change', (event)=>{
                                    console.log(event.target.value)
                                    if(event.target.value == 0){
                                        x.filter({
                                            approve: '||'+event.target.value
                                        })
                                    }else{
                                        x.filter({
                                            approve: event.target.value
                                        })
                                    }

                                    if(user.level != 'admin'){
                                        if(user.level == 'member'){
                                            if(event.target.value == 0){
                                                theone.filter({
                                                    userapp: user.id,
                                                    approve: '||'+event.target.value
                                                })
                                            }else{
                                                theone.filter({
                                                    userapp: user.id,
                                                    approve: event.target.value
                                                })
                                            }
                                        }else{
                                            if(sale.length > 0){
                                              if(event.target.value == 0){
                                                theone.filter({
                                                    idsales: sale[0].id,
                                                    approve: '||'+event.target.value
                                                })
                                              }else{
                                                theone.filter({
                                                    idsales: sale[0].id,
                                                    approve: event.target.value
                                                })
                                              }
                                            }
                                        }
                                    }


                                    x.load();
                                },false)



                                console.log('ok')

                                Array.from(document.querySelectorAll('[data-row-7]')).forEach((element, num)=>{
                                    var dataText = element.innerText;
                                    if(dataText != ""){
                                        dataText = dataMaster.sales.filter((sales, i) => {
                                            if(dataText == sales.id){
                                                return sales
                                            }
                                        })[0].nama

                                        element.innerText = dataText;

                                    }
                                })



                            })

                            a.forEach((s)=>{
                                console.log(`view-`+s.slug);
                                document.querySelector(`[view-`+s.slug+']').innerHTML = ` ${s.v} x `
                            })
                        },`SELECT slug, SUM(tot_view) v FROM pengunjung2 WHERE ${idp} GROUP BY slug `);
                    })
                }else{

                    v()

                    var y = x.data.filter.approve;
                    if(y != undefined){
                         if(y.toString().indexOf('||') != -1){
                            y = 0;
                        }
                    }else{
                        y = 1;
                    }

                    document.getElementById("approve-n").value = y;
                                // console.log(Array.from(document.querySelector('[data-row-7]')))

                    document.getElementById("approve-n").addEventListener('change', (event)=>{
                        console.log(event.target.value)
                        x.filter({
                            approve: event.target.value
                        })

                        if(user.level != 'admin'){
                            if(user.level == 'member'){
                                if(event.target.value == 0){
                                    theone.filter({
                                        userapp: user.id,
                                        approve: '||'+event.target.value
                                    })
                                }else{
                                    theone.filter({
                                        userapp: user.id,
                                        approve: event.target.value
                                    })
                                }
                            }else{
                                if(sale.length > 0){
                                  if(event.target.value == 0){
                                    theone.filter({
                                        idsales: sale[0].id,
                                        approve: '||'+event.target.value
                                    })
                                  }else{
                                    theone.filter({
                                        idsales: sale[0].id,
                                        approve: event.target.value
                                    })
                                  }
                                }
                            }
                        }


                        x.load();
                    },false)


                }
            })

            if(user.level != 'admin'){
                if(user.level == 'member'){
                    theone.filter({
                        userapp: user.id,
                        approve: 1
                    })
                }else{
                    if(sale.length > 0){
                        theone.filter({
                            idsales: sale[0].id
                        })
                    }
                }
            }

            if(user.level == 'admin'){
                theone.filter({
                    approve: 1
                })
            }

            theone.load()

            var input = function(){
              return el('input');
            }

            var label = function(){
              return el('label');
            }

            function loadImageUpdateCreate(id){
                globalThis.idImagesCover = id;
              var dmpi = div()
              dmpi.child(
                el('style').html(`

                  .tab-upload{
                    position: relative;
                  }

                  .tab-upload .tab-menu{
                    display: inline-block;
                    position: absolute;
                    right: 0;
                  }

                  .tab-upload .tab-menu span{
                    display: inline-block;
                    padding: 5px 8px;
                    margin: 0 5px;
                    background-color: var(--blue);
                    color: white;
                    border-radius: 5px;
                    cursor: pointer;
                  }

                  .tab-upload .single{
                    display: none;
                    position: relative;
                    top: 40px;
                    margin-bottom: 60px;
                  }

                  .tab-upload .single > div{
                    display: grid;
                    grid-gap: 8px;
                    text-align: center;
                    grid-template-columns: auto auto auto;
                  }

                  .tab-upload .single > div input{
                    display: none;
                  }

                  .tab-upload .single > div .foto{
                    display: block;
                    width: 100%;
                    height: 150px;
                    background: var(--blue);
                    box-shadow: 0 0 10px rgba(0,0,0,0.2);
                    background-size: cover;
                    background-position: center;
                  }

                  .tab-upload .single > div label{
                    position: absolute;
                    display: block;
                    font-size: 30px;
                    top: calc(50% - 15px);
                    left: calc(50% - 15px);
                    text-shadow: 0 0 35px #333;
                    color: #fff;
                  }

                 .tab-upload .multi{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: 40px;
                    height: 200px;
                    margin-bottom: 60px;
                  }

                  .tab-upload .multi input{
                      display: block;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      top: 0;
                      left: 0;
                      opacity: 0.0;
                  }

                  .tab-upload .multi label{
                    z-index: 1;
                    font-size: 30px;
                    text-align: center;
                  }

                  .tab-upload .multi label::after{
                    position: relative;
                    display: block;
                    font-size: 14pt !important;
                    content: "chose file";
                    font-size: 30px;
                  }

                  .tab-upload .multi label::before{
                    position: absolute;
                    content: "";
                    display: block;
                    background: #ddd;
                    height: 100%;
                    width: 100%;
                    top:0;
                    left:0;
                    z-index: -1;
                  }
                  .tab-upload .multi .progress{
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    z-index: 1;
                   }

                   #cover{
                    display: flex;
                    margin: 10px;
                    background: var(--blue);
                    position: relative;
                    padding: 10px;
                    height: 250px;
                    border: 1px solid #add;
                    justify-content: center;
                    align-items: center;
                     background-size: cover;
                     background-position: center;
                    }

                    #cover label{
                    display: inline-block;
                    font-size: 30px;
                    text-align: center;
                      color: white;
                      text-shadow: 0 0 25px #000;
                      cursor: pointer;
                    }

                    #cover label::after{
                    content: "Upload Cover";
                    display: block;
                    font-size: 20px;
                    }

                    #cover label input{
                        cursor: pointer;
                        position: absolute;
                        display: block;
                        width: 100%;
                        height: 100%;
                        top:0;
                        left: 0;
                        background: #ddd;
                        opacity: 0;
                    }

                    .delete-foto{
                          position: absolute;
                          color: white;
                          font-size: 16pt;
                          text-shadow: 0 0 5px #000;
                          top: 10px;
                          right: 10px;
                          cursor: pointer;
                    }

                                        #cover .progress{
                      position: absolute;
                      bottom: 0;
                      width: 100%;
                    }

                  `)
              )

              var dompImage = document.getElementById('load-properti').children[1].children[2];

              $.ajax({
                url: '/admin/api/foto/'+id,
                dataTtpe: 'JSON',
                success: function(response){
                  var data = JSON.parse(response);
                  globalThis.fros = data.data;
                  var setting = data.set;



                  setting.forEach(function(set){

                  var nameTag = set.kategori;
                  if(nameTag == 'foto'){
                      nameTag = "Listing";
                  }else if(nameTag == 'blueprint'){
                      nameTag = "Blueprint";
                  }else if(nameTag == 'ktp'){
                      nameTag = "KTP Pemilik";
                  }else{
                      nameTag = nameTag.toUpperCase()
                  }


                    dmpi.child(
                      div().class('tab-upload')
                      .child(
                        div().class('tab-menu')
                        .child(
                            el('span').data('id', set.kategori).text('Single Upload').attr('style', 'background-color: #009ef7; color: white').id('btn1'+set.kategori)
                            .click(function(){
                                var getId = this.getAttribute('data-id');
                                globalThis['single'+getId].el.css('display', 'block');
                                globalThis['multi'+getId].el.css('display', 'none');
                            })
                        )
                        .child(
                            el('span').data('id', set.kategori).text('Multi Upload').css('background-color', 'white').css('color', '#333').css('border', '1px solid #ddd').id('btn2'+set.kategori)
                            .click(function(){
                                var getId = this.getAttribute('data-id');
                                globalThis['single'+getId].el.css('display', 'none');
                                globalThis['multi'+getId].el.css('display', 'flex');
                            })
                        )
                      )
                      .child(
                          div().class('title-upload').text('Foto '+nameTag).size('14pt')
                      )
                      .child(
                        div().class('single').id('single'+set.kategori).data('tipe', set.kategori).load(singleUploadFunc)
                      )
                      .child(
                        div().class('multi').id('multi'+set.kategori)
                        .child(
                          label().attr('for', set.kategori)
                          .event('drag dragstart dragend dragover dragenter dragleave drop', function(event){
                                event.preventDefault();
			                    event.stopPropagation();
                          })
                          .child(
                              el('i').class('fas fa-upload')
                          )
                          .child(
                            input().type('file').id(set.kategori).attr('multiple', 'multiple')
                            .change(function(){
                                var condFile = this.files;
                                var id = this.id;
                                var prosent = 0;
                                var progress = globalThis['progress'+id];
                                var getId = globalThis.fros.filter(function(er){
                                    if(er.kategori == id){
                                        return er
                                    }
                                })

                                uploadMulti(getId[0].id, condFile[0], 0, getId, condFile, id);

                                function uploadMulti(id, file, num, getId, condFile, kat) {
                                    var show = 'sistem-api/androapi/upload/foto/'+id+'.jpg?v='+Date.now();
                                    var pathFile = 'sistem-api/androapi/upload/foto/'+id+'.jpg';
                                    // var pathFile = '../../sistem-api/androapi/upload/foto/'+a.id+'.jpg';
                                    const reader = new FileReader();
                                        reader.addEventListener("load", function () {
                                        var base64 = reader.result;
                                        var rendr = base64.split("base64,");
                                        rendr = rendr[1];
                                        rendr = rendr.match(/.{1,1200000}/g);
                                        var length = rendr.length;
                                        var start = 0;

                                        uploadProsses()

                                        function uploadProsses(){
                                                if (start < length) {
                                                    var leng = condFile.length;
                                                    if(getId.length < condFile.length){
                                                        leng = getId.length;
                                                    }
                                                    var n = Math.round(((start+1) / length) * 100) / leng;
                                                    prosent += Math.round(n);
                                                    progress.el.width(prosent+'%').text(prosent+'%')
                                                    $.ajax({
                                                        url: '/admin/upload',
                                                        method: 'POST',
                                                        dataType: 'text',
                                                        data: {
                                                            _token: $('meta[name=csrf-token]').attr('content'),
                                                            ok: rendr[start],
                                                            start: start,
                                                            tipe: 'upload'
                                                        },
                                                        success: function(e){
                                                            start += 1;
                                                            uploadProsses();
                                                        }
                                                    })
                                                }else{
                                                    $.ajax({
                                                        url: '/admin/upload',
                                                        method: 'POST',
                                                        dataType: 'text',
                                                        data: {
                                                            _token: $('meta[name=csrf-token]').attr('content'),
                                                            tipe: pathFile
                                                        },
                                                        success: function(e){
                                                            console.log((condFile.length - 1));
                                                            var leng = condFile.length;
                                                            if(getId.length < condFile.length){
                                                                leng = getId.length;
                                                            }
                                                            if(num == (leng - 1)){
                                                                progress.el.width('0%').text('0%')
                                                                globalThis['foto'+kat+num].el.attr('style', 'background-image: url("'+show+'")')
                                                                globalThis['single'+kat].el.css('display', 'block');
                                                                globalThis['multi'+kat].el.css('display', 'none');
                                                            }else{
                                                                console.log('foto'+kat+num);
                                                                globalThis['foto'+kat+num].el.attr('style', 'background-image: url("'+show+'")')
                                                                uploadMulti(getId[num + 1].id, condFile[num + 1], num + 1, getId, condFile, kat);
                                                            }
                                                        }
                                                    })
                                                }
                                        }
                                        // uploadProsses()
                                        }, false);
                                        if (file) {
                                            reader.readAsDataURL(file);
                                        }
                                }

                            })
                          )
                        )
                        .child(
                            div().class('progress')
                            .child(
                                div().id('progress'+set.kategori).class('progress-bar').attr('role','progressbar').width('10%').aria('valuenow', '25').aria('valuemin', '0').aria('valuemax', '100').text('0%')
                            )
                        )
                      )
                    )

                    function singleUploadFunc(formUpload){
                      var getForm = formUpload.el.getAttribute('data-tipe');
                      var parent = formUpload.el;
                      var dataf = data.data.filter(function(s){
                        if(s.kategori == getForm){
                          return s;
                        }
                      })
                      var sngl = div();
                      dataf.forEach(function(singleFile, i){
                        sngl.child(
                          div().css('position', 'relative')

                          .child(
                            div().data('foto', 'sistem-api/androapi/upload/foto/'+singleFile.id+'.jpg').id('foto'+getForm+i).class('foto').attr('style', 'background-image: url("../../sistem-api/androapi/upload/foto/'+singleFile.id+'.jpg?v='+Date.now()+'")').attr('draggable', true).cursor('move')
                            .event('drag',function(){
                                globalThis.transfer = this.getAttribute('data-foto');
                            })
                          )
                          .child(
                            label().attr('for', getForm+i).html('<i class="fas fa-upload"></i>').cursor('pointer')
                          )
                          .child(
                              div().class('progress')
                              .child(
                                  div().id('progress'+getForm+i).class('progress-bar').attr('role','progressbar').width('0%').aria('valuenow', '25').aria('valuemin', '0').aria('valuemax', '100').text('0%')
                              )
                          )
                          .child(
                            input().data('id', singleFile.id).type('file').id(getForm+i).change(function(){
                                var idfot = globalThis['foto'+this.id];
                                var progress = globalThis['progress'+this.id];
                                var file = this.files[0];
                                var size =  file.size / 1000;
                                var show = 'sistem-api/androapi/upload/foto/'+this.getAttribute('data-id')+'.jpg?v='+Date.now();
                                var pathFile = 'sistem-api/androapi/upload/foto/'+this.getAttribute('data-id')+'.jpg';
                                // var pathFile = '../../sistem-api/androapi/upload/foto/'+a.id+'.jpg';
                                if(size > 10000){
                                    alert('file tidak boleh lebih dari 1MB');
                                }else{
                                        const reader = new FileReader();
                                        reader.addEventListener("load", function () {
                                        var base64 = reader.result;
                                        var rendr = base64.split("base64,");
                                        rendr = rendr[1];
                                        rendr = rendr.match(/.{1,150000}/g);
                                        var length = rendr.length;
                                        var start = 0;

                                        uploadProsses()

                                        function uploadProsses(){
                                                if (start < length) {
                                                    progress.el.width(Math.round(((start+1) / length) * 100)+'%').text(Math.round(((start+1) / length) * 100)+'%')
                                                    // document.getElementById('upload-file-'+a.id).innerText = Math.round(((start+1) / length) * 100)+'%';
                                                    $.ajax({
                                                        url: '/admin/upload',
                                                        method: 'POST',
                                                        dataType: 'text',
                                                        data: {
                                                            _token: $('meta[name=csrf-token]').attr('content'),
                                                            ok: rendr[start],
                                                            start: start,
                                                            tipe: 'upload'
                                                        },
                                                        success: function(e){
                                                            console.log(e.length)
                                                            start += 1;
                                                            uploadProsses();
                                                        }
                                                    })
                                                }else{
                                                    $.ajax({
                                                        url: '/admin/upload',
                                                        method: 'POST',
                                                        dataType: 'text',
                                                        data: {
                                                            _token: $('meta[name=csrf-token]').attr('content'),
                                                            tipe: pathFile
                                                        },
                                                        success: function(e){
                                                            console.log('saved')
                                                            progress.el.width('0%').text('0%')
                                                            idfot.el.attr('style', 'background-image: url("'+show+'")')
                                                        }
                                                    })
                                                }
                                        }
                                        // uploadProsses()
                                        }, false);
                                        if (file) {
                                            reader.readAsDataURL(file);
                                        }


                                }
                            })
                          )
                          .child(
                             el('i').class('fas fa-trash-alt delete-foto').data('s', getForm+i).data('id', singleFile.id).id('delete'+getForm+i).data('foto', '../../sistem-api/androapi/upload/foto/'+singleFile.id+'.jpg').click(function(){
                                 var idfot = globalThis['foto'+this.getAttribute('data-s')];
                                 var getImageurl = this.getAttribute('data-foto');
                                 var show = 'sistem-api/androapi/upload/foto/'+this.getAttribute('data-id')+'.jpg?v='+Date.now();
                                 console.log(getImageurl);
                                 Swal.fire({
                                    title: 'Apa anda yakin untuk menghapus data ini?',
                                    showDenyButton: true,
                                    confirmButtonText: `hapus`,
                                  }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                        $.ajax({
                                            url: 'admin/deleteimage',
                                            method: 'POST',
                                            dataType: 'text',
                                            data: {
                                                _token: $('meta[name=csrf-token]').attr('content'),
                                                image: getImageurl
                                            }, success: function(res){
                                                alert('delete')
                                                idfot.el.attr('style', 'background-image: url("'+show+'")')
                                            }
                                        })

                                    }else{

                                    }
                                  })


                             })
                           )
                        )
                      })
                      parent.appendChild(sngl.get());
                    }

                  })

                  var containerUp = div()
                    .class('col-12 text-left mt-5 po-side')
                    .css('display','grid')
                    .css('grid-template-columns','250px auto')
                    .child(
                        div().id('cover').attr('style', 'background-image: url("assets/upload/cover/'+globalThis.idImagesCover+'.jpg")')
                        .event('dragover', function(ev){
                            ev.preventDefault();
                        })
                        .event('drop', function(ev){
                            globalThis.coverid = 1;
                            ev.preventDefault();
                            console.log(ev.dataTransfer)
                            var data = globalThis.transfer;
                            var blob = null;
                            var xhr = new XMLHttpRequest();
                            xhr.open("GET", data);
                            xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
                            xhr.onload = function()
                            {
                                blob = xhr.response;//xhr.response is now a blob object
                                var x = blob.type.split('/')[1];

                                var file = new File([blob], "image."+x, {type:"image/"+x});

                                uploadCover(file)

                            }
                            xhr.send();
                        })
                        .child(
                            label().html('<i class="fas fa-upload"></i>').child(
                                input().data('fot', 'assets/upload/cover/'+globalThis.idImagesCover+'.jpg?v='+Date.now()).type('file').change(function(){
                                    globalThis.coverid = 1;
                                    var dataimg = 'https://masuksini.com/'+this.getAttribute('data-fot');
                                    console.log(dataimg);
                                    var pack = this;
                                    uploadCover(pack.files[0]);
                                })
                            )
                        )
                        .child(
                            div().class('progress')
                            .child(
                                div().id('progress'+globalThis.idImagesCover).class('progress-bar').attr('role','progressbar').width('0%').aria('valuenow', '25').aria('valuemin', '0').aria('valuemax', '100').text('0%')
                            )
                        )
                    )
                    .child(dmpi)
                    dompImage.appendChild(containerUp.get());

                }
              })



            }

            function uploadCover(file){


                                var progress = globalThis['progress'+globalThis.idImagesCover];
                                var size =  file.size / 1000;
                                var show = 'assets/upload/cover/'+globalThis.idImagesCover+'.jpg?v='+Date.now();
                                var pathFile = 'assets/upload/cover/'+globalThis.idImagesCover+'.jpg';
                                // var pathFile = '../../sistem-api/androapi/upload/foto/'+a.id+'.jpg';
                                if(size > 10000){
                                    alert('file tidak boleh lebih dari 1MB');
                                }else{
                                        const reader = new FileReader();
                                        reader.addEventListener("load", function () {
                                        var base64 = reader.result;
                                        var rendr = base64.split("base64,");
                                        rendr = rendr[1];
                                        rendr = rendr.match(/.{1,150000}/g);
                                        var length = rendr.length;
                                        var start = 0;

                                        uploadProsses()

                                        function uploadProsses(){
                                                if (start < length) {
                                                    progress.el.width(Math.round(((start+1) / length) * 100)+'%').text(Math.round(((start+1) / length) * 100)+'%')
                                                    // document.getElementById('upload-file-'+a.id).innerText = Math.round(((start+1) / length) * 100)+'%';
                                                    $.ajax({
                                                        url: '/admin/upload',
                                                        method: 'POST',
                                                        dataType: 'text',
                                                        data: {
                                                            _token: $('meta[name=csrf-token]').attr('content'),
                                                            ok: rendr[start],
                                                            start: start,
                                                            tipe: 'upload'
                                                        },
                                                        success: function(e){
                                                            console.log(e.length)
                                                            start += 1;
                                                            uploadProsses();
                                                        }
                                                    })
                                                }else{
                                                    $.ajax({
                                                        url: '/admin/upload',
                                                        method: 'POST',
                                                        dataType: 'text',
                                                        data: {
                                                            _token: $('meta[name=csrf-token]').attr('content'),
                                                            tipe: pathFile
                                                        },
                                                        success: function(e){
                                                            globalThis['cover'].el.attr('style', 'background-image: url("'+show+'")')
                                                            progress.el.width('0%').text('0%')
                                                            console.log('saved')
                                                        }
                                                    })
                                                }
                                        }
                                        // uploadProsses()
                                        }, false);
                                        if (file) {
                                            reader.readAsDataURL(file);
                                        }


                                }



            }





        })
    }
}
