<?php

  declare(strict_types=1);

  use Webstore\Router\Routes\HomeRoutes;
  use Webstore\Router\Routes\RegisterRoutes;

  $homeRoutes = new HomeRoutes();
  $registerRoutes = new RegisterRoutes();

  $routes = [
    ...$homeRoutes->getRoutes(),
    ...$registerRoutes->getRoutes(),
  ];
