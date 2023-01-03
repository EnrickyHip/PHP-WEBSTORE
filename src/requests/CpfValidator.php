<?php

declare(strict_types=1);

namespace Webstore\Requests;

use Enricky\CpfManager\Cpf;

class CpfValidator {
  public static function validate(string $cpf): bool
  {
    return Cpf::validate($cpf);
  }

  public static function cleanUp(string $cpf): string
  {
    return Cpf::cleanUp($cpf);
  }
}
