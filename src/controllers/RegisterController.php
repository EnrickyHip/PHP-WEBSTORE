<?php

  declare(strict_types=1);

  namespace Webstore\Controllers;

  use Webstore\Views\RegisterView;

  class RegisterController
  {
    public static function index(): void
    {
      $registerView = new RegisterView();
      $registerView->load();
    }
  }
