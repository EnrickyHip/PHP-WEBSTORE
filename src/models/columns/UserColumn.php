<?php

namespace Webstore\Models\Columns;

enum UserColumn: string
{
  case Cpf = "cpf";
  case Cnpj = "cnpj";
  case Email = "email";
}
