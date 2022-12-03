<?php

declare(strict_types=1);

namespace Webstore\Controllers;

class HomeController
{
  public static function index(): void
  {
    require_once __DIR__ . "/../views/home.php";
  }
}
