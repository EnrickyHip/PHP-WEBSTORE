<?php

declare(strict_types=1);

namespace Webstore\Models;

use DateTime;
use Webstore\Models\Interfaces\PersonInterface;
use Webstore\Models\Interfaces\SellerInterface;

class PersonSeller extends User implements PersonInterface, SellerInterface
{
  private string $cpf;
  private DateTime $birth;
  private ?string $about;
  private ?string $website;

  public function getDate(): DateTime
  {
    return $this->birth;
  }

  public function getAbout(): ?string
  {
    return $this->about;
  }

  public function getWebsite(): ?string
  {
    return $this->website;
  }

  public function getCpf(): string
  {
    return $this->cpf;
  }
}
