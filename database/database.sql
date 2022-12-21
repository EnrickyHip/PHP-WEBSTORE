DROP DATABASE IF EXISTS `webstore`;
CREATE DATABASE IF NOT EXISTS `webstore`;
USE `webstore`;

CREATE TABLE IF NOT EXISTS `state` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `abbreviation` CHAR(2) NOT NULL UNIQUE KEY
);

INSERT INTO `state` (`name`, `abbreviation`) VALUES
("Acre", "AC"),
("Alagoas", "AL"),
("Amazonas", "AM"),
("Amapá", "AP"),
("Bahia", "BA"),
("Ceará", "CE"),
("Distrito Federal", "DF"),
("Espírito Santo", "ES"),
("Goiás", "GO"),
("Maranhão", "MA"),
("Minas Gerais", "MG"),
("Mato Grosso do Sul", "MS"),
("Mato Grosso", "MT"),
("Pará", "PA"),
("Paraíba", "PB"),
("Pernambuco", "PE"),
("Piauí", "PI"),
("Paraná", "PR"),
("Rio de Janeiro", "RJ"),
("Rio Grande do Norte", "RN"),
("Rondônia", "RO"),
("Roraima", "RR"),
("Rio Grande do Sul", "RS"),
("Santa Catarina", "SC"),
("Sergipe", "SE"),
("São Paulo", "SP"),
("Tocantins", "TO");

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `slug` CHAR(32) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE KEY,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `profile_image` VARCHAR(255) DEFAULT "default_profile.png",
  `cellphone` CHAR(11) DEFAULT NULL, -- exclusivo para pessoas físicas
  `about` VARCHAR(2048) DEFAULT NULL, -- exclusivo para vendedores
  `website` VARCHAR(2048) DEFAULT NULL, -- exclusivo para vendedores
  `birth` DATE DEFAULT NULL, -- exclusivo para vendedores físicos e obrigatório para todos estes.
  `cpf` CHAR(11) DEFAULT NULL UNIQUE KEY, -- exclusivo para clientes, vendedores físicos e obrigatório para todos estes.
  `foundation_date` DATE DEFAULT NULL, -- exclusivo para vendedores jurídicos e obrigatório para estes.
  `cnpj` CHAR(14) DEFAULT NULL UNIQUE KEY, -- exclusivo para vendedores jurídicos e obrigatório para estes.
  `active` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_buyer` BOOLEAN NOT NULL,
  `is_seller` BOOLEAN NOT NULL,
  `user_type` ENUM("PERSON", "COMPANY") NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  `deleted_at` DATETIME DEFAULT NULL
);

-- contatos são exclusivos para empresas
CREATE TABLE IF NOT EXISTS `contact` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` CHAR(11) NOT NULL,
  `company_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (`company_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `number` SMALLINT NOT NULL,
  `phone` CHAR(11) NOT NULL,
  `cep` CHAR(8) NOT NULL,
  `district` VARCHAR(200) NOT NULL,
  `city` VARCHAR(200) NOT NULL,
  `state_id` INT NOT NULL,
  `complement` VARCHAR(2048) DEFAULT NULL,
  `is_default` BOOLEAN NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
);

INSERT INTO `category` (`name`) VALUES
("Livros"),
("Roupas"),
("Eletrônicos");

