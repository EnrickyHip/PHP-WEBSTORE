<?php

declare(strict_types=1);

namespace Webstore\Controllers;

abstract class BaseController
{
  protected function sendOutput(mixed $data, int $status)
  {
    http_response_code($status);
    echo json_encode($data);
  }
}
