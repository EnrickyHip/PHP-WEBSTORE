<?php

  declare(strict_types=1);

  namespace Webstore\Controllers;

  use Webstore\Views\{RegisterView, RegisterSellerView};

  class RegisterController
  {
    public static function index(): void
    {
      $registerView = new RegisterView();
      $registerView->load();
    }

    public static function registerSeller(): void
    {
      $registerView = new RegisterSellerView();
      $registerView->load();
    }
  }
