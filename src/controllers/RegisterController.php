<?php

declare(strict_types=1);

namespace Webstore\Controllers;

use Webstore\Views\{RegisterCompanyView, RegisterPersonSellerView, RegisterView, RegisterSellerView};

class RegisterController extends BaseController
{
  public function index(): void
  {
    $registerView = new RegisterView();
    $registerView->load();
  }

  public function registerSeller(): void
  {
    $registerView = new RegisterSellerView();
    $registerView->load();
  }

  public function registerCompany(): void
  {
    $registerView = new RegisterCompanyView();
    $registerView->load();
  }

  public function registerPersonSeller(): void
  {
    $registerView = new RegisterPersonSellerView();
    $registerView->load();
  }
}
