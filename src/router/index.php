<?php

declare(strict_types=1);

use Webstore\Router\Controllers\HomeRoutes;
use Webstore\Router\Controllers\RegisterRoutes;
use Webstore\Router\Controllers\UserRoutes;
use Webstore\Router\Routes;

Routes::add(
  new HomeRoutes(),
  new UserRoutes(),
  new RegisterRoutes()
);
