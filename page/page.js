globalThis.page = {
    content: `
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-12 col-12">
            <div class="card shadow h-100 py-2">
                <div class="card-body" id="load-page">

                </div>
            </div>
        </div>
    </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('app-content-title').innerText = "Page data";
            table('page')
            .title('Page')
            .createForm({
                url: {
                  form: 'input',
                  type: 'text',
                  placeholder: 'Write page url',
                  title: 'Url'
                }
                ,name: {
                  form: 'input',
                  type: 'text',
                  placeholder: 'write page name',
                  title: 'Page Name'
                }
                ,keyword: {
                  form: 'input',
                  type: 'text',
                  placeholder: 'write page keyword',
                  title: 'Page Keyword'
                }
                ,content_page: {
                  form: 'input',
                  type: 'note',
                  placeholder: 'write content',
                  title: 'Content'
                }
            })
            .oncreate(function(){
                $('#content_page').summernote({
            			height: 200,
            			toolbar: [
            				// [groupName, [list of button]]
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
            })
            .onupdate(function(a){

                document.getElementById('f-url').before(
                  div().html(`
                    <div id='load-images' style='height: 150px; width: 150px; background: #ddd; border-radius: 10px; overflow: hidden; background-size: contain;
                    background-image:url("/foto/post/${a.data.loadDataEdit.name}.jpg?v=${tanggal(a.data.loadDataEdit.update_at).milisecond}"); background-repeat: no-repeat; background-position: center;'>
                    </div>
                    <div>
                    <span>Cover <span id='proses-upload'>0</span>%</span>
                    <input class="form-control" id='cover' type='file' accept="image/jpg, image/jpeg, image/png">
                    </div>
                  `).load(()=>{

                    function getBase64(file) {
                      return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                      });
                    }


                    document.getElementById('cover').addEventListener('change', async ()=> {
                      var point = document.getElementById('name').value;
                      if(point != ''){
                        var file = document.querySelector('#cover').files[0];
                        globalThis.bs64 = await getBase64(file).then(
                          data => data
                        );

                        bs64 = bs64.split('base64,')[1];

                        upload('/?key=upload', 'foto/post/', document.getElementById('name').value+'.jpg', bs64, function(proses){
                          console.log(proses);
                        }, function(success){
                          document.getElementById('load-images').style.backgroundImage = `url("/foto/post/${point}.jpg?v=${Date.now()}")`;
                        })
                      }else{
                        alert('nama tidak boleh kosong');
                      }
                    },false)

                  }).get()
                )

                document.getElementById('url').setAttribute('readonly', true);
                $('#content_page').summernote({
                  height: 200,
                  toolbar: [
                    // [groupName, [list of button]]
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
            })
            .row({
                url: 'Url',
                name: 'Page Name',
                keyword: 'Keyword',
                created_at: 'Created At',
                update_at: 'Updated At'
            })
            .order('url', 'DESC')
            .load()
        })
    }
}
