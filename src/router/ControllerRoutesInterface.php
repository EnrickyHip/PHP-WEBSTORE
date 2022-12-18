<?php

declare(strict_types=1);

namespace Webstore\Router;

interface ControllerRoutesInterface
{
  /**
   * @return RouteInterface[]
   */
  function getRoutes(): array;
}
