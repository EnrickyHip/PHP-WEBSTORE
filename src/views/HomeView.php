<?php

declare(strict_types=1);

namespace Webstore\Views;

use function Webstore\Includes\{includeFooter, includeHead, includeHeader};

class HomeView implements View
{
  public function load(): void
  {
    includeHead(title: "Webstore");
    ?>

    <body>
      <?php includeHeader() ?>
    </body>


    <?php
    includeFooter();
  }

}

?>




