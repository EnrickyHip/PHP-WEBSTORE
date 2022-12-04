<?php

declare(strict_types=1);

namespace Webstore\Includes;

class IncludeLoader
{
  public static function include(Includes $include): void
  {
    $includeName = $include->name;
    require_once __DIR__ . "./$includeName.php";
  }
}


