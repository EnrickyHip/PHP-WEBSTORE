<?php

declare(strict_types=1);

namespace Webstore\Views;

use function Webstore\Includes\{includeFooter, includeHead};

class RegisterSellerView implements View
{
  public function load(): void
  {
    includeHead(title: "Registrar");
    ?>

    <body>
      <main class="center-container">
        <a href="/" class="logo">
          <h2>WEBSTORE</h2>
        </a>
        <div class="center-box">
          <h1>Vender na Webstore</h1>
          <h3>Selecione o tipo de vendedor:</h3>
          <div>
            <a href="/registrar-empresa">
              <button class="bg-white">Empresa</button>
            </a>
            <a href="/registrar-independente">
              <button class="bg-white">Independente</button>
            </a>
          </div>

          <span>
            Atenção: Apenas pessoas físicas podem realizar compras na Webstore.
            Portanto, apenas vendedores independentes terão permissão para tal.
          </span>

          <div style="margin-top: 2rem;">
            <a href="/registrar" class="classic-link">Voltar</a>
          </div>
        </div>
      </main>
    </body>


    <?php
    includeFooter();
  }

}

?>


