<?php

  declare(strict_types=1);

  namespace Webstore\Router\Controllers;

  use Webstore\Controllers\UserController;
  use Webstore\Router\RequestMethod;
  use Webstore\Router\Route;
  use Webstore\Router\ControllerRoutes;

  class UserRoutes extends ControllerRoutes
  {
    public function __construct()
    {
      $controller = new UserController();
      $this->routes = [
        new Route("/user/exists-email", RequestMethod::POST, fn() => $controller->checkEmailExists()),
      ];
    }
  }
