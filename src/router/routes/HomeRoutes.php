<?php

declare(strict_types=1);

  namespace Webstore\Routes;

  use Webstore\Controllers\HomeController;
  use Webstore\Routes\RequestMethod;

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
