<?php

declare(strict_types=1);

namespace Webstore\Models\Interfaces;

use DateTime;

interface SellerInterface {
  function getAbout(): ?string;
  function getWebsite(): ?string;
  function getDate(): DateTime;
}
