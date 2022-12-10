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
            <h1>WEBSTORE</h1>
          </a>
          <div class="center-box">
            <h1>Registrar</h1>
            <form action="/registrar" method="post">
              <div class="form-group">
                <label for="register-name">Nome:</label>
                <input type="text" name="registerName" id="register-name">
              </div>
              <div class="form-group">
                <label for="register-email">E-mail:</label>
                <input type="email" name="registerEmail" id="register-email">
              </div>
              <div class="form-group">
                <label for="register-cpf">CPF:</label>
                <input type="text" name="registerCpf" id="register-cpf">
              </div>
              <div class="form-group">
                <label for="register-password">Senha:</label>
                <input type="password" name="registerPassword" id="register-password">
              </div>
              <div class="form-group">
                <label for="register-confirm-password">Confirmar Senha:</label>
                <input type="password" name="registerConfirmPassword" id="register-confirm-password">
              </div>
              <button class="bg-white" type="button">Registrar</button>
            </form>
          </div>
        </main>
      </body>


      <?php
      includeFooter();
    }

}

?>


