<?php

declare(strict_types=1);

namespace Webstore\Controllers;

use Webstore\Repositories\UserRepository;
use Enricky\CpfManager\Cpf;

class UserController extends BaseController
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
        $this->sendOutput(["error" => "Requisição Inválida"], 400);
        return;
      }

      $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
      $users = $this->repository->getBy('email', $email);

      $exists = $users !== null;
      $this->sendOutput($exists, 200);
    } catch (\Exception $e) {
      $this->sendOutput(["error" => "Algo deu errado! tente novamente."], 500);
    }
  }

  public function checkCpfExists(): void
  {
    try {
      if (!isset($_POST["cpf"])) {
        $this->sendOutput(["error" => "Requisição Inválida"], 400);
        return;
      }

      if (!Cpf::validate($_POST["cpf"])) {
        $this->sendOutput(["error" => "Cpf Inválido!"], 400);
        return;
      }

      $cpf = filter_var($_POST["cpf"], FILTER_SANITIZE_SPECIAL_CHARS);
      $cpf = Cpf::clean_up($cpf);
      $users = $this->repository->getBy('cpf', $cpf);

      $exists = $users !== null;
      $this->sendOutput($exists, 200);
    } catch (\Exception $e) {
      $this->sendOutput(["error" => "Algo deu errado! tente novamente."], 500);
    }
  }
}
