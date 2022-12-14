<?php

declare(strict_types=1);

use Webstore\Router\Routes;

session_start();

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../src/router/index.php";

try {
  $uri = parse_url($_SERVER["REQUEST_URI"])["path"];
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if ($requestMethod === "POST") {
    $_POST = json_decode(file_get_contents("php://input"), true);
  }

  $foundRoute = null;
  $routes = Routes::getAll();

  foreach ($routes as $route) {
    if ($uri === $route->getUri()) {
      $foundRoute = $route;
    }
  }

  if ($foundRoute === null) {
    http_response_code(404);
    require_once __DIR__ . "/../src/views/404.php";
    exit;
  }

  $controller = $foundRoute->getControllerMethod();
  $controller();
} catch (\Exception $error) {
  throw $error->getMessage();
}


