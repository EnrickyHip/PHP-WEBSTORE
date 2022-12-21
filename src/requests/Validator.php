<?php

declare(strict_types=1);

namespace Webstore\Requests;

class Validator {
  public static function sanitizeEmail(string $email): string {
    return filter_var($email, FILTER_SANITIZE_EMAIL);
  }

  public static function sanitizeSpecialChars(string $var): string {
    return filter_var($var, FILTER_SANITIZE_SPECIAL_CHARS);
  }
}
