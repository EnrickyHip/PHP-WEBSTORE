<?php

declare(strict_types=1);

namespace Webstore\Models\Interfaces;

interface UserInterface extends ModelInterface {
  function getName(): string;
  function getSlug(): string;
  function getEmail(): string;
  function getProfileImage(): string;
}


