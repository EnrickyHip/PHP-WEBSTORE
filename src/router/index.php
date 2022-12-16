<?php

  declare(strict_types=1);

  use Webstore\Routes\HomeRoutes;
  use Webstore\Routes\RegisterRoutes;

  $homeRoutes = new HomeRoutes();
  $registerRoutes = new RegisterRoutes();

  $routes = [
    ...$homeRoutes->getRoutes(),
    ...$registerRoutes->getRoutes(),
  ];
