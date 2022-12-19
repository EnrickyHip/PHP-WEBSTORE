<?php

declare(strict_types=1);

namespace Webstore\Router;

class Routes
{
  /** @var RouteInterface[] $routes */
  private static array $routes = [];

  public static function add(RouteInterface ...$routes): void
  {
    foreach($routes as $route) {
      array_push(self::$routes, $route);
    }
  }

  /** @return RouteInterface[] */
  public static function getAll(): array
  {
    return self::$routes;
  }
}
