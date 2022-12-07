<?php

declare(strict_types=1);

require_once __DIR__ . "/../../vendor/autoload.php";

use Webstore\Includes\{IncLoader, Inc};

IncLoader::include(Inc::Head);
head(title: "Webstore");

?>

<body>
  <?php IncLoader::include(Inc::Header); ?>
</body>


