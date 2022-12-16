<?php

  declare(strict_types=1);

  namespace Webstore\Router\Routes;

  use Webstore\Controllers\RegisterController;
  use Webstore\Router\RequestMethod;
  use Webstore\Router\Route;
  use Webstore\Router\Routes;

  class RegisterRoutes extends Routes
  {
    public function __construct()
    {
      $controller = new RegisterController();
      $this->routes = [
        new Route("/registrar", RequestMethod::GET, fn() => $controller->index()),
        new Route("/registrar-vendedor", RequestMethod::GET, fn() => $controller->registerSeller()),
      ];
    }
  }
