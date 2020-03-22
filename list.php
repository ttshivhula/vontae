<?php
if ($handle = opendir('padio')) {
  while (false !== ($entry = readdir($handle))) {
    if ($entry != "." && $entry != ".." && $entry != ".create") {
      echo "<input type='text' value='https://vontae.co.za/padio/$entry'><br/>";
    }
  }

  closedir($handle);
}
