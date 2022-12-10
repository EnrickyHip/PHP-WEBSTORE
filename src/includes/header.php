<?php

  namespace Webstore\Includes;

  function includeHeader(): void
  {
    ?>
      <header>
        <nav>
          <a href="/" class="logo">
            <h1>WEBSTORE</h1>
          </a>

          <input id="search" placeholder="Pesquisar"></input>

          <div>
            <div class="dropdown">
              <span id="account-icon" class="material-icons clickable">
                account_circle
              </span>
              <div id="login-dropdown" class="dropdown-content">
                <ul>
                  <li>
                    <a href="/login">Logar</a>
                  </li>
                  <li>
                    <a href="/registrar">Registrar</a>
                  </li>
                </ul>
              </div>
            </div>
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

