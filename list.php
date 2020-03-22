<?php

$all_files = new SplStack();

if ($handle = opendir('padio')) {
  while (false !== ($entry = readdir($handle))) {
    if ($entry != "." && $entry != ".." && $entry != ".create") {
      $all_files[] = "https://vontae.co.za/padio/$entry";
    }
  }

  foreach ($all_files as $entry) {
    echo "<input type='text' value='https://vontae.co.za/padio/$entry' size='100'><br/>";
  }
  closedir($handle);
}
