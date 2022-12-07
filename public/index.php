<?php

declare(strict_types=1);

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../src/router.php";

try {
  $uri = parse_url($_SERVER["REQUEST_URI"])["path"];
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if (!isset($routes[$requestMethod][$uri])) {
    http_response_code(404);
    require_once __DIR__ . "/../src/views/404.php";
    exit;
  }

  $controller = $routes[$requestMethod][$uri];
  $controller();
} catch (\Exception $error) {
  throw $error->getMessage();
}


