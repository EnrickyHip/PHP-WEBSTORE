<?php

  declare(strict_types=1);

  namespace Webstore\Router;

  abstract class Routes implements RoutesInterface
  {
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
  }
