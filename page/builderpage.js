globalThis.Build = {
    content: `
        <style>
            #editor{
              position: fixed;
              display: block;
              width: 100vw;
              height: 100vh;
              background: #333;
              z-index: 999;
              top:0;
              left: 0;
            }
        </style>
        <div id="editor">
            <button id="tutup-editor" class="btn btn-sm btn-primary btn-editor">tutup editor</button>
            <button id="simpan-editor" class="btn btn-sm btn-primary btn-editor">simpan</button>
            <span id="upload-file" style="color: white;"></span>
            <div id="gjs"></div>
        </div>
    `,
    action: function(){



// builder

function init() {
var editor = grapesjs.init({
        autorender: 0,
        showOffsets: 1,
        noticeOnUnload: 0,
        container: '#gjs',
        height: '100%',
        fromElement: true,

        // storageManager: { autoload: 0 },

        // enable localstorage
        storageManager: {
          id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
          type: 'local',          // Type of the storage
          autosave: false,         // Store data automatically
          autoload: false,         // Autoload stored data on init
          stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
          storeComponents: true,  // Enable/Disable storing of components in JSON format
          storeStyles: true,      // Enable/Disable storing of rules/style in JSON format
          storeHtml: true,        // Enable/Disable storing of components as HTML string
          storeCss: true,         // Enable/Disable storing of rules/style as CSS string
        },
        // js and css libs
        canvas: {
          scripts: [
            'https://code.jquery.com/jquery-3.4.0.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
          ],
          styles:[
            'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
          ]
        },
      });


      // ----- COMPONENTS ----- //

      // Get DomComponents module
      // ----- BLOCKS ----- //


      editor.BlockManager.add('section-block-images', {
        label: 'images',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<img class="img-fluid" alt="" src="" />'
      });

      editor.BlockManager.add('section-block-collection', {
        label: 'card',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<div class=" container">'+
                        '<div class="card">'+
                            '<div class="card-body">'+
                                '<p class="">'+
                                    'text content example'+
                                '</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
      });

      editor.BlockManager.add('section-block-row-3', {
        label: 'row-3',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<div class="container">'+
                        '<div class="row">'+
                            '<div class="col-lg-4">'+
                                '<div class="card">'+
                                    '<div class="card-body">'+
                                        '<p>'+
                                            'text content example'+
                                        '</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-4">'+
                                '<div class="card">'+
                                    '<div class="card-body">'+
                                        '<p>'+
                                            'text content example'+
                                        '</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-4">'+
                                '<div class="card">'+
                                    '<div class="card-body">'+
                                        '<p>'+
                                            'text content example'+
                                        '</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
      });

      editor.BlockManager.add('section-block-head-1', {
        label: 'heading-1',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<h1>'+
                        'text heading 1'+
                    '</h1>'
      });

      editor.BlockManager.add('section-block-head-2', {
        label: 'heading-2',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<h2>'+
                        'text heading 2'+
                    '</h2>'
      });

      editor.BlockManager.add('section-block-head-3', {
        label: 'heading-3',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<h3>'+
                        'text heading 3'+
                    '</h3>'
      });

      editor.BlockManager.add('section-block-head-4', {
        label: 'heading-4',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<h4>'+
                        'text heading 4'+
                    '</h4>'
      });

      editor.BlockManager.add('section-block-head-5', {
        label: 'heading-5',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<h5>'+
                        'text heading 5'+
                    '</h5>'
      });

      editor.BlockManager.add('section-block-head-6', {
        label: 'heading-6',
        category: 'Section',
        attributes: {
          class:'fa fa-square'
        },
        content:    '<h6>'+
                        'text heading 6'+
                    '</h6>'
      });

    globalThis.editor = editor;
      // render editor after types are defined
    editor.render();

    globalThis.editor = editor;


}

if (globalThis.idlaman == undefined) {
    location.href = "#/laman";
}

$.ajax({
    url: '/assets/upload/laman/'+globalThis.idlaman+'.json',
})
.done(function(a) {
    init()
    console.log(a)
    editor.setComponents(a.html)
    editor.setStyle(a.css)
})
.fail(function() {
    init()
})


document.getElementById('tutup-editor').addEventListener('click', function(){
    location.href = "#/laman";
}, false)

document.getElementById('simpan-editor').addEventListener('click', function(){
    var html = editor.getHtml();
    var css = editor.getCss();
    var data = {
        html: html,
        css: css
    }

    console.log(data);

    var rendr = Base64.encode(JSON.stringify(data));
    rendr = rendr.match(/.{1,150000}/g);
    var length = rendr.length;
    var start = 0;

    uploadProsses();

    function uploadProsses(){
        if (start < length) {
            document.getElementById('upload-file').innerText = Math.round(((start+1) / length) * 100)+'%';
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
                    tipe: 'assets/upload/laman/'+globalThis.idlaman+'.json',
                    laman: true
                },
                success: function(e){
                    location.href = "#/laman";
                }
            })
        }
   }


}, false)
// end of builder







    }
}