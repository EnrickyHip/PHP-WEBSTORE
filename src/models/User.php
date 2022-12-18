<?php

declare(strict_types=1);

namespace Webstore\Models;

use Webstore\Models\Interfaces\UserInterface;

class User implements UserInterface
{
  public function __construct(
    private int $id,
    private string $name,
    private string $slug,
    private string $email,
    private string $profileImage
  ) {}

  public function getId(): int
  {
    return $this->int;
  }

  public function getSlug(): string
  {
    return $this->slug;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getEmail(): string
  {
    return $this->email;
  }

  public function getProfileImage(): string
  {
    return $this->profileImage;
  }

}
