<?php

declare(strict_types=1);

namespace Webstore\Controllers;

use Webstore\Views\HomeView;

class HomeController extends BaseController
{
  public function index(): void
  {
    $homeView = new HomeView();
    $homeView->load();
  }
}
