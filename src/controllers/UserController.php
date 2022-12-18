<?php

declare(strict_types=1);

namespace Webstore\Controllers;

use Webstore\Repositories\UserRepository;

class UserController
{
  private $repository;

  public function __construct()
  {
    $this->repository = new UserRepository();
  }

  public function checkEmailExists(): void
  {
    try {
      if (!isset($_POST["email"])) {
        echo json_encode(["error" => "Requisição Inválida"]);
        http_response_code(400);
        return;
      }

      $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
      $user = $this->repository->getBy('email', $email);

      $exists = $user !== null;
      echo json_encode($exists);
    } catch (\Exception $e) {
      echo json_encode(["error" => "Algo deu errado! tente novamente."]);
      http_response_code(500);
    }
  }
}
