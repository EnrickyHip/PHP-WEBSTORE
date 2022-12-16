<?php

  declare(strict_types=1);

  namespace Webstore\Router;

  interface RoutesInterface
  {
    /**
     * @return RouteInterface[]
     */
    function getRoutes(): array;
  }
