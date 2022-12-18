<?php

declare(strict_types=1);

namespace Webstore\Router\Controllers;

use Webstore\Controllers\UserController;
use Webstore\Router\RequestMethod;
use Webstore\Router\Route;
use Webstore\Router\ControllerRoutes;

class UserRoutes extends ControllerRoutes
{
  private UserController $controller;

  public function __construct()
  {
    $this->controller = new UserController();
    $this->routes = [
      new Route("/user/exists-email", RequestMethod::POST, fn() => $this->controller->checkEmailExists()),
    ];
  }
}
