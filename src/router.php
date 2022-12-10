<?php

  declare(strict_types=1);

  use Webstore\Controllers\{HomeController, RegisterController};

  $routes = [
    "GET" => [
      "/" => fn() => HomeController::index(),
      "/registrar" => fn() => RegisterController::index(),
    ],
  ];

