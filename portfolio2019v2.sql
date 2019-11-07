-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 05 mai 2019 à 14:57
-- Version du serveur :  5.7.21
-- Version de PHP :  7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `portfolio2019v2`
--

-- --------------------------------------------------------

--
-- Structure de la table `p2k19_works`
--

DROP TABLE IF EXISTS `p2k19_works`;
CREATE TABLE IF NOT EXISTS `p2k19_works` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `id_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `workOrder` int(11) NOT NULL,
  `pitch` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(600) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` date DEFAULT NULL,
  `role` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `outils` varchar(400) COLLATE utf8_unicode_ci DEFAULT NULL,
  `team` varchar(400) COLLATE utf8_unicode_ci DEFAULT NULL,
  `link` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `preview` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `p2k19_works`
--

INSERT INTO `p2k19_works` (`id`, `title`, `id_name`, `workOrder`, `pitch`, `description`, `created_at`, `role`, `outils`, `team`, `link`, `preview`) VALUES
(1, 'UNHEAR', 'unhear', 1, 'Vivez une expérience immersive dans un monde 3D', 'Dans le cadre de mon projet tutoré de deuxième année nous avons décidé de développer un site dans lequel l\'utilisateur pourrait créer une musique à travers une expérience immersif. Durant l\'expérience, il pourra choisir un ensemble de sons pour composer une musique puis il voyagera dans un monde 3D décoré par des formes qui s\'animeront au rythme des sons.', '2019-04-04', 'Développeur front et 3D', 'Javascript;Three.js;GSAP', 'Valentin Houee;Karl Justiniano;Lea Sendron;Anatole Touvron;Marina Khan', 'https://unhear.fr', ''),
(2, 'Portrait chinois', 'portrait-chinois', 4, 'Apprenez en plus sur ma personnalité', 'Durant ma première année de DUT MMI j\'ai réalisé une one-page qui a pour thème mon portrait chinois. Un portrait chinois est jeu littéraire permettant de décrire notre personnalité en s\'identifiant à des personnes, objets ou des éléments.\r\n', '2017-12-10', NULL, 'Javascript;jQuery', NULL, 'http://www.kenyzachelin.fr/portraitchinois/', ''),
(3, 'Video Resume', 'video-resume', 7, 'Découvrez moi à travers une vidéo en motion design', 'Durant ma deuxième année de DUT MMI j\'ai réalisé le montage vidéo de mon cv video en anglais.', '2018-12-20', NULL, 'Adobe Premiere Pro', NULL, 'https://youtu.be/6DKrPZl7xuQ', ''),
(4, 'Sound Experiment', 'sound-experiment', 5, 'Une musique donne vie à des formes', 'Au cours de mon apprentissage de ThreeJS j\'ai entrepris l\'idée de développer un mini-projet dans lequel je pourrai laisser parler ma créativité et affiner mes compétences en développement.', '2018-10-16', NULL, 'Javascript;Three.js;Web Audio API', NULL, 'http://www.kenyzachelin.fr/soundexperiment/', ''),
(5, 'CV Intéractif', 'cv-interactif', 2, 'Découvrez moi à travers un site intéractif', 'Durant ma première année de DUT nous avons dû réaliser notre cv web. Ce travail était un travail personnel et complètement libre. J\'en ai ainsi profité pour approfondir mes compétences en UI Motion.\r\nSi vous voulez en savoir plus sur mon profil je vous invite à explorer mon cv intéractif. C\'est l\'un des premiers site que j\'ai pu concevoir c\'est pourquoi il n\'est malheureusement pas responsive.', '2018-06-04', NULL, 'Javascript;jQuery', NULL, 'http://www.kenyzachelin.fr/cvinteractif/', ''),
(7, 'ThreeJSLab', 'threejs-lab', 6, 'Toutes les possibilités de la 3D', 'Ce site contient des minis-projets et expérimentations que j\'ai réalisé avec la librairie ThreeJS.', '2019-02-04', NULL, 'Three.js', NULL, 'http://www.kenyzachelin.fr/threejslab/', ''),
(8, 'Webcam3D', 'webcam3d', 3, 'Une expérience 3D', 'Cette application web permet à l\'utilisateur d\'activer sa webcam afin de se voir dans un environnement 3D également animé par le son de son microphone.', '2019-02-21', NULL, 'Javascript;Three.js', NULL, 'https://github.com/KenyZ/Webcam3D', '');

-- --------------------------------------------------------

--
-- Structure de la table `p2k19_works_images`
--

DROP TABLE IF EXISTS `p2k19_works_images`;
CREATE TABLE IF NOT EXISTS `p2k19_works_images` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `workId` tinyint(4) NOT NULL,
  `slideOrder` tinyint(4) NOT NULL,
  `path` varchar(50) NOT NULL,
  `alt` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `p2k19_works_images`
--

INSERT INTO `p2k19_works_images` (`id`, `workId`, `slideOrder`, `path`, `alt`) VALUES
(23, 2, 1, '1', 'Page d\'accueil'),
(24, 2, 2, '2', 'Liste des comparaisons'),
(25, 2, 3, '3', 'Section \"Si j\'étais un pays\"'),
(26, 3, 1, '1', 'Introduction '),
(27, 3, 2, '2', 'Présentation'),
(28, 3, 3, '3', 'Les matières que j\'apprends en DUT MMI'),
(29, 3, 4, '4', 'Mes compétences'),
(30, 3, 5, '5', 'Mes réalisations'),
(31, 4, 1, '1', 'La liste des musiques'),
(32, 4, 2, '2', 'La scène avec la musique Boss de Lil Pump'),
(33, 4, 3, '3', 'La scène avec la musique Feels like summer de Childish Gambino'),
(34, 4, 4, '4', 'La scène avec la musique Wind de Heize'),
(35, 4, 5, '5', 'La scène avec la musique Paradise de Millic'),
(36, 5, 1, '1', 'Page d\'accueil'),
(37, 5, 2, '2', 'La page \"mon experience\"'),
(38, 5, 3, '3', 'La page \"mes compétences\"'),
(39, 5, 4, '4', 'La page \"mes loisirs\"'),
(40, 5, 5, '5', 'La page \"contact\"'),
(41, 1, 1, '1', NULL),
(42, 1, 2, '2', NULL),
(43, 8, 1, '1', NULL),
(44, 8, 2, '2', NULL),
(45, 7, 1, '1', NULL),
(46, 7, 2, '2', NULL),
(47, 7, 3, '3', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
