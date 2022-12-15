<?php

  declare(strict_types=1);

  use Webstore\Controllers\{HomeController, RegisterController};

  $homeController = new HomeController();
  $registerController = new RegisterController();

  $routes = [
    "GET" => [
      "/" => fn() => $homeController->index(),
      "/registrar" => fn() => $registerController->index(),
      "/registrar-vendedor" => fn() => $registerController->registerSeller(),
    ],
  ];

