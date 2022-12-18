<?php

declare(strict_types=1);

use Webstore\Controllers\RegisterController;
use Webstore\Router\RequestMethod;
use Webstore\Router\Route;
use Webstore\Router\Routes;

$controller = new RegisterController();

Routes::add(
  new Route("/registrar", RequestMethod::GET, fn() => $controller->index()),
  new Route("/registrar-vendedor", RequestMethod::GET, fn() => $controller->registerSeller()),
);

