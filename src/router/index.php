<?php

  declare(strict_types=1);

  use Webstore\Router\ControllerRoutes;
  use Webstore\Router\Controllers\HomeRoutes;
  use Webstore\Router\Controllers\RegisterRoutes;
  use Webstore\Router\Controllers\UserRoutes;

  ControllerRoutes::add(
    new HomeRoutes(),
    new UserRoutes(),
    new RegisterRoutes()
  );
