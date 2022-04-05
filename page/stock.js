globalThis.Stock = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-stock">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
            setTimeout(function(){
                document.getElementById('app-content-title').innerText = "Data Barang";
                table('stock')
                .equals(['kode'])
                .title('Data Barang')
                .modal('xl')
                .grouping({
                    "col-lg-6": [
                        {
                            start: 'kode',
                            end: 'satuan2'
                        }
                        ,{
                            start: 'hb',
                            end: 'berat'
                        }
                    ]
                })
                .createForm({
                    kode: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Inputkan Kode',
                        title: 'Kode',
                    },
                    barcode: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Inputkan Barcode',
                        title: 'Barcode',
                    },
                    nama: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Inputkan Nama',
                        title: 'Nama',
                    },
                    nama2: {
                        form: 'input',
                        type: 'text',
                        placeholder: '',
                    },
                    nama3: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'inputkan deskripsi',
                        title: 'Descripsi',
                    },
                    nama4: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Inputkan uraian  ',
                        title: 'Uraian',
                    }
                    ,pot: {
                        title: 'Pot',
                        form: 'input',
                        type: 'select',
                        view: ['kode', 'keterangan'],
                        value: 'kode',
                        table: 'pot',
                        columns: 6
                    }
                    ,golongan: {
                        title: 'Golongan',
                        form: 'input',
                        type: 'select',
                        view: ['kode', 'keterangan'],
                        value: 'kode',
                        table: 'golongan',
                        columns: 6
                    }
                    ,subgol: {
                        title: 'Sub Golongan',
                        form: 'input',
                        type: 'select',
                        view: ['kode', 'keterangan'],
                        value: 'kode',
                        table: 'subgol',
                        columns: 6
                    }
                    ,ppn: {
                        title: 'PPN',
                        form: 'input',
                        type: 'select',
                        view: ['kode'],
                        value: 'kode',
                        table: 'ppn',
                        columns: 6
                    }
                    ,warna: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'warna  ',
                        title: 'Warna',
                        columns: 6
                    },
                    satuan: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'Satuan',
                        title: 'Satuan',
                        columns: 6
                    },
                    isi1: {
                        form: 'input',
                        type: 'number',
                        placeholder: '0',
                        title: 'Isi',
                        columns: 6
                    },
                    satuan2: {
                        form: 'input',
                        type: 'text',
                        placeholder: 'sub satuan',
                        title: 'Sub Satuan',
                        columns: 6
                    },
                    hb: {
                        form: 'input',
                        type: 'number',
                        placeholder: '0',
                        title: 'Harga Beli (Rupiah)',
                    },
                    hb2: {
                        form: 'input',
                        type: 'number',
                        placeholder: '0',
                        title: 'Harga Beli (USD)',
                    },
                    hj: {
                        form: 'input',
                        type: 'number',
                        placeholder: '0',
                        title: 'Harga Jual (Rupiah)',
                    },
                    hj2: {
                        form: 'input',
                        type: 'number',
                        placeholder: '0',
                        title: 'Harga Jual (USD)',
                    },
                    min: {
                        form: 'input',
                        type: 'number',
                        placeholder: '0',
                        title: 'Minimal Saldo',
                    },
                    max: {
                        form: 'input',
                        type: 'number',
                        placeholder: '0',
                        title: 'Maxilam Saldo',
                    },
                    dimensi: {
                        form: 'input',
                        type: 'text',
                        placeholder: '0',
                        title: 'Dimensi',
                    },
                    berat: {
                        form: 'input',
                        type: 'text',
                        placeholder: '0',
                        title: 'Berat',
                    }
                })
                .row({
                    kode: 'Kode',
                    barcode: 'Barcode',
                    nama: 'Nama',
                    golongan: 'Golongan',
                    subgol: 'Sub Gol.',
                    uang: 'Uang',
                    hb: 'HB',
                    hj: 'HJ',
                    shp: 'hpp',
                })
                .load()
            })
    }
}