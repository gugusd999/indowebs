

globalThis.newDate = user.uniqId;

var arr = m.ar;
window.arrGT = arr;
var arrs = m.ars;

m = m.html;

var routeCondfig = ``;

var ctn = 0;
for(var arrT of arr){
    routeCondfig += `

        Route.data["#/${arrs[ctn]}"] = function(){
            domp('app',
                div().html(navbarN)
                .load(function(){
                    domp('app-content', div().html(${arrT}.content));
                    ${arrT}.action()
                    navAction()
                })
            );
        }

    `;
    ctn++;
}


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
                <span></span>
            </div>
        </div>
    </footer>
    <!-- End of Footer -->
</div>
<!-- End of Content Wrapper -->
</div>
`;
