<?php

  declare(strict_types=1);

  namespace Webstore\Routes;

  use Webstore\Controllers\ControllerInterface;

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
