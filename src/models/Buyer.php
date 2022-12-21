<?php

declare(strict_types=1);

namespace Webstore\Models;

use Webstore\Models\Interfaces\PersonInterface;

class Buyer extends User implements PersonInterface
{
  private string $cpf;
  private ?string $phone;

  public function getCpf(): string
  {
    return $this->cpf;
  }

  public function getPhone(): ?string
  {
    return $this->phone;
  }
}
