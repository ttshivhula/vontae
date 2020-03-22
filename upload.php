<?php
if (isset($_GET['upload'])) {
  $_FILES['mp3']['tmp_name'];

  /*if ($_FILES['mp3']['type'] != 'audio/mpeg') {
    die('Invalid file type' . $_FILES['mp3']['type']);
    exit();
  }*/

  $name = $_FILES['mp3']['name'];

  /*if (!preg_match("/.mp3/is", $name)) {
    die('Invalid file type2' . $_FILES['mp3']['type']);
    exit();
  }*/

  //$name = md5($name . time() . rand(0, 10)) . '.mp3';
  $name = 'padio/' . $name;

  copy($_FILES['mp3']['tmp_name'], $name) or
    die('Failed to upload MP3 file...');
  echo "File has been uploaded<br/>";
} else {
  echo '<form method="post" action="upload.php?upload" enctype="multipart/form-data"><input type="file" name="mp3" type="submit" /> <input type="submit" /></form>';
}

require_once 'list.php';

?>
