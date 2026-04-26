-- MySQL dump 10.13  Distrib 9.3.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vetsy
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `idAnimal` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `raza` varchar(50) DEFAULT NULL,
  `genero` enum('Macho','Hembra') NOT NULL,
  PRIMARY KEY (`idAnimal`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;

--
-- Table structure for table `aplicacionvacuna`
--

DROP TABLE IF EXISTS `aplicacionvacuna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aplicacionvacuna` (
  `idAplicacion` int NOT NULL AUTO_INCREMENT,
  `idAnimal` int NOT NULL,
  `idVacuna` int NOT NULL,
  `fechaVacuna` date NOT NULL,
  `fechaProximaVacuna` date DEFAULT NULL,
  PRIMARY KEY (`idAplicacion`),
  KEY `idAnimal` (`idAnimal`),
  KEY `idVacuna` (`idVacuna`),
  CONSTRAINT `aplicacionvacuna_ibfk_1` FOREIGN KEY (`idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE CASCADE,
  CONSTRAINT `aplicacionvacuna_ibfk_2` FOREIGN KEY (`idVacuna`) REFERENCES `vacuna` (`idVacuna`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aplicacionvacuna`
--

/*!40000 ALTER TABLE `aplicacionvacuna` DISABLE KEYS */;
/*!40000 ALTER TABLE `aplicacionvacuna` ENABLE KEYS */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(13) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;

--
-- Table structure for table `desparasitantes`
--

DROP TABLE IF EXISTS `desparasitantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desparasitantes` (
  `idDeparasitante` int NOT NULL AUTO_INCREMENT,
  `idAnimal` int NOT NULL,
  `fechaDeparasitante` date NOT NULL,
  `proximaFechaDeparasitante` date DEFAULT NULL,
  `tipoDeparasitante` varchar(50) NOT NULL,
  `observacion` text,
  PRIMARY KEY (`idDeparasitante`),
  KEY `idAnimal` (`idAnimal`),
  CONSTRAINT `desparasitantes_ibfk_1` FOREIGN KEY (`idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desparasitantes`
--

/*!40000 ALTER TABLE `desparasitantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `desparasitantes` ENABLE KEYS */;

--
-- Temporary view structure for view `expediente_clinico`
--

DROP TABLE IF EXISTS `expediente_clinico`;
/*!50001 DROP VIEW IF EXISTS `expediente_clinico`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `expediente_clinico` AS SELECT 
 1 AS `idAnimal`,
 1 AS `fecha`,
 1 AS `tipo`,
 1 AS `observacion`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial` (
  `idHistorial` int NOT NULL AUTO_INCREMENT,
  `idAnimal` int NOT NULL,
  `fechaHistorial` date NOT NULL,
  `observacion` text,
  PRIMARY KEY (`idHistorial`),
  KEY `idAnimal` (`idAnimal`),
  CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;

--
-- Table structure for table `movimiento`
--

DROP TABLE IF EXISTS `movimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimiento` (
  `idMovimiento` int NOT NULL AUTO_INCREMENT,
  `idProducto` int NOT NULL,
  `tipoMovimiento` enum('E','S') NOT NULL,
  `cantidad` int NOT NULL,
  `fechaMovimiento` date NOT NULL,
  `referencia` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idMovimiento`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `movimiento_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento`
--

/*!40000 ALTER TABLE `movimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimiento` ENABLE KEYS */;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `categoria` varchar(50) NOT NULL,
  `precioCompra` decimal(10,2) NOT NULL,
  `precioVenta` decimal(10,2) NOT NULL,
  `stockActual` int NOT NULL DEFAULT '0',
  `stockMinimo` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `idProveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(13) NOT NULL,
  `extensionTelefono` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idProveedor`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicio` (
  `idServicio` int NOT NULL AUTO_INCREMENT,
  `idAnimal` int NOT NULL,
  `idUsuario` int NOT NULL,
  `tipoServicio` enum('Consulta','Vacuna','Cirugia','Desparasitacion') NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `fechaServicio` date NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idServicio`),
  KEY `idAnimal` (`idAnimal`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `servicio_ibfk_1` FOREIGN KEY (`idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE CASCADE,
  CONSTRAINT `servicio_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('Administrador','Empleado') NOT NULL,
  `estatusUsuario` enum('A','I') NOT NULL,
  `ultimoAcceso` datetime DEFAULT NULL,
  `fechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

--
-- Table structure for table `vacuna`
--

DROP TABLE IF EXISTS `vacuna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacuna` (
  `idVacuna` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idVacuna`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacuna`
--

/*!40000 ALTER TABLE `vacuna` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacuna` ENABLE KEYS */;

--
-- Dumping routines for database 'vetsy'
--

--
-- Final view structure for view `expediente_clinico`
--

/*!50001 DROP VIEW IF EXISTS `expediente_clinico`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`VetSy`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `expediente_clinico` AS select `historial`.`idAnimal` AS `idAnimal`,`historial`.`fechaHistorial` AS `fecha`,'Consulta' AS `tipo`,`historial`.`observacion` AS `observacion` from `historial` union all select `aplicacionvacuna`.`idAnimal` AS `idAnimal`,`aplicacionvacuna`.`fechaVacuna` AS `fechaVacuna`,'Vacuna' AS `Vacuna`,concat('Vacuna ID: ',`aplicacionvacuna`.`idVacuna`) AS `CONCAT('Vacuna ID: ', idVacuna)` from `aplicacionvacuna` union all select `desparasitantes`.`idAnimal` AS `idAnimal`,`desparasitantes`.`fechaDeparasitante` AS `fechaDeparasitante`,'Desparasitacion' AS `Desparasitacion`,`desparasitantes`.`tipoDeparasitante` AS `tipoDeparasitante` from `desparasitantes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-26 12:13:12
