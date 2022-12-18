<?php

declare(strict_types=1);

namespace Webstore\Repositories;

use PDO;
use Webstore\Models\Database;
use Webstore\Models\Interfaces\UserInterface;
use Webstore\Models\User;

class UserRepository
{
  private PDO $connection;

  public function __construct()
  {
    $this->connection = Database::getConnection();
  }

  /**
   * @return UserInterface[] | null
   */
  public function getBy(string $column, mixed $value): array | null
  {
    $sql = "SELECT `id`, `name`, `slug`, `email`, `profile_image` AS profileImage FROM `user` WHERE $column = ?;";
    $query = $this->connection->prepare($sql);
    $query->execute([$value]);

    if ($query->rowCount() === 0) {
      return null;
    }

    return $query->fetchAll(PDO::FETCH_CLASS, User::class);
  }
}