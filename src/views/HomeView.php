<?php

  declare(strict_types=1);

  namespace Webstore\Views;

  use Webstore\Includes\{IncLoader, Inc};

  class HomeView implements View
  {
    public function load(): void
    {
      IncLoader::include(Inc::Head);
      head(title: "Webstore");
      ?>

      <body>
        <?php IncLoader::include(Inc::Header); ?>
      </body>

      <?php
    }

}



