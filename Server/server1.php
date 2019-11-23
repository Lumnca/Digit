
<?php
header('Content-Type: text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); // 设置允许自定义请求头的字段

$txt = $_POST["txt"];

$font_file_name = "hzk32"; // 点阵字库文件名
$font_width = 32; // 单字宽度
$font_height = 32; // 单字高度
$start_offset = 0; // 偏移
 
$fp = fopen($font_file_name, "rb");
 
$offset_size = $font_width * $font_height / 8; 128
$string_size = $font_width * $font_height;
$dot_string = "";
$array_1 = array();

if(strlen($txt) == 1 ){
	
	$srw = (ord($txt) + 155) * $offset_size;
	
	fseek($fp, $srw, SEEK_SET);
	
	$bindot = fread($fp,  $offset_size);
	
	
	fclose($fp);
	
	for ($j = 0; $j < $offset_size; $j ++)
	{
		$t = sprintf("%02x", ord($bindot{$j}));
	
		array_push($array_1,$t);
		
	}
	echo   json_encode($array_1);	
}
else{
	
	$str= urlencode(iconv('UTF-8', 'GB2312', $txt));
	$a = substr($str,1,2);
	$b = substr($str,4,5);
	
	$gw =  (hexdec($a)-161)*94;
	$dw =  hexdec($b) - 161;
	
	fseek($fp, ($gw+$dw)*$offset_size, SEEK_SET);
	
	$bindot = fread($fp, $offset_size);
	

	fclose($fp);
	
	for ($j = 0; $j < $offset_size; $j ++)
	{
		$t = sprintf("%02x", ord($bindot{$j}));

		array_push($array_1,$t);
		
	}
     echo   json_encode($array_1);	
}

	

?>