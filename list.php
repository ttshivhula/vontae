<?php
if ($handle = opendir('padio')) {
  while (false !== ($entry = readdir($handle))) {
    if ($entry != "." && $entry != ".." && $entry != ".create") {
      echo "https://vontae.co.za/padio/$entry\n";
    }
  }

  closedir($handle);
}
