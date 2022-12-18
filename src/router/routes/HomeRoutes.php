<?php

declare(strict_types=1);

use Webstore\Controllers\HomeController;
use Webstore\Router\RequestMethod;
use Webstore\Router\Route;
use Webstore\Router\Routes;

$controller = new HomeController();

Routes::add(new Route("/", RequestMethod::GET, fn() => $controller->index()));
