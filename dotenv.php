<?php

  require_once "vendor/autoload.php";

  use Dotenv\Dotenv;

  $dotenv = Dotenv::createImmutable(__DIR__);
  $dotenv->safeLoad();

  define('HOST', $_ENV["HOST"]);
  define('DATABASE', $_ENV["DATABASE"]);
  define('USER', $_ENV["USER"]);
  define('PASSWORD', $_ENV["PASSWORD"]);
