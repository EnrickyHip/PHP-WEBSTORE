<?php

  declare(strict_types=1);

  namespace Webstore\Includes;

  class IncLoader
  {
    public static function include(Inc $include): void
    {
      $includeName = $include->value;
      require_once __DIR__ . "./$includeName.php";
    }
  }


