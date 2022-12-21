<?php

declare(strict_types=1);

namespace Webstore\Models;

use DateTime;
use Webstore\Models\Interfaces\SellerInterface;

class Company extends User implements SellerInterface
{
  private string $cnpj;
  private DateTime $foundation;
  private ?string $about;
  private ?string $website;

  public function getCnpj(): string
  {
    return $this->cnpj;
  }

  public function getDate(): DateTime
  {
    return $this->foundation;
  }

  public function getAbout(): ?string
  {
    return $this->about;
  }

  public function getWebsite(): ?string
  {
    return $this->website;
  }
}
