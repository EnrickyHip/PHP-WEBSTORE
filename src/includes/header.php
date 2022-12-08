<?php

  namespace Webstore\Includes;

  function includeHeader(): void
  {
    ?>
      <header>
        <nav>
          <a href="/" id="logo">
            <h1>WEBSTORE</h1>
          </a>

          <input id="search" placeholder="Pesquisar"></input>

          <div>
            <span id="account-icon" class="material-icons clickable">
              account_circle
            </span>
            <a href="/cart">
              <span id="cart-icon" class="material-icons">
                shopping_cart
              </span>
            </a>
          </div>
        </nav>
      </header>

      <script src="/assets/js/header.bundle.js"></script>
    <?php
  }

