<?php

declare(strict_types=1);

namespace Webstore\Views;

use function Webstore\Includes\{includeFooter, includeHead};

class RegisterPersonSellerView implements View
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
          <h3>Registrar Independente</h3>
          <form>
            <div class="form-group">
              <label for="register-name">Nome:</label>
              <input type="text" name="registerName" id="register-name">
              <span id="register-name-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-email">E-mail:</label>
              <input type="email" name="registerEmail" id="register-email">
              <span id="register-email-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-cpf">CPF:</label>
              <input type="text" maxlength="18" name="registerCpf" id="register-cpf">
              <span id="register-cpf-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-birth-date">Data de Nascimento:</label>
              <input type="date" name="birth-date" id="register-birth-date">
              <span id="register-birth-date-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-website">
                Website:
                <small>(opicional)</small>
              </label>
              <input type="url" name="website" id="register-website">
              <span id="register-website-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-about">
                Sobre:
                <small>(opicional)</small>
              </label>
              <textarea rows="7" name="about" id="register-about"></textarea>
              <span id="register-about-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-password">Senha:</label>
              <input type="password" name="registerPassword" id="register-password">
              <span id="register-password-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-confirm-password">Confirmar Senha:</label>
              <input type="password" name="registerConfirmPassword" id="register-confirm-password">
              <span id="register-confirm-password-message" class="input-message"></span>
            </div>

            <button id="register-button" class="bg-white" type="button">Registrar</button>
            <div style="margin-top: 1rem;">
              <a href="/registrar-vendedor" class="classic-link">Voltar</a>
            </div>
          </form>
        </div>
      </main>
    </body>


    <?php
      includeFooter();
    ?>
      <script src="/assets/js/personSellerRegister.bundle.js"></script>
    <?php
  }

}

?>


