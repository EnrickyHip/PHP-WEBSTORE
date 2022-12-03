<?php

declare(strict_types=1);

namespace Webstore\Models;

require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../dotenv.php";

use PDO;

class Database
{
  private static PDO $connection;

  private const HOST = HOST;
  private const NAME = DATABASE;
  private const USER = USER;
  private const PASSWORD = PASSWORD;

  public static function getConnection(): PDO
  {
    if (!isset($connection)) {
      try {
        $dsn = 'mysql:host=' . self::HOST . ';dbname=' . self::NAME . ";charset=utf8mb4";
        $attributes = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
        self::$connection = new PDO($dsn, self::USER, self::PASSWORD, $attributes);
      } catch (\PDOException $exception) {
        throw $exception->getMessage();
      }
    }

    return self::$connection;
  }
}
