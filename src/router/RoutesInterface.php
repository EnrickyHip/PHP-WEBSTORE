<?php

  declare(strict_types=1);

  namespace Webstore\Routes;

  interface RoutesInterface
  {
    /**
     * @return Route[]
     */
    function getRoutes(): array;
  }
