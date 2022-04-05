<?php

$sitename = "IndoWebs";
$title = "IndoWebs";
$canonical = $_SERVER['SCRIPT_URI'];
$index = "Index, Follow";
$contenttype = "article";
$content = "content";
$keyword = "content";
$uri = $_SERVER['SCRIPT_URL'];

$search = "";

if(preg_match('/search/', $uri) != 0){
	$search = str_replace("-", " ", explode('/search/',$uri)[1]);
  $title = $search." | ".$title;
}

$content = "";

$content .= '

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">'.$sitename.'</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/programming">Programming</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/design">Design</a>
        </li>
      </ul>
      <div class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" id=\'search-input\' aria-label="Search" value="'.$search.'">
        <button onclick="location.href = \'/search/\'+document.getElementById(\'search-input\').value.replace(/ /g, \'-\')" class="btn btn-outline-success" type="button">Search</button>
      </div>
    </div>
  </div>
</nav>

';


if($uri == '/'){
		
$content .= '
		
<main>
	<div class="bg-dark" style="position: relative;">
			<div class="bg-img-1">
			</div>
			<div class="bg-up">
					<div class="container-fluid text-light py-5">
							<div class="container">
								<h1 class="display-5 fw-bold">IndoWebs</h1>
								<p class="col-md-8">Place of information about programming and tutorials, also you will get information related to current technological developments. and information about best campus to learn latest technology in Indonesia. </p>
							</div>
					</div>
			</div>
	</div>
  <div class="container pt-5">
';
		
$content .= '
    <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="h-100 p-5 text-white bg-dark rounded-3">
          <h2>Create Website with Us</h2>
          <p>Build website seo friendly for your company with us.</p>
          <button class="btn btn-outline-light" type="button">Build Website</button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 bg-light border rounded-3">
          <h2>Join us Member</h2>
          <p>Join member and get more benefit.</p>
          <button class="btn btn-outline-secondary" type="button">Join US</button>
        </div>
      </div>
    </div>
		';
}

if($uri == '/programming'){
	$title = 'Programming | '.$title;
}

$content .= '
	
    <footer class="pt-3 mt-4 text-muted border-top">
      <p>&copy; Copyright by indowebs, 2021</p>
    </footer>
  </div>
</main>
';

$contentPage = $content;

$content = htmlspecialchars($content);

$html = "<html> \n";
$html .= "<head> \n";
$html .= '<meta name="viewport" content="width=device-width, initial-scale=1">'."\n";
$html .= "<meta name=\"robots\" content=\"$index\" /> \n";
$html .= "<link rel=\"canonical\" href=\"$canonical\" /> \n";
$html .= "<meta property=\"og:type\" content=\"$contenttype\">
<meta property=\"og:site_name\" content=\"$sitename\" />
<meta property=\"og:title\" content=\"$title?\">
<meta property=\"og:image\" content=\"https://foto.wartaekonomi.co.id/files/arsip_foto_2020_09_24/digital_marketing_125046_small.jpg\">
<meta property=\"og:image:type\" content=\"image/jpeg\">
<meta property=\"og:image:width\" content=\"500\">
<meta property=\"og:image:height\" content=\"288\">
<meta property=\"og:description\" content=\"$content\">
<meta property=\"og:url\" content=\"$canonical\">
<meta name=\"title\" content=\"$title\">
<meta name=\"description\" content=\"$content\">
<meta name=\"keywords\" content=\"$keyword\">
<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3\" crossorigin=\"anonymous\">

";
$html .= " <title>";
$html .= $title;
$html .= " </title> \n";
$html .= '<link rel="shortcut icon" type="image/png" href="/indowebs.png"/>';
$html .= " <style>";
$html .= '

.bg-img-1{
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
}


.bg-img-1:before{
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url("bg/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  opacity: 0.3;
  box-shadow: inset 0 0 50px rgba(0,0,0,0.);
}

.bg-dark .bg-up{
  z-index: 999;
  position: relative;
}

';
$html .= " </style> \n";
$html .= "</head> \n";
$html .= "<body> \n";


$html .= $contentPage;
// header
// meta
// footer
$html .= '<!-- Option 1: Bootstrap Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<!-- Option 2: Separate Popper and Bootstrap JS -->
<!--
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
-->';
$html .= "</body> \n";
$html .= "</html> \n";

echo $html;

?>