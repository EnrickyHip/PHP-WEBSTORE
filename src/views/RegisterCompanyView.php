<?php

declare(strict_types=1);

namespace Webstore\Views;

use function Webstore\Includes\{includeFooter, includeHead};

class RegisterCompanyView implements View
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
          <h3>Registrar Empresa</h3>
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
              <label for="register-cpf">CNPJ:</label>
              <input type="text" maxlength="14" name="registerCpf" id="register-cpf">
              <span id="register-cpf-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-foundation-date">Data de Fundação:</label>
              <input type="date" name="website" id="register-website-company">
              <span id="register-website-company-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-url">Website:</label>
              <input type="url" name="foundationDate" id="register-foundation-date">
              <span id="register-foundation-date-message" class="input-message"></span>
            </div>

            <div class="form-group">
              <label for="register-foundation-date">Sobre:</label>
              <textarea rows="4" name="aboutCompany" id="register-about-company"></textarea>
              <span id="register-about-company-message" class="input-message"></span>
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
            <div>
              <a class="classic-link" href="/registrar-vendedor">Deseja vender na Webstore? Clique aqui</a>
            </div>
            <div style="margin-top: 1rem;">
              <a href="/registrar-vendedor" class="classic-link">Voltar</a>
            </div>
          </form>
        </div>
      </main>
    </body>


    <?php
    includeFooter();
  }

}

?>


