<?php

  declare(strict_types=1);

  namespace Webstore\Routes;

  use Closure;

  class Route implements RouteInterface
  {
    public function __construct(
      private string $uri,
      private RequestMethod $requestMethod,
      private Closure $controllerMethod
      ) {}

    public function getUri(): string
    {
      return $this->uri;
    }

    public function getRequestMethod(): RequestMethod
    {
      return $this->requestMethod;
    }

    public function getControllerMethod(): Closure
    {
      return $this->controllerMethod;
    }
  }
