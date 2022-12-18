<?php

  declare(strict_types=1);

  namespace Webstore\Views;

  use function Webstore\Includes\{includeFooter, includeHead};

  class RegisterView implements View
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
            <h1>Registrar</h1>
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
                <input type="text" name="registerCpf" id="register-cpf">
                <span id="register-cpf-message" class="input-message"></span>
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

              <button class="bg-white" type="button">Registrar</button>
              <div>
                <a class="classic-link" href="/registrar-vendedor">Deseja vender na Webstore? Clique aqui</a>
              </div>
              <div style="margin-top: 1rem;">
                <a href="/" class="classic-link">Voltar</a>
              </div>
            </form>
          </div>
        </main>
      </body>


      <?php
        includeFooter();
      ?>
        <script src="/assets/js/register.bundle.js"></script>
      <?php
    }

}

?>


