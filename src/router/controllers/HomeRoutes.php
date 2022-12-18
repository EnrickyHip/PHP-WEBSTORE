<?php

declare(strict_types=1);

namespace Webstore\Router\Controllers;

use Webstore\Controllers\HomeController;
use Webstore\Router\RequestMethod;
use Webstore\Router\Route;
use Webstore\Router\ControllerRoutes;

class HomeRoutes extends ControllerRoutes
{
  private HomeController $controller;

  public function __construct()
  {
    $this->controller = new HomeController();
    $this->routes = [
      new Route("/", RequestMethod::GET, fn() => $this->controller->index()),
    ];
  }
}
