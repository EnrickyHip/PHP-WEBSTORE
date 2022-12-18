<?php

declare(strict_types=1);

namespace Webstore\Router;

abstract class ControllerRoutes implements ControllerRoutesInterface
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
