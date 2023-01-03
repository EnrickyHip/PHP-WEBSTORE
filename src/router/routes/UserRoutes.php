<?php

declare(strict_types=1);

use Webstore\Controllers\UserController;
use Webstore\Router\RequestMethod;
use Webstore\Router\Route;
use Webstore\Router\Routes;

$controller = new UserController();

Routes::add(
  new Route("/user/exists-email", RequestMethod::POST, fn() => $controller->checkEmailExists()),
  new Route("/user/exists-cpf", RequestMethod::POST, fn() => $controller->checkCpfExists()),
  new Route("/user/exists-cnpj", RequestMethod::POST, fn() => $controller->checkCnpjExists()),
);

