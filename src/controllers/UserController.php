<?php

declare(strict_types=1);

namespace Webstore\Controllers;

use Webstore\Repositories\UserRepository;
use Webstore\Models\Columns\UserColumn;
use Webstore\Requests\CnpjValidator;
use Webstore\Requests\CpfValidator;
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
      $users = $this->repository->getBy(UserColumn::Email, $email);

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
        $this->sendOutput(["error" => "CPF não enviado"], 400);
        return;
      }

      if (!CpfValidator::validate($_POST["cpf"])) {
        $this->sendOutput(["error" => "CPF Inválido!"], 400);
        return;
      }

      $cpf = Validator::sanitizeSpecialChars($_POST["cpf"]);
      $cpf = CpfValidator::cleanUp($cpf);
      $users = $this->repository->getBy(UserColumn::Cpf, $cpf);

      $exists = $users !== null;
      $this->sendOutput($exists, 200);
    } catch (\Exception $e) {
      $this->sendOutput(["error" => "Algo deu errado! tente novamente."], 500);
    }
  }

  public function checkCnpjExists(): void
  {
    try {
      if (!isset($_POST["cnpj"])) {
        $this->sendOutput(["error" => "CNPJ não enviado"], 400);
        return;
      }

      if (!CnpjValidator::validate($_POST["cnpj"])) {
        $this->sendOutput(["error" => "CNPJ Inválido!"], 400);
        return;
      }

      $cnpj = Validator::sanitizeSpecialChars($_POST["cnpj"]);
      $cnpj = CnpjValidator::cleanUp($cnpj);
      $users = $this->repository->getBy(UserColumn::Cnpj, $cnpj);

      $exists = $users !== null;
      $this->sendOutput($exists, 200);
    } catch (\Exception $e) {
      $this->sendOutput(["error" => "Algo deu errado! tente novamente."], 500);
    }
  }
}
