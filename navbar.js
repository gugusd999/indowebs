function capitalize(s){
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};

function makeMenus(a = null){
    var d = Object.keys(a);
    
    var ar = [];
    var ars = [];
    
    var html = '';
    
    for(var f of d){
        var type = Array.isArray(a[f]);
        if(type == true){
            html += `
                <li class="nav-item nav-item">
                    <a class="nav-link collapsed" href="#/${f}">
                    <i class="fas fa-fw fa-${a[f][1]}"></i>
                    <span>${a[f][0]}</span>
                    </a>
                </li>
            `; 
            if(f == ''){
                ar.push('dashboard');
            }else{
                ar.push(f);
            }
            ars.push(f);
        }else{
            html += `
                
                <li class="nav-item">
                    <a class="nav-link collapsed" data-toggle="collapse" data-target="#${f}"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fas fa-fw fa-${a[f].icon}"></i>
                        <span>${capitalize(f.replace(/\_/g, ' '))}</span>
                    </a>
                    <div id="${f}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            ${Object.keys(a[f].data).map(function(v,i){
                                ar.push(v);
                                ars.push(v);
                                var o = a[f].data;
                                return `
                                    <a class="collapse-item" href="#/${v}">${o[v]}</a>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </li>
                
            `;
        }
    }
    
    return {
        html: html,
        ar: ar,
        ars: ars
    };
    
}

var newDate = '16374034951311';

var m = makeMenus({
   '': ['Dashboard', 'tachometer-alt'],
   master: {
       icon: 'tags',
       data: {
           supplier: 'Supplier',
           kategori: 'Kategori'
       }
   },
   user: ['User', 'user']
});

var arr = m.ar;
window.arrGT = arr;
var arrs = m.ars;

m = m.html;

var routeCondfig = ``;

var ctn = 0;
for(var arrT of arr){
    routeCondfig += `
        
        Route.data["#/${arrs[ctn]}"] = function(){
            loadPage('${arrT}.js?v='+newDate, function(a){
                console.log(a);
                eval(a)
                domp('app',
                    div().html(navbarN)
                    .load(function(){
                        domp('app-content', div().html(${arrT}.content));
                        ${arrT}.action()
                        navAction()
                    })
                );
            })
        }
        
    `;
    ctn++;
}

console.log(routeCondfig);

const navbarN = `
<style>
    .container-fluid{
      height: calc(100vh - 138px);
      max-height: calc(100vh - 138px);
      overflow-y: auto;
    }

    .footer-app{
      padding: 8px 0;
    }

    .nav-link{
      padding: 8px 10px !important;
    }
</style>
<div id="wrapper">

<!-- Sidebar -->
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">POS</div>
    </a>

    ${m}

</ul>
<!-- End of Sidebar -->
<!-- Content Wrapper -->
<div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <!-- Sidebar Toggle (Topbar) -->
            <button id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3">
                <i class="fa fa-bars"></i>
            </button>
            <button id="logout-app" class="btn rounded-circle mr-3 float-right" style="position: absolute; right:10px;">
                <i style="font-size: 20px;" class="fas fa-sign-out-alt"></i>
            </button>
        </nav>
        <!-- End of Topbar -->
        <!-- Begin Page Content -->
        <div class="container-fluid">
            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 id="app-content-title" class="h3 mb-0 text-gray-800"></h1>
            </div>
            <!-- Content Row -->
            <div id="app-content">
            </div>
        <!-- /.container-fluid -->
    </div>
    <!-- End of Main Content -->
    <!-- Footer -->
    <footer class="footer-app bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; WDwebs</span>
            </div>
        </div>
    </footer>
    <!-- End of Footer -->
</div>
<!-- End of Content Wrapper -->
</div>
`;
