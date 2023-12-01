-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2022 a las 21:05:56
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pedidos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `nombre` varchar(100) NOT NULL,
  `nif` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `grupo` varchar(100) NOT NULL,
  `clave` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`nombre`, `nif`, `direccion`, `grupo`, `clave`) VALUES
('Pedro', '11111111B', 'Bailen 14', '1DAW', 1),
('Bernardo López', '123456789H', 'LA Bola 17, 3ºB', 'Genius', 2),
('Lola López', '3333333H', 'LA paz, 33', 'Premiun', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedidos`
--

CREATE TABLE `detallepedidos` (
  `titulo` varchar(100) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(11) NOT NULL,
  `pedido` int(11) NOT NULL,
  `clave` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detallepedidos`
--

INSERT INTO `detallepedidos` (`titulo`, `autor`, `precio`, `cantidad`, `pedido`, `clave`) VALUES
('/ Percy Sledge', 'When a man loves a woman ', 8.7, 2, 3, 1),
('/ Percy Sledge', 'When a man loves a woman ', 8.7, 2, 3, 2),
('/ Percy Sledge', 'When a man loves a woman ', 8.7, 2, 3, 3),
('/ Gary Moore', 'Still got the blues ', 10.2, 3, 4, 4),
('/ Gary Moore', 'Still got the blues ', 10.2, 2, 5, 5),
('/ Gary Moore', 'Still got the blues ', 10.2, 2, 6, 6),
('/ Eros Ramazzotti', 'Eros ', 9.9, 2, 7, 7),
('/ Rod Stewart', 'Maggie May ', 8.5, 100, 8, 8),
('/ Bonnie Tyler', 'Hide your heart ', 9.9, 2, 9, 9),
('/ Gary Moore', 'Still got the blues ', 10.2, 2, 10, 10),
('/ Gary Moore', 'Still got the blues ', 10.2, 2, 11, 11),
('/ Bob Dylan', 'Empire Burlesque ', 10.9, 3, 12, 12),
('/ Dr.Hook', 'Sylvias Mother ', 8.1, 10, 13, 13),
('/ Dolly Parton', 'Greatest Hits ', 9.9, 2, 14, 14),
('/ Dolly Parton', 'Greatest Hits ', 9.9, 2, 15, 15),
('Still got the blues ', ' Gary Moore', 10.2, 2, 16, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `codigo` int(11) NOT NULL,
  `fecha` varchar(50) NOT NULL,
  `cliente` varchar(50) NOT NULL COMMENT 'nif'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`codigo`, `fecha`, `cliente`) VALUES
(1, '18/1/2018', '123456789H'),
(2, '18/1/2018', '123456789H'),
(3, '18/1/2018', '3333333H'),
(4, '22/1/2018', '3333333H'),
(5, '22/1/2018', '123456789H'),
(6, '22/1/2018', '123456789H'),
(7, '22/1/2018', '123456789H'),
(8, '22/1/2018', '3333333H'),
(9, '22/1/2018', '123456789H'),
(10, '25/1/2018', '123456789H'),
(11, '25/1/2018', '123456789H'),
(12, '25/1/2018', '123456789H'),
(13, '25/1/2018', '123456789H'),
(14, '2/19/2018', '123456789H'),
(15, '2/20/2018', '123456789H'),
(16, '19/12/2021', '123456789H');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`clave`);

--
-- Indices de la tabla `detallepedidos`
--
ALTER TABLE `detallepedidos`
  ADD PRIMARY KEY (`clave`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `clave` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `detallepedidos`
--
ALTER TABLE `detallepedidos`
  MODIFY `clave` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
