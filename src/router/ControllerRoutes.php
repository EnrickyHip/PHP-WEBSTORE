<?php

  declare(strict_types=1);

  namespace Webstore\Router;

  abstract class ControllerRoutes implements ControllerRoutesInterface
  {
    /**
     * @var RouteInterface[] $routes
     */
    protected static array $allRoutes = [];

    /**
     * @var RouteInterface[] $routes
     */
    protected array $routes = [];

    /**
     * @return RouteInterface[]
     */
    public function getRoutes(): array {
      return $this->routes;
    }

    public static function add(ControllerRoutesInterface ...$routesParams): void
    {
      foreach($routesParams as $route) {
        array_push(self::$allRoutes, ...$route->getRoutes());
      }
    }

    /**
     * @return RouteInterface[]
     */
    public static function getAllRoutes(): array
    {
      return self::$allRoutes;
    }
  }
