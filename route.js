import {domp, tanggal, div, el} from './file.js?v=999';
import {table} from './table.js?v=36644';
import {loadStyle} from './loadjs.js?v=19999';

// start app with make root

globalThis.div = div;

globalThis.level = [
  {id: 'admin', name : 'Administrator'},
  {id: 'writer', name : 'Penulis Artikel'},
  {id: 'agen', name : 'Agen'},
  {id: 'seller', name : 'Seller'},
  {id: 'member', name : 'Member (Buyer/ Renter)'}
];

const Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}



globalThis.bataspagin = Math.floor(window.innerHeight * ( 9 / 643)) + (window.innerHeight - 643) * 2 / (720 - 643);

var appStart = document.createElement('div')
appStart.id = "loader";
appStart.innerHTML = `
<style>
@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");

html,
body {
    padding: 0;
    margin: 0;
    position: relative;
    no-repeat center center;
    background-size: cover;
    height: 100vh;
    font-family: "Raleway", sans-serif;
    overflow-y: hidden;
}

.content1 {
    max-width: 650px;
    margin: 0 auto;
    top: 35%;
    position: relative;
    h1 {
        line-height: 1.5;
        color: white;
        font-weight: 300;
        text-align: center;
        font-size: 3rem;
        text-shadow: 0 2px 5px black;
    }
}


/* PRELOADER CSS */
.page-loader{
    width: 100%;
    height: 100vh;
    position: absolute;
    background: #272727;
    z-index: 1000;
    .txt{
        color: #666;
        text-align: center;
        top: 40%;
        position: relative;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        font-weight: bold;
        line-height: 1.5;
    }
}

/* SPINNER ANIMATION */
.spinner {
    position: relative;
    top: 35%;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background-color: #fff;

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
  animation: sk-scaleout 1.0s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% { -webkit-transform: scale(0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
}

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

.page-loader{
  background: #6610f2;
}

.page-loader .txt{
  position: absolute;
  bottom: 30%;
  left: calc(50% - 150px);
  width: 300px;
  text-align: center;
  font-size: 20pt;
  font-weight: bold;
  letter-spacing: 1.2px;
  color: white;
  font-family: 'Roboto', sans-serif;
}
</style>
<div class="page-loader">
    <div class="spinner"></div>
    <div class="txt">Please Wait</div>
</div>

`;
document.body.appendChild(appStart);

const Route = {
    data: {},
    start: function(starter = "#/"){
        var appStart = document.createElement('div')
        appStart.id = "app";
        document.body.appendChild(appStart);
        setTimeout(function(){
            window.addEventListener('hashchange', function() {
                Route.data[location.hash]();
            }, false);
        })
        var start = location.hash;
        if(location.hash == ""){
            location.hash = starter;
        }else{
            this.data[location.hash]();
        }
    }
}
// var urlapp = 'app';
var loadChace = true;
//console.log('ok')
const loadPage = function(page = "", func = null){
    globalThis.coverid = undefined;
    if (globalThis.dataPage == undefined) {
        globalThis.dataPage = {}
    }
    if(globalThis.propertiNewId != undefined){
        db().table('properti')
        .condition([
            {opsi: '', data: ['idProp', '=',  globalThis.propertiNewId]}
        ])
        .delete()
        .get(function(){
            console.log('dihapus')
        })
    }
    xdb('masuksiniadmin',['dataMaster'] ,7, function(s){
            s.read('dataMaster', page, function(p){
                if (p != null) {
                    func(p.data);
                }else{
                    fetch(urlapp+'/page/'+page)
                    .then(res => {
                        return res.text();
                    })
                    .then(data => {
                        globalThis.dataPage[page] = data;
                        func(data);

                        xdb('masuksiniadmin',['dataMaster'] ,7, function(s){
                            s.add('dataMaster',{id: page, data: data})
                        });

                    });
                }
            })
    })

}

function navAction(){

    if (document.getElementById('accordionSidebar') != undefined) {
        if (navSet == 0) {
            document.getElementById('accordionSidebar').className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled";
        }else{
            document.getElementById('accordionSidebar').className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";
        }
        setTimeout(function(){
            document.getElementById('sidebarToggleTop').addEventListener('click',function(){
                var classN = document.getElementById('accordionSidebar').className;
                if (classN == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
                    document.getElementById('accordionSidebar').className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled";
                }else{
                    document.getElementById('accordionSidebar').className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";
                }
            })
            if (localStorage.getItem('loginCond') == undefined) {
                location.href = "#/login";
            }
            document.getElementById('logout-app').addEventListener('click', function(){
                Swal.fire({
                  title: 'Apa anda yakin?',
                  text: "anda akan keluar dari administrator!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText: "Batalkan",
                  confirmButtonText: 'Ya',
                }).then((result) => {
                  if (result.isConfirmed) {
                      $.ajax({
                        url: '/?key=logout',
                        success:function(){
                            localStorage.removeItem('loginCond');
                            location.href = "/";
                        },error: function(){
                            alert('sorry no action to do');
                        }
                    })
                  }
                })
            },false)

            window.onresize = function(){
                if (window.innerWidth < 600) {

                }
            }
        },500)
    }
}

if (window.innerWidth < 600) {
    globalThis.navSet = 0;
}else{
    globalThis.navSet = 1;
}

