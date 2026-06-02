-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: Rugoma_Global_Technologies_Ltd
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

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
-- Table structure for table `Purchased`
--

DROP TABLE IF EXISTS `Purchased`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Purchased` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `stock_name` varchar(100) NOT NULL,
  `purchase_date` date NOT NULL,
  `quantity` int NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  PRIMARY KEY (`p_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Purchased_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Purchased`
--

LOCK TABLES `Purchased` WRITE;
/*!40000 ALTER TABLE `Purchased` DISABLE KEYS */;
/*!40000 ALTER TABLE `Purchased` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchased_stock`
--

DROP TABLE IF EXISTS `purchased_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchased_stock` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `stock_name` varchar(150) NOT NULL,
  `purchase_date` date NOT NULL,
  `quantity` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`p_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `purchased_stock_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchased_stock`
--

LOCK TABLES `purchased_stock` WRITE;
/*!40000 ALTER TABLE `purchased_stock` DISABLE KEYS */;
INSERT INTO `purchased_stock` VALUES (4,'kiizi','2026-05-26',0,3000.00,1),(5,'mi','2026-05-26',46,20000.00,1);
/*!40000 ALTER TABLE `purchased_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sold_stock`
--

DROP TABLE IF EXISTS `sold_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sold_stock` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `p_id` int NOT NULL,
  `sale_date` date NOT NULL,
  `quantity` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`s_id`),
  KEY `user_id` (`user_id`),
  KEY `p_id` (`p_id`),
  CONSTRAINT `sold_stock_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `purchased_stock` (`p_id`) ON DELETE CASCADE,
  CONSTRAINT `sold_stock_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `sold_stock_ibfk_3` FOREIGN KEY (`p_id`) REFERENCES `purchased_stock` (`p_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sold_stock`
--

LOCK TABLES `sold_stock` WRITE;
/*!40000 ALTER TABLE `sold_stock` DISABLE KEYS */;
INSERT INTO `sold_stock` VALUES (1,4,'2026-05-26',1,1.00,1),(2,4,'2026-05-25',4,345.00,1),(3,5,'2026-05-27',3,34.00,1),(4,4,'2026-05-26',1,200.00,1),(5,5,'2026-05-26',32,2000.00,1),(6,5,'2026-05-26',10,2941.18,1),(7,5,'2026-05-28',10,3448.28,1),(8,5,'2026-05-26',1,416.67,1),(9,4,'2026-05-26',10,1000.00,1),(10,4,'2026-05-26',1,150.00,1),(11,5,'2026-05-26',1,425.53,1),(12,4,'2026-05-27',19,3000.00,1);
/*!40000 ALTER TABLE `sold_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mama','$2b$10$LzBDZT7wmbK6/F0h8qkQB.zE0b6NZXFtx35vYE1MEt28zU5hZusxq');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-02 14:05:21
