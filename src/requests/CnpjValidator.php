<?php

declare(strict_types=1);

namespace Webstore\Requests;

use Enricky\CnpjManager\Cnpj;

class CnpjValidator {
  public static function validate(string $cnpj): bool
  {
    return Cnpj::validate($cnpj);
  }

  public static function cleanUp(string $cnpj): string
  {
    return Cnpj::cleanUp($cnpj);
  }
}
