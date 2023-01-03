<?php

declare(strict_types=1);

namespace Webstore\Router;

enum RequestMethod: string
{
  case GET = "GET";
  case POST = "POST";
}
