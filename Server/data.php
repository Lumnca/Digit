<?php
/**
* 读取汉字点阵数据
*
*/
$str =  $_POST["fname"];
 
$font_file_name = "hzk16s"; // 点阵字库文件名
$font_width = 16; // 单字宽度
$font_height = 16; // 单字高度
$start_offset = 0; // 偏移
 
$fp = fopen($font_file_name, "rb");
 
$offset_size = $font_width * $font_height / 8;

echo "offset_size：$offset_size";

$string_size = $font_width * $font_height;

$dot_string = "";
 
for ($i = 0; $i < strlen($str); $i ++)
{
	if (ord($str{$i}) > 160)
	{
		// 先求区位码，然后再计算其在区位码二维表中的位置，进而得出此字符在文件中的偏移
		$offset = ((ord($str{$i}) - 0xa1) * 94 + (ord($str{$i + 1}) - 0xa1)) * $offset_size;
		$i ++;
	}
	else
	{
		$offset = (ord($str{$i}) + 155) * $offset_size;
	}
 
	// 读取其点阵数据
	fseek($fp, $start_offset + $offset, SEEK_SET);
	$bindot = fread($fp, $offset_size);
 
	for ($j = 0; $j < $offset_size; $j ++)
	{
	// 将二进制点阵数据转化为字符串
		$dot_string .= sprintf("%08b", ord($bindot{$j}));
		echo "$j : sprintf("%08b", ord($bindot{$j})) <br>";
	}
}
 
fclose($fp);
echo "测试字:$str";
//echo "点阵数据: $dot_string";
?>