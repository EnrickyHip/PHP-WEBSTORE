<?php

declare(strict_types=1);

require_once __DIR__ . "/../../vendor/autoload.php";

use Webstore\Includes\IncludeLoader;
use Webstore\Includes\Includes;

IncludeLoader::include(Includes::Head);
head(title: "Webstore");

IncludeLoader::include(Includes::Header);

