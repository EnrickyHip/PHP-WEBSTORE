<?php

declare(strict_types=1);

namespace Webstore\Controllers;

use Webstore\Repositories\UserRepository;
use Enricky\CpfManager\Cpf;
use Webstore\Requests\Validator;

class UserController extends BaseController
{
  private UserRepository $repository;

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

      $email = Validator::sanitizeEmail($_POST["email"]);
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

      $cpf = Validator::sanitizeSpecialChars($_POST["cpf"]);
      $cpf = Cpf::clean_up($cpf);
      $users = $this->repository->getBy('cpf', $cpf);

      $exists = $users !== null;
      $this->sendOutput($exists, 200);
    } catch (\Exception $e) {
      $this->sendOutput(["error" => "Algo deu errado! tente novamente."], 500);
    }
  }
}
