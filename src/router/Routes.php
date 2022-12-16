<?php

  declare(strict_types=1);

  namespace Webstore\Router;

  abstract class Routes implements RoutesInterface
  {
    /**
     * @var Route[] $routes
     */
    protected array $routes = [];
    /**
     * @return Route[]
     */
    public function getRoutes(): array {
      return $this->routes;
    }
  }