CREATE TABLE IF NOT EXISTS `product` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `SKU` VARCHAR(50) NOT NULL,
  `UPC` VARCHAR(50) NOT NULL,
  `current_price` DECIMAL NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(3000) DEFAULT NULL,
  `quantity_available` INT NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT FALSE,
  `avarage_rating` FLOAT NOT NULL DEFAULT 0,
  `seller_id` INT NOT NULL,
  `category_id` INT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (`seller_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  UNIQUE KEY (`SKU`, `seller_id`),
  UNIQUE KEY (`SKU`, `UPC`)
);

CREATE TABLE IF NOT EXISTS `attribute` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `data_type` ENUM("INT", "FLOAT", "DATE", "BOOLEAN", "STRING", "YEAR")
);

CREATE TABLE IF NOT EXISTS `attribute_category` (
  `attribute_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `nullable` BOOLEAN NOT NULL DEFAULT TRUE,
  `allow_variant` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`attribute_id`, `category_id`),
  FOREIGN KEY (`attribute_id`) REFERENCES `attribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `attribute_product_value` (
  `product_id` INT NOT NULL,
  `attribute_id` INT NOT NULL,
  `int_value` INT DEFAULT NULL,
  `float_value` FLOAT DEFAULT NULL,
  `date_value` DATE DEFAULT NULL,
  `year_value` YEAR DEFAULT NULL,
  `bool_value` BOOLEAN DEFAULT NULL,
  `string_value` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`, `attribute_id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`attribute_id`) REFERENCES `attribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `price` (
  `product_id` INT NOT NULL,
  `initial_date` DATETIME NOT NULL DEFAULT NOW(),
  `value` DECIMAL NOT NULL,
  PRIMARY KEY (`product_id`, `initial_date`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `discount` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `percent` TINYINT NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `initial_date` DATETIME NOT NULL DEFAULT NOW(),
  `finish_date` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `product_discount` (
  `product_id` INT NOT NULL,
  `discount_id` INT NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`discount_id`) REFERENCES `discount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (`product_id`, `discount_id`)
);

CREATE TABLE IF NOT EXISTS `buyer_wishes_product` (
  `product_id` INT NOT NULL,
  `buyer_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`buyer_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (`product_id`, `buyer_id`)
);

CREATE TABLE IF NOT EXISTS `buyer_cart_product` (
  `product_id` INT NOT NULL,
  `buyer_id` INT NOT NULL,
  `is_gift` BOOLEAN NOT NULL DEFAULT FALSE,
  `quantity` SMALLINT NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (`product_id`, `buyer_id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`buyer_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `product_image` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `filename` VARCHAR(100) NOT NULL,
  `product_id` INT NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `rate` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `buyer_id` INT NOT NULL,
  `comment` VARCHAR(3000) DEFAULT NULL,
  `value` TINYINT NOT NULL,
  `is_verified` BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE KEY (`product_id`, `buyer_id`),
  FOREIGN KEY (`buyer_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `image_rate` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `filename` VARCHAR(100) NOT NULL,
  `rate_id` INT NOT NULL,
  FOREIGN KEY (`rate_id`) REFERENCES `rate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_likes_rate` (
  `rate_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`rate_id`, `user_id`),
  FOREIGN KEY (`rate_id`) REFERENCES `rate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `order_status_type` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
);

INSERT INTO `order_status_type` (`name`)
VALUES
("Aguardando pagamento"),
("Pago aguardando retirada"),
("Em deslocamento"),
("Saindo para entrega"),
("Entregue"),
("Reembolsado"),
("Cancelado");


CREATE TABLE IF NOT EXISTS `order` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `total_price` DECIMAL NOT NULL,
  `current_status_id` INT NOT NULL,
  `shipping_cost` DECIMAL NOT NULL,
  `payment_type` ENUM("pix", "card") NOT NULL,
  `number_of_installments` TINYINT DEFAULT NULL,
  `buyer_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (`current_status_id`) REFERENCES `order_status_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`buyer_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `order_product` (
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `quantity` SMALLINT NOT NULL DEFAULT 1,
  `price` DECIMAL NOT NULL,
  `is_gift` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`product_id`, `order_id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `order_status` (
  `order_id` INT NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  `status_type_id` INT NOT NULL,
  PRIMARY KEY (`order_id`, `date`),
  FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`status_type_id`) REFERENCES `order_status_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `card` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `number` CHAR(16) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `expiration_date` DATE NOT NULL,
  `cvv` SMALLINT NOT NULL,
  `is_default` BOOLEAN NOT NULL,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `card_order` (
  `card_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  PRIMARY KEY (`card_id`, `order_id`),
  FOREIGN KEY (`card_id`) REFERENCES `card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
