<?php

  declare(strict_types=1);

  use Webstore\Controllers\HomeController;

  $routes = [
    "GET" => [
      "/" => fn() => HomeController::index(),
    ],
  ];

