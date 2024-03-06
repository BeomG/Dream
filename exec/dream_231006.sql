-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: dream
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_number` bigint NOT NULL AUTO_INCREMENT,
  `balance` int DEFAULT NULL,
  `branch_name` varchar(50) DEFAULT NULL,
  `bank_code` varchar(50) DEFAULT NULL,
  `client_key` int DEFAULT NULL,
  PRIMARY KEY (`account_number`),
  KEY `FKd92gwbdqditppi9vskw4762hn` (`bank_code`),
  KEY `FKtn2ktvme381e555aprxlnv6eu` (`client_key`),
  CONSTRAINT `FKd92gwbdqditppi9vskw4762hn` FOREIGN KEY (`bank_code`) REFERENCES `bank` (`bank_code`),
  CONSTRAINT `FKtn2ktvme381e555aprxlnv6eu` FOREIGN KEY (`client_key`) REFERENCES `bank_client` (`client_key`)
) ENGINE=InnoDB AUTO_INCREMENT=111010012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (111010011,3468000,'광산점','034',0);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank` (
  `bank_code` varchar(50) NOT NULL,
  `bank_name` varchar(50) NOT NULL,
  PRIMARY KEY (`bank_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES ('001','한국은행'),('002','산업은행'),('003','기업은행'),('004','국민은행'),('005','외환은행'),('007','수협은행'),('008','수출입은행'),('011','농협은행'),('012','농협회원조합'),('020','우리은행'),('023','SC제일은행'),('026','서울은행'),('027','한국씨티은행'),('031','대구은행'),('032','부산은행'),('034','광주은행'),('035','제주은행'),('037','전북은행'),('039','경남은행'),('045','새마음금고연합회'),('048','신협중앙회'),('050','상호저축은행'),('071','우체국'),('081','하나은행'),('088','신한은행'),('089','케이뱅크'),('090','카카오뱅크'),('092','토스뱅크');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_client`
--

DROP TABLE IF EXISTS `bank_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_client` (
  `client_key` int NOT NULL,
  `client_name` varchar(50) NOT NULL,
  PRIMARY KEY (`client_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_client`
--

LOCK TABLES `bank_client` WRITE;
/*!40000 ALTER TABLE `bank_client` DISABLE KEYS */;
INSERT INTO `bank_client` VALUES (0,'김자립');
/*!40000 ALTER TABLE `bank_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benefit`
--

DROP TABLE IF EXISTS `benefit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benefit` (
  `benefit_id` bigint NOT NULL AUTO_INCREMENT,
  `benefit_cnt` int DEFAULT NULL,
  `is_confirmed` bit(1) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `welfare_id` bigint NOT NULL,
  PRIMARY KEY (`benefit_id`),
  KEY `FKeah7mbcw1o1enbd313svih2rr` (`user_id`),
  KEY `FKemqfrj4lwq4m7hlexch8i9lfv` (`welfare_id`),
  CONSTRAINT `FKeah7mbcw1o1enbd313svih2rr` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKemqfrj4lwq4m7hlexch8i9lfv` FOREIGN KEY (`welfare_id`) REFERENCES `welfare` (`welfare_id`)
) ENGINE=InnoDB AUTO_INCREMENT=953 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefit`
--

LOCK TABLES `benefit` WRITE;
/*!40000 ALTER TABLE `benefit` DISABLE KEYS */;
INSERT INTO `benefit` VALUES (560,0,_binary '\0',1,434,14),(561,0,_binary '\0',1,434,0),(562,0,_binary '\0',1,434,3),(563,0,_binary '\0',2,434,11),(564,0,_binary '\0',0,434,12),(565,0,_binary '\0',0,434,13),(566,0,_binary '\0',1,434,17),(567,0,_binary '\0',0,434,18),(568,0,_binary '\0',0,434,20),(569,0,_binary '\0',2,435,14),(570,0,_binary '\0',1,435,0),(571,0,_binary '\0',0,435,3),(572,0,_binary '\0',0,435,11),(573,0,_binary '\0',0,435,12),(574,0,_binary '\0',0,435,13),(575,0,_binary '\0',0,435,17),(576,0,_binary '\0',0,435,18),(577,0,_binary '\0',0,435,20),(578,0,_binary '\0',0,436,14),(579,0,_binary '\0',2,436,0),(580,0,_binary '\0',0,436,3),(581,0,_binary '\0',1,436,11),(582,0,_binary '\0',1,436,12),(583,0,_binary '\0',1,436,13),(584,0,_binary '\0',0,436,17),(585,0,_binary '\0',1,436,18),(586,0,_binary '\0',1,436,20),(587,0,_binary '\0',0,437,14),(588,0,_binary '\0',1,437,0),(589,0,_binary '\0',0,437,3),(590,0,_binary '\0',0,437,11),(591,0,_binary '\0',0,437,12),(592,0,_binary '\0',0,437,13),(593,0,_binary '\0',0,437,17),(594,0,_binary '\0',1,437,18),(595,0,_binary '\0',1,437,20),(596,0,_binary '\0',1,438,0),(597,0,_binary '\0',0,438,3),(598,0,_binary '\0',0,438,11),(599,0,_binary '\0',0,438,12),(600,0,_binary '\0',0,438,13),(601,0,_binary '\0',0,438,17),(602,0,_binary '\0',1,438,18),(603,0,_binary '\0',0,438,20),(604,0,_binary '\0',0,439,0),(605,0,_binary '\0',0,439,3),(606,0,_binary '\0',0,439,11),(607,0,_binary '\0',0,439,12),(608,0,_binary '\0',0,439,13),(609,0,_binary '\0',0,439,17),(610,0,_binary '\0',0,439,18),(611,0,_binary '\0',0,439,20),(612,0,_binary '\0',0,440,14),(613,0,_binary '\0',1,440,0),(614,0,_binary '\0',0,440,3),(615,0,_binary '\0',0,440,11),(616,0,_binary '\0',0,440,12),(617,0,_binary '\0',0,440,13),(618,0,_binary '\0',0,440,17),(619,0,_binary '\0',1,440,18),(620,0,_binary '\0',1,440,20),(621,0,_binary '\0',2,441,14),(622,0,_binary '\0',3,441,0),(623,0,_binary '\0',3,441,3),(624,0,_binary '\0',3,441,11),(625,0,_binary '\0',3,441,12),(626,0,_binary '\0',3,441,13),(627,0,_binary '\0',3,441,17),(628,0,_binary '\0',3,441,18),(629,0,_binary '\0',3,441,20),(630,0,_binary '\0',2,441,10),(631,0,_binary '\0',1,441,19),(632,0,_binary '\0',0,441,0),(633,0,_binary '\0',0,441,3),(634,0,_binary '\0',0,441,11),(635,0,_binary '\0',0,441,12),(636,0,_binary '\0',0,441,13),(637,0,_binary '\0',0,441,17),(638,0,_binary '\0',0,441,18),(639,0,_binary '\0',0,441,20),(640,0,_binary '\0',3,442,14),(641,0,_binary '\0',1,442,0),(642,0,_binary '\0',1,442,3),(643,0,_binary '\0',3,442,11),(644,0,_binary '\0',3,442,12),(645,0,_binary '\0',3,442,13),(646,0,_binary '\0',3,442,17),(647,0,_binary '\0',1,442,18),(648,0,_binary '\0',1,442,20),(649,0,_binary '\0',0,442,10),(650,0,_binary '\0',0,442,19),(651,0,_binary '\0',0,442,0),(652,0,_binary '\0',0,442,3),(653,0,_binary '\0',0,442,11),(654,0,_binary '\0',0,442,12),(655,0,_binary '\0',0,442,13),(656,0,_binary '\0',0,442,17),(657,0,_binary '\0',0,442,18),(658,0,_binary '\0',0,442,20),(659,0,_binary '\0',3,443,14),(660,0,_binary '\0',3,443,0),(661,0,_binary '\0',3,443,3),(662,0,_binary '\0',1,443,11),(663,0,_binary '\0',1,443,12),(664,0,_binary '\0',1,443,13),(665,0,_binary '\0',3,443,17),(666,0,_binary '\0',3,443,18),(667,0,_binary '\0',3,443,20),(668,0,_binary '\0',0,443,0),(669,0,_binary '\0',0,443,3),(670,0,_binary '\0',0,443,11),(671,0,_binary '\0',0,443,12),(672,0,_binary '\0',0,443,13),(673,0,_binary '\0',0,443,17),(674,0,_binary '\0',0,443,18),(675,0,_binary '\0',0,443,20),(676,0,_binary '\0',0,444,10),(677,0,_binary '\0',0,444,19),(678,0,_binary '\0',0,444,0),(679,0,_binary '\0',0,444,3),(680,0,_binary '\0',0,444,11),(681,0,_binary '\0',0,444,12),(682,0,_binary '\0',0,444,13),(683,0,_binary '\0',0,444,17),(684,0,_binary '\0',0,444,18),(685,0,_binary '\0',0,444,20),(686,0,_binary '\0',0,445,14),(687,0,_binary '\0',1,445,0),(688,0,_binary '\0',0,445,3),(689,0,_binary '\0',0,445,11),(690,0,_binary '\0',0,445,12),(691,0,_binary '\0',0,445,13),(692,0,_binary '\0',0,445,17),(693,0,_binary '\0',1,445,18),(694,0,_binary '\0',1,445,20),(695,0,_binary '\0',1,446,1),(696,0,_binary '\0',1,446,0),(697,0,_binary '\0',0,446,3),(698,0,_binary '\0',0,446,11),(699,0,_binary '\0',0,446,12),(700,0,_binary '\0',0,446,13),(701,0,_binary '\0',0,446,17),(702,0,_binary '\0',1,446,18),(703,0,_binary '\0',1,446,20),(704,0,_binary '\0',2,447,0),(705,0,_binary '\0',0,447,3),(706,0,_binary '\0',0,447,11),(707,0,_binary '\0',0,447,12),(708,0,_binary '\0',0,447,13),(709,0,_binary '\0',0,447,17),(710,0,_binary '\0',1,447,18),(711,0,_binary '\0',1,447,20),(712,0,_binary '\0',0,448,1),(713,0,_binary '\0',0,448,0),(714,0,_binary '\0',0,448,3),(715,0,_binary '\0',0,448,11),(716,0,_binary '\0',0,448,12),(717,0,_binary '\0',0,448,13),(718,0,_binary '\0',0,448,17),(719,0,_binary '\0',0,448,18),(720,0,_binary '\0',0,448,20),(721,0,_binary '\0',1,449,14),(722,0,_binary '\0',3,449,0),(723,0,_binary '\0',3,449,3),(724,0,_binary '\0',3,449,11),(725,0,_binary '\0',3,449,12),(726,0,_binary '\0',3,449,13),(727,0,_binary '\0',3,449,17),(728,0,_binary '\0',3,449,18),(729,0,_binary '\0',1,449,20),(730,0,_binary '\0',3,449,0),(731,0,_binary '\0',3,449,3),(732,0,_binary '\0',3,449,11),(733,0,_binary '\0',3,449,12),(734,0,_binary '\0',3,449,13),(735,0,_binary '\0',3,449,17),(736,0,_binary '\0',3,449,18),(737,0,_binary '\0',3,449,20),(738,0,_binary '\0',3,449,0),(739,0,_binary '\0',3,449,3),(740,0,_binary '\0',3,449,11),(741,0,_binary '\0',3,449,12),(742,0,_binary '\0',3,449,13),(743,0,_binary '\0',3,449,17),(744,0,_binary '\0',3,449,18),(745,0,_binary '\0',3,449,20),(746,0,_binary '\0',3,449,10),(747,0,_binary '\0',3,449,19),(748,0,_binary '\0',3,449,0),(749,0,_binary '\0',3,449,3),(750,0,_binary '\0',3,449,11),(751,0,_binary '\0',3,449,12),(752,0,_binary '\0',3,449,13),(753,0,_binary '\0',3,449,17),(754,0,_binary '\0',3,449,18),(755,0,_binary '\0',3,449,20),(756,0,_binary '\0',3,449,0),(757,0,_binary '\0',3,449,3),(758,0,_binary '\0',3,449,11),(759,0,_binary '\0',3,449,12),(760,0,_binary '\0',3,449,13),(761,0,_binary '\0',3,449,17),(762,0,_binary '\0',3,449,18),(763,0,_binary '\0',3,449,20),(764,0,_binary '\0',3,449,0),(765,0,_binary '\0',3,449,3),(766,0,_binary '\0',3,449,11),(767,0,_binary '\0',3,449,12),(768,0,_binary '\0',3,449,13),(769,0,_binary '\0',3,449,17),(770,0,_binary '\0',3,449,18),(771,0,_binary '\0',3,449,20),(772,0,_binary '\0',0,449,0),(773,0,_binary '\0',0,449,3),(774,0,_binary '\0',0,449,11),(775,0,_binary '\0',0,449,12),(776,0,_binary '\0',0,449,13),(777,0,_binary '\0',0,449,17),(778,0,_binary '\0',0,449,18),(779,0,_binary '\0',0,449,20),(780,0,_binary '\0',0,450,14),(781,0,_binary '\0',3,450,0),(782,0,_binary '\0',3,450,3),(783,0,_binary '\0',3,450,11),(784,0,_binary '\0',3,450,12),(785,0,_binary '\0',3,450,13),(786,0,_binary '\0',3,450,17),(787,0,_binary '\0',1,450,18),(788,0,_binary '\0',1,450,20),(789,0,_binary '\0',0,450,10),(790,0,_binary '\0',0,450,19),(791,0,_binary '\0',0,450,0),(792,0,_binary '\0',0,450,3),(793,0,_binary '\0',0,450,11),(794,0,_binary '\0',0,450,12),(795,0,_binary '\0',0,450,13),(796,0,_binary '\0',0,450,17),(797,0,_binary '\0',0,450,18),(798,0,_binary '\0',0,450,20),(799,0,_binary '\0',0,451,14),(800,0,_binary '\0',0,451,0),(801,0,_binary '\0',0,451,3),(802,0,_binary '\0',0,451,11),(803,0,_binary '\0',0,451,12),(804,0,_binary '\0',0,451,13),(805,0,_binary '\0',0,451,17),(806,0,_binary '\0',1,451,18),(807,0,_binary '\0',0,451,20),(808,0,_binary '\0',0,452,14),(809,0,_binary '\0',1,452,0),(810,0,_binary '\0',0,452,3),(811,0,_binary '\0',0,452,11),(812,0,_binary '\0',0,452,12),(813,0,_binary '\0',0,452,13),(814,0,_binary '\0',0,452,17),(815,0,_binary '\0',1,452,18),(816,0,_binary '\0',1,452,20),(817,0,_binary '\0',0,453,14),(818,0,_binary '\0',0,453,0),(819,0,_binary '\0',0,453,3),(820,0,_binary '\0',1,453,11),(821,0,_binary '\0',1,453,12),(822,0,_binary '\0',0,453,13),(823,0,_binary '\0',1,453,17),(824,0,_binary '\0',0,453,18),(825,0,_binary '\0',1,453,20),(826,0,_binary '\0',1,454,14),(827,0,_binary '\0',1,454,0),(828,0,_binary '\0',0,454,3),(829,0,_binary '\0',0,454,11),(830,0,_binary '\0',0,454,12),(831,0,_binary '\0',0,454,13),(832,0,_binary '\0',0,454,17),(833,0,_binary '\0',1,454,18),(834,0,_binary '\0',1,454,20),(835,0,_binary '\0',1,455,14),(836,0,_binary '\0',1,455,0),(837,0,_binary '\0',0,455,3),(838,0,_binary '\0',0,455,11),(839,0,_binary '\0',0,455,12),(840,0,_binary '\0',0,455,13),(841,0,_binary '\0',0,455,17),(842,0,_binary '\0',1,455,18),(843,0,_binary '\0',1,455,20),(844,0,_binary '\0',3,456,14),(845,0,_binary '\0',3,456,0),(846,0,_binary '\0',3,456,3),(847,0,_binary '\0',3,456,11),(848,0,_binary '\0',3,456,12),(849,0,_binary '\0',3,456,13),(850,0,_binary '\0',3,456,17),(851,0,_binary '\0',3,456,18),(852,0,_binary '\0',3,456,20),(853,0,_binary '\0',3,457,14),(854,0,_binary '\0',1,457,0),(855,0,_binary '\0',3,457,3),(856,0,_binary '\0',3,457,11),(857,0,_binary '\0',3,457,12),(858,0,_binary '\0',3,457,13),(859,0,_binary '\0',3,457,17),(860,0,_binary '\0',1,457,18),(861,0,_binary '\0',1,457,20),(862,0,_binary '\0',2,457,10),(863,0,_binary '\0',1,457,19),(864,0,_binary '\0',0,457,0),(865,0,_binary '\0',0,457,3),(866,0,_binary '\0',0,457,11),(867,0,_binary '\0',0,457,12),(868,0,_binary '\0',0,457,13),(869,0,_binary '\0',0,457,17),(870,0,_binary '\0',0,457,18),(871,0,_binary '\0',0,457,20),(872,0,_binary '\0',1,458,14),(873,0,_binary '\0',1,458,0),(874,0,_binary '\0',1,458,3),(875,0,_binary '\0',1,458,11),(876,0,_binary '\0',0,458,12),(877,0,_binary '\0',0,458,13),(878,0,_binary '\0',0,458,17),(879,0,_binary '\0',0,458,18),(880,0,_binary '\0',0,458,20),(890,0,_binary '\0',3,456,10),(891,0,_binary '\0',3,456,19),(892,0,_binary '\0',3,456,0),(893,0,_binary '\0',3,456,3),(894,0,_binary '\0',3,456,11),(895,0,_binary '\0',3,456,12),(896,0,_binary '\0',3,456,13),(897,0,_binary '\0',3,456,17),(898,0,_binary '\0',3,456,18),(899,0,_binary '\0',3,456,20),(900,0,_binary '\0',3,456,14),(901,0,_binary '\0',3,456,0),(902,0,_binary '\0',3,456,3),(903,0,_binary '\0',3,456,11),(904,0,_binary '\0',3,456,12),(905,0,_binary '\0',3,456,13),(906,0,_binary '\0',3,456,17),(907,0,_binary '\0',3,456,18),(908,0,_binary '\0',3,456,20),(909,0,_binary '\0',3,459,0),(910,0,_binary '\0',3,459,3),(911,0,_binary '\0',3,459,11),(912,0,_binary '\0',3,459,12),(913,0,_binary '\0',3,459,13),(914,0,_binary '\0',3,459,17),(915,0,_binary '\0',3,459,18),(916,0,_binary '\0',3,459,20),(917,0,_binary '\0',1,459,10),(918,0,_binary '\0',1,459,19),(919,0,_binary '\0',0,459,0),(920,0,_binary '\0',0,459,3),(921,0,_binary '\0',0,459,11),(922,0,_binary '\0',0,459,12),(923,0,_binary '\0',0,459,13),(924,0,_binary '\0',0,459,17),(925,0,_binary '\0',0,459,18),(926,0,_binary '\0',0,459,20),(927,0,_binary '\0',0,456,0),(928,0,_binary '\0',0,456,3),(929,0,_binary '\0',0,456,11),(930,0,_binary '\0',0,456,12),(931,0,_binary '\0',0,456,13),(932,0,_binary '\0',0,456,17),(933,0,_binary '\0',0,456,18),(934,0,_binary '\0',0,456,20),(935,0,_binary '\0',1,460,14),(936,0,_binary '\0',1,460,0),(937,0,_binary '\0',1,460,3),(938,0,_binary '\0',1,460,11),(939,0,_binary '\0',0,460,12),(940,0,_binary '\0',0,460,13),(941,0,_binary '\0',0,460,17),(942,0,_binary '\0',1,460,18),(943,0,_binary '\0',1,460,20),(944,0,_binary '\0',1,461,14),(945,0,_binary '\0',0,461,0),(946,0,_binary '\0',0,461,3),(947,0,_binary '\0',0,461,11),(948,0,_binary '\0',0,461,12),(949,0,_binary '\0',0,461,13),(950,0,_binary '\0',0,461,17),(951,0,_binary '\0',0,461,18),(952,0,_binary '\0',0,461,20);
/*!40000 ALTER TABLE `benefit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inout_type`
--

DROP TABLE IF EXISTS `inout_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inout_type` (
  `inout_key` int NOT NULL,
  `inout_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`inout_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inout_type`
--

LOCK TABLES `inout_type` WRITE;
/*!40000 ALTER TABLE `inout_type` DISABLE KEYS */;
INSERT INTO `inout_type` VALUES (0,'입금'),(1,'출금');
/*!40000 ALTER TABLE `inout_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qualification` (
  `welfare_id` bigint NOT NULL,
  `age` int DEFAULT NULL,
  `region_key` bigint DEFAULT NULL,
  `end_year` int DEFAULT NULL,
  PRIMARY KEY (`welfare_id`),
  KEY `FK8bvicbuc32p1b75wspcgx0lkc` (`region_key`),
  CONSTRAINT `FK8bvicbuc32p1b75wspcgx0lkc` FOREIGN KEY (`region_key`) REFERENCES `region` (`region_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qualification`
--

LOCK TABLES `qualification` WRITE;
/*!40000 ALTER TABLE `qualification` DISABLE KEYS */;
INSERT INTO `qualification` VALUES (0,34,0,NULL),(1,25,1,NULL),(2,39,8,NULL),(3,34,0,NULL),(4,30,12,NULL),(5,30,12,NULL),(6,30,12,NULL),(7,30,12,NULL),(8,34,8,NULL),(9,39,4,NULL),(10,39,151,NULL),(11,30,0,NULL),(12,34,0,NULL),(13,28,0,NULL),(14,29,18,NULL),(15,34,8,NULL),(16,34,13,NULL),(17,29,0,NULL),(18,34,0,NULL),(19,39,151,NULL),(20,34,0,NULL),(21,30,2,NULL);
/*!40000 ALTER TABLE `qualification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `region_key` bigint NOT NULL AUTO_INCREMENT,
  `level` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent_key` int DEFAULT NULL,
  PRIMARY KEY (`region_key`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (0,0,'전국',0),(1,0,'서울특별시',0),(2,0,'부산광역시',0),(3,0,'대구광역시',0),(4,0,'인천광역시',0),(5,0,'광주광역시',0),(6,0,'대전광역시',0),(7,0,'울산광역시',0),(8,0,'세종특별자치시',0),(9,0,'경기도',0),(10,0,'강원특별자치도',0),(11,0,'충청북도',0),(12,0,'충청남도',0),(13,0,'전라북도',0),(14,0,'전라남도',0),(15,0,'경상북도',0),(16,0,'경상남도',0),(17,0,'제주특별자치도',0),(18,1,'강남구',1),(19,1,'강동구',1),(20,1,'강북구',1),(21,1,'강서구',1),(22,1,'관악구',1),(23,1,'광진구',1),(24,1,'구로구',1),(25,1,'금천구',1),(26,1,'노원구',1),(27,1,'도봉구',1),(28,1,'동대문구',1),(29,1,'동작구',1),(30,1,'마포구',1),(31,1,'서대문구',1),(32,1,'서초구',1),(33,1,'성동구',1),(34,1,'성북구',1),(35,1,'송파구',1),(36,1,'양천구',1),(37,1,'영등포구',1),(38,1,'용산구',1),(39,1,'은평구',1),(40,1,'종로구',1),(41,1,'중구',1),(42,1,'중랑구',1),(43,1,'강서구',2),(44,1,'금정구',2),(45,1,'기장군',2),(46,1,'남구',2),(47,1,'동구',2),(48,1,'동래구',2),(49,1,'진구',2),(50,1,'북구',2),(51,1,'사상구',2),(52,1,'사하구',2),(53,1,'서구',2),(54,1,'수영구',2),(55,1,'연제구',2),(56,1,'영도구',2),(57,1,'중구',2),(58,1,'해운대구',2),(59,1,'남구',3),(60,1,'달서구',3),(61,1,'달성군',3),(62,1,'동구',3),(63,1,'북구',3),(64,1,'서구',3),(65,1,'수성구',3),(66,1,'중구',3),(67,1,'강화군',4),(68,1,'계양구',4),(69,1,'남동구',4),(70,1,'동구',4),(71,1,'미추홀구',4),(72,1,'부평구',4),(73,1,'서구',4),(74,1,'연수구',4),(75,1,'옹진군',4),(76,1,'중구',4),(77,1,'광산구',5),(78,1,'남구',5),(79,1,'동구',5),(80,1,'북구',5),(81,1,'서구',5),(82,1,'대덕구',6),(83,1,'동구',6),(84,1,'서구',6),(85,1,'유성구',6),(86,1,'중구',6),(87,1,'남구',7),(88,1,'동구',7),(89,1,'북구',7),(90,1,'울주군',7),(91,1,'중구',7),(92,1,'세종특별자치시',8),(93,1,'가평군',9),(94,1,'고양시',9),(95,1,'과천시',9),(96,1,'광명시',9),(97,1,'광주시',9),(98,1,'구리시',9),(99,1,'군포시',9),(100,1,'김포시',9),(101,1,'남양주시',9),(102,1,'동두천시',9),(103,1,'부천시',9),(104,1,'성남시',9),(105,1,'수원시',9),(106,1,'시흥시',9),(107,1,'안산시',9),(108,1,'안성시',9),(109,1,'안양시',9),(110,1,'양주시',9),(111,1,'양평군',9),(112,1,'여주시',9),(113,1,'연천군',9),(114,1,'오산시',9),(115,1,'용인시',9),(116,1,'의왕시',9),(117,1,'의정부시',9),(118,1,'이천시',9),(119,1,'파주시',9),(120,1,'평택시',9),(121,1,'포천시',9),(122,1,'하남시',9),(123,1,'화성시',9),(124,1,'강릉시',10),(125,1,'고성군',10),(126,1,'동해시',10),(127,1,'삼척시',10),(128,1,'속초시',10),(129,1,'양구군',10),(130,1,'양양군',10),(131,1,'영월군',10),(132,1,'원주시',10),(133,1,'인제군',10),(134,1,'정선군',10),(135,1,'철원군',10),(136,1,'춘천시',10),(137,1,'태백시',10),(138,1,'평창군',10),(139,1,'홍천군',10),(140,1,'화천군',10),(141,1,'횡성군',10),(142,1,'괴산군',11),(143,1,'단양군',11),(144,1,'보은군',11),(145,1,'영동군',11),(146,1,'옥천군',11),(147,1,'음성군',11),(148,1,'제천시',11),(149,1,'증평군',11),(150,1,'진천군',11),(151,1,'청주시',11),(152,1,'충주시',11),(153,1,'계룡시',12),(154,1,'공주시',12),(155,1,'금산군',12),(156,1,'논산시',12),(157,1,'당진시',12),(158,1,'보령시',12),(159,1,'부여군',12),(160,1,'서산시',12),(161,1,'서천군',12),(162,1,'아산시',12),(163,1,'예산군',12),(164,1,'천안시',12),(165,1,'청양군',12),(166,1,'태안군',12),(167,1,'홍성군',12),(168,1,'고창군',13),(169,1,'군산시',13),(170,1,'김제시',13),(171,1,'남원시',13),(172,1,'무주군',13),(173,1,'부안군',13),(174,1,'순창군',13),(175,1,'완주군',13),(176,1,'익산시',13),(177,1,'임실군',13),(178,1,'장수군',13),(179,1,'전주시',13),(180,1,'정읍시',13),(181,1,'진안군',13),(182,1,'강진군',14),(183,1,'고흥군',14),(184,1,'곡성군',14),(185,1,'광양시',14),(186,1,'구례군',14),(187,1,'나주시',14),(188,1,'담양군',14),(189,1,'목포시',14),(190,1,'무안군',14),(191,1,'보성군',14),(192,1,'순천시',14),(193,1,'신안군',14),(194,1,'여수시',14),(195,1,'영광군',14),(196,1,'영암군',14),(197,1,'완도군',14),(198,1,'장성군',14),(199,1,'장흥군',14),(200,1,'진도군',14),(201,1,'함평군',14),(202,1,'해남군',14),(203,1,'화순군',14),(204,1,'경산시',15),(205,1,'경주시',15),(206,1,'고령군',15),(207,1,'구미시',15),(208,1,'군위군',15),(209,1,'김천시',15),(210,1,'문경시',15),(211,1,'봉화군',15),(212,1,'상주시',15),(213,1,'성주군',15),(214,1,'안동시',15),(215,1,'영덕군',15),(216,1,'영양군',15),(217,1,'영주시',15),(218,1,'영천시',15),(219,1,'예천군',15),(220,1,'울릉군',15),(221,1,'울진군',15),(222,1,'의성군',15),(223,1,'청도군',15),(224,1,'청송군',15),(225,1,'칠곡군',15),(226,1,'포항시',15),(227,1,'거제시',16),(228,1,'거창군',16),(229,1,'고성군',16),(230,1,'김해시',16),(231,1,'남해군',16),(232,1,'밀양시',16),(233,1,'사천시',16),(234,1,'산청군',16),(235,1,'양산시',16),(236,1,'의령군',16),(237,1,'진주시',16),(238,1,'창녕군',16),(239,1,'창원시',16),(240,1,'통영시',16),(241,1,'하동군',16),(242,1,'함안군',16),(243,1,'함양군',16),(244,1,'합천군',16),(245,1,'서귀포시',17);
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` bigint NOT NULL AUTO_INCREMENT,
  `after_balanced_amt` int DEFAULT NULL,
  `bank_code` varchar(255) DEFAULT NULL,
  `client_key` int DEFAULT NULL,
  `tran_amt` int DEFAULT NULL,
  `tran_date` datetime(6) DEFAULT NULL,
  `tran_desc` varchar(50) DEFAULT NULL,
  `account_number` bigint DEFAULT NULL,
  `inout_key` int DEFAULT NULL,
  `category_key` int DEFAULT NULL,
  `tran_time` int DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `FKa80kblc0ww9p9xjei8luheqlk` (`account_number`),
  KEY `FKola80sfawd4fvemj2xxu7pg5` (`inout_key`),
  KEY `FKd6kb9qdlvkcer7wji0nl2dsxv` (`category_key`),
  KEY `FKj8dq0va121us2l2o5wijk00f1` (`bank_code`),
  CONSTRAINT `FKa80kblc0ww9p9xjei8luheqlk` FOREIGN KEY (`account_number`) REFERENCES `account` (`account_number`),
  CONSTRAINT `FKd6kb9qdlvkcer7wji0nl2dsxv` FOREIGN KEY (`category_key`) REFERENCES `transaction_category` (`category_key`),
  CONSTRAINT `FKj8dq0va121us2l2o5wijk00f1` FOREIGN KEY (`bank_code`) REFERENCES `bank` (`bank_code`),
  CONSTRAINT `FKola80sfawd4fvemj2xxu7pg5` FOREIGN KEY (`inout_key`) REFERENCES `inout_type` (`inout_key`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,500000,'034',0,500000,'2023-08-31 17:00:13.704171','A100',111010011,0,NULL,NULL),(2,1500000,'034',0,1000000,'2023-09-15 15:32:34.293997','삼성SSAFY',111010011,0,NULL,NULL),(4,1495500,'034',0,4500,'2023-09-18 09:12:30.837045','스타벅스 광주하남점',111010011,1,NULL,NULL),(5,2995500,'034',0,1500000,'2023-09-23 14:03:45.082989','A120',111010011,0,NULL,NULL),(6,3495500,'034',0,500000,'2023-10-03 23:52:09.000000','A118',111010011,0,NULL,NULL),(17,3468000,'034',0,27500,'2023-10-04 11:36:02.651607','애슐리 광주터미널점',111010011,1,NULL,NULL);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_category`
--

DROP TABLE IF EXISTS `transaction_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_category` (
  `category_key` int NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_category`
--

LOCK TABLES `transaction_category` WRITE;
/*!40000 ALTER TABLE `transaction_category` DISABLE KEYS */;
INSERT INTO `transaction_category` VALUES (0,NULL);
/*!40000 ALTER TABLE `transaction_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `account` int DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `email` varchar(100) NOT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `is_ended` bit(1) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(225) NOT NULL,
  `pre_fund` int DEFAULT NULL,
  `residence_info` int NOT NULL,
  `total_fund` int DEFAULT NULL,
  `region_key` bigint DEFAULT NULL,
  `refresh_time` datetime(6) DEFAULT NULL,
  `my_data` bit(1) DEFAULT NULL,
  `exited` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKprpasf2wgsuuhrmhhq32trjcc` (`region_key`),
  CONSTRAINT `FKprpasf2wgsuuhrmhhq32trjcc` FOREIGN KEY (`region_key`) REFERENCES `region` (`region_key`)
) ENGINE=InnoDB AUTO_INCREMENT=462 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (434,NULL,'2023-10-05 14:21:05.000000','test@naver.com','2023-07-04 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9710021,1550000,18,NULL,_binary '',0),(435,NULL,'2023-10-05 14:22:57.000000','test25@naver.com','2023-10-02 23:59:59.000000',_binary '\0','김범규','ssafy123!',400000,9609211,1300000,18,NULL,_binary '',0),(436,NULL,'2023-10-05 14:31:24.000000','mko56@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',700000,9812181,7400000,18,NULL,_binary '',0),(437,NULL,'2023-10-05 14:37:36.000000','test123@naver.com','2023-10-26 23:59:59.000000',_binary '\0','테스트','wndud!12',0,9701011,8000000,18,NULL,_binary '',0),(438,NULL,'2023-10-05 14:58:14.000000','test1@naver.com','2023-10-03 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',4500000,9812181,13350000,44,NULL,_binary '',0),(439,NULL,'2023-10-05 15:54:30.000000','asdf@naver.com','2019-10-10 23:59:59.000000',_binary '\0','안녕하세요','asdf^1234',0,1899870,0,240,NULL,_binary '\0',0),(440,NULL,'2023-10-05 16:02:52.000000','test26@naver.comq','2023-10-02 23:59:59.000000',_binary '\0','김범규','ssafy123!',0,9609211,2500000,18,NULL,_binary '',0),(441,NULL,'2023-10-05 16:04:24.000000','test26@naver.com','2023-10-02 23:59:59.000000',_binary '\0','김범규','ssafy123!',660000,9609211,630000,151,NULL,_binary '',0),(442,NULL,'2023-10-05 16:28:23.000000','soo0323@naver.com','2023-09-12 23:59:59.000000',_binary '\0','김자립','Dkssud!1',0,9905052,2500000,151,NULL,_binary '',0),(443,NULL,'2023-10-05 16:35:14.000000','soo0335@naver.com','2023-09-12 23:59:59.000000',_binary '\0','김자립','Dkssud!12',0,9905052,4300000,152,NULL,_binary '',0),(444,NULL,'2023-10-05 16:43:33.000000','saafy@naver.com','2023-10-03 23:59:59.000000',_binary '\0','최자립','Dkssud!12',0,9905052,0,151,NULL,_binary '\0',0),(445,NULL,'2023-10-05 16:43:39.000000','qasw@naver.com','2023-10-27 23:59:59.000000',_binary '\0','테슷트','wndud!12',0,9712141,2500000,18,NULL,_binary '',0),(446,NULL,'2023-09-19 10:00:00.000000','coco@ssafy.com','2023-09-19 12:34:56.000000',_binary '\0','김수진','Dkssud!12',0,9905052,2900000,1,NULL,_binary '',0),(447,NULL,'2023-09-19 10:00:00.000000','summer1@ssafy.com','2023-09-19 12:34:56.000000',_binary '\0','김수진','Dkssud!12',500000,9905052,2500000,152,NULL,_binary '',0),(448,NULL,'2023-09-19 10:00:00.000000','summer@ssafy.com','2023-09-19 12:34:56.000000',_binary '\0','김수진','Dkssud!12',0,9905052,0,1,NULL,_binary '\0',0),(449,NULL,'2023-10-05 19:30:52.000000','mko564512@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy123!',0,9812181,1700000,19,NULL,_binary '',0),(450,NULL,'2023-10-05 19:44:47.000000','mko1@naver.com','2023-08-01 23:59:59.000000',_binary '\0','신대혁','ssafy123!',0,9812181,2000000,151,NULL,_binary '',0),(451,NULL,'2023-10-05 19:49:14.000000','test30@naver.com','2023-10-02 23:59:59.000000',_binary '\0','김범규','ssafy123!',500000,9609211,500000,18,NULL,_binary '',0),(452,NULL,'2023-10-05 20:13:26.000000','qwepo@naver.com','2023-11-03 23:59:59.000000',_binary '\0','헬주영','wndud!12',0,9712111,2500000,18,NULL,_binary '',0),(453,NULL,'2023-10-05 20:49:13.000000','mko2@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9812181,3650000,18,NULL,_binary '\0',0),(454,NULL,'2023-10-05 21:01:12.000000','mko3@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9812181,5700000,18,NULL,_binary '',0),(455,NULL,'2023-10-05 21:12:52.000000','mko4@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9812181,2700000,18,NULL,_binary '',0),(456,NULL,'2023-10-06 00:06:39.000000','mko5@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9812181,0,19,NULL,_binary '',0),(457,NULL,'2023-10-06 00:22:28.000000','sowiwi@naver.com','2023-10-03 23:59:59.000000',_binary '\0','김수진','Dkssud!7',0,9905052,2530000,151,NULL,_binary '',0),(458,NULL,'2023-10-06 01:26:13.000000','mko6@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9812181,3700000,18,NULL,_binary '',0),(459,NULL,'2023-10-06 01:34:57.000000','mko7@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9812181,30000,151,NULL,_binary '',0),(460,NULL,'2023-10-06 02:05:18.000000','mko8@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9812181,2700000,18,NULL,_binary '',0),(461,NULL,'2023-10-06 02:45:21.000000','mko10@naver.com','2023-10-01 23:59:59.000000',_binary '\0','신대혁','ssafy1234!',0,9812181,200000,18,NULL,_binary '\0',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `welfare`
--

DROP TABLE IF EXISTS `welfare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `welfare` (
  `welfare_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `description_origin` varchar(255) DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `etc` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `organization` varchar(100) NOT NULL,
  `route` varchar(255) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `submission` varchar(255) DEFAULT NULL,
  `support_fund` int DEFAULT NULL,
  `support_period` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `welfare_code` varchar(255) DEFAULT NULL,
  `welfare_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`welfare_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `welfare`
--

LOCK TABLES `welfare` WRITE;
/*!40000 ALTER TABLE `welfare` DISABLE KEYS */;
INSERT INTO `welfare` VALUES (0,NULL,'한화생명 자립준비청년 긴급지원사업','2023-10-07 23:59:00.000000','자립준비청년, 자립의지 및 프로그램 성실참여 가능자','A100','한화생명 자립준비청년 긴급지원사업','한화생명','온라인 접수','2023-09-25 00:00:00.000000','지원 신청서, 지원금 사용 계획서, 보호종료 확인서',500000,1,'https://forms.gle/mvGRdETLGkw811Qv8','A100','소득'),(1,NULL,'서울특별시자립지원전담기관에서 2023 보호연장아동 프로그램 「자립 오락실」 2차 모집을 진행합니다!','2023-10-15 23:59:00.000000','서울특별시 내 보호연장아동','A101','서울특별시 보호연장아동 프로그램 \"자립 오락실\"','서울특별시자립지원전담기관','온라인 접수','2023-09-11 00:00:00.000000','프로그램 신청서, 개인정보 이용 및 제공 동의서, 프로그램 계획서, 재원확인서',200000,1,'https://www.sjarip.or.kr/','A101','기타'),(2,NULL,'세종시에서는 전세사기에 취약한 청년 임차인의 주거안정 도모를 위하여 실제 납부한 전세보증금반환보증 보증료를 지원하고자 하오니 [청년 전세보증금반환보증 보증료 지원사업]에 많은 신청 바랍니다.','2023-12-20 23:59:00.000000','.','A102','청년 전세보증금반환보증 보증료 지원','세종시','온라인 접수, 방문 접수','2023-07-26 00:00:00.000000','신청서, 서약서, 전세금보증반환보증 보증증서, 보증료 납부 증빙서류, 임대차계약서, 신청인 통장, 부동산 등기사항 전부증명서, 주민등록등본, 혼인관계증명서',300000,1,'https://sjyouth.sjtp.or.kr/board/business/detail?boardSeq=291&categorySeq=26','A102','소득,주거'),(3,NULL,'페인트 도료교육센터에서 취업을 희망하는 자립준비청년들을 대상으로','2023-10-06 23:59:00.000000','자립준비청년','A103','자동차보수도장인력양성 교육생 모집','조광페인트','메일접수(hyobin@ckpc.co.kr)','2023-09-15 00:00:00.000000','지원 신청서',0,0,'https://www.ckpa.co.kr/html/00_main/','A103','취업,교육'),(4,NULL,'퍼스널컬러 강사과정','2023-10-15 23:59:00.000000','충남 보호종료 5년이내 자립준비청년','A104','퍼스널컬러 강사과정','충남아동자립지원전담기관','온라인 접수','2023-08-01 00:00:00.000000','지원 신청서',0,0,'https://forms.gle/Ln3V7f5Zhn9nM7zs8','A104','취업,교육'),(5,NULL,'자립준비청년 대상 애니어그램 1단계 강사과정 이수','2023-10-15 23:59:00.000000','충남 보호종료 5년이내 자립준비청년','A105','애니어그램 강사과정','충남아동자립지원전담기관','온라인 접수','2023-08-21 00:00:00.000000','지원 신청서',0,0,'https://forms.gle/GsgEpDdUZGN1WkMr5','A105','취업,교육'),(6,NULL,'자립준비청년 대상 mbti 강사 초급과정 이수','2023-10-15 23:59:00.000000','충남 보호종료 5년이내 자립준비청년','A106','MBTI 강사과정','충남아동자립지원전담기관','온라인 접수','2023-08-21 00:00:00.000000','지원 신청서',0,0,'https://forms.gle/VpAWREqEqBHY2FFt7','A106','취업,교육'),(7,NULL,'자립준비청년을 위한 원예치료 사업','2023-10-31 23:59:00.000000','충남 보호종료 5년이내 자립준비청년','A107','자립준비청년을 위한 원예치료 사업','충남아동자립지원전담기관','온라인 접수','2023-05-01 00:00:00.000000','지원 신청서',0,0,'https://forms.gle/q26sw1fe5a2xlhhy9','A107','건강'),(8,NULL,'세종 청년센터에서 전문 상담가에게 고민을 털어놓는 \'청년상담소-1:1 개별상담\' 을 진행','2023-11-15 23:59:00.000000','세종에서 거주 또는 활동하는 만 19세~34세 청년','A108','청년정작상담소 참여자 모집','세종청년센터','온라인 접수','2023-04-17 00:00:00.000000','지원 신청서',0,0,'https://4242.or.kr/sub050301/form/pid/293','A108','건강'),(9,NULL,'인천광역시에서 인천 청년을 대상으로 자격증 응시료 지원 사업을 진행','2023-11-30 23:59:00.000000','신청일 현재 주민등록상 인천시에 거주중인 자, 만18세~39세 청년','A109','인천 청년 자격증 응시료 지원','인천광역시','온라인 접수','2023-03-02 00:00:00.000000','지원 신청서',100000,1,'https://www.incheon.go.kr/youthcert/YC010101','A109','취업'),(10,NULL,'청주시 거주 면접정장 상하의 및 구두 대여','2023-12-29 23:59:00.000000','청주시 거주 만18세(고등학교 졸업예정자 포함) ~ 만39세 이하 취업준비청년','A110','청년 희망날개 지원사업','청주시','온라인 접수','2023-01-02 00:00:00.000000','신분증, 주민등록초본, 임대차계약서, 학생증',0,0,'https://www.cheongju.go.kr/www/contents.do?key=20410 ','A110','취업'),(11,NULL,'굿네이버스는 우리금융미래재단, 사회복지공동모금회와 함께 2023년 퇴소하는 전국의 자립준비청년에게 We풍당당 키트를 지원하고자, 신청자를 모집','2023-12-31 23:59:00.000000','보호시설을 퇴소한 자립준비청년','A111','자립준비청년 키트 지원 사업','굿네이버스','온라인 접수','2023-09-11 00:00:00.000000','지원 신청서',0,0,'https://forms.gle/k3MaWX7BHAn3A5Ps6','A111','주거'),(12,NULL,'미래내일일경험 지원사업은 전라북도 내 미취업 청년들이 공공기관 및 기업에서 직접 과업 또는 현업을 수행하면서 관심직무에 대한 일경험을 할 수 있도록 기회를 제공하는 프로그램입니다.','2023-12-31 23:59:00.000000','만 15세 이상 34세 이하 미취업 청년','A112','미래내일 일경험 참여청년','미래내일일경험사업','온라인 접수','2023-08-08 00:00:00.000000','지원 신청서',1300000,3,'https://form.office.naver.com/form/responseView.cmd?formkey=ZjdhNmYyOTctOWZ','A112','취업,교육'),(13,NULL,'​아름다운재단과 함께하는 자립준비청년 생활안정 지원사업 입니다. 생계, 주거, 의료, 교육비 항목 등 신청 가능한 사업','2023-12-31 23:59:00.000000','만 18세 이상 28세 이하 자립준비청년','A113','청년 생활안정 지원사업','한국사회복지관협회','메일접수(kaswc-fund3@daum.net)','2023-08-01 00:00:00.000000','지원 신청서',3000000,1,'https://kaswc.or.kr/welfarenews/300815','A113','소득'),(14,'','강남구청 가족 정책과에서 시행하는 강남구 거주 3개월 이상 경과 자립 준비 청년을 대상으로 경제적 심리적 지원을 해주는 지원 사업입니다.','2023-12-31 23:59:00.000000','자립 준비 청년, 예비자립준비청년: 아동 및 청소년복지시설, 가정 위탁 보호종료 예정 아동(1년)','A114','강남구청 자립준비청년 지원사업','강남구청 가족정책과','온라인 접수','2023-07-20 00:00:00.000000','신청서,수강증빙서류,구매영수증,외래치료비,약제비 관련 서류, 취업 및 창업증빙서류',200000,1,'https://www.gangnam.go.kr/board/child/list.do?mid=ID02_010503','A114','소득,교육'),(15,NULL,'세종특별자치시에서 청년월세 특별지원','2023-12-31 23:59:00.000000','월세 60만원 및 보증금 5천만원 이하 주택에 거주하는 무주택자','A115','청년 월세 특별지원','세종특별자치시','온라인 접수, 방문 접수','2023-01-01 00:00:00.000000',NULL,200000,12,'https://www.sejong.go.kr/bbs/R0071/view.do?nttId=B000000073561Wi0kO7c','A115','소득,교육'),(16,NULL,'전라북도일자리센터에서 면접비 지원, 면접의상 대여지원, 자격증 응시료지원, 면접사진 촬영비 지원','2023-12-31 23:59:00.000000','전라북도 거주 만 18세 이상 미취업 구직자','A116','취준꾸러미 참여자모집','전라북도 일자리센터','온라인 접수, 방문 접수','2023-06-12 00:00:00.000000','지원 신청서',100000,2,'https://www.1577-0365.or.kr','A116','취업'),(17,NULL,'발돋움 프로그램은 2년간 제공되는 다양한 교육 및 활동 프로그램으로 1:1 멘토링 및 개인별 맞춤형 교육을 지향합니다','2023-10-09 23:59:00.000000','만18세(2005년생) ~ 29세(1994년생)의 자립준비청년 및 보호종료예정아동','A117','포니정재단 2023 포니정 발돋움장학','한국아동복지협회','온라인 접수','2023-09-14 00:00:00.000000','지원 신청서, 개인정보동의서, 보호종료아동확인서',850000,24,'https://jaripon.ncrc.or.kr/home/kor/support/projectMng/edit.do?menuPos=1&idx=461&act=&searchValueList3=A&searchValueList3=B&searchValue5=&searchValue6=0&searchKeyword=&searchValue1=A&pageIndex=1','A117','소득'),(18,NULL,'구직단념청년 발굴·모집, 사회활동 참여의욕 고취를 위한 맞춤형 프로그램 제공, (이수시) 국민취업지원제도, (취업시) 고용촉진장려금까지 연계하여 지원하는 사업을 말함','2023-10-24 23:59:00.000000','​6개월 이상 취업 및 교육·직업훈련 참여 이력이 없는 만 18세~34세 청년','A118','청년도전 지원사업','고용노동부','온라인 접수','2023-06-07 00:00:00.000000','지원 신청서',500000,6,'https://www.work.go.kr/youngChallenge/index.do','A118','소득,교육'),(19,NULL,'청주시 청년들을 위한 구직활동 지원 면접비 1인 1회 3만원 지원','2023-11-30 23:59:00.000000','청주시 구직활동 청년(만 19세 ~ 만 39세) ','A119','청년 취업지원사업','청년뜨락5959','온라인 접수','2023-03-08 00:00:00.000000','지원 신청서, 면접증빙 서류, 통장, 신분증',30000,1,'https://www.youthspace5959.com','A119','취업'),(20,NULL,'자립준비청년을 위해 첫 살림지원으로 기본적인 물품 구매를 지원합니다.','2023-12-10 23:59:00.000000','자립준비청년','A120','나의 첫 살림 사업','초록우산어린이재단','전화신청 후 개별방문','2023-02-01 00:00:00.000000','통장사본, 후원금 사용 반납 동의서, 개인정보 수집 및 이용동의서',1500000,1,'전담기관방문','A120','소득,주거'),(21,NULL,'부산시 특화 자립지원서포터즈단을 운영하여 멘티-멘토 활동을 진행함으로써 자립준비청년 간 신뢰관계를 형성하고 안정적인 자립기반을 마련하기 위함입니다.','2023-12-29 23:59:00.000000','부산시 거주 만 30세 이하의 자립준비청년','A121','자립서포터즈 멘토 모집','부산 자립지원전담기관','온라인 접수','2023-05-01 00:00:00.000000','지원 신청서, 개인정보 동의서',0,0,'https://www.busanjarip.or.kr/SW_bbs/notice/view.php?zipEncode==0tB152x552BTvMCLnMj9ugDHnezYf2BIzYvfLKv9ugC5r1yJfezYf2BIzcoXetpTvNBFDxzPzNj9qgBLLMz5v2AM0tzTfMB5v2AMqMCHn2xxnvpeLezYf2BIzsp1DMjX0tzNfgC39MBMahAW5cDZLgBVu2yPr3BU9YCIj2xxn1l9WMC19fDZLgB','A121','교육');
/*!40000 ALTER TABLE `welfare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `welfare_info`
--

DROP TABLE IF EXISTS `welfare_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `welfare_info` (
  `welfare_id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`welfare_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `welfare_info`
--

LOCK TABLES `welfare_info` WRITE;
/*!40000 ALTER TABLE `welfare_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `welfare_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `welfare_welfare_type`
--

DROP TABLE IF EXISTS `welfare_welfare_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `welfare_welfare_type` (
  `welfare_welfare_id` bigint NOT NULL,
  `welfare_type` varchar(255) DEFAULT NULL,
  KEY `FK4ld4mu9vgme9kr7428kkhoibu` (`welfare_welfare_id`),
  CONSTRAINT `FK4ld4mu9vgme9kr7428kkhoibu` FOREIGN KEY (`welfare_welfare_id`) REFERENCES `welfare` (`welfare_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `welfare_welfare_type`
--

LOCK TABLES `welfare_welfare_type` WRITE;
/*!40000 ALTER TABLE `welfare_welfare_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `welfare_welfare_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06  9:14:03
