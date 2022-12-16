<?php

declare(strict_types=1);

  namespace Webstore\Router\Routes;

  use Webstore\Controllers\HomeController;
  use Webstore\Router\RequestMethod;
  use Webstore\Router\Route;
  use Webstore\Router\Routes;

  class HomeRoutes extends Routes
  {
    public function __construct()
    {
      $controller = new HomeController();
      $this->routes = [
        new Route("/", RequestMethod::GET, fn() => $controller->index()),
      ];
    }
  }
