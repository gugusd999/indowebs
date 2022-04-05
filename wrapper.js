
class Seo{

}

class Wrapper extends Seo {

    constructor(){
        super();
        this.root = [];
        this.css = '';
        this.Js = '';
        this.AppTitle = 'App.';
        this.ContainerPath = '/onedu';
    }

    meta(){
        var meta = '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
        meta += '<meta name="google-site-verification" content="JJnxHyxozTdWCx9l-iRGkx-6gqTTTkwR0ikXBd3-IQ8" />';
        return meta;
    }

    loadCss(a = []){
        this.css = a.map(function(b){
            return '<link rel="stylesheet" href="'+b+'">';
        }).join('');
    }

    loadJs(a = []){
        this.Js = a.map(function(b){
            return '<script src="'+b+'"></script>';
        }).join('');
    }

    title(a){
        document.title = a;
        this.AppTitle = a;
    }

    route(link, func){
        this.root[this.ContainerPath+link] = func;
    }

    go( url = '/', data = {}, name = 'new'){
        window.history.pushState(data, name, this.ContainerPath+url)
        var content = '';
        if(this.root[location.pathname] != undefined){
            content = this.root[location.pathname](this);
        }
        document.body.innerHTML = '';
        var a = document.createElement('div');
        a.innerHTML = content;
        document.body.appendChild(a);
    }

    async run(){
        var head = this.meta();
        head += this.css;
        head += '<title>'+this.AppTitle+'</title>';
        document.head.innerHTML = head;
        var content = '';
        var newDoc = '<html>';
        if(this.root[location.pathname] != undefined){
            content = await this.root[location.pathname](this);
        }
        newDoc += '<body>';
        newDoc += content;
        newDoc += this.Js;
        newDoc += '</body>';
        newDoc += '</html>';
        document.write(newDoc);
    }
}

globalThis.appR = new Wrapper()

// content area

var navbar = `

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" onclick="appR.go('/')" href="#">OnEdu</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" onclick="appR.go('/')" href="#">Beranda</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onclick="appR.go('/blog')" href="#">News</a>
      </li>
      </li>
      <li class="nav-item">
        <a class="nav-link" onclick="appR.go('/tentang-kami')" href="#">Tentang Kami</a>
      </li>
    </ul>

  </div>
</nav>

`;



var footer = `

<section class="bg-primary text-light p-3 pt-5 pb-5">
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6 col-lg-4 col-xl-4">
        <h2>OnEdu</h2>
        <p>OnEdu merupakan e-sekolah berbasis cloud server.</p>
      </div>
      <div class="col-12 col-sm-6 col-lg-8 col-xl-8">
      </div>
    </div>
  </div>
</section>

`;


appR.route('/', function(appS){
    appS.title('OnEdu')
    var content = navbar;
    content += `
        <div class="jumbotron">
            <div class="container">
            <img class="edu-ilustrasi" src="ilustrasi.png" alt="onedu">
            <div class="row">
                <div class="col-12 col sm-12 col-lg-8 col-xl-8">
                    <h1 class="display-4">OnEdu</h1>
                    <p>OnEdu merupakan e-sekolah berbasis cloud server. kami memberikan layanan untuk kegiatan sekolah berbasis online. Mulai dari kelas online untuk siswa, perpustakaan online, sytem penialian siswa, kontrol tugas oleh walimurid dan guru.</p>
                </div>
            </div>
            <div style="clear:both;"></div>
            <div class="row d-flex justify-content-center  mt-5">
                <div class="col-12 col col-sm-6 col-lg-4 col-xl-4 mb-3 ">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                              <img height="100px" src="icon/service.svg" alt="onedu - service">
                            </div>
                            <h3>Excellent Services</h3>
                            OnEdu menyediakan layanan terbaik untuk mengembangkan aplikasi berbasis web, mobile, dan layanan sistem integrasi.
                        </div>
                    </div>
                </div>
                <div class="col-12 col col-sm-6 col-lg-4 col-xl-4 mb-3 ">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                              <img height="100px" src="icon/profesional.svg" alt="onedu - profesional">
                            </div>
                            <h3>Professional</h3>
                            kami bekerja dan berkolaborasi bersama tim praktisi profesional untuk menciptakan software yang optimal, nyaman, dan mudah digunakan.
                        </div>
                    </div>
                </div>
                <div class="col-12 col col-sm-6 col-lg-4 col-xl-4 mb-3 ">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="text-center mb-3">
                              <img height="100px" src="icon/up-to-date.svg" alt="onedu - up to date">
                            </div>
                            <h3>Up to Date</h3>
                            Kami membangun sistem aplikasi dengan mengikuti kebutuhan sekolah masa kini, serta mengembangkan teknologi tepat guna sesuai dengan perkembangan tren terkini.
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <section class="mb-3 p-3">
            <div class="container">
                <div class="row d-flex align-items-center">
                    <div class="col-12 col-sm-12 col-lg-4 col-xl-4">
                        <h3>One Stop IT Solution for Education Pandemi Era</h3>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8 col-xl-8">
                        <p>Akibat pandemi covid 19 pendidikan di Indonesia mengalami kesulitan oleh kerenanya OnEdu hadir untuk mengatasi masalah tersebut.  OnEdu hadir dengan sistem e sekolah berbasis cloud server, kami siap memberikan pelayanan terbaik kami untuk anda.</p>
                    </div>
                </div>
            </div>
        </section>
        ${footer}
        <style>
          .edu-ilustrasi{
            width: 100%;
            max-width: 350px;
            float: none;
          }
          @media screen and (min-width: 1000px){
            .edu-ilustrasi{
              float:right;
              max-width: 400px;
              margin-right: 50px;
            }
          }
        </style>

    `;
    return content;
})


appR.route('/blog', function(appS){
    appS.title('OnEdu - News')
    var content = navbar;
    content += 'News';
    content += footer;
    return content;
})

appR.route('/tentang-kami', function(appS){
    appS.title('OnEdu - News')
    var content = navbar;
    content += `
      <section class="mb-3 p-3">
          <div class="container">
              <div class="row d-flex align-items-center">
                  <div class="col-12 col-sm-12 col-lg-4 col-xl-4">
                      <h3>One Stop IT Solution for Education Pandemi Era</h3>
                  </div>
                  <div class="col-12 col-sm-12 col-lg-8 col-xl-8">
                      <p>Akibat pandemi covid 19 pendidikan di Indonesia mengalami kesulitan oleh kerenanya OnEdu hadir untuk mengatasi masalah tersebut.  OnEdu hadir dengan sistem e sekolah berbasis cloud server, kami siap memberikan pelayanan terbaik kami untuk anda.</p>
                  </div>
              </div>
          </div>
      </section>
    `;
    content += footer;
    return content;
})

// content end
appR.loadCss([
    'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css',
])
appR.loadJs([
    'https://code.jquery.com/jquery-3.2.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js',
])
appR.run()