function cekOut(){
    if (location.hostname != 'localhost') {
        setInterval(function(){
              if ((window.outerWidth - window.innerWidth) >= 100) {
                //localStorage.removeItem('loginCond');
                //debugger
            }
            if ((window.outerHeight - window.innerHeight) >= 120) {
                //localStorage.removeItem('loginCond');
                //debugger
            }
            //debugger
        },100)
    }
}

cekOut()

window.onresize = function(){

    cekOut()

    if (window.innerWidth < 600) {
        globalThis.navSet = 0;
    }else{
        globalThis.navSet = 1;
    }
    globalThis.bataspagin = Math.floor(window.innerHeight * ( 9 / 643)) + (window.innerHeight - 643) * 2 / (720 - 643);
}

globalThis.loadStyle = loadStyle;

loadStyle([
    urlapp+'sb/vendor/fontawesome-free/css/all.min.css',
    urlapp+'summernote.css',
    urlapp+'summernote-bs4.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.10/select2-bootstrap.min.css',
    'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i',
    urlapp+'/sb/css/sb-admin-2.min.css',
], function(){

}, function(){

})



function loadSc(a = [], func = null){
    var t = a.length;
    var s = 0;
    var ds = "";
    (function lb(){
        if(s < t){
            $.ajax({
              url: a[s],
              success:function(a){
                ds += a+" \n ";
                lb();
              },
              error:function(e){
                alert('connection time out')
              }
            })
            s++;
        }else{

            var d = document.createElement('script');
            d.innerHTML = ds;

            document.head.appendChild(d)

            func()
        }
    })()
}


loadSc([
    urlapp+"sb/vendor/bootstrap/js/bootstrap.bundle.min.js?v=2",
    urlapp+"sb/vendor/jquery-easing/jquery.easing.min.js?v=2",
    urlapp+"sb/js/sb-admin-2.min.js?v=2",
    urlapp+"summernote.js",
    urlapp+"uploadapi.js",
    "https://cdn.jsdelivr.net/npm/sweetalert2@11?v=1",
    "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js?v=2",
], function(){

    function file_get_js(er){
        var datajs = '';
        var s = 0;
        var lkps = er.length;
        scrtips()
        function scrtips(){
            if (s < lkps) {
                fetch(er[s])
                .then(response => response.text())
                .then(filejs => {
                    datajs += filejs+" \n ";
                    scrtips();
                    s++;
                })
            }else{
                xdb('masuksiniadmin',['dataMaster'] ,7, function(s){
                    s.add('dataMaster',{id: 'datascript', data: datajs})
                });


                var pop3s = document.getElementById('script1');

                //console.log('free')
                localStorage.setItem('getScript', globalThis.getScript);
                if (pop3s != null) {
                    pop3s.remove()
                    var scriptsp = document.createElement('script');
                    scriptsp.id = "script1";
                    scriptsp.innerHTML = datajs;
                    // document.head.appendChild(scriptsp);
                }

            }
        }
    }

    console.log(newDate);

    globalThis.newDate = newDate;


    eval(routeCondfig);

    if (localStorage.getItem('loginCond') != undefined) {
        if (location.hash == "" || location.hash == "#/login" || location.hash == "#/") {
            location.hash = "#/";
        }
    }else{
        location.reload();
    }


    // page load
    var arrayPageGet = window.arrGT;


    (async function versiFile(){

        fetch(urlapp+'/versi.json?v='+Date.now()).then(function(res){
            return res.json();
        })
        .then(async function(res){
            if(res.version != localStorage.getItem('versi')){
                var totalFile = 0;
                var arrayLength = arrayPageGet.length - 1;
                (async function versiLoad(y = 0){
                    fetch(urlapp+'/page/'+arrayPageGet[y]+'?v='+Date.now())
                    .then(function(resp){
                        return resp.text();
                    })
                    .then(function(resp){
                        var synget = resp;
                        if(y <= arrayLength){
                            //globalThis.newDate

                            xdb('masuksiniadmin',['dataMaster'] ,7, function(s){
                                //console.log(synget);
                                s.add('dataMaster',{id: arrayPageGet[y]+'?v='+globalThis.newDate, data: synget})
                                versiLoad(y+1);
                            });

                        }else{
                            localStorage.setItem('versi', res.version);
                            versiFile()
                        }
                    })
                    .catch((error) => {
                        setTimeout(function(){
                            versiLoad(y)
                        },3000)
                    });
                })(totalFile)
            }else{
                setTimeout(function(){
                    versiFile()
                },3000)
            }
        })
        .catch((error) => {
            setTimeout(function(){
                versiFile()
            },3000)
        });
    })()

    for(const pageGet of  arrayPageGet){
        loadPage(pageGet, function(){});
    }

    db().table('sales')
    .condition([
        {opsi: '', data: ['usernama', '=', `'${user.username}'`]}
    ])
    .get(function(s){
        //console.log(s);
        globalThis.sales = s;
    })

    // page load
    db()
    .master(['kategori_blog', 'subkategori', 'sales', 'regencies', 'provinces', 'area', 'kategori_properti', 'kecamatan'], function(){
        $('.page-loader').fadeOut('slow');
        globalThis.dataMaster['ppn'] = [
            {kode: 'Y'},
            {kode: 'N'}
        ];
        globalThis.dataMaster['level'] = level;
        Route.start();

    })

})
