<?php

declare(strict_types=1);

namespace Webstore\Router;

class Routes
{
  /**
   * @var RouteInterface[] $routes
   */
  protected static array $routes = [];

  public static function add(ControllerRoutesInterface ...$routesParams): void
  {
    foreach($routesParams as $route) {
      array_push(self::$routes, ...$route->getRoutes());
    }
  }

  /**
   * @return RouteInterface[]
   */
  public static function getRoutes(): array
  {
    return self::$routes;
  }
}
