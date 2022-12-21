<?php

declare(strict_types=1);

namespace Webstore\Models\Interfaces;

interface PersonInterface {
  function getCpf(): string;
}
