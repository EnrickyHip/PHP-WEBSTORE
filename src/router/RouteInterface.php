<?php

  declare(strict_types=1);

  namespace Webstore\Routes;

  use Closure;

  interface RouteInterface
  {
    function getUri(): string;
    function getRequestMethod(): RequestMethod;
    function getControllerMethod(): Closure;
  }
